export const CART_HEADER = [
  {
    label: "Photo",
    value: "photo",
    type: "image",
  },
  {
    label: "Item",
    value: "name",
    type: "plain",
  },
  {
    label: "Price",
    value: "price",
    type: "plain",
  },
  {
    label: "Amount",
    value: "amount",
    type: "number",
    action: "setAmount",
  },
  {
    label: "Total",
    value: "total",
    type: "plain",
  },
  {
    label: "",
    value: "x-mark",
    type: "icon",
    action: "deleteItem",
  },
];
