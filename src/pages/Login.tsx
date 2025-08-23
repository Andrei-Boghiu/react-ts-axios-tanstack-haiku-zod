import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../auth/useAuth";
import { humanizeFieldName } from "../utils/humanizeFieldName.util";

export default function Login() {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      setUser(userData);
      window.localStorage.setItem("AUTH_USER", JSON.stringify(userData));
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (data: LoginFormData) => mutate(data);

  const fields = Object.keys(loginSchema.shape) as Array<keyof LoginFormData>;

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
        {isPending ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error?.message || "Login failed"}</p>}
    </form>
  );
}
