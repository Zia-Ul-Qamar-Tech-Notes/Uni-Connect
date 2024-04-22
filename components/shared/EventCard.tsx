import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
};

const EventCard = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();
  const isEventExpired = new Date() > new Date(event.endDateTime);

  return (
    <div className={`flex w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
      isEventExpired ? 'pointer-events-none filter grayscale' : ''
    }`}>
      <div className="relative h-40 w-64 flex-none overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="flex flex-row justify-between p-5 flex-grow ml-4">
        <div>
          <Link href={`/events/${event._id}`}>
            <span className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">{event.title}</span>
          </Link>
          <p className="text-md text-gray-500">{formatDateTime(event.startDateTime).dateTime}</p>
          <p className="text-md text-gray-500">{event.organizer.firstName} {event.organizer.lastName}</p>
          {!hidePrice && (
            <span className={`inline-block mt-2 rounded-full px-3 py-1 ${event.isFree ? 'bg-green-500' : 'bg-blue-500'} text-white text-sm`}>
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
          )}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
