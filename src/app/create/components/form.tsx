"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { KeyboardIcon } from "@radix-ui/react-icons";

const eventSchema = z.object({
  name: z.string(),
});

export const NewEventForm = () => {
  const router = useRouter();
  const create = useMutation(api.events.createEvent);
  const user = useUser();

  const form = useForm<z.infer<typeof eventSchema>>({
    // @ts-ignore some weird type error, version mismatch?
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    const newId = await create({ name: values.name });
    router.replace(`/events/${newId}`);

    form.reset();
  };

  return (
    <Form {...form}>
      <h1 className="text-2xl font-semibold">Crete event</h1>
      <Alert className="my-4">
        <KeyboardIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You will be able to add more details on the event&apos;s page
        </AlertDescription>
      </Alert>
      <span className="mb-4 block text-slate-400"></span>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="jamfest" {...field} />
              </FormControl>
              <FormDescription>
                This is your event&apos;s public name
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
