"use client";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "./container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const paths = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Records",
    path: "/",
  },
];
import { Logo } from "./logo";
import Link from "next/link";
import { AddRecord } from "./records";
export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Container>
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-6">
          <Logo />
          {paths.map((item, index) => (
            <Link key={index} href={item.path}>
              <div
                className={item.path === pathname ? "font-bold" : "font-light"}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <AddRecord text="Record" />
          <Avatar onClick={() => { localStorage.clear(), router.push("/login") }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>Pro</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Container>
  );
};
