import type { ReactNode } from "react";

type Props = {
  message: string;
  children?: ReactNode;
};

export function EmptyState({ message, children }: Props) {
  return (
    <div className="empty">
      <p>{message}</p>
      {children}
    </div>
  );
}
