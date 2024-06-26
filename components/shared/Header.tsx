import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo2.png"
            width={128}
            height={60}
            alt="Evently logo"
          />
        </Link>
        <Link href="/search">
          <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={24}
              height={24}
            />
            <Input
              type="text"
              placeholder="Search your Events"
              readOnly
              className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </Link>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs justify-end">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-up">Signup</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
