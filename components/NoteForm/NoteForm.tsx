"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { Tag } from "@/types/note";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onClose?: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: Tag;
}

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  content: Yup.string(),
  tag: Yup.mixed<Tag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export const NoteForm = ({ onClose }: NoteFormProps) => {
  const qc = useQueryClient();


  const mutation = useMutation({
    mutationFn: (values: FormValues) => createNote(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      onClose?.();
    },
    onError: () => alert("Failed to create note"),
  });

   const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Todo",
   };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" placeholder="Enter title" />
          <ErrorMessage
            name="title"
            component="div"
            className={css.error}
          />

          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            placeholder="Enter content"
          />
          <ErrorMessage
            name="content"
            component="div"
            className={css.error}
          />

          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage
            name="tag"
            component="div"
            className={css.error}
          />

          <div className={css.actions}>
            <button
              type="submit"
              disabled={isSubmitting || !isValid || mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
            <button type="button" onClick={() => onClose?.()}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};