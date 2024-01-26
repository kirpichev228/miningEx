export const checkFormFields = (values: FormValues) => {
  for (const key in values) {
    if ((values[key as keyof FormValues] as string) === "") {
      return false;
    }
  }
  return true;
};
