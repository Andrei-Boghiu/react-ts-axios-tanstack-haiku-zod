import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("login success");
      setUser(data.user, data.token); // or just setUser(data) depending on backend

      // RESPONSE EXAMPLE:
      //     {
      //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMWQ5NTYyYy0yZjhkLTQyOWEtOTZiYS05NzE4ODQzYjlkYzYiLCJlbWFpbCI6ImZha2VAbWFpbC5jb20iLCJpYXQiOjE3NTQzNjE2OTUsImV4cCI6MTc1NDM2NTI5NX0.4m3IqgfrLfQ5aK5IpQkwGhIloZAIgCdXvQ9nD-Lw2k4",
      //     "user": {
      //         "publicUserObject": {
      //             "id": "a1d9562c-2f8d-429a-96ba-9718843b9dc6",
      //             "email": "fake@mail.com",
      //             "firstName": null,
      //             "middleName": null,
      //             "lastName": null,
      //             "organization": null,
      //             "role": "USER",
      //             "isActive": true,
      //             "createdAt": "2025-08-04T22:12:22.527Z",
      //             "updatedAt": "2025-08-04T22:12:22.527Z"
      //         }
      //     }
      // }

      navigate("/welcome");
    },
  });

  const onSubmit = (data: LoginInput) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>Login failed.</p>}
    </form>
  );
}
