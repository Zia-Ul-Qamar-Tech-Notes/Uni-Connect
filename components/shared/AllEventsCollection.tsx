import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './EventCard'
import Pagination from './Pagination'

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const AllEventsCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-5 w-full">
          {/* Single column list */}
          <ul className="flex flex-col w-full gap-4">
            {data.map((event) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li key={event._id}>
                  <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ): (
        <div className="flex flex-col items-center justify-center min-h-[200px] w-full gap-3 rounded-lg bg-gray-50 py-20 text-center">
          <h3 className="text-lg font-bold">{emptyTitle}</h3>
          <p className="text-base">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default AllEventsCollection;
