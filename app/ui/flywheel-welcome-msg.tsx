import { lusitana } from "@/app/ui/fonts";

export default function FlywheelWelcomeMsg() {
  return (
    <p
      className={`${lusitana.className} text-xl text-gray-800 md:text-3xl my-5 md:leading-normal`}
    >
      <strong>Welcome to Flywill Trading</strong>,
      <br />
      your{" "}
      <a
        href="https://www.goodreads.com/work/quotes/66180399-turning-the-flywheel-a-monograph-to-accompany-good-to-great"
        className="text-blue-500"
      >
        Flywheel
      </a>{" "}
      of fortune.
    </p>
  );
}
