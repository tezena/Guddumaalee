import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { acceptOffer, getCaesesById, rejectOffer } from "../api/offer";

import { Button } from "@/components/ui/button";
import {
  ErrorComponent,
  LoadingComponent,
} from "@/components/LoadingErrorComponents";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface message {
  messageType: string;
  fileType: string;
  clientId: number;
  message: string;
  lawyerId: number;
  lawyer: {
    photo: string;
  };
  client: {
    full_name: string;
  };
}

const OfferDisplay = ({
  caseId,
  userType,
}: {
  caseId: number;
  userType: string;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["offer-chat" + caseId],
    queryFn: () => getCaesesById(caseId),
  });
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const acceptMutation = useMutation({
    mutationFn: (id: number) => acceptOffer(id),
    onSuccess: (data) => {
      setIsAccepting(false);
      router.replace(data.acceptedCase);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => rejectOffer(id),
    onSuccess: () => {
      setIsRejecting(false);
      queryClient.invalidateQueries({ queryKey: ["offer-chat"] });
    },
  });

  const handleReject = async (id: number) => {
    setIsRejecting(true);
    rejectMutation.mutate(id);
  };

  const handleAccept = async (id: number) => {
    setIsAccepting(true);
    acceptMutation.mutate(id);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMessage="Error Occured" />;
  }
  return (
    <Card className="w-[50%]">
      <CardHeader className="border-b">
        <CardTitle>{data.title.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-gray-400 font-bold">{data.price}ETB</p>
        <p>{data.description}</p>
        <div className="mt-4">
          {userType == "client" ? (
            <div className="flex gap-2">
              <Button
                className="bg-[#7B3B99]"
                onClick={() => handleAccept(caseId)}
                disabled={data.status !== "PENDING" || isAccepting}
              >
                {isAccepting && <Loader2 className="animate-spin" />}Accept
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(caseId)}
                disabled={data.status !== "PENDING" || isRejecting}
              >
                {isRejecting && <Loader2 className="animate-spin" />}
                Reject
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </CardContent>
      <hr />
    </Card>
  );
};

export default OfferDisplay;
