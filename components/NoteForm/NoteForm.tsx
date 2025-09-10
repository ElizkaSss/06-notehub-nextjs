"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { Tag } from "@/types/note";
import css from "./NoteForm.module.css";

export const NoteForm = ({ onClose }: { onClose?: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Tag>("Todo");

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createNote({ title, content, tag }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      onClose?.();
    },
    onError: () => alert("Failed to create note"),
  });

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Title required");
        mutation.mutate();
      }}
    >
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Tag
        <select value={tag} onChange={(e) => setTag(e.target.value as Tag)}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>
      <div className={css.actions}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
        <button type="button" onClick={() => onClose?.()}>
          Cancel
        </button>
      </div>
    </form>
  );
};
