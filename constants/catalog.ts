export const CATALOG_HEADER = [
  {
    label: "ID",
    value: "id",
    type: "plain",
  },
  {
    label: "Name",
    value: "name",
    type: "plain",
  },
  {
    label: "Photo",
    value: "photo",
    type: "image",
  },
  {
    label: "Item code",
    value: "item_code",
    type: "plain",
  },
  {
    label: "Date",
    value: "date",
    type: "plain",
  },
  {
    label: "In stock",
    value: "in_stock",
    type: "plain",
  },
  {
    label: "Visibility",
    value: "is_visible",
    type: "toggle",
    action: "toggleVisibility",
  },
  {
    label: "",
    value: "pencil",
    type: "markup",
  },
  {
    label: "",
    value: "x-mark",
    type: "icon",
    action: "deleteItem",
  },
];
