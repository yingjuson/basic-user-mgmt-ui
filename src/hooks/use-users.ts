import axiosClient from "@/api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("This is not a valid email."),
});

interface Props {
  user: {
    name: string;
    email: string;
  };
}

export const useUsers = ({ user }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: user ?? {
      name: "",
      email: "",
    },
  });

  const onSubmit = (payload: z.infer<typeof FormSchema>) => {
    axiosClient.patch("/api/user", payload);
  };

  return {
    form,
    onSubmit,
  };
};
