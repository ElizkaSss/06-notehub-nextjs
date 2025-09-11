import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} 
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={css.wrap}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel="‹"
      nextLabel="›"
      breakLabel="..."
      breakClassName={css.page}
    />
  );
};
