"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { FetchNotesResponse } from "@/types/note";

import { SearchBox } from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import { NoteList } from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search: debouncedSearch }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, { page?: number; search?: string }];
      return fetchNotes({
        page: params.page ?? 1,
        perPage: 12,
        search: params.search ?? "",
      });
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(val: string) => {
            setSearch(val);
            setPage(1); 
          }}
        />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {error && <p>Could not fetch the list of notes. {error.message}</p>}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
