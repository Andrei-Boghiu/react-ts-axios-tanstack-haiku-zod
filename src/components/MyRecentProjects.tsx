import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/project.service";
import type { Project } from "../types/project";
import { useNavigate } from "react-router-dom";
import type { PaginatedResponse } from "../types/types";

export default function MyRecentProjects() {
  const navigate = useNavigate();

  const {
    data: projectsResponse,
    refetch,
    isRefetching,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedResponse<Project>>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <section>
      <header className="recent-projects-header">
        <h2>My Recent Projects</h2>
        <button onClick={() => refetch()}>{isRefetching ? "Refreshing..." : "Refresh"} </button>
      </header>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : isError ? (
        <p role="alert">Error loading projects: {(error as Error).message}</p>
      ) : projectsResponse?.data.length ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectsResponse.data.map(
                ({ id, name, description, priority, status, visibility, startDate, endDate, createdAt }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{description ?? <em>No description</em>}</td>
                    <td>{priority}</td>
                    <td>{status}</td>
                    <td>{visibility}</td>
                    <td>{startDate ? new Date(startDate).toLocaleString() : "-"}</td>
                    <td>{endDate ? new Date(endDate).toLocaleString() : "-"}</td>
                    <td>{new Date(createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => navigate(`/project/${id}`)}
                        aria-label={`View project ${name}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>No projects found.</p>
      )}
    </section>
  );
}
