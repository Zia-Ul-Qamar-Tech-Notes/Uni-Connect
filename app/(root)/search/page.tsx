import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/AllEventsCollection'
import Search from '@/components/shared/Search';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';


export default async function SearchPage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  console.log(searchText)
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 12
  })

  return (
    <>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Search What you are Lookin for</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        {(category.length && searchText.length > 0 ?
        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
        : <div className=' text-center justify-center flex h2-bold'>
            <h2>Please Search</h2>
        </div>
        )}
      </section>
    </>
  )
}
