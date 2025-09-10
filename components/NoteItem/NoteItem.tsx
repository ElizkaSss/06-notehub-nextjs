import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";

export const NoteItem = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: string) => void;
}) => {
  return (
    <li className={css.item}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      <div className={css.actions}>
        <Link href={`/notes/${note.id}`}>View details</Link>
        <button className={css.delete} onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};
