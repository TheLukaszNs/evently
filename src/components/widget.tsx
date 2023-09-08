import { useStatefulMutation } from "@/hooks/useStatefulMutation";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "../../convex/_generated/api";
import { Spinner } from "./ui/spinner";

type Props = {
  widget: Doc<"widgets">;
};

export const Widget = ({ widget }: Props) => {
  const deleteWidget = useStatefulMutation({
    mutation: api.widgets.remove,
  });

  return (
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
            <Button
              variant="outline"
              disabled={deleteWidget.loading}
              onClick={async () => {
                await deleteWidget.mutate({
                  id: widget._id,
                });
              }}
            >
              {deleteWidget.loading ? (
                <div className="animate-in fade-in-10 slide-in-from-left-4">
                  <Spinner className="mr-2" />
                </div>
              ) : null}
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
