import type { Project } from "../types/project";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

export interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="project-grid-3cols">
      {Object.keys(project).map((key) => {
        const fieldKey = key as keyof typeof project;

        if (typeof project[fieldKey] === "object" && project[fieldKey] !== null) return;

        return (
          <div className="project-item" key={key}>
            <div className="label">{humanizeFieldName(fieldKey)}</div>
            <div>{project[fieldKey] ?? "-"}</div>
          </div>
        );
      })}
    </div>
  );
}
