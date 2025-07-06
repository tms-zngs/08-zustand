import Link from "next/link";
import css from "./SidebarNotes.module.css";

type SideBarProps = {
  tags: string[];
};

const SidebarNotes = ({ tags }: SideBarProps) => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/action/create" className={css.menuLink}>
          Create Note
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All Notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
