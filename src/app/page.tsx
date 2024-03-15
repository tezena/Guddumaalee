import CreateAccountForm from "./client/createAccount/createAccountForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8  mx-auto">
      {/* <h1 className=" text-4xl"> Guduumalee </h1> */}
      <CreateAccountForm />
    </main>
  );
}
