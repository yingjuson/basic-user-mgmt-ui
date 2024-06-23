import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "./use-auth";

const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required.",
      })
      .email("This is not a valid email."),
    password: z.string().min(8, {
      message: "Minimum of 8 characters required.",
    }),
    password_confirmation: z.string().min(8, {
      message: "Minimum of 8 characters required.",
    }),
    type: z.enum(["seller", "customer"]),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["password_confirmation"],
      });
    }
  });

export const useRegister = () => {
  const { register } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      type: "seller",
    },
  });

  const onSubmit = (payload: z.infer<typeof FormSchema>) => {
    register(payload);
  };

  return {
    form,
    onSubmit,
  };
};
