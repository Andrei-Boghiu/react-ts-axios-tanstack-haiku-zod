import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTaskById } from "../services/task.service";
import TaskDetails from "../components/TaskDetails";
import TaskCommentList from "../components/TaskCommentList";

export default function Task() {
  const { id = "" } = useParams();

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
  });

  if (isError) return <div>There was an error</div>;
  if (isLoading || !task) return <div>Loading...</div>;

  return (
    <div>
      <h1>Task Details</h1>
      <TaskDetails task={task} />
      <hr />
      <TaskCommentList taskId={task.id} />
    </div>
  );
}
