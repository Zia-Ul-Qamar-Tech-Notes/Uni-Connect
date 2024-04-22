import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';

type TableRowProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const TableRow = ({ event, hasOrderLink, hidePrice }: TableRowProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-300 ease-in-out">
      <td className="p-4">
        <Link href={`/events/${event._id}`}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src={event.imageUrl} alt={event.title} width={100} height={60} className="rounded-md" />
            <span className="font-medium text-gray-800">{event.title}</span>
          </div>
        </Link>
      </td>
      {!hidePrice && (
        <td className="p-4 text-center">${event.price}</td>
      )}
      <td className="p-4">{formatDateTime(event.startDateTime).dateTime}</td>
      <td className="p-4">{event.category.name}</td>
      <td className="p-4">{event.organizer.firstName} {event.organizer.lastName}</td>
      {hasOrderLink && (
        <td className="p-4">
          <Link href={`/orders?eventId=${event._id}`}>
            <span className="text-primary-500 flex items-center gap-2 cursor-pointer">
              Order Details
              <Image src="/assets/icons/arrow.svg" alt="details" width={10} height={10} />
            </span>
          </Link>
        </td>
      )}
      {isEventCreator && (
        <td className="p-4 space-x-2 flex justify-end">
          <Link href={`/events/${event._id}/update`}>
            <span className="cursor-pointer">
              <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </span>
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
