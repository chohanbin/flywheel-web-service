import { auth } from "@/auth";
import { lusitana } from "../ui/fonts";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  let session = await auth();
  const custName = session?.user?.name;
  if (!custName) {
    redirect("/");
  }
  return (
    <div className={`${lusitana.className} text-2xl mb-8`}>
      Welcome {custName}! Select an account to view transations.
    </div>
  );
}
