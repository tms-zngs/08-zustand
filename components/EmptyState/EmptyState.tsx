import css from "./EmptyState.module.css";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No notes found",
}: EmptyStateProps) {
  return (
    <div className={css.emptyContainer}>
      <p className={css.emptyText}>💡 {message}</p>
    </div>
  );
}
