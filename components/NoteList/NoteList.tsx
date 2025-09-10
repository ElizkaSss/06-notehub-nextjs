import { Note } from "@/types/note";
import { NoteItem } from "@/components/NoteItem/NoteItem";
import css from "./NoteList.module.css";

export const NoteList = ({
  notes,
  onDelete,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
}) => {
  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onDelete={onDelete} />
      ))}
    </ul>
  );
};
