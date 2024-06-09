import { auth } from "@/auth";
import { lusitana } from "../ui/fonts";

export default async function DashboardPage() {
  let session = await auth();
  const custName = session?.user?.name;
  if (!custName) {
    // TODO: Handle if session, user is undefined;
  }
  return (
    <div className={`${lusitana.className} text-2xl mb-8`}>
      Welcome {custName}! Select an account to view transations.
    </div>
  );
}
