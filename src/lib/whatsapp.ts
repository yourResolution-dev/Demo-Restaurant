import { ReservationConfirmation } from '../types/restaurant.types';

/** Formats a yyyy-mm-dd date as e.g. "Sat, 22 Nov 2026" without timezone drift. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** The booking details as a plain-text WhatsApp message. */
export function buildBookingMessage(
  booking: ReservationConfirmation,
  restaurantName: string
): string {
  const lines = [
    `Hello ${restaurantName}! I just made a reservation online.`,
    '',
    `Reference: ${booking.bookingId}`,
    `Name: ${booking.fullName}`,
    `Date: ${formatDate(booking.date)}`,
    `Time: ${booking.timeSlot}`,
    `Party size: ${booking.guests} ${booking.guests === 1 ? 'guest' : 'guests'}`,
    `Seating: ${booking.seatingArea}`,
    `Occasion: ${booking.occasion}`,
  ];
  if (booking.tastingMenuSelected) lines.push('Tasting flight: pre-selected on the website');
  if (booking.specialRequests.trim()) lines.push(`Notes: ${booking.specialRequests.trim()}`);
  lines.push('', 'Please confirm my table. Thank you!');
  return lines.join('\n');
}

/**
 * wa.me link that opens WhatsApp to the restaurant with the booking prefilled.
 * `whatsappNumber` is digits only with country code, e.g. 919332012109.
 */
export function bookingWhatsAppUrl(
  booking: ReservationConfirmation,
  info: { name: string; whatsappNumber: string }
): string {
  const text = encodeURIComponent(buildBookingMessage(booking, info.name));
  return `https://wa.me/${info.whatsappNumber}?text=${text}`;
}
