import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const primaryEmail = sessionClaims?.primaryEmail;
  const userId = sessionClaims?.userId as string

  return (
    <>
      {primaryEmail === 'zia.softwareprogrammer@gmail.com'? (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
          </section>

          <div className="wrapper my-8">
            <EventForm userId={userId} type="Create" />
          </div>
        </>
      ) : (
        <div className="text-red-600 font-medium p-4 mb-4 bg-red-100 rounded-lg text-center">
          Only for Admin
        </div>
      )}
    </>
  );
};

export default CreateEvent;