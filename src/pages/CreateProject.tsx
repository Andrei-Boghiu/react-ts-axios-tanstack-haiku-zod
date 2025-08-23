import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/project.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, type CreateProjectFormData } from "../schemas/project.schema";
import { useNavigate } from "react-router-dom";
import { sanitizeOptionalFields } from "../utils/sanitizeOptionalFields.utils";
import { FormField, type InputType } from "../components/FormField";

const fieldInputTypes: Record<keyof CreateProjectFormData, InputType> = {
  name: "text",
  description: "textarea",
  priority: "select",
  status: "select",
  visibility: "select",
  startDate: "datetime-local",
  endDate: "datetime-local",
};

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

  const fields = Object.keys(createProjectSchema.shape) as Array<keyof CreateProjectFormData>;

  return (
    <div>
      <section aria-labelledby="create-project-title">
        <h2 id="create-project-title">Create Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((name) => (
            <FormField
              key={name}
              name={name}
              type={fieldInputTypes[name]}
              schema={createProjectSchema}
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
          ))}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
        <button type="reset" onClick={() => navigate(-1)}>
          Back
        </button>
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
      </section>
    </div>
  );
}
