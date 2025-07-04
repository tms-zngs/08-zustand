import SidebarNotes from "@/components/Sidebar/SidebarNotes";

const tags: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function Sidebar() {
  return <SidebarNotes tags={tags} />;
}
