import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const { notes, totalPages } = await fetchNotes({ page: 1, tag });

  return (
    <NotesClient
      initialNotes={notes}
      initialPage={1}
      totalPages={totalPages}
      initialTag={tag}
    />
  );
};

export default NotesPage;
