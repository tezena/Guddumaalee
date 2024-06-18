'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { acceptOffer, rejectOffer } from "../api/offer";

const AcceptOffer = () => {
  const queryClient = useQueryClient();
  const acceptMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => acceptOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });

  const rejectMutation: UseMutationResult<void, unknown, number> = useMutation({
    mutationFn: (id: number) => rejectOffer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disputes"] });
    },
  });

  const handleReject = async (id: number) => {
    await rejectMutation.mutateAsync(id);
  };

  const handleAccept = async (id: number) => {
    await acceptMutation.mutateAsync(id);
  };
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-4 items-center">
          <Button onClick={()=>handleAccept}>Accept</Button>
          <Button onClick={()=>handleReject}>Reject</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AcceptOffer;
