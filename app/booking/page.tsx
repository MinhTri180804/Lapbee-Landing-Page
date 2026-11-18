import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { BookingContactSection } from '@/components/sections/BookingContactSection';
import { BookingFormSection } from '@/components/sections/BookingFormSection';
import bookingStyles from '@/components/sections/BookingSection.module.css';
import { getPageContent, getSiteSettings } from '@/content';
import { initialBookingState } from '@/lib/booking';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { toContactInfo } from '@/lib/site';

import { submitBooking } from './actions';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPageContent('booking');
  return buildMetadata({ seo, path: routes.booking() });
}

/** Đặt lịch — URL công khai /dat-lich. Form gửi qua server action (chưa nối backend — Q4). */
export default async function BookingPage() {
  const [{ sections }, site] = await Promise.all([getPageContent('booking'), getSiteSettings()]);
  return (
    <>
      <PageHero {...sections.hero} />
      <section className={`lb-container ${bookingStyles.layout}`} aria-label={sections.hero.title}>
        <BookingFormSection
          data={sections.form}
          action={submitBooking}
          initialState={initialBookingState}
          phone={site.phone}
        />
        <BookingContactSection data={sections.contact} contact={toContactInfo(site)} />
      </section>
    </>
  );
}
