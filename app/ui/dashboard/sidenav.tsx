import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import FlywheelLogo from "@/app/ui/flywheel-logo";
import SignOutButton from "./signout-button";
import { auth } from "@/auth";
import { fetchAccountIds } from "@/app/lib/data";
import { AccountId } from "@/app/lib/definitions";
import { lusitana } from "../fonts";

export default async function SideNav() {
  let session = await auth();
  const custEmail = session?.user?.email;
  if (!custEmail) {
    // TODO: Handle if session, user is undefined;
    return <></>;
  }
  const accountIds: AccountId[] | undefined = await fetchAccountIds(custEmail);

  if (!accountIds) {
    // TODO: Handle if session, accountIds is undefined.
    return <></>;
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-30 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
        <div className="w-32 text-white md:w-40">
          <FlywheelLogo />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks accountIds={accountIds} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <SignOutButton />
      </div>
    </div>
  );
}
