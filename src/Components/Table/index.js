import { matchSorter } from "match-sorter";
import React from "react";

import Table from "react-bootstrap/Table";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
// import BothSort from "../../Asset/Images/Icons/bothSort.svg";
// import SortDown from "../../Asset/Images/Icons/sortDown.svg";
// import SortUp from "../../Asset/Images/Icons/sortUp.svg";
import { useSticky } from "react-table-sticky";
// import noRecordFound from "../../Asset/Images/Other/no-record-found.svg";
import Skeleton from "react-loading-skeleton";
// import { HandleSetFilterValues } from "../../Services/CommonServices";
// import { ENUMS } from "../../Constants";

// Define a default UI for filtering
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
        <input
            className="table-search form-control"
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function TableComponent({ columns, data, isData }) {
    const [HandleAscDesc, setHandleAscDesc] = React.useState([]);
    const [handleTypedFilter, setHandleTypedFilter] = React.useState([]);
    const [updateFilters, setUYpdateFilters] = React.useState(1);

    if (isData === undefined || isData === null) {
        isData = true;
    }
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    // const handleColumnFilter = (columnData) => {
    //     // Single Tab Filter Logic Start
    //     let getFilterPage;
    //     let getFilterPageName;
    //     ENUMS.filtersPageList.map((itm) => {
    //         if (localStorage.getItem(itm)) {
    //             getFilterPageName = itm;
    //             getFilterPage = JSON.parse(localStorage.getItem(itm));
    //         }
    //     });

    //     if (getFilterPage?.activeTab !== undefined && getFilterPage?.activeTab !== null) {
    //         // Multi Tab Filter set column sort wise Logic start :
    //         handleColumnSortFilter(getFilterPage, getFilterPageName, columnData);
    //     } else {
    //         let tempAry = [];
    //         if (columnData.isSorted === true) {
    //             if (columnData.isSortedDesc === true) {
    //                 tempAry.push({ id: "", desc: columnData.isSortedDesc });
    //                 localStorage.setItem("tableSelectedFilterID", "");
    //                 localStorage.setItem("tableSelectedFilterTobe", "");
    //             } else {
    //                 tempAry.push({ id: columnData.id, desc: columnData.isSorted });
    //                 localStorage.setItem("tableSelectedFilterID", columnData.id);
    //                 localStorage.setItem("tableSelectedFilterTobe", columnData.isSorted);
    //             }
    //         } else {
    //             tempAry.push({ id: columnData.id, desc: columnData.isSorted });
    //             localStorage.setItem("tableSelectedFilterID", columnData.id);
    //             localStorage.setItem("tableSelectedFilterTobe", columnData.isSorted);
    //         }

    //         getFilterPage = {
    //             ...getFilterPage,
    //             ["isSort"]: tempAry,
    //         };
    //         localStorage.setItem(getFilterPageName, JSON.stringify(getFilterPage));
    //         setHandleAscDesc(tempAry);
    //     }
    //     // Single Tab Filter Logic End
    // };

    // function handleColumnSortFilter(activeTabData, getFilterPageName, columnData) {
    //     let resultObj = {};
    //     Object.keys(activeTabData).forEach((obj) => {
    //         if (obj !== "activeTab") {
    //             if (Object.keys(activeTabData[obj]).length) {
    //                 if (activeTabData.activeTab === activeTabData[obj].pageName) {
    //                     resultObj = activeTabData[obj];
    //                 }
    //             }
    //         }
    //     });

    //     let tempAry = [];
    //     if (columnData.isSorted === true) {
    //         if (columnData.isSortedDesc === true) {
    //             tempAry.push({ id: "", desc: columnData.isSortedDesc });
    //             localStorage.setItem("tableSelectedFilterID", "");
    //             localStorage.setItem("tableSelectedFilterTobe", "");
    //         } else {
    //             tempAry.push({ id: columnData.id, desc: columnData.isSorted });
    //             localStorage.setItem("tableSelectedFilterID", columnData.id);
    //             localStorage.setItem("tableSelectedFilterTobe", columnData.isSorted);
    //         }
    //     } else {
    //         tempAry.push({ id: columnData.id, desc: columnData.isSorted });
    //         localStorage.setItem("tableSelectedFilterID", columnData.id);
    //         localStorage.setItem("tableSelectedFilterTobe", columnData.isSorted);
    //     }

    //     Object.keys(activeTabData).forEach((obj) => {
    //         if (obj !== "activeTab") {
    //             if (Object.keys(activeTabData[obj]).length) {
    //                 if (activeTabData.activeTab === activeTabData[obj].pageName) {
    //                     activeTabData[obj].isSort = tempAry;
    //                 }
    //             }
    //         }
    //     });

    //     localStorage.setItem(getFilterPageName, JSON.stringify(activeTabData));
    //     setHandleAscDesc(tempAry);
    // }

    // React.useEffect(() => {
    //     let FiltersToBeApply;
    //     ENUMS.filtersPageList.map((itm) => {
    //         if (localStorage.getItem(itm)) {
    //             FiltersToBeApply = JSON.parse(localStorage.getItem(itm));
    //         }
    //     });

    //     if (FiltersToBeApply?.activeTab !== undefined && FiltersToBeApply?.activeTab !== null) {
    //         if (window.location.pathname === FiltersToBeApply?.pagePath) {
    //             // Multi Tab Filter set column wise Logic start :
    //             handleMultitabFiltersApply(FiltersToBeApply);
    //         }
    //     } else {
    //         if (window.location.pathname === FiltersToBeApply?.pagePath) {
    //             let tempArray = [];
    //             FiltersToBeApply?.filters?.forEach((obj, i) => {
    //                 const [key, value] = Object.entries(obj);
    //                 let getAllFilter = { id: key[0], value: key[1] };
    //                 tempArray.push(getAllFilter);
    //             });
    //             setHandleTypedFilter(tempArray);
    //             if (FiltersToBeApply?.isSort?.length) {
    //                 if (
    //                     FiltersToBeApply.isSort[0].id !== "" &&
    //                     FiltersToBeApply.isSort[0].id !== null &&
    //                     FiltersToBeApply.isSort[0].desc !== "" &&
    //                     FiltersToBeApply.isSort[0].desc !== null
    //                 ) {
    //                     let tempAry = [];
    //                     tempAry.push({
    //                         id: FiltersToBeApply.isSort[0].id,
    //                         desc: FiltersToBeApply.isSort[0].desc,
    //                     });
    //                     setHandleAscDesc(tempAry);
    //                 }
    //             }
    //         }
    //     }
    // }, [updateFilters, data]);

    function handleMultitabFiltersApply(activeTabData) {
        let resultObj = {};
        Object.keys(activeTabData).forEach((obj) => {
            if (obj !== "activeTab") {
                if (Object.keys(activeTabData[obj]).length) {
                    if (activeTabData.activeTab === activeTabData[obj].pageName) {
                        resultObj = activeTabData[obj];
                    }
                }
            }
        });

        let tempArray = [];
        resultObj?.filters?.forEach((obj, i) => {
            const [key, value] = Object.entries(obj);
            let getAllFilter = { id: key[0], value: key[1] };
            tempArray.push(getAllFilter);
        });
        setHandleTypedFilter(tempArray);
        if (resultObj?.isSort?.length) {
            if (
                resultObj.isSort[0].id !== "" &&
                resultObj.isSort[0].id !== null &&
                resultObj.isSort[0].desc !== "" &&
                resultObj.isSort[0].desc !== null
            ) {
                let tempAry = [];
                tempAry.push({
                    id: resultObj.isSort[0].id,
                    desc: resultObj.isSort[0].desc,
                });
                setHandleAscDesc(tempAry);
            }
        }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: {
                pageIndex: 0,
                pageSize: 30,
                sortBy: HandleAscDesc, // Stay sorting as it is.
                filters: handleTypedFilter ? handleTypedFilter : [], // Stay search as it is.
            },
        },
        useFilters,
        useSortBy,
        usePagination,
        useSticky
    );
    return (
        <>
            <Table responsive className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, keyTr) => (
                        //  <tr>
                        //         <th>
                        //           <div>{column.canFilter ? column.render("Filter") : null}</div>
                        //         </th>
                        //       </tr>
                        <tr {...headerGroup.getHeaderGroupProps()} key={keyTr}>
                            {headerGroup.headers.map((column, keyMain) => (
                                <th
                                    className={column.className}
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={keyMain}
                                >
                                    <span
                                        // onClick={() => handleColumnFilter(column)}
                                        className="d-flex align-items-center"
                                    >
                                        {column.render("Header")}
                                        <span className="text-sort-icon">
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    // <img src={SortDown} alt="" />
                                                    // { "<"}
                                                    <p> {"<"} </p>
                                                ) : (
                                                    // <img src={SortUp} alt="" />
                                                    <p> {">"} </p>
                                                )
                                            ) : (
                                                <p> {"<>"} </p>
                                                // {/* // <img src={BothSort} alt="" /> */}
                                            )}
                                        </span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    {headerGroups.map((headerGroup, keyTr) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={keyTr}>
                            {headerGroup.headers.map((column, keyMain) =>
                                column.Header !== "Action" &&
                                    column.Header !== "Top" &&
                                    column.Header !== "Target" &&
                                    column.Header !== "Growth" ? (
                                    <th
                                        key={keyMain}
                                        onKeyUp={() => {
                                            setUYpdateFilters(updateFilters + 1);
                                            // HandleSetFilterValues(column);
                                            // if (column.filterValue !== undefined) {
                                            //   localStorage.setItem(column.id, column.filterValue);
                                            // } else {
                                            //   localStorage.removeItem(column.id);
                                            // }
                                        }}
                                    >
                                        <div>{column.canFilter ? column.render("Filter") : null}</div>
                                    </th>
                                ) : (
                                    <th key={keyMain}> </th>
                                )
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {isData
                        ? headerGroups.map((headerGroup, keyTr) => (
                            <tr
                                className="Table-Searching-Data"
                                {...headerGroup.getHeaderGroupProps()}
                                key={keyTr}
                            >
                                <td colSpan={headerGroup.headers.length} className="no-bg">
                                    <Skeleton count={10} height={30} />
                                </td>
                            </tr>
                        ))
                        : page.length !== 0
                            ? page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={i}>
                                        {row.cells.map((cell, j) => {
                                            return (
                                                <td
                                                    className={`${row.original.className !== undefined &&
                                                        row.original.className !== null &&
                                                        row.original.className[cell.column.id] !== undefined &&
                                                        row.original.className[cell.column.id] !== null
                                                        ? row.original.className[cell.column.id]
                                                        : ""
                                                        }`}
                                                    {...cell.getCellProps()}
                                                    key={j}
                                                >
                                                    {row.original.controlRender !== undefined &&
                                                        row.original.controlRender !== null &&
                                                        row.original.controlRender[cell.column.id] !== undefined &&
                                                        row.original.controlRender[cell.column.id] !== null
                                                        ? row.original.controlRender[cell.column.id]
                                                        : cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                            : headerGroups.map((headerGroup, keyTr) => (
                                <tr
                                    className="Table-Searching-Data"
                                    {...headerGroup.getHeaderGroupProps()}
                                    key={keyTr}
                                >
                                    <td colSpan={headerGroup.headers.length} className="no-bg">
                                        <div className="noRecordFound">
                                            <img src={"noRecordFound"} alt="" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </Table>
            <div className="pagination">
                <div>
                    <span>
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex">
                    <span className="d-flex align-items-center">
                        <span className="page-num">Page no.</span>
                        <input
                            type="number"
                            onWheel={(event) => {
                                event.target.blur();
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode == "38" || e.keyCode == "40") {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }
                            }}
                            defaultValue={pageIndex + 1}
                            pattern="^[0-9]"
                            min="1"
                            step="1"
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: "100px" }}
                        />
                    </span>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <i className="fa-solid fa-backward"></i>
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa-solid fa-caret-left"></i>
                    </button>

                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <i className="fa-solid fa-forward"></i>
                    </button>
                </div>
            </div>
        </>
    );
}
export default function TableView(props) {
    return (
        <TableComponent isData={props.isData} columns={props.columnsData} data={props.tableData} />
    );
}
