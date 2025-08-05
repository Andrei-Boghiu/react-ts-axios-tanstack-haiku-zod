import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { createProject, getProjects } from "../services/project.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, type CreateProjectFormData } from "../schemas/project.schema";

export default function Welcome() {
  const { logout, user } = useAuth();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      reset();
    },
  });

  const onSubmit = (data: CreateProjectFormData) => {
    mutate(data);
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <input placeholder="Description" {...register("description")} />
        <button type="submit">Create</button>
      </form>

      <h2>Projects</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {projects?.data?.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong>: {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
