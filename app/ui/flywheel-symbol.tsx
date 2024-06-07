import Image from "next/image";

export default function FlywheelSymbol() {
  return (
    <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
      src="/enso.svg"
      alt="Next.js Logo"
      width={69}
      height={68}
      priority
    />
  );
}
