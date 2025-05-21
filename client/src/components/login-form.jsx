import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
  adminLoginService,
  clientLoginService,
} from "../services/auth.service";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email || "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    if (pathname === "/") {
      await clientLoginService(data)
        .then((response) => {
          console.log("Login successful:", response);
          toast.success(response.message);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Login error:", error);
          toast.error(error);
        });
    }
    if (pathname === "/admin-login") {
      await adminLoginService(data)
        .then((response) => {
          console.log("Login successful:", response);
          toast.success(response.message);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Login error:", error);
          toast.error(error);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto w-full p-6 bg-white rounded shadow-md dark:bg-gray-900">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium dark:text-gray-100 text-gray-800"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1 block w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200 text-gray-700 "
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium dark:text-gray-100 text-gray-800"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...form.register("password")}
            className="mt-1 block w-full border rounded px-3 py-2  dark:bg-gray-700 dark:text-gray-200 text-gray-700 "
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
