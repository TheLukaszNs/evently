"use client";

import { Button } from "@/components/ui/button";
import { Widget } from "@/components/widget";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import { HandMetal } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { SettingsDialog } from "./components/settings-dialog";
import { WidgetsDropdown } from "./components/widgets-dropdown";

export default function EventPage({
  params,
}: {
  params: { id: Id<"events"> };
}) {
  const router = useRouter();

  const data = useQuery(api.events.get, {
    id: params.id,
  });
  const widgets = useQuery(api.widgets.list, {
    eventId: params.id,
  });

  const deleteEvent = useMutation(api.events.deleteEvent);
  // const deleteWidget = useMutation(api.widgets.remove);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full flex-row items-center">
        <div className="animate-in slide-in-from-left-6 ">
          <h1 className="text-3xl font-bold">{data?.name}</h1>
          <span className="text-slate-400">
            {new Date(data._creationTime).toISOString()}
          </span>
        </div>
        <div className="ml-auto flex flex-row items-center">
          <SettingsDialog eventId={params.id} />
          <Button
            title="Delete event"
            variant="destructive"
            size="icon"
            onClick={async () => {
              await deleteEvent({
                id: params.id as Id<"events">,
              });
              router.push("/");
            }}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        {widgets?.map((widget) => <Widget key={widget._id} widget={widget} />)}

        {widgets?.length === 0 ? (
          <article className="col-span-2 flex flex-col items-center gap-4">
            <div className="flex flex-row items-center gap-4 text-xl text-slate-600">
              <h3 className="font-bold">
                This event has not yet been configured
              </h3>
              <HandMetal size={32} />
            </div>
            <div className="flex flex-row items-center gap-2 text-center text-slate-400">
              Let&apos;s get you started with your{" "}
              <WidgetsDropdown
                trigger={<Button variant="ghost">first widget</Button>}
                eventId={params.id as Id<"events">}
              />
            </div>
          </article>
        ) : (
          <WidgetsDropdown
            trigger={
              <Button
                variant="outline"
                size="lg"
                className="h-full flex-1 gap-2 py-8"
              >
                Add new widget
                <PlusIcon />
              </Button>
            }
            eventId={params.id as Id<"events">}
          />
        )}
      </div>
    </div>
  );
}
