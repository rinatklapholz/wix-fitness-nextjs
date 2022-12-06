import './page.css';
import { getServiceBySlug } from '@model/service/service-api';
import Calendar from '@app/components/Calendar/Calendar';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { Suspense } from 'react';

export default async function CalendarPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const service = await getServiceBySlug(params.slug, wixSession);

  return (
    <>
      {service ? (
        <>
          <section className="align-middle box-border p-7 pt-16 text-left">
            <h1 className="text-4xl mb-4">{service?.info?.name}</h1>
            <p className="text-sm">
              Check out our availability and book the date and time that works
              for you
            </p>
          </section>

          <div
            key={service.id}
            className="full-w rounded overflow-hidden max-w-7xl mx-auto"
          >
            <Suspense fallback={'Loading 2'}>
              <Calendar service={service} wixSession={wixSession} />
            </Suspense>
          </div>
        </>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </>
  );
}