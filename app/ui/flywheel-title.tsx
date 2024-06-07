import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function FlywheelTitle() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <div className="ml-3 text-[44px]">Flywill</div>{" "}
      {/* Rebranding "Flywheel to Flywill" */}
    </div>
  );
}
