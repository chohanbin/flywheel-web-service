import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import FlywheelSymbol from "@/app/ui/flywheel-symbol";
import FlywheelTitle from "@/app/ui/flywheel-title";

export default function FlywheelLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/enso.svg"
        alt="Flywheel logo based on 'enso' symbol"
        width={69}
        height={68}
        priority
      />
      <div
        className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      >
        <div className="ml-3 text-[44px]">Flywill</div>{" "}
        {/* Rebranded "Flywheel to Flywill" */}
      </div>
    </div>
  );
}
