export type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  sortType?: SortType;
  cell?: (value: any) => React.ReactNode;
};
export type TableProps = {
  columns: TableColumn[];
  data: any[];
  defaultSortField?: string;
};

export type SortType = "string" | "number" | "date";
