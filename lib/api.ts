import axios from "axios";
import type { Note, NoteFormValues } from "../types/note";

type FetchNotesParams = {
  page: number;
  searchQuery?: string;
  perPage?: number;
  tag?: string;
};

interface Params {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

interface ApiResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const getAuthToken = (): string => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) {
    throw new Error("Authorization token is missing.");
  }
  return token;
};
export const fetchNotes = async ({
  page = 1,
  searchQuery,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<ApiResponse> => {
  const trimmedSearch = searchQuery?.trim();
  const trimmedTag = tag?.trim();

  const params: Params = {
    page,
    perPage,
    ...(trimmedSearch && { search: trimmedSearch }),
    ...(trimmedTag && { tag: trimmedTag }),
  };

  try {
    const response = await axios.get<ApiResponse>(`/notes`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`/notes`, newNote, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export const deleteNote = async (id: number): Promise<Note> => {
  try {
    const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch note with id ${id}:`, error);
    throw error;
  }
};
