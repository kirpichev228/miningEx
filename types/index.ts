export {};

declare global {
  interface User {
    id: number;
    date: Date;
    email: string;
    role: string;
    password: string;
  }

  interface UserInput {
    id: number;
    date: Date;
    email: string;
    role: string;
    cart: never[];
    user_id: string;
    password?: string;
  }

  interface OrderItem {
    id: number;
    amount: number;
  }

  enum OrderStatus {
    Pending = "Pending",
    Completed = "Completed",
    Cancelled = "Cancelled",
  }

  interface RatingBreakdown {
    overall: number;
    value: number;
    quality: number;
    description: number;
  }

  interface Review {
    id: number;
    item_id: number;
    user_id: number;
    author: string | undefined;
    date: Date;
    description: string;
    rating: RatingBreakdown | string;
  }

  interface FormattedReview {
    id: number;
    item_id: number;
    user_id: number;
    author: string | undefined;
    date: Date;
    description: string;
    rating: number | RatingBreakdown;
  }

  interface CatalogItem {
    name: string;
    id: number;
    price: number;
    date: Date | string;
    manufacturer: string;
    photo: string;
    type: string;
    battery_type: string;
    pixels: number;
    max_FPS_video: number;
    max_FPS_photo: number;
    max_sensitivity: number;
    max_resolution: string;
    min_sensitivity: number;
    wi_fi: boolean;
    card_support: string;
    matrix_type: string;
    matrix_size: string;
    popularity: number;
    rating: number;
    warranty: number;
    in_stock: number;
    item_code: number;
    is_visible: boolean;
    reviews: Review[];
    amount?: number;
    discounts: null | {
      discount_number: number;
    };
  }

  interface BestSellingItem {
    id: number;
    name: string;
    price: number;
    photo: string;
    item_code: number;
    items_sold: number;
    total_revenue: number;
  }

  interface Discount {
    id: number;
    date_start: Date;
    date_end: Date;
    discount_number: string;
    is_active?: boolean;
  }

  type DiscountInput = Pick<
    Discount,
    "date_start" | "date_end" | "discount_number"
  >;

  type CatalogItemTable = Pick<
    CatalogItem,
    "id" | "name" | "photo" | "item_code" | "date" | "in_stock" | "is_visible"
  >;

  interface Order {
    id: number;
    created_at: Date;
    items: CatalogItem[];
    userId: string;
    user: string;
    total: number;
    status: OrderStatus;
  }

  type FormValues = DiscountInput | CatalogItem | UserInput | Order;

  type OrderItemTable = Pick<
    Order,
    "id" | "created_at" | "user" | "total" | "status"
  >;

  interface SelectOption {
    label: string | number;
    selected: boolean;
  }

  interface SelectedOptions {
    manufacturer: string[];
    type: string[];
    matrix_type: string[];
    matrix_size: string[];
    pixels: string[];
  }

  interface BaseAddModalForm {
    name: string;
    dataType: string;
    elType: string;
    default: string;
    placeholder: string;
    options?: Boolean[];
    endpoint?: string;
  }

  interface SelectedItemTabs {
    description: string;
    reviews: string;
  }

  interface CartDBItem {
    item: CatalogItem;
    amount: number;
  }

  interface CartItem extends CatalogItem {
    total?: number;
    amount?: number;
  }

  interface EditorObject {
    [key: string]: undefined | number | string | boolean | EditorObject;
  }

  interface EditorDesign {
    body: EditorObject;
    counters: {
      u_rows: number;
      u_columns: number;
    };
    schemaVersion: number;
  }

  interface EditorIframe {
    callbackId: number;
    callbacks: () => {}[];
    destroy: () => {};
    id: number;
    iframe: HTMLIFrameElement;
    onWindowMessage: (e: Event) => {};
    ready: boolean;
  }

  interface EmailEditorData {
    amp: EditorObject;
    chunks: EditorObject;
    design: EditorObject;
    html: string;
  }

  interface EmailEditor {
    editor: {
      frame: EditorIframe;
      saveDesign: (e: (e: EditorDesign) => void) => void;
      loadDesign: (e: EditorDesign | null) => void;
      exportHtml: (html: (e: EmailEditorData) => void) => void;
    };
    appearance: undefined | string;
    editorId: undefined | string;
    projectId: undefined | string;
    id: undefined | string;
    exportHtml: () => {};
    loadDesign: () => {};
    loadEditor: () => {};
    saveDesign: () => {};
    locale: undefined | string;
    minHeight: undefined | string;
    tools: undefined | string;
  }

  interface DataSet {
    backgroundColor: string[];
    data: number[];
    label?: string;
  }

  interface ChartData {
    labels: Array<string>;
    datasets: Array<DataSet>;
  }

  interface BaseTableHeader {
    label: string;
    value: string;
    type: string;
    action?: string;
    options?: string[];
  }

  interface ValueElement {
    name: string;
    value: string;
  }

  type KeysOfUnion<T> = T extends T ? keyof T : never;

  type BaseItem = CatalogItemTable | OrderItemTable | User;

  type AvailableKeys = KeysOfUnion<BaseItem>;
}
