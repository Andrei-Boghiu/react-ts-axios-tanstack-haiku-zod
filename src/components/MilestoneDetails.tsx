import { useState } from "react";
import type { Milestone } from "../types/milestone";
import MilestoneTaskList from "./MilestoneTaskList";

export default function MilestoneDetails({ milestone }: { milestone: Milestone }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <details
      key={milestone.id}
      className="details-wrapper"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary>
        <div className="milestone-header">
          <div>
            <strong>{milestone.name}</strong>
          </div>
          <div>
            <strong>{milestone.status}</strong>
          </div>
          <div>
            <strong>Supervisor ID:</strong> {milestone?.supervisorId || "N/A"}
          </div>
        </div>
        <div className="milestone-dates">
          {milestone.startDate && (
            <div>
              <strong>Start:</strong> {new Date(milestone.startDate).toLocaleDateString()}
            </div>
          )}
          {milestone.endDate && (
            <div>
              <strong>End:</strong> {new Date(milestone?.endDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </summary>
      <div style={{ padding: "6px" }}>
        <div>
          <strong>Description:</strong> {milestone?.description || "N/A"}
        </div>
        <MilestoneTaskList milestoneId={milestone.id} isOpen={open} />
      </div>
    </details>
  );
}
