"use client";

import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import css from "./page.module.css";
import { Toaster } from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import EmptyState from "@/components/EmptyState/EmptyState";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Link from "next/link";

interface NotesClientProps {
  initialNotes: Note[];
  initialPage: number;
  totalPages: number;
  initialTag?: string;
}
export default function NotesClient({
  initialNotes,
  initialPage,
  totalPages: initialTotalPages,
  initialTag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const tag = initialTag;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, tag]);

  const { data, isPending, isError, error } = useQuery<
    { notes: Note[]; totalPages: number },
    Error
  >({
    queryKey: ["notes", currentPage, debouncedSearchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        searchQuery: debouncedSearchQuery || undefined,
        tag,
      }),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === initialPage && !debouncedSearchQuery
        ? { notes: initialNotes, totalPages: initialTotalPages }
        : undefined,
  });

  const totalPages = data?.totalPages || 1;
  const notes = data?.notes || [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      {isPending && (
        <div className={css.loaderContainer}>
          <PulseLoader
            color="#4bc5af"
            cssOverride={{}}
            margin={6}
            size={10}
            speedMultiplier={1.5}
          />
        </div>
      )}
      {isError && <ErrorMessage message={error.message} />}
      {!isPending && !isError && notes.length === 0 && (
        <EmptyState
          message={
            debouncedSearchQuery
              ? `No notes found for "${debouncedSearchQuery}". Try a different search!`
              : "You don't have any notes yet. Create one!"
          }
        />
      )}
      {!isPending && !isError && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
