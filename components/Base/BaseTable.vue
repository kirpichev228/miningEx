<template>
  <table :class="shadowed ? 'table_shadowed' : ''" class="table">
    <thead>
      <tr class="text-left cursor-pointer">
        <th
          v-for="(item, index) in header"
          :key="index"
          class="px-3 py-4"
          @click="sortable ? updateSort(item.value) : ''"
        >
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <TransitionGroup name="table">
        <tr
          v-for="(item, index) in sortedItems"
          :key="index"
          class="table-row text-left hover:bg-slate-100 cursor-pointer"
        >
          <template v-for="(option, optionId) in header" :key="optionId">
            <td
              v-if="option.type === 'plain'"
              class="py-4 px-3 max-w-[300px] min-w-[40px] w-fit"
            >
              {{ item[option.value as keyof BaseItem] }}
            </td>
            <td
              v-if="option.type === 'boolean'"
              class="py-4 px-3 max-w-[300px] min-w-[40px] w-fit"
            >
              <span
                class="px-3 py-1 rounded-lg text-white"
                :class="item[option.value] ? 'bg-green-600' : 'bg-red-600'"
                >{{ item[option.value as keyof BaseItem] }}</span
              >
            </td>
            <td v-if="option.type === 'date'" class="py-4 px-3">
              {{ formatDate(new Date(item[option.value as keyof BaseItem])) }}
            </td>
            <td v-else-if="option.type === 'image'" class="py-4 px-3">
              <div class="table__image">
                <img
                  class="h-full object-cover object-center"
                  :src="item[option.value as keyof BaseItem].toString()"
                  :alt="option.value"
                  loading="eager"
                />
              </div>
            </td>
            <td v-else-if="option.type === 'toggle'" class="py-4 px-3">
              <BaseToggleInput
                :id="item.id.toString()"
                :state="(item[option.value as keyof BaseItem] as unknown as boolean)"
                @change="toggleVisibility($event, item.id)"
              />
            </td>
            <td v-else-if="option.type === 'number'" class="py-4 px-3">
              <input
                v-model.number="item[option.value as keyof BaseItem]"
                min="1"
                type="number"
                :name="'number' + item.id"
                @input="
                  option.action
                    ? $emit(option.action, {
                        id: item.id,
                        event: $event,
                      })
                    : ''
                "
              />
            </td>
            <td v-else-if="option.type === 'icon'" class="py-4 px-3">
              <span
                class="p-2 table-icon__wrap"
                @click="option.action ? $emit(option.action, item.id) : ''"
              >
                <Icon :name="`heroicons:${option.value}`" class="table__icon" />
              </span>
            </td>
            <td v-else-if="option.type === 'select'" class="py-4 px-3">
              <select
                class="table__select"
                :name="'select' + item.id"
                @change="
                  option.action
                    ? $emit(option.action, {
                        id: item.id,
                        event: $event,
                      })
                    : ''
                "
              >
                <option :value="item[option.toString() as keyof BaseItem]">
                  {{ item[option.value as keyof BaseItem] }}
                </option>
                <template v-for="(el, elId) in option.options" :key="elId">
                  <option
                    v-if="el !== item[option.value as keyof BaseItem].toString()"
                    :value="el"
                  >
                    {{ el }}
                  </option>
                </template>
              </select>
            </td>
            <td v-else-if="option.type === 'markup'" class="py-4 px-3">
              <BaseModal>
                <template #trigger>
                  <Icon
                    :name="`heroicons:${option.value}`"
                    class="w-[25px] h-[25px] cursor-pointer"
                  />
                </template>
                <template #content>
                  <BaseUpdateForm
                    :item="(item as CatalogItem | OrderItem | User)"
                    :original-items="originalItems"
                  >
                  </BaseUpdateForm>
                </template>
              </BaseModal>
            </td>
          </template>
        </tr>
      </TransitionGroup>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFilterStore } from "~/store/filter";
import { useCatalogStore } from "~/store/catalog";

interface BaseTableProps {
  header: BaseTableHeader[];
  shadowed: boolean;
  sortable: boolean;
  data:
    | Array<CatalogItemTable>
    | Array<OrderItemTable>
    | Array<User>
    | Array<BestSellingItem>;
  originalItems?: CatalogItem[];
  emitOptions?: string[];
}

const props = defineProps<BaseTableProps>();

const store = useFilterStore();
const catalogStore = useCatalogStore();

const { sortOrder, searchValue, sortValue } = storeToRefs(store);
const { updateSort } = store;
const { toggleVisibility } = catalogStore;

const filteredItems = computed(() => {
  if (props.data.length) {
    const arr:
      | CatalogItemTable[]
      | OrderItemTable[]
      | User[]
      | BestSellingItem[] = props.data;
    return (
      arr as Array<CatalogItemTable | OrderItemTable | User | BestSellingItem>
    ).filter((item) => {
      return item.id
        .toString()
        .toLowerCase()
        .includes(searchValue.value.toLowerCase());
    });
  } else return [];
});

const sortedItems = computed(() => {
  const val = sortValue.value;
  const order = sortOrder.value;

  if (val === "default") {
    return filteredItems.value;
  } else {
    if (order === true) {
      return [
        ...filteredItems.value.sort((a: BaseItem, b: BaseItem) => {
          if ((a[val as keyof BaseItem] as unknown as string) === "") return +1;
          else if ((b[val as keyof BaseItem] as unknown as string) === "")
            return -1;
          else {
            if (
              typeof a[val as keyof BaseItem] === "number" &&
              typeof b[val as keyof BaseItem] === "number"
            ) {
              return a[val as keyof BaseItem] - b[val as keyof BaseItem];
            } else if (
              typeof a[val as keyof BaseItem] === "object" &&
              typeof b[val as keyof BaseItem] === "object"
            ) {
              const aDate = new Date(a[val as keyof BaseItem]);
              const bDate = new Date(b[val as keyof BaseItem]);
              return aDate.getTime() - bDate.getTime();
            } else {
              return a[val as keyof BaseItem]
                .toString()
                .localeCompare(b[val as keyof BaseItem].toString());
            }
          }
        }),
      ];
    } else {
      return [
        ...filteredItems.value.sort((a: BaseItem, b: BaseItem) => {
          if ((a[val as keyof BaseItem] as unknown as string) === "") return +1;
          if ((b[val as keyof BaseItem] as unknown as string) === "") return -1;
          else {
            if (
              typeof a[val as keyof BaseItem] === "number" &&
              typeof b[val as keyof BaseItem] === "number"
            ) {
              return b[val as keyof BaseItem] - a[val as keyof BaseItem];
            } else if (
              typeof a[val as keyof BaseItem] === "object" &&
              typeof b[val as keyof BaseItem] === "object"
            ) {
              const aDate = new Date(a[val as keyof BaseItem]);
              const bDate = new Date(b[val as keyof BaseItem]);
              return bDate.getTime() - aDate.getTime();
            } else {
              return b[val as keyof BaseItem]
                .toString()
                .localeCompare(a[val as keyof BaseItem].toString());
            }
          }
        }),
      ];
    }
  }
});
</script>

<style scoped lang="css">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

.table {
  @apply w-full min-w-full border-collapse border-spacing-2 border py-5 px-3 bg-white border border-white rounded-lg;
}

.table_shadowed {
  @apply shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)];
}

.table__image {
  @apply w-16 h-12 overflow-hidden flex justify-center items-center;
}

.table__icon {
  @apply text-neutral-900 w-[25px] h-[25px] cursor-pointer duration-100 hover:scale-[1.1];
}

.table__select {
  @apply h-12 bg-white border rounded-none px-3;
}

.table-enter-active,
.table-leave-active {
  transition: opacity 0.1s ease;
}

.table-enter-active {
  transition-delay: 0.15s;
}

.table-enter-from,
.table-leave-to {
  opacity: 0.5;
}
</style>
