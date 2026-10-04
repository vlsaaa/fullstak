import { EmptyState } from "../components/EmptyState.tsx";

export function NotFoundPage() {
  return (
    <EmptyState
      title="Такой страницы нет"
      text="Вернитесь к обзору группы."
      to="/"
      action="На обзор"
    />
  );
}
