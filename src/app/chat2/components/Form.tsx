"use client";

import { useRef } from "react";
import { postData } from "./action";
import { Paperclip } from "lucide-react";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import OfferModal from "@/app/lawyer/offer/offer";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";

interface Props {
  recipent_id: number;
}

interface OfferProps {
  caseId: string;
  title: string;
  describtion: string;
  price: number;
}

const Form: React.FC<Props> = ({ recipent_id }) => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [offer, setOffer] = useState("");

  //@ts-ignore
  const userType = session?.user?.image?.type;

  const HandleFileSend = (url: string, fileType: string) => {
    if (fileType === "image/png") {
      console.log("file type");
      fileType = "png";
    }
    if (fileType == "application/pdf") {
      fileType = "pdf";
    }

    const fileData = {
      recipient_id: recipent_id,
      message: url,
      fileType: fileType,
      messageType: "file",
    };
    //@ts-ignore
    postData(undefined, fileData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  function HandleOffers(caseId: number): void {
    // {caseId ,title,  description,price}=data

    const case_Id = caseId.toString();

    console.log(`case id in funcion ${case_Id}`);
    console.log("post called");

    const offerData = {
      recipient_id: recipent_id,
      message: case_Id,
      messageType: "offer",
    };
    postData(undefined, offerData);
  }

  return (
    <form
      action={async (formData) => {
        //@ts-ignore
        formData.append("recipient_id", recipent_id);

        formData.append("messageType", "text");

        await postData(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="p-6 absolute bottom-0 left-0 w-full bg-white"
    >
      <div className="flex flex-row items-center ">
        <div className=" cursor-pointer">
          {open ? (
            <UploadDropzone
              className=" bg-transparent-100 "
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                console.log(res[0].url, res[0].type);
                HandleFileSend(res[0].url, res[0].type);
                setOpen(!open);
              }}
              onUploadError={(error: Error) => {
                toast({ title: `ERROR! ${error.message}` });
              }}
            />
          ) : (
            <Paperclip onClick={() => setOpen(!open)} />
          )}
        </div>

        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
        />
        <div className="flex items-center ">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full mr-2"
          >
            Send
          </button>
          {userType === "lawyer" ? (
            <Button
              onClick={handleOpenModal}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
            >
              Create Offer
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        client_id={recipent_id}
      />
    </form>
  );
};

export default Form;
