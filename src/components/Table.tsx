import React, { useEffect, useState } from "react";
import { TableProps } from "../Interfaces/table";
import { commonApi } from "../services/api";
import toast from "./toast";

function Table({ headers, data, onEdit = () => { } }: TableProps) {
  const [filterTerm, setFilterTerm] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<string>("");
  const [currentSortDir, setCurrentSortDir] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [showFilter, setshowFilter] = useState<boolean>(false);
  const [filterValues, setFilterValues]: any = useState({});
  const [visibleValues, setVisibleValues]: any = useState([]);

  useEffect(() => {
    console.log("dsf")
    setVisibleValues(['name', 'diet', 'flavour_profile', 'course', 'state', 'region'])

  }, [data, currentSort, currentSortDir, filterValues]);
  const handleSort = (column: string) => {
    if (currentSort === column) {
      setCurrentSortDir(currentSortDir === "asc" ? "desc" : "asc");
    } else {
      setCurrentSort(column);
      setCurrentSortDir("asc");
    }
  };
  const handleFilterChange = (header: string, value: string) => {
    setFilterValues((prevFilterValues: any) => ({
      ...prevFilterValues,
      [header]: value,
    }));
  };

  const sortedAndFilteredData = data
    .filter((row) => {
      // Apply filter based on filterValues
      const columnFilters = headers.every(
        (header) =>
          !filterValues[header] ||
          row[header].toString().toLowerCase().includes(filterValues[header].toLowerCase())
      );
      return columnFilters;
    })
    .sort((a, b) => {
      const modifier = currentSortDir === "desc" ? -1 : 1;
      if (a[currentSort] < b[currentSort]) return -1 * modifier;
      if (a[currentSort] > b[currentSort]) return 1 * modifier;
      return 0;
    });

  const paginatedData = sortedAndFilteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);




  return (
    <div>
      <div className="flex justify-end">
        <button className="filterButton" onClick={() => setshowFilter(!showFilter)}>
          Filter
        </button>
      </div>
      <table className="mt-4 table-fixed w-full border border-solid border-secondary">
        <thead className="rounded-t-lg border-b-2 border-b-[#e9e9e9] border-solid">
          <tr>
            {headers.filter((header) => visibleValues.includes(header)) // Filter only visible keys
              .map((header, index) => (

                <th
                  key={index}
                  onClick={() => handleSort(header)}
                  className="capitalize bg-white cursor-pointer text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0"
                >
                  {header}{" "}
                  {currentSort === header && (
                    <span>{currentSortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {
            showFilter &&
            <tr >
              {headers.filter((header) => visibleValues.includes(header)) // Filter only visible keys
                .map((header, index) => (
                  <td className="p-2">
                    <input
                      key={index}
                      placeholder={`${header}`}
                      value={filterValues[header]}
                      className="inputboxstyling"
                      onChange={(e) => handleFilterChange(header, e.target.value)}
                    />
                  </td>
                ))}
            </tr>
          }

          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} >
                {headers
                  .filter((header) => visibleValues.includes(header))
                  .map((header, columnIndex) => (
                    <td onClick={() => onEdit(row)}
                      key={columnIndex}
                      className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid whitespace-nowrap"
                    >
                      {row[header]}
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="py-4 text-center text-gray-500">
                No items match the filter
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>Items per page:</span>{" "}
          <select
            className="inputboxstyling"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src={`${process.env.PUBLIC_URL}/leftArrow.svg`}
            alt="Left Arrow"
            className="h-8 w-8"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />

          <span>{currentPage}</span>
          <img
            src={`${process.env.PUBLIC_URL}/rightArrow.svg`}
            alt="Left Arrow"
            className="h-8 w-8"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(data.length / pageSize))
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Table;

