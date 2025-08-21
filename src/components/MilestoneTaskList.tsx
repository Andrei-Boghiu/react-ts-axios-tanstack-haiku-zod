import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/task.service";
import { useNavigate } from "react-router-dom";

export default function MilestoneTaskList({ milestoneId, isOpen }: { milestoneId: string; isOpen: boolean }) {
  const navigate = useNavigate();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", milestoneId],
    queryFn: () => getTasks(milestoneId),
    enabled: isOpen,
  });

  if (tasks?.data.length === 0) return <div>There are not tasks for this milestone.</div>;
  if (isError) return <div>Error loading tasks.</div>;
  if (isLoading || !tasks) return <div>Loading tasks...</div>;

  return (
    <div>
      {tasks.data.map((task) => (
        <div key={task.id} className="task-wrapper" onClick={() => navigate(`/task/${task.id}`)}>
          <h4>{task.title}</h4>
          <ul className="task-ul">
            <li>
              <strong>Status:</strong> {task.status}
            </li>
            <li>
              <strong>Priority:</strong> {task.priority}
            </li>
            <li>
              <strong>Assignee ID:</strong> {task.assigneeId || "N/A"}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
