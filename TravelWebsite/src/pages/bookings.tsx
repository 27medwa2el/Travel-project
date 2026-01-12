import Link from "next/link";
import { useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult, ISuggestionFormatted } from "../types/typings";

type Props = {
  bookings: IResult[];
};

const Bookings = ({ bookings }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<ISuggestionFormatted | null>(
    null
  );

  return (
    <div>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className="flex">
        {/* left section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">Reservation history list</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Bookings</h1>
          <div className="flex flex-col">
            {/* Map Bookings */}
            {bookings?.map((item) => (
              <InfoCard
                key={item.img}
                item={item}
                favorite={false}
                booking={true}
                fromFavPage={true}
              />
            ))}
          </div>
        </section>
        {/* MapBox, Right Section */}
        <section className="hidden lg:inline-flex flex-grow xl:min-w-[600px]">
          <div className="sticky top-[68px] w-full h-screen">
            <MapCard searchResults={bookings} favorites={true} />
          </div>
        </section>
      </main>
      <Footer />

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-item">
          <Link href={"/favorites"}>List of Favorites</Link>
        </p>
        <p className="drawer-current-item">Your Bookings</p>
      </Drawer>
    </div>
  );
};

export default Bookings;

export const getServerSideProps = async () => {
  // For now, return empty bookings since travel routes are public
  // In the future, you can get user email from Clerk and fetch bookings
  const bookings: IResult[] = [];

  return {
    props: {
      bookings,
    },
  };
};
