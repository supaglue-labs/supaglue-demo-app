import {
  BuildingOfficeIcon,
  Cog6ToothIcon,
  HomeIcon,
  PaperAirplaneIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Inter } from "next/font/google";
import Image from "next/image";

import FaceIcon from "../assets/face.avif";
import "./globals.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: false },
  { name: "People", href: "/people", icon: UsersIcon, current: false },
  {
    name: "Companies",
    href: "/companies",
    icon: BuildingOfficeIcon,
    current: false,
  },
  {
    name: "Sequences",
    href: "/sequences",
    icon: PaperAirplaneIcon,
    current: false,
  },
  // {
  //   name: "Conversations",
  //   href: "/conversations",
  //   icon: ChatBubbleBottomCenterTextIcon,
  //   current: false,
  // },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apolla.io",
  description: "Reach every buyer on earth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center text-accent text-2xl">
              Apolla.io
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <Image
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src={FaceIcon}
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="lg:pl-72">{children}</main>
      </body>
    </html>
  );
}
