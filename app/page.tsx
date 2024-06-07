import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import FlywheelTitle from "@/app/ui/flywheel-title";
import FlywheelLogo from "./ui/flywheel-logo";
import LoginButton from "./ui/login-button";
import FlywheelWelcomeMsg from "./ui/flywheel-welcome-msg";
import UsernameInput from "./ui/username-input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-white">
      <div className="flex h-30 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {<FlywheelLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <FlywheelWelcomeMsg />
          <form action="/login" method="POST">
            <UsernameInput />
            <LoginButton />
          </form>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/enso.svg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt=" showing desktop version"
          />
          <Image
            src="/enso.svg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
