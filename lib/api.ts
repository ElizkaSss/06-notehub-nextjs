import axios from "axios";
import {
  Note,
  CreateNoteDto,
  FetchNotesParams,
  FetchNotesResponse,
} from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;
  const resp = await axiosInstance.get<FetchNotesResponse>("", {
    params: { page, perPage, search },
  });
  return resp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const resp = await axiosInstance.get<Note>(`/${id}`);
  return resp.data;
};

export const createNote = async (payload: CreateNoteDto): Promise<Note> => {
  const resp = await axiosInstance.post<Note>("", payload);
  return resp.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
  const resp = await axiosInstance.delete<Note>(`/${id}`);
  return resp.data;
};
