import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      className={css.input}
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
