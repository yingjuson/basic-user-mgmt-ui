import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("This is not a valid email."),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof FormSchema>) => {
    try {
      login(payload);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return {
    form,
    onSubmit,
  };
};
