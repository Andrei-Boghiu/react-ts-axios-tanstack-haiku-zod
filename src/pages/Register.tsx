import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth.service";
import type { AxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();

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
      navigate("/login");
    },
    onError: (err: AxiosError) => {
      console.error(err);
      alert(err?.response?.data || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>

      <div>
        <label>First Name:</label>
        <input type="text" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>Middle Name:</label>
        <input type="text" {...register("middleName")} />
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" {...register("lastName")} />
        <p>{errors.lastName?.message}</p>
      </div>

      <div>
        <label>Organization:</label>
        <input type="text" {...register("organization")} />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
