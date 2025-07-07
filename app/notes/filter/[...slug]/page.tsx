import { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const { notes } = await fetchNotes({ page: 1, tag });

  const topNoteTitle = notes[0]?.tag || "All Notes";

  return {
    title: `(${topNoteTitle}) - NoteHub`,
    description: `Notes with tag - ${topNoteTitle}`,
    openGraph: {
      title: `NoteHub`,
      description: `Page with notes tagged ${topNoteTitle ?? "all"}`,
      url: `https://08-zustand-alpha.vercel.app/notes/filter/${topNoteTitle}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub App image",
        },
      ],
      locale: "en-US",
      type: "website",
    },
  };
}

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
