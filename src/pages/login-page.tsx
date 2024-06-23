import { FC } from "react";
import GuestLayout from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/use-login";

const LoginPage: FC = () => {
  const { form, onSubmit } = useLogin();

  return (
    <GuestLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>

          <p className="text-sm">
            Not registered yet?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Sign up here
            </Link>
          </p>
        </form>
      </Form>
    </GuestLayout>
  );
};

export default LoginPage;
