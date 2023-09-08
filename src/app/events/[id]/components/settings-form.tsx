import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EventSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type EventSchema = z.infer<typeof EventSchema>;

type Props = {
  event?: Doc<"events">;
  onSubmit?: (data: EventSchema) => void;
};

export const SettingsForm = ({ event }: Props) => {
  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: event?.name ?? "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Jamfest" type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="we will party hard!"
                  type="text"
                  {...field}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
