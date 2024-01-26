import { defineStore, storeToRefs } from "pinia";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { usePaginationStore } from "./pagination";
import { useToastsStore } from "./toasts";
import { checkFormFields } from "~/utils/checkFormFields";
import type { Database } from "~/types/database.types";
import catalogService from "~/services/catalogService";
import formService from "~/services/formService";

export const useCatalogStore = defineStore("catalog", () => {
  const client = useSupabaseClient<Database>();
  let realtimeChannel: RealtimeChannel;
  const catalogItems: Ref<CatalogItem[] | null> = ref([]);
  const loaded: Ref<boolean> = ref(false);

  const toastsStore = useToastsStore();
  const pagesStore = usePaginationStore();

  const { currentPage } = storeToRefs(pagesStore);
  const { showErrorToast, showSuccessToast } = toastsStore;

  const fetchCatalogItems = async () => {
    const { data, error } = await catalogService.fetchCatalogItems();
    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    } else {
      catalogItems.value = data;
      loaded.value = true;
    }
  };

  const subscribeToUpdates = () => {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "catalog" },
        () => fetchCatalogItems()
      );
    realtimeChannel.subscribe();
  };

  const unsubscribeFromUpdates = () => {
    client.removeChannel(realtimeChannel);
  };

  const selectedItem: Ref<CatalogItem | null> = ref(null);

  const fetchSelectedItem = async (id: string | string[]) => {
    if (catalogItems.value?.length === 0) {
      fetchCatalogItems();
    }

    const { data, error } = await catalogService.fetchSelectedItem(Number(id));

    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    }
    if (data?.length) {
      selectedItem.value = data[0];
    } else {
      navigateTo("/catalog");
      const { toast, message } = toastHandler("item-not-found");
      showErrorToast(toast, message);
    }
  };

  const searchValue = ref("");
  const initialPrice = ref(0);

  const visibleItems = computed(() => {
    return catalogItems.value?.filter((item) => item.is_visible === true);
  });

  const filteredItems = computed(() => {
    return visibleItems.value?.filter((item: CatalogItem) => {
      return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  });

  const filteredByPrice = computed(() => {
    return filteredItems.value?.filter((item: CatalogItem) => {
      return item.price > initialPrice.value;
    });
  });

  const sortValue = ref("default");
  const sortOrder = ref(true);

  const updateSort = (val: string) => {
    if (sortValue.value === val) {
      sortOrder.value = !sortOrder.value;
    }
    sortValue.value = val;
  };

  const sortedItems = computed(() => {
    const val = sortValue.value;
    const order = sortOrder.value;
    if (!filteredByPrice.value) {
      return [];
    }
    if (val === "default") {
      return filteredByPrice.value;
    } else {
      if (order === true) {
        return [
          ...filteredByPrice.value.sort((a: CatalogItem, b: CatalogItem) => {
            if (a[val as keyof CatalogItem] === "") return +1;
            if (b[val as keyof CatalogItem] === "") return -1;
            else
              return a[val as keyof CatalogItem]
                .toString()
                .localeCompare(b[val as keyof CatalogItem].toString());
          }),
        ];
      } else {
        return [
          ...filteredByPrice.value.sort((a: CatalogItem, b: CatalogItem) => {
            if (a[val as keyof CatalogItem] === "") return +1;
            if (b[val as keyof CatalogItem] === "") return -1;
            else
              return b[val as keyof CatalogItem]
                .toString()
                .localeCompare(a[val as keyof CatalogItem].toString());
          }),
        ];
      }
    }
  });

  const manufacturers = computed(() => {
    const labels = [
      ...new Set(
        visibleItems.value?.map((item: CatalogItem) => item.manufacturer)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const types = computed(() => {
    const labels = [
      ...new Set(visibleItems.value?.map((item: CatalogItem) => item.type)),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixTypes = computed(() => {
    const labels = [
      ...new Set(
        visibleItems.value?.map((item: CatalogItem) => item.matrix_type)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixSizes = computed(() => {
    const labels = [
      ...new Set(
        visibleItems.value?.map((item: CatalogItem) => item.matrix_size)
      ),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const matrixPixels = computed(() => {
    const labels = [
      ...new Set(visibleItems.value?.map((item: CatalogItem) => item.pixels)),
    ].map((label) => {
      const obj = {} as SelectOption;
      obj.label = label;
      obj.selected = false;
      return obj;
    });
    return labels;
  });

  const filteringOptions = computed(() => {
    return [
      {
        label: "Manufacturer",
        value: manufacturers.value,
        category: "manufacturer",
      },
      {
        label: "Camera type",
        value: types.value,
        category: "type",
      },
      {
        label: "Matrix type",
        value: matrixTypes.value,
        category: "matrix_type",
      },
      {
        label: "Matrix size",
        value: matrixSizes.value,
        category: "matrix_size",
      },
      {
        label: "Pixels",
        value: matrixPixels.value,
        category: "pixels",
      },
    ];
  });

  const selectedOptions = reactive<SelectedOptions>({
    manufacturer: [],
    type: [],
    matrix_type: [],
    matrix_size: [],
    pixels: [],
  });

  const selectedItems = computed(() => {
    return sortedItems.value?.filter((curItem: CatalogItem) => {
      let flag = true;
      for (const key in selectedOptions) {
        const values = selectedOptions[key as keyof SelectedOptions];
        if (values.length) {
          if (!values.includes(curItem[key as keyof SelectedOptions])) {
            flag = false;
          }
        }
      }
      if (flag) {
        return curItem;
      }
      return false;
    });
  });

  const selectItem = (value: string, category: string) => {
    currentPage.value = 0;
    if (selectedOptions[category as keyof SelectedOptions].includes(value)) {
      selectedOptions[category as keyof SelectedOptions] = selectedOptions[
        category as keyof SelectedOptions
      ].filter((item) => item !== value);
    } else {
      selectedOptions[category as keyof SelectedOptions].push(value);
    }
  };

  const selectedImage: Ref<File | null> = ref(null);

  const selectImage = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      selectedImage.value = target.files[0];
    }
  };

  const activeItem = ref(false);

  const addItem = async (values: FormValues) => {
    const error = await catalogService.addItem(values);
    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-to-database");
      showSuccessToast(toast, message);
    }
  };

  const deleteItem = async (id: number) => {
    const error = await catalogService.deleteItem(id);
    if (error) {
      const { toast, message } = toastHandler("item-delete-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("item-delete-success");
      showSuccessToast(toast, message);
    }
  };

  const editItem = async (values: HTMLFormElement, id: number) => {
    const formValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
    } as CatalogItem;

    const valuesObject = Array.from(values).reduce((obj, item) => {
      const convertedItem = item as unknown as ValueElement;
      return Object.assign(obj, { [convertedItem.name]: convertedItem.value });
    }, {}) as CatalogItem;

    if (values) {
      for (let i = 0; i < values.length; i++) {
        const curVal = values[i] as HTMLInputElement;
        if (curVal.type !== "submit") {
          const key = curVal.name;
          if (curVal.type === "file" && selectedImage.value) {
            const filename: string = uuidv4();
            const { data, error } = await formService.uploadImage(
              filename,
              selectedImage.value
            );
            if (data?.path) {
              const path = formService.getImageUrl(data?.path);
              formValues[key as keyof typeof valuesObject] = path;
              if (error) throw error;
            }
          } else {
            formValues[key as keyof typeof valuesObject] = curVal.value;
          }
        }
      }
    }
    if (checkFormFields(formValues)) {
      const error = await catalogService.editItem(formValues, id);
      if (error) {
        const { toast, message } = toastHandler("item-update-error");
        showErrorToast(toast, message);
      } else {
        const { toast, message } = toastHandler("item-update-success");
        showSuccessToast(toast, message);
      }
    } else {
      const { toast, message } = toastHandler("empty-form-fields");
      showErrorToast(toast, message);
    }
  };

  const toggleVisibility = async (event: Event, id: number) => {
    const target = event.target as HTMLInputElement;
    const isChecked = target?.checked;
    const error = await catalogService.toggleVisibility(isChecked, id);
    if (error) {
      const { toast, message } = toastHandler(error.code);
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler(
        isChecked ? "item-visible" : "item-hidden"
      );
      showSuccessToast(toast, message);
    }
  };

  return {
    catalogItems,
    fetchCatalogItems,
    selectedItem,
    fetchSelectedItem,
    visibleItems,
    filteredItems,
    searchValue,
    initialPrice,
    sortValue,
    sortOrder,
    updateSort,
    sortedItems,
    selectedOptions,
    filteringOptions,
    selectedItems,
    selectItem,
    loaded,
    addItem,
    editItem,
    deleteItem,
    selectImage,
    activeItem,
    toggleVisibility,
    subscribeToUpdates,
    unsubscribeFromUpdates,
  };
});
