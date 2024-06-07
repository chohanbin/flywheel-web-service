import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginButton() {
  return (
    <button
      type="submit"
      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 mt-8 text-sm font-medium text-white transition-colors hover:bg-blue-400 w-60 md:text-base"
    >
      <span>Log in</span> <ArrowRightIcon className="ml-24 w-5 md:w-6" />
    </button>
  );
}
