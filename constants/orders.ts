export const ORDERS_HEADER = [
  {
    label: "№",
    value: "id",
    type: "plain",
  },
  {
    label: "Date",
    value: "created_at",
    type: "date",
  },
  {
    label: "User",
    value: "user",
    type: "plain",
  },
  {
    label: "Total",
    value: "total",
    type: "plain",
  },
  {
    label: "Status",
    value: "status",
    type: "select",
    options: ["Pending", "Completed", "Cancelled"],
    action: "updateOrderStatus",
  },
];
