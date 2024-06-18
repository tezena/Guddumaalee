import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
  } from "@tanstack/react-query";
  import { acceptOffer, getCaesesById, rejectOffer } from "../api/offer";

  import { Button } from "@/components/ui/button"
        
  

  const OfferDisplay=(caseId:number)=>{

     const {data,isLoading,error}=useQuery({
        queryKey:['offer'],
        queryFn:()=>getCaesesById(caseId)
     })

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
    return 
    <Card className="w-[50%]">
    <CardHeader>
      <CardTitle>{data?.title}</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent className="">
      <p>{data.description}</p>
    </CardContent>
    <CardFooter>
       <div className="flex ">
           <Button className=" bg-green-600 text-white " onClick={()=>handleAccept(caseId)}>Accept</Button>
           <Button className="bg-red-600 text-white " onClick={()=>handleReject(caseId)}>Reject</Button>
       </div>
    </CardFooter>
  </Card>
  
  }


export default OfferDisplay


