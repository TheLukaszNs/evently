"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { Settings } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { SettingsForm } from "./settings-form";

type Props = {
  eventId: Id<"events">;
};

export const SettingsDialog = ({ eventId }: Props) => {
  const event = useQuery(api.events.get, { id: eventId });

  if (!event) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-4 gap-2">
          <Settings />
          Event Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event Settings</DialogTitle>
          <DialogDescription>
            Make changes to your event settings here. For more fine tuned
            control over your event, use widgets.
          </DialogDescription>
        </DialogHeader>
        <SettingsForm event={event} />
        <Separator className="my-4" />
        <Button disabled variant="link">
          Request verification
        </Button>
      </DialogContent>
    </Dialog>
  );
};
