import React, { useState } from "react";
import styles from "./DataTable.module.scss";
import { TableColumn, TableProps, SortType } from "../../types/TableTypes";
import noSort from "../../assets/images/noSort.png";
import ascSort from "../../assets/images/ascSort.png";
import descSort from "../../assets/images/descSort.png";

const DataTable = ({ columns, data, defaultSortField }: TableProps) => {
  const [sort, setSort] = useState<{
    key: string;
    direction: "asc" | "desc";
    sortType: SortType;
  } | null>(
    defaultSortField
      ? {
          key: defaultSortField,
          direction: "asc",
          sortType:
            columns.find((col) => col.key === defaultSortField)?.sortType ||
            "string",
        }
      : null,
  );

  const handleSort = (col: TableColumn) => {
    setSort((prev) => {
      if (prev?.key === col.key) {
        return {
          key: prev.key,
          direction: prev.direction === "asc" ? "desc" : "asc",
          sortType: prev.sortType,
        };
      }
      return {
        key: col.key,
        direction: "asc",
        sortType: col.sortType || "string",
      };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sort) return 0;
    const aValue = a[sort.key];
    const bValue = b[sort.key];
    let result = 0;
    if (sort.sortType === "number") {
      result = Number(aValue) - Number(bValue);
    } else if (sort.sortType === "string") {
      result = String(aValue).localeCompare(String(bValue));
    } else if (sort.sortType === "date") {
      result = new Date(aValue).getTime() - new Date(bValue).getTime();
    }
    return sort.direction === "asc" ? result : -result;
  });
  return (
    <table className={styles.table}>
      <thead>
        {columns.map((col) => (
          <th
            className={col.sortable ? styles.sortable : ""}
            key={col.key}
            onClick={() => col.sortable && handleSort(col)}
          >
            {col.sortable &&
              (sort?.key === col.key ? (
                sort.direction === "asc" ? (
                  <img
                    src={ascSort}
                    alt="Asscending Sort"
                    className={styles.sortIcon}
                  />
                ) : (
                  <img
                    src={descSort}
                    alt="Descending Sort"
                    className={styles.sortIcon}
                  />
                )
              ) : (
                <img src={noSort} alt="Sort Icon" className={styles.sortIcon} />
              ))}
            {col.label}
          </th>
        ))}
      </thead>

      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key}>{col.cell ? col.cell(row) : row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
