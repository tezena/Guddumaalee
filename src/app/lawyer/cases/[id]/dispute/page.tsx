"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  getDisputes,
  getLawyerDisputes,
  submitDispute,
} from "@/app/lawyer/api/dispute";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

// Mock data for disputes

type DisputeData = {
  creator_email: string | null | undefined;
  client_id: number;
  content: string;
  lawyer_id: number;
};

const Disputes = () => {
  const queryClient = useQueryClient();
  
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDispute, setNewDispute] = useState({
    content: "",
  });
  // @ts-ignore
  const lawyerid = session?.user?.image?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["disputes"],
    queryFn: () => getLawyerDisputes(lawyerid),
  });

  // Ensure data is defined before accessing id
  const clientId = data?.[0]?.client_id;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChange = (e: any) => {
    setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const mutationFn = async (data: DisputeData) => {
    return submitDispute(data);
  };

  const { mutateAsync }: UseMutationResult<void, unknown, DisputeData> =
    useMutation({
      mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["disputes"] });
        handleCloseModal();
      },
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (!session?.user?.email || !session?.user?.image?.id) {
      console.error("Session data is missing");
      return;
    }

    const data: DisputeData = {
      ...newDispute,
      creator_email: session.user.email,
      lawyer_id: lawyerid,
      client_id: clientId,
    };

    try {
      await mutateAsync(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(session);
  }, [session]);


  if (isLoading)
    return (
      <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
        <div className="w-full h-full pt-28 flex gap-5 items-center justify-center m-auto">
          <Icon icon="eos-icons:loading" width="80" height="80" color="green" />
          {/* <p className="text-2xl text-green-500">...Loading</p> */}
        </div>
      </div>
    );
  if (error)
    return (
      <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
        Error loading data
      </div>
    );

  return (
    <div className="p-6 bg-gray-200 min-h-screen relative">
      <div className="bg-white h-[80%] w-[80%] rounded-xl m-auto p-10 relative">
        <div
          onClick={() => router.back()}
          className="bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
        >
          Back
        </div>
        <div className="flex justify-between items-center p-8">
          <h1 className="text-2xl font-bold">Dispute Details</h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#692a85] text-white py-2 px-4 rounded shadow hover:bg-[#5d2b75] transition duration-200 "
          >
            Submit New Dispute
          </button>
        </div>

        <div className=" p-8  mb-4 flex flex-col  gap-8">
          <div className="flex  gap-8">
            <p className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#60287a]">
                Client Name:
              </span>
              {/* {disputes[0].clientName} */}
            </p>
            <p className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#60287a]">
                Client ID:
              </span>
              {data?.[0]?.client_id}
            </p>
          </div>
          <p className="flex gap-4 items-center">
              <span className="text-xl font-bold text-[#60287a]">
                Lawyer_Email:
              </span>
              {data?.[0]?.creator_email}
            </p>
        </div>

        {data?.map((dispute: any) => (
          <>
            <div
              key={dispute.id}
              className=" p-10  mb-4  flex flex-col gap-4 relative"
            >
              {/* <div className="flex  gap-4">
                <p className="text-2xl font-bold text-[#60287a]">Email:</p>
                {dispute.creator_email}
              </div> */}
              <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold text-[#602979]">
                  Description:
                </p>
                <div className="px-4 text-justify ">{dispute.content}</div>
              </div>
              <div className="flex gap-2 items-center absolute right-12 top-12 text-sm">
                <p className=" font-bold text-[#60277b]">Submission Date:</p>
                {dispute.submissionDate}
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-2xl font-bold text-[#60287a]">Status:</p>
                {dispute.status}
              </div>
              {dispute.solved && (
                <div>
                  <p className="text-2xl font-bold text-[#60297a]">
                    Resolution:
                  </p>
                  {dispute.resolution}
                </div>
              )}
            </div>
            <hr className="border w-[90%] m-auto" />
          </>
        ))}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
              <h2 className="text-xl mb-4 font-semibold">Submit New Dispute</h2>
              <form onSubmit={handleSubmit}>
                {/* <div className="mb-4">
                  <label className="block text-gray-700">Client ID</label>
                  <input
                    type="number"
                    name="clientId"
                    value={id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div> */}
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="content"
                    value={newDispute.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-[#7b7b7b] text-white py-2 px-4 rounded mr-2  hover:bg-[#414141]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#8b47aa] text-white py-2 px-4 rounded  hover:bg-[#6b3286]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disputes;

// const disputes = [
//   {
//     id: 1,
//     clientName: "John Doe",
//     clientId: "C123",
//     Description:
//       "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
//     submissionDate: "2023-01-01",
//     response:
//       "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
//     solved: false,
//     resolution: null,
//   },
//   {
//     id: 2,
//     clientName: "Jane Smith",
//     clientId: "C124",
//     Description:
//       "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
//     submissionDate: "2023-02-15",
//     response:
//       "Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.",
//     solved: true,
//     resolution: "Issue resolved by renegotiation.",
//   },
// ];
