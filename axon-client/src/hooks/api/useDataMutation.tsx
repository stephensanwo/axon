import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DataMutationProps<D, R> {
  mutationFn: (dto: D) => Promise<R>;
  optionalQueryKeysToInvalidate?: string[][];
  onSuccessCallback?: (data?: R, variables?: D) => void;
}

export function useDataMutation<D, R>({
  mutationFn,
  optionalQueryKeysToInvalidate,
  onSuccessCallback,
}: DataMutationProps<D, R>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<R, unknown, D>({
    mutationFn: async (dto) => mutationFn(dto),
    onMutate: async (data) => {
      console.log("onMutate", data);
      return data;
    },
    onError: (error, variables, context) => {
      console.error("onError", error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      console.log("onSettled", data, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (onSuccessCallback) {
        onSuccessCallback(data, variables);
      }
      console.log("onSuccess", data, variables, context);
      // Invalidate any additional queries
      if (optionalQueryKeysToInvalidate) {
        optionalQueryKeysToInvalidate.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  });

  return mutation;
}
