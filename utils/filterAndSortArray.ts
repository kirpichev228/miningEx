export function filterAndSortArray(
  arrayInput: any[],
  searchValue: string,
  sortValue: string,
  sortOrder: boolean
) {
  const filteredArray = [
    ...arrayInput.filter((item: any) => {
      return item.id
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    }),
  ];

  let sortedArray = [];

  const val = sortValue;
  const order = sortOrder;
  if (val === "default") {
    sortedArray = [...filteredArray];
  } else {
    if (order === true) {
      sortedArray = [
        ...filteredArray.sort((a: any, b: any) => {
          if (a[val as keyof any] === "") return +1;
          if (b[val as keyof any] === "") return -1;
          else return a[val as keyof any].localeCompare(b[val as keyof any]);
        }),
      ];
    } else {
      sortedArray = [
        ...filteredArray.sort((a: any, b: any) => {
          if (a[val as keyof any] === "") return +1;
          if (b[val as keyof any] === "") return -1;
          else return b[val as keyof any].localeCompare(a[val as keyof any]);
        }),
      ];
    }
  }

  return sortedArray;
}
