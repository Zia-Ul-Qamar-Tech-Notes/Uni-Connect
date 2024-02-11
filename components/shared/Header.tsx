import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItemsAdmin from "./NavItemsAdmin"
import NavItemsClient from "./NavItemsClient"
import MobileNav from "./MobileNav"

const Header = () => {
  const { sessionClaims } = auth();
  const primaryEmail = sessionClaims?.primaryEmail;
  const userId = sessionClaims?.userId as string
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo1.png" width={128} height={38}
            alt="Evently logo" 
          />
        </Link>

        <SignedIn>
        {primaryEmail === 'zia.softwareprogrammer@gmail.com' || 'Ahmadalitahir54@gmail.com' ? (
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItemsAdmin />
          </nav>
          ) : (
            <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItemsClient />
          </nav>
          )}
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header