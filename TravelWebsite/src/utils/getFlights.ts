import { format } from "date-fns";

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  origin: string;
  destination: string;
  flightNumber: string;
  bookingUrl: string;
  returnDate?: string;
}

export const getFlights = async (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string
): Promise<Flight> => {
  // Wego URL structure: c[3-char-code]-c[3-char-code]-[YYYY-MM-DD]
  const getWegoCode = (cityName: string) => {
    const clean = cityName.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.includes('london')) return 'lon';
    if (clean.includes('newyork')) return 'nyc';
    if (clean.includes('paris')) return 'par';
    if (clean.includes('dubai')) return 'dxb';
    if (clean.includes('tokyo')) return 'tyo';
    if (clean.includes('riyadh')) return 'ruh';
    if (clean.includes('toronto')) return 'yto';
    return clean.substring(0, 3);
  };

  const codeFrom = getWegoCode(origin);
  const codeTo = getWegoCode(destination);
  
  let wegoUrl = '';
  const paymentParams = '&payment_methods=10%2C15%2C152%2C189%2C191%2C206';
  
  if (returnDate) {
    // Round-trip URL: c[from]-c[to]-[depDate]:c[to]-c[from]-[retDate]
    wegoUrl = `https://sa.wego.com/flights/searches/c${codeFrom}-c${codeTo}-${departureDate}:c${codeTo}-c${codeFrom}-${returnDate}/economy/1a:0c:0i?sort=score&order=desc${paymentParams}`;
  } else {
    // One-way URL
    wegoUrl = `https://sa.wego.com/flights/searches/c${codeFrom}-c${codeTo}-${departureDate}/economy/1a:0c:0i?sort=score&order=desc${paymentParams}`;
  }

  // Return a single premium featured result
  return {
    id: `WEGO-FEATURED-${Date.now()}`,
    airline: 'Best Round-Trip Rates',
    airlineLogo: 'https://www.vectorlogo.zone/logos/wego/wego-icon.svg',
    departureTime: 'Flexible Options',
    arrivalTime: 'Real-Time Deals',
    duration: returnDate ? '2-Way Ticket' : '1-Way Ticket',
    price: 450, 
    currency: 'USD',
    stops: 0,
    origin: origin,
    destination: destination,
    flightNumber: 'WEGO-PRO',
    bookingUrl: wegoUrl,
    returnDate: returnDate
  };
};
