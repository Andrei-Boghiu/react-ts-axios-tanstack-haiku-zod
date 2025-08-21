import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/project.service";
import ProjectDetails from "../components/ProjectDetails";
import ProjectMilestoneList from "../components/ProjectMilestoneList";

export default function Project() {
  const { id = "" } = useParams();

  const {
    data: project,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
    enabled: Boolean(id),
  });

  if (!id) return <div>No project ID provided</div>;
  if (isError) return <div>Error loading project details: {error.message}</div>;
  if (isLoading || !project) return <div>Loading...</div>;

  return (
    <div>
      <h1>Project Details</h1>
      <button onClick={() => refetch()}>Refresh</button>
      <ProjectDetails project={project} />
      <hr />
      <ProjectMilestoneList projectId={project.id} />
    </div>
  );
}
