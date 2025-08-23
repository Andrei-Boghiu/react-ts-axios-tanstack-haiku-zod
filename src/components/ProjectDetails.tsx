import { Link } from "react-router-dom";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";
import type { Project } from "../types/project";

export interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <>
      <div className="project-grid-3cols">
        {Object.keys(project).map((key) => {
          const fieldKey = key as keyof typeof project;

          if (typeof project[fieldKey] === "object" && project[fieldKey] !== null) return;

          return (
            <div className="project-item" key={key}>
              <div className="project-label">{humanizeFieldName(fieldKey)}</div>
              <div>{project[fieldKey] ?? "-"}</div>
            </div>
          );
        })}
      </div>
      <Link to={`/project/${project.id}/create-milestone`}>
        <button>Create Milestone</button>
      </Link>
    </>
  );
}
