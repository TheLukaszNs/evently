import { wait } from "@/lib/utils";
import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";
import { useCallback, useState } from "react";

type Opts<Mutation = unknown> = {
  mutation: Mutation;
  delay?: number;
};

export const useStatefulMutation = <
  Mutation extends FunctionReference<"mutation">,
>({
  mutation,
  delay = 700,
}: Opts<Mutation>) => {
  const [loading, setLoading] = useState(false);
  const mutationInstance = useMutation(mutation);

  const mutate = useCallback(
    async (...opts: OptionalRestArgs<Mutation>) => {
      setLoading(true);
      await wait(delay);
      try {
        return await mutationInstance(...opts);
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [mutationInstance, delay],
  );

  return {
    mutate,
    loading,
  };
};
