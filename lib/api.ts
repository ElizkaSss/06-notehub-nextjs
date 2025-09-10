import axios from "axios";
import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

// Тип для створення нотатки
export interface CreateNoteDto {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const API_URL = "https://notehub-public.goit.study/api/notes";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// Отримання списку нотаток
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>("", {
    params: { page, perPage, search },
  });
  return response.data;
};

// Отримання однієї нотатки за id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/${id}`);
  return response.data;
};

// Створення нотатки
export const createNote = async (payload: CreateNoteDto): Promise<Note> => {
  const resp = await axiosInstance.post<Note>("", payload);
  return resp.data;
};

// Видалення нотатки
export const deleteNote = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
