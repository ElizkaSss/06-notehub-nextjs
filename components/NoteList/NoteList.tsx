"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import { NoteItem } from "@/components/NoteItem/NoteItem";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  const qc = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      alert("Failed to delete note");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <NoteItem
          key={n.id}
          note={n}
          onDelete={(id: string) => deleteMutation.mutate(id)}
        />
      ))}
    </ul>
  );
};
