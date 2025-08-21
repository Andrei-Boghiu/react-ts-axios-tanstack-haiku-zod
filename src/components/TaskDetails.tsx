import type { Task } from "../types/task";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

export default function TaskDetails({ task }: { task: Task }) {
  return (
    <div className="project-grid-3cols">
      {Object.keys(task).map((key) => {
        const fieldKey = key as keyof typeof task;

        if (typeof task[fieldKey] === "object" && task[fieldKey] !== null) return;

        return (
          <div className="project-item" key={key}>
            <div className="label">{humanizeFieldName(fieldKey)}</div>
            <div>{task[fieldKey] ?? "-"}</div>
          </div>
        );
      })}
    </div>
  );
}
