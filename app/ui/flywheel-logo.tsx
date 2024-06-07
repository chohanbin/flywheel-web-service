import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import FlywheelSymbol from "@/app/ui/flywheel-symbol";
import FlywheelTitle from "@/app/ui/flywheel-title";

export default function FlywheelLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <FlywheelSymbol />
      <FlywheelTitle />
    </div>
  );
}
