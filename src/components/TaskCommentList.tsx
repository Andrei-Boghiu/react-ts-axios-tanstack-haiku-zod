import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/comment.service";

export default function TaskCommentList({ taskId }: { taskId: string }) {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comment", taskId],
    queryFn: () => getComments(taskId),
  });

  if (isError) return <div>Error loading comments: {error.message}</div>;
  if (isLoading || !comments) return <div>Loading...</div>;

  return (
    <div className="comment-wrapper">
      {comments.data.map((comment) => (
        <div className="comment-item" key={comment.id}>
          <div>
            <strong>User: </strong> {comment.userId}
          </div>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  );
}
