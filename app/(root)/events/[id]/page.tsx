import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { auth } from "@clerk/nextjs";
import { IOrder } from "@/lib/database/models/order.model";
import { IEvent } from "@/lib/database/models/event.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  const event = await getEventById(id);
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const order = orders?.data.find(
    (order: IOrder) => order.event._id === event._id
  );
  const orderId = order?._id; // Retrieve the order ID

  console.log("This is OrderId" + orderId);

  const hasBought = orderedEvents.some(
    (orderedEvent: IEvent) => orderedEvent._id === event._id
  );

  console.log(orderedEvents);
  console.log(hasBought);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain m-3">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl m-12">
          <div className="relative w-full h-full min-h-[300px] md:h-auto">
            <Image
              src={event.imageUrl}
              alt="hero image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              {hasBought ? (
                <button
                  className="btn-disabled flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
                  disabled
                >
                  <Link
                    href={{
                      pathname: `/events/${id}/ticket`,
                      query: {
                        eventName: event.title,
                        price: event.price,
                        location: event.location,
                        date: formatDateTime(event.startDateTime).dateOnly,
                        time: formatDateTime(event.startDateTime).timeOnly,
                        etime: formatDateTime(event.endDateTime).timeOnly,
                        img: event.imageUrl,
                        organizer: event.organizer.firstName,
                        id: event._id,
                        orderId: orderId,
                      },
                    }}
                  >
                    See Ticket
                  </Link>
                </button>
              ) : (
                <CheckoutButton event={event} />
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3 items-center">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-medium-16 lg:p-regular-18 text-primary-500 underline truncate"
              >
                {event.url}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
