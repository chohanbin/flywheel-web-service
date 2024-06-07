"use client";

import { HomeIcon, CubeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const mockAccountIds = [111111, 222222, 333333, 444444, 555555, 666666];

const links = mockAccountIds.map((id) => {
  return { name: id, href: `/dashboard/${id}`, icon: CubeIcon };
});

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {/* TODO idea: Currently, in a narrow window (mobile), the nav buttons (each representing an account)
                       crowd into the same row. This may be fine for now, since the max number of accounts
                       that a customer holds happens to be 6. However, there is no guarantee that the customer
                       cannot have more accounts. It may be better to display a dropdown menu, then showing
                       the navs for all accounts all the time.
        */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="hidden md:block md:w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
