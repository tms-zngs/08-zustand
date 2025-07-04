"use client";

import { TagName } from "@/types/note";
import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";

const tags: TagName[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/all`}
              className={css.menuLink}
              onClick={toggle}
            >
              All Notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
