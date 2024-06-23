import { FC, useState } from "react";
import { capitalizeFirstLetter } from "@/utils/string-utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { useUsers } from "@/hooks/use-users";
import { Label } from "@/components/ui/label";

const STATIC_USER = {
  name: "James",
  email: "james@test.com",
  type: "seller",
  code: "USR-00007-888",
};

const HomePage: FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { form, onSubmit } = useUsers({ user: STATIC_USER });

  const getPageHeader = () => {
    const { type } = STATIC_USER;

    const capitalizedType = capitalizeFirstLetter(type);

    return `${capitalizedType} Homepage`;
  };

  const UserInfo = () => (
    <div className="space-y-6">
      <p className="font-semibold text-xl">
        {`${STATIC_USER.name} (${STATIC_USER.code})`}
      </p>

      <div>
        <Label>Email</Label>
        <p>{STATIC_USER.email}</p>
      </div>

      <div>
        <Label>Type</Label>
        <p>{STATIC_USER.type}</p>
      </div>
    </div>
  );

  const UpdateUserForm = () => (
    <Form {...form}>
      <form
        id="user-info-form" // required since submit button is not within the form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );

  return (
    <AuthenticatedLayout user={STATIC_USER} header={getPageHeader()}>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center w-5/6 mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
          {isEditing ? <UpdateUserForm /> : <UserInfo />}

          {isEditing ? (
            <div className="flex justify-around mt-6 w-1/2">
              <Button type="submit" form="user-info-form" className="w-24">
                Save
              </Button>

              <Button
                variant="secondary"
                className="w-24"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button className="w-24 mt-6" onClick={() => setIsEditing(true)}>
              Update
            </Button>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default HomePage;
