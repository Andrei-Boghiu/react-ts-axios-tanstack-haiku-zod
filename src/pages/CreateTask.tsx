import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { createTask } from "../services/task.service";
import { sanitizeOptionalFields } from "../utils/sanitizeOptionalFields.utils";
import { createTaskSchema, type CreateTaskFormData } from "../schemas/task.schema";
import { FormField, type InputType } from "../components/FormField";

const fieldInputTypes: Record<keyof CreateTaskFormData, InputType> = {
  title: "text",
  description: "textarea",
  priority: "select",
  status: "select",
  dueDate: "datetime-local",
  assigneeId: "text",
};

export default function CreateTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { milestoneId = "" } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateTaskFormData) => createTask(milestoneId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(`/task/${data.id}`);
      reset();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: CreateTaskFormData) => {
    const sanitizedData = sanitizeOptionalFields(data);
    mutate(sanitizedData);
  };

  const fields = Object.keys(createTaskSchema.shape) as Array<keyof CreateTaskFormData>;

  return (
    <div>
      <section aria-labelledby="create-task-title">
        <h2 id="create-task-title">Create Task</h2>
        <div>
          <strong>Milestone id: </strong>
          {milestoneId}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((name) => (
            <FormField
              key={name}
              name={name}
              type={fieldInputTypes[name]}
              schema={createTaskSchema}
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
