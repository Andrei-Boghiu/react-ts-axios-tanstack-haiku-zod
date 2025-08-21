import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/project.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, type CreateProjectFormData } from "../schemas/project.schema";
import { useNavigate } from "react-router-dom";
import { sanitizeOptionalFields } from "../utils/sanitizeOptionalFields.utils";

export default function CreateProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/project/${data.id}`);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: CreateProjectFormData) => {
    const sanitizedData = sanitizeOptionalFields(data);
    mutate(sanitizedData);
  };
  return (
    <div>
      <section aria-labelledby="create-project-title">
        <h2 id="create-project-title">Create Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter project name"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={isSubmitting}
              required
            />
            {errors.name && (
              <p role="alert" id="name-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter project description"
              {...register("description")}
              aria-invalid={errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "description-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p role="alert" id="description-error">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              {...register("priority")}
              disabled={isSubmitting}
              aria-invalid={errors.priority ? "true" : "false"}
              aria-describedby={errors.priority ? "priority-error" : undefined}
            >
              <option value="">Select priority (optional)</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            {errors.priority && (
              <p role="alert" id="priority-error">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              {...register("status")}
              disabled={isSubmitting}
              aria-invalid={errors.status ? "true" : "false"}
              aria-describedby={errors.status ? "status-error" : undefined}
            >
              <option value="">Select status (optional)</option>
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            {errors.status && (
              <p role="alert" id="status-error">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="visibility">Visibility</label>
            <select
              id="visibility"
              {...register("visibility")}
              disabled={isSubmitting}
              aria-invalid={errors.visibility ? "true" : "false"}
              aria-describedby={errors.visibility ? "visibility-error" : undefined}
            >
              <option value="">Select visibility (optional)</option>
              <option value="PRIVATE">Private</option>
              <option value="PUBLIC">Public</option>
            </select>
            {errors.visibility && (
              <p role="alert" id="visibility-error">
                {errors.visibility.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="datetime-local"
              {...register("startDate")}
              disabled={isSubmitting}
              aria-invalid={errors.startDate ? "true" : "false"}
              aria-describedby={errors.startDate ? "startDate-error" : undefined}
            />
            {errors.startDate && (
              <p role="alert" id="startDate-error">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="datetime-local"
              {...register("endDate")}
              disabled={isSubmitting}
              aria-invalid={errors.endDate ? "true" : "false"}
              aria-describedby={errors.endDate ? "endDate-error" : undefined}
            />
            {errors.endDate && (
              <p role="alert" id="endDate-error">
                {errors.endDate.message}
              </p>
            )}
          </div>

          <button type="reset" onClick={() => navigate(-1)}>
            Back
          </button>
          <button type="reset">Reset</button>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
      </section>
    </div>
  );
}
