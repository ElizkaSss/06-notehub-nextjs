import css from "./Pagination.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={css.wrap}>
      {pages.map((p) => (
        <button
          key={p}
          className={p === currentPage ? css.active : css.page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};
