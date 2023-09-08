import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, ...props }, ref) => {
    return (
      <Loader2
        className={cn("h-4 w-4 animate-spin text-current", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner };
