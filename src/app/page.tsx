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
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX } from "lucide-react";

export default function Home() {
  const userId = useStoreUserEffect();
  const data = useQuery(api.events.list, userId ? undefined : "skip");

  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-3">
        {data ? (
          data?.map((event) => (
            <Link key={event._id} href={`/events/${event._id}`}>
              <Card className="transition-shadow hover:shadow">
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>
                    {new Date(event._creationTime).toISOString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <>
            <Skeleton className="col-span-2 h-32" />
            <Skeleton className=" h-32" />
          </>
        )}
        {data?.length === 0 && (
          <Alert className="col-span-3">
            <SearchX className="h-4 w-4" />
            <AlertTitle>No events found...</AlertTitle>
            <AlertDescription>
              You don&apos;t have any events yet. Create one by clicking the
              button below.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
