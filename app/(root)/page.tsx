import CategoryFilter from "@/components/shared/CategoryFilter";
import Category from "@/components/shared/Categories";
import DataTableCollection from "@/components/shared/DataTableCollection";
import Collection from "@/components/shared/Past";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import UpComingCollection from "@/components/shared/UpComing";
import PastCollection from "@/components/shared/Past";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const { sessionClaims } = auth();
  const admin = sessionClaims?.primaryEmail as string;

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  if (admin == "zia.softwareprogrammer@gmail.com") {
    return (
      <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
          <div className="flex flex-col justify-center gap-8 mb-3">
            <h1 className="h1-bold flex justify-center text-center ">
              Welcome Admin:
            </h1>
          </div>
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left">
              Manage and Create Events
            </h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </section>

        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          {/* <h2 className="h2-bold">Your Trust | Our Reward</h2> */}

          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>

          <DataTableCollection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="h1-bold">
                Welcome To <br />
                UniConnect: Your Events, Our Platform!
              </h1>
              <p className="p-regular-20 md:p-regular-24">
                Our Platform: Events accessible to their Guests & that everyone
                remembers.
              </p>
              <Button size="lg" asChild className="button w-full sm:w-fit">
                <Link href="#events">Explore Now</Link>
              </Button>
            </div>

            <Image
              src="/assets/images/hero.jpg"
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </section>

        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="h2-bold">Your Trust | Our Reward</h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* <Search /> */}
            <Category />
          </div>

          <h2 className="h2-bold">UpComing Events</h2>

          <UpComingCollection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />

          <h2 className="h2-bold">Past Events</h2>

          <PastCollection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={6}
            page={page}
            totalPages={events?.totalPages}
          />
        </section>
      </>
    );
  }
}
