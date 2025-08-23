import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { createMilestone } from "../services/milestone.service";
import { sanitizeOptionalFields } from "../utils/sanitizeOptionalFields.utils";
import { createMilestoneSchema, type CreateMilestoneFormData } from "../schemas/milestone.schema";
import { FormField, type InputType } from "../components/FormField";

const fieldInputTypes: Record<keyof CreateMilestoneFormData, InputType> = {
  name: "text",
  description: "textarea",
  supervisorId: "text",
  status: "select",
  startDate: "datetime-local",
  endDate: "datetime-local",
};

export default function CreateMilestone() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId = "" } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateMilestoneFormData>({
    resolver: zodResolver(createMilestoneSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateMilestoneFormData) => createMilestone(projectId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      navigate(`/milestone/${data.id}`);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: CreateMilestoneFormData) => {
    const sanitizedData = sanitizeOptionalFields(data);
    mutate(sanitizedData);
  };

  const fields = Object.keys(createMilestoneSchema.shape) as Array<keyof CreateMilestoneFormData>;

  return (
    <div>
      <section aria-labelledby="create-milestone-title">
        <h2 id="create-milestone-title">Create Milestone</h2>
        <div>
          <strong>Project id: </strong>
          {projectId}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((name) => (
            <FormField
              key={name}
              name={name}
              type={fieldInputTypes[name]}
              schema={createMilestoneSchema}
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
          ))}

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
