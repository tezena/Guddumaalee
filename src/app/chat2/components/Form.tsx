"use client";

import { useRef } from "react";
import { postData } from "./action";
import { Paperclip } from "lucide-react";

interface Props {
  recipent_id: number;
}

const Form: React.FC<Props> = ({ recipent_id }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (formData) => {
        //@ts-ignore
        formData.append("recipient_id", recipent_id);
        await postData(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="p-6 absolute bottom-0 left-0 w-full bg-white"
    >
      <div className="flex flex-row items-center ">
        <div className=" cursor-pointer">
        <Paperclip/>
           
        </div>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
