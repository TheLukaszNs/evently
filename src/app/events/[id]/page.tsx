"use client";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WIDGET_OPTIONS } from "@/config/widgets";

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const data = useQuery(api.events.get, {
    id: params.id as Id<"events">,
  });
  const widgets = useQuery(api.widgets.list, {
    eventId: params.id as Id<"events">,
  });

  const deleteEvent = useMutation(api.events.deleteEvent);
  const createWidget = useMutation(api.widgets.create);

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-auto">
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteEvent({
                    id: params.id as Id<"events">,
                  });
                  router.push("/");
                }}
              >
                <TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete this event</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        {widgets?.map((widget) => (
          <Card key={widget._id}>
            <CardHeader>
              <CardTitle>
                {widget.name} ({widget.type})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                  <Button variant="outline">Edit</Button>
                  <Button variant="outline">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="h-full flex-1 gap-2 py-8"
            >
              Add new widget
              <PlusIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Widgets</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {WIDGET_OPTIONS.map((widget) => (
              <DropdownMenuItem
                disabled={widgets?.some((w) => w.type === widget.value)}
                key={widget.value}
                onClick={async () => {
                  await createWidget({
                    eventId: params.id as Id<"events">,
                    config: JSON.stringify({}),
                    name: "New widget",
                    type: widget.value,
                  });
                }}
              >
                {widget.icon}
                <span>{widget.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
