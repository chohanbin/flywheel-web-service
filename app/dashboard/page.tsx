import { auth } from "@/auth";

export default async function DashboardPage() {
  let session = await auth();
  // TODO: Handle if session, user is undefined;
  const customer = session?.user;

  return (
    <div className="text-2xl mb-8">
      Welcome {customer?.name}! Select an account to view its transaction
      history.
    </div>
  );
}
