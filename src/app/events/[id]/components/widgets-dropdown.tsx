"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WIDGET_OPTIONS } from "@/config/widgets";
import { useMutation } from "convex/react";
import { type ReactNode } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type Props = {
  trigger: ReactNode;
  eventId: Id<"events">;
};

export const WidgetsDropdown = ({ trigger, eventId }: Props) => {
  const createWidget = useMutation(api.widgets.create);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
        {/* <Button
      variant="outline"
      size="lg"
      className="h-full flex-1 gap-2 py-8"
    >
      Add new widget
      <PlusIcon />
    </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Widgets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WIDGET_OPTIONS.map((widget) => (
          <DropdownMenuItem
            key={widget.value}
            onClick={async () => {
              await createWidget({
                eventId,
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
  );
};
