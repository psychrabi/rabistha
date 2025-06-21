import React from "react";

const Pagination = React.memo(({
  perPage,
  total,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  // Calculate start and end record numbers
  const startRecord = (currentPage - 1) * perPage + 1;
  const endRecord = Math.min(currentPage * perPage, total);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-md">
      <div className="flex flex-col items-center px-3 py-3  sm:flex-row sm:justify-between sm:space-y-0 ">
        <div className="-mx-2">
          {pageNumbers.map((number) => (
            <a key={number}
              onClick={(e) => paginate(number, e)}
              href="#"
              className={`${currentPage === number ? "bg-primary" : ""} inline-flex items-center justify-center px-3 py-1 mx-2 text-gray-700 transition-colors duration-300 transform rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
            >
              {number}
            </a>
          ))}
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {total > 0 ? (
            <span>
              <span className="font-medium text-gray-700 dark:text-gray-100">
                {`${startRecord} - ${endRecord}`}
              </span> of {total} records
            </span>
          ) : (
            <span>No records found</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default Pagination;