"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStoreUserEffect from "@/hooks/useStoreUserEffect";

export default function Home() {
  const userId = useStoreUserEffect();
  const data = useQuery(api.events.list, userId ? undefined : "skip");

  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-3">
        {data?.map((event) => (
          <Card key={event._id} className="transition-shadow hover:shadow">
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>
                {new Date(event._creationTime).toISOString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
