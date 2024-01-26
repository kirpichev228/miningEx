export function toastHandler(error: string) {
  switch (error) {
    case "no-permission":
      return {
        toast: "showErrorToast",
        message: "You don't have permission to access this page",
      };
      break;
    case "not-authorized":
      return {
        toast: "showErrorToast",
        message: "You are not authorized! Please log in",
      };
      break;
    case "add-to-cart":
      return {
        toast: "showSuccessToast",
        message: "Item added to cart!",
      };
      break;
    case "add-review-success":
      return {
        toast: "showSuccessToast",
        message: "You review was submitted!",
      };
      break;
    case "add-review-error":
      return {
        toast: "showErrorToast",
        message: "Error! Unable to submit your review",
      };
      break;
    case "order-confirmation-success":
      return {
        toast: "showSuccessToast",
        message: "Order confirmed!",
      };
      break;
    case "order-confirmation-error":
      return {
        toast: "showSuccessToast",
        message: "Error! Unable to confirm your order!",
      };
      break;
    case "invalid-email":
      return {
        toast: "showErrorToast",
        message: "Incorrect email or password!",
      };
      break;
    case "user-not-found":
      return {
        toast: "showErrorToast",
        message: "No user with such email was found!",
      };
      break;
    case "wrong-password":
      return { toast: "showErrorToast", message: "Incorrect password!" };
      break;
    case "email-already-in-use":
      return {
        toast: "showErrorToast",
        message: "Email already in use!",
      };
      break;
    case "item-delete-success":
      return {
        toast: "showSuccessToast",
        message: "Item deleted!",
      };
      break;
    case "item-delete-error":
      return {
        toast: "showErrorToast",
        message: "Error! Cannot delete selected item",
      };
    case "item-update-success":
      return {
        toast: "showSuccessToast",
        message: "Item updated!",
      };
      break;
    case "item-update-error":
      return {
        toast: "showErrorToast",
        message: "Error! Cannot update selected item",
      };
      break;
    case "upload-to-storage-error":
      return {
        toast: "showErrorToast",
        message: "Error! Unable upload image to storage",
      };
      break;
    case "empty-form-fields":
      return {
        toast: "showErrorToast",
        message: "Error! Please fill all necessary form fields!",
      };
      break;
    case "add-to-database":
      return {
        toast: "showSuccessToast",
        message: "Item added to database!",
      };
      break;
    case "delete-from-database":
      return {
        toast: "showErrorToast",
        message: "Item deleted from database!",
      };
      break;
    case "item-visible":
      return {
        toast: "showSuccessToast",
        message: "Item visible!",
      };
      break;
    case "item-hidden":
      return {
        toast: "showSuccessToast",
        message: "Item hidden!",
      };
      break;
    case "item-not-found":
      return {
        toast: "showErrorToast",
        message: "Error! Requested item does not exist",
      };
      break;
    case "status-update-error":
      return {
        toast: "showErrorToast",
        message: "Error! Cannot change order status",
      };
      break;
    case "status-update-success":
      return {
        toast: "showErrorToast",
        message: "Order status changed!",
      };
      break;
    case "registration-failed":
      return {
        toast: "showErrorToast",
        message: "Error! Registration failed",
      };
      break;
    case "registration-successful":
      return {
        toast: "showSuccessToast",
        message: "You are registered!",
      };
      break;
    case "login-failed":
      return {
        toast: "showErrorToast",
        message: "Error! Unable to log in",
      };
      break;
    case "cart-empty":
      return {
        toast: "showErrorToast",
        message: "Error! Unable to fetch cart items",
      };
      break;
    default:
      return {
        toast: "showErrorToast",
        message: "An error occured! Please try again",
      };
      break;
  }
}
