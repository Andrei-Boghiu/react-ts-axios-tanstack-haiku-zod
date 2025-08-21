import { useQuery } from "@tanstack/react-query";
import { getMilestones } from "../services/milestone.service";
import MilestoneDetails from "./MilestoneDetails";

export default function ProjectMilestoneList({ projectId }: { projectId: string }) {
  const {
    data: milestones,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["milestones", projectId],
    queryFn: () => getMilestones(projectId),
  });

  if (milestones?.data.length === 0) return <div>There are no milestones for this project</div>;
  if (isError) return <div>Error loading milestones: {error.message}</div>;
  if (isLoading || !milestones) return <div>Loading milestones...</div>;

  return (
    <div>
      {milestones.data.map((milestone) => (
        <MilestoneDetails key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
