import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Unable to fetch data...",
}: ErrorMessageProps) {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorText}>🚨 Error: {message}</p>
    </div>
  );
}
