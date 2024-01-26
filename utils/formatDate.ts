export const formatDate = (date: Date) => {
  const myDate = new Date(date);
  return (
    ("0" + myDate.getDate()).slice(-2) +
    "." +
    ("0" + (myDate.getMonth() + 1)).slice(-2) +
    "." +
    myDate.getFullYear() +
    " " +
    ("0" + myDate.getHours()).slice(-2) +
    ":" +
    ("0" + myDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + myDate.getSeconds()).slice(-2)
  );
};
