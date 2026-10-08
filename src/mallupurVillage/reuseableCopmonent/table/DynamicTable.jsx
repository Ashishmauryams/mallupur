import React, { useEffect, useState } from "react";
import {
    Eye,
    Trash2,
    Search,
    Loader2,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
} from "lucide-react";

import "./DynamicTable.scss";
import Loader from "../loader/Loader";

const DynamicTable = ({
    // ================= DATA =================
    data = [],
    columns = [],

    // ================= TABLE HEADER =================
    tableTitle = "Data Table",
    tableSubtitle = "",
    showRecordCount = true,

    // ================= FILTER =================
    filters = [],
    filterValues = {},
    onFilterChange,
    onFilterApply,
    onClear = {},

    // ================= ACTIONS =================
    onView,
    onDelete,

    // ================= LOADING =================
    loading = false,
    deleteLoading = null,

    // ================= OTHER =================
    emptyMessage = "No data found",
    showActions = true,

    // ================= PAGINATION =================
    pageSize = 5,
    showPagination = true,
}) => {

    // =================================================
    // PAGINATION STATE
    // =================================================

    const [currentPage, setCurrentPage] = useState(1);


    // =================================================
    // FILTER FUNCTIONS
    // =================================================

    const handleFilterChange = (key, value) => {

        if (onFilterChange) {
            onFilterChange(key, value);
        }

    };

    const normalizedData = Array.isArray(data)
        ? data
        : data
            ? [data]
            : [];


    const handleFilterApply = () => {

        if (onFilterApply) {
            onFilterApply(filterValues);
        }

        // Search/filter ke baad page 1 par chale jayenge
        setCurrentPage(1);

    };


    const handleKeyDown = (event) => {

        if (event.key === "Enter") {
            handleFilterApply();
        }

    };


    // =================================================
    // PAGINATION
    // =================================================

    const totalPages = Math.ceil(normalizedData?.length / pageSize);


    const startIndex = (currentPage - 1) * pageSize;


    const endIndex = startIndex + pageSize;


    const currentData = normalizedData?.slice(
        startIndex,
        endIndex
    );


    // =================================================
    // DATA CHANGE HONE PAR PAGE RESET
    // =================================================

    useEffect(() => {

        /*
         * Agar filter/search ke baad data kam ho gaya
         * aur current page exist nahi karta,
         * to page 1 par chale jayenge.
         */

        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }

        if (normalizedData.length === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }

    }, [normalizedData.length, totalPages, currentPage]);


    // =================================================
    // PAGE CHANGE
    // =================================================

    const handlePrevious = () => {

        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }

    };


    const handleNext = () => {

        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }

    };


    const handlePageChange = (page) => {

        setCurrentPage(page);

    };


    // =================================================
    // RENDER
    // =================================================

    return (

        <section className="dynamic-table">

            {/* ================= TABLE HEADER ================= */}
            <div className="dynamic-table__header">

                <div className="dynamic-table__heading">
                    <h2>{tableTitle}</h2>

                    {tableSubtitle && (
                        <p>{tableSubtitle}</p>
                    )}
                </div>

                {showRecordCount && !loading && (
                    <div className="dynamic-table__count">
                        <span>{normalizedData?.length}</span>
                        <small>
                            {normalizedData?.length === 1 ? "Record" : "Records"}
                        </small>
                    </div>
                )}

            </div>

            {/* =================================================
                FILTERS
            ================================================= */}

            {filters?.length > 0 && (

                <div className="dynamic-table__filters">

                    {filters?.map((filter) => (

                        <div
                            className="dynamic-table__filter"
                            key={filter?.key}
                        >

                            <label htmlFor={filter?.key}>
                                {filter?.label}
                            </label>


                            <div className="dynamic-table__filter-control">

                                {/* ================= SEARCH ================= */}

                                {filter?.type === "search" && (
                                    <>
                                        <Search size={18} />

                                        <input
                                            id={filter?.key}
                                            type="text"
                                            placeholder={
                                                filter?.placeholder ||
                                                `Search ${filter?.label}...`
                                            }
                                            value={
                                                filterValues[filter?.key] || ""
                                            }
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    filter?.key,
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={handleKeyDown}
                                        />

                                        <button
                                            type="button"
                                            onClick={handleFilterApply}
                                        >
                                            Search
                                        </button>

                                        <button
                                            type="button"
                                            onClick={onClear}
                                        >
                                            <RefreshCw style={{marginTop:"3px"}}/>
                                        </button>
                                    </>
                                )}


                                {/* ================= TEXT ================= */}

                                {filter.type === "text" && (

                                    <input
                                        id={filter?.key}
                                        type="text"
                                        placeholder={
                                            filter?.placeholder || ""
                                        }
                                        value={
                                            filterValues[filter?.key] || ""
                                        }
                                        onChange={(e) =>
                                            handleFilterChange(
                                                filter?.key,
                                                e.target.value
                                            )
                                        }
                                    />

                                )}


                                {/* ================= SELECT ================= */}

                                {filter?.type === "select" && (

                                    <select
                                        id={filter?.key}
                                        value={
                                            filterValues[filter?.key] || ""
                                        }
                                        onChange={(e) =>
                                            handleFilterChange(
                                                filter?.key,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            {filter?.placeholder ||
                                                `Select ${filter?.label}`}
                                        </option>


                                        {filter?.options?.map((option) => (

                                            <option
                                                key={option?.value}
                                                value={option?.value}
                                            >
                                                {option?.label}
                                            </option>

                                        ))}

                                    </select>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="dynamic-table__wrapper">

                <table className="dynamic-table__table">

                    {/* ================= TABLE HEADER ================= */}

                    <thead>

                        <tr>

                            {columns?.map((column) => (

                                <th key={column?.key}>
                                    {column?.label}
                                </th>

                            ))}


                            {showActions && (

                                <th className="dynamic-table__actions-heading">
                                    Actions
                                </th>

                            )}

                        </tr>

                    </thead>


                    {/* ================= TABLE BODY ================= */}

                    <tbody>

                        {/* =================================================
                            LOADING
                        ================================================= */}

                        {loading && (

                            <tr>

                                <td
                                    colSpan={
                                        columns?.length +
                                        (showActions ? 1 : 0)
                                    }
                                >

                                    <div className="dynamic-table__loading">
                                        <Loader />
                                        <span>
                                            Loading...
                                        </span>

                                    </div>

                                </td>

                            </tr>

                        )}


                        {/* =================================================
                            EMPTY
                        ================================================= */}

                        {!loading && normalizedData?.length === 0 && (

                            <tr>

                                <td
                                    colSpan={
                                        columns?.length +
                                        (showActions ? 1 : 0)
                                    }
                                >

                                    <div className="dynamic-table__empty">
                                        {emptyMessage}
                                    </div>

                                </td>

                            </tr>

                        )}


                        {/* =================================================
                            DATA
                        ================================================= */}

                        {!loading &&
                            currentData?.map((item) => (

                                <tr key={item?.id}>

                                    {/* ================= COLUMNS ================= */}

                                    {columns?.map((column) => (

                                        <td key={column?.key}>

                                            {column?.render
                                                ? column?.render(item)
                                                : item[column?.key] ?? "-"}

                                        </td>

                                    ))}


                                    {/* ================= ACTIONS ================= */}

                                    {showActions && (

                                        <td>

                                            <div className="dynamic-table__actions">

                                                {/* ================= VIEW ================= */}

                                                {onView && (

                                                    <button
                                                        type="button"
                                                        className="
                                                            dynamic-table__action
                                                            dynamic-table__action--view
                                                        "
                                                        onClick={() =>
                                                            onView(item?.id)
                                                        }
                                                        title="View"
                                                    >

                                                        <Eye size={17} />

                                                    </button>

                                                )}


                                                {/* ================= DELETE ================= */}

                                                {onDelete && (

                                                    <button
                                                        type="button"
                                                        className="
                                                            dynamic-table__action
                                                            dynamic-table__action--delete
                                                        "
                                                        onClick={() =>
                                                            onDelete(item?.id)
                                                        }
                                                        disabled={
                                                            deleteLoading ===
                                                            item?.id
                                                        }
                                                        title="Delete"
                                                    >

                                                        {deleteLoading ===
                                                            item?.id ? (

                                                            <Loader2
                                                                size={17}
                                                                className="dynamic-table__loader"
                                                            />

                                                        ) : (

                                                            <Trash2
                                                                size={17}
                                                            />

                                                        )}

                                                    </button>

                                                )}

                                            </div>

                                        </td>

                                    )}

                                </tr>

                            ))}

                    </tbody>

                </table>


                {/* =================================================
                    PAGINATION
                ================================================= */}

                {showPagination &&
                    !loading &&
                    normalizedData?.length > 0 &&
                    totalPages > 1 && (

                        <div className="dynamic-table__pagination">

                            {/* ================= PREVIOUS ================= */}

                            <button
                                type="button"
                                className="dynamic-table__pagination-btn"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                title="Previous"
                            >

                                <ChevronLeft size={18} />

                                <span>
                                    Previous
                                </span>

                            </button>


                            {/* ================= PAGE NUMBERS ================= */}

                            <div className="dynamic-table__pages">

                                {Array?.from(
                                    {
                                        length: totalPages,
                                    },
                                    (_, index) => index + 1
                                ).map((page) => (

                                    <button
                                        key={page}
                                        type="button"
                                        className={`
                                            dynamic-table__page
                                            ${currentPage === page
                                                ? "active"
                                                : ""
                                            }
                                        `}
                                        onClick={() =>
                                            handlePageChange(page)
                                        }
                                    >

                                        {page}

                                    </button>

                                ))}

                            </div>


                            {/* ================= NEXT ================= */}

                            <button
                                type="button"
                                className="dynamic-table__pagination-btn"
                                onClick={handleNext}
                                disabled={
                                    currentPage === totalPages
                                }
                                title="Next"
                            >

                                <span>
                                    Next
                                </span>

                                <ChevronRight size={18} />

                            </button>

                        </div>

                    )}

            </div>

        </section>

    );
};

export default DynamicTable;