import { Link } from "react-router-dom";

type QuickAction = {
  label: string;
  to: string;
  disabled?: boolean;
};

const mockQuickActions: QuickAction[] = [
  { label: "Create Project", to: "/create-project" },
  { label: "Create Milestone", to: "/create-milestone" },
  { label: "Create Task", to: "/create-task", disabled: true },
];

export default function MyQuickActions() {
  return (
    <section>
      <h2>My Quick Actions</h2>
      {mockQuickActions.map(({ label, to, disabled }) => (
        <Link
          style={{ display: "block" }}
          key={label}
          to={to}
          className={`button ${disabled ? "disabled" : ""}`}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : 0}
        >
          {label}
        </Link>
      ))}
    </section>
  );
}
