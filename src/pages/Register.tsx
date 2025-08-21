import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/auth.service";
import type { AxiosError } from "axios";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

export default function Register() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err: AxiosError) => {
      console.error(err);
      alert(err?.response?.data || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  const fields = Object.keys(registerSchema.shape) as Array<keyof RegisterFormData>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((name) => (
        <div key={name}>
          <label htmlFor={name}>{humanizeFieldName(name)}: </label>
          <input
            id={name}
            type={name === "password" ? "password" : name === "email" ? "email" : "text"}
            {...register(name)}
          />
          <p>{errors[name]?.message}</p>
        </div>
      ))}

      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
