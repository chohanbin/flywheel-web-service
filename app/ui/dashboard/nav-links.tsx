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
//   const links = [
//     { name: 'Home', href: '/dashboard', icon: HomeIcon },
//     {
//       name: 'Invoices',
//       href: '/dashboard/invoices',
//       icon: CubeIcon,
//     },
//     { name: 'Customers', href: '/dashboard/customers', icon: CubeIcon },
//   ];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
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
