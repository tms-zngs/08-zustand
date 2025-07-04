import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import toast from "react-hot-toast";
import { deleteNote } from "../../lib/api";
import { useState } from "react";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onMutate: (id: number) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      toast.success("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setDeletingId(null);
    },
    onError: () => {
      toast.error("Failed to delete note");
      setDeletingId(null);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.details} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutate(note.id)}
              disabled={isPending && deletingId === note.id}
            >
              {isPending && deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
