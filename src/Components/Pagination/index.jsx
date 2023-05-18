import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  currentPage,
  totalCount,
  setCurrentPage,
  setLoading,
}) => {
  const handleSelected = (selection) => {
    setLoading(true);
    const { selected } = selection;
    setCurrentPage({ selected: selected + 1 });
  };
  return (
    <ReactPaginate
      className="flex justify-end pt-3 gap-4 items-center"
      pageCount={Math.ceil(totalCount)}
      pageClassName={
        "cursor-pointer text-sm font-medium text-[#ADB5BD] bg-[#F2F3F4] hover:text-primary-color hover:bg-[#DF8D6233] rounded-[5px] items-center py-2 dark:hover:bg-primary-color dark:hover:text-placeholder-color dark:bg-gray-800 dark:text-placeholder-color "
      }
      pageLinkClassName={"px-4 py-2"}
      activeClassName="text-primary-color bg-[#DF8D6233] dark:bg-primary-color dark:text-placeholder-color"
      onPageChange={handleSelected}
      breakLabel={
        <span
          className={
            "cursor-pointer text-sm font-medium text-[#ADB5BD] bg-[#F2F3F4] hover:text-primary-color hover:bg-[#DF8D6233] rounded-[5px] items-center p-3 dark:hover:bg-primary-color dark:hover:text-placeholder-color dark:hover:text-gray-800 dark:bg-gray-800 dark:text-placeholder-color "
          }
        >
          ...
        </span>
      }
      nextLabel={
        <>
          <FontAwesomeIcon className="rtl:hidden" icon={faChevronRight} />
          <FontAwesomeIcon
            className="hidden rtl:inline-block"
            icon={faChevronLeft}
          />
        </>
      }
      nextLinkClassName={
        "cursor-pointer text-sm font-medium text-[#ADB5BD] bg-[#F2F3F4] hover:text-primary-color hover:bg-[#DF8D6233] rounded-[5px] items-center p-3 dark:hover:bg-primary-color dark:hover:text-placeholder-color dark:hover:text-gray-800 dark:bg-gray-800 dark:text-placeholder-color "
      }
      previousLabel={
        <>
          <FontAwesomeIcon className="rtl:hidden" icon={faChevronLeft} />
          <FontAwesomeIcon
            className="hidden rtl:inline-block"
            icon={faChevronRight}
          />
        </>
      }
      previousLinkClassName={
        "cursor-pointer text-sm font-medium text-[#ADB5BD] bg-[#F2F3F4] hover:text-primary-color hover:bg-[#DF8D6233] rounded-[5px] items-center p-3 dark:hover:bg-primary-color dark:hover:text-placeholder-color dark:bg-gray-800 dark:text-placeholder-color "
      }
      renderOnZeroPageCount={null}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
