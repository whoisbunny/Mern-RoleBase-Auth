import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/auth.service";

import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  role: z.enum(["admin", "customer"], { required_error: "Role is required" }),
});

const SignUpForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
    },
  });
  const onSubmit = async (data) => {
    await registerService(data)
      .then((response) => {
        console.log("Registration successful:", response);

        toast.success(
          response ||
            "Verification Email has been sent to your email, Please verify your email."
        );
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto w-full p-6 bg-white rounded shadow-md dark:bg-gray-900">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium dark:text-gray-100 text-gray-800"
          >
            Sign Up As
          </label>
          <select
            id="role"
            {...form.register("role")}
            className="mt-1 block w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200 text-gray-700"
            defaultValue=""
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          {form.formState.errors.role && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.role.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium dark:text-gray-100 text-gray-800"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="firstName"
            {...form.register("firstName")}
            className="mt-1 block w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200 text-gray-700 "
          />
          {form.formState.errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium dark:text-gray-100 text-gray-800"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="lastName"
            {...form.register("lastName")}
            className="mt-1 block w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-200 text-gray-700 "
          />
          {form.formState.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
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

export default SignUpForm;
