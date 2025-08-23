import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../services/project.service";
import ProjectDetails from "../components/ProjectDetails";
import ProjectMilestoneList from "../components/ProjectMilestoneList";

export default function Project() {
  const { projectId = "" } = useParams();

  const {
    data: project,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: Boolean(projectId),
  });

  if (!projectId) return <div>No project ID provided</div>;

  if (isError) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return <p role="alert">Error loading project details: {message}</p>;
  }

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
