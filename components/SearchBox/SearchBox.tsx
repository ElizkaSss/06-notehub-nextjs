import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
