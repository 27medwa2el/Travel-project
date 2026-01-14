import Link from "next/link";
import { useState } from "react";
import Drawer from "../components/Drawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import MapCard from "../components/MapCard";
import { IResult, ISuggestionFormatted } from "../types/typings";

import { getAuth } from "@clerk/nextjs/server";

type Props = {
  favorites: IResult[];
};

const Favorites = ({ favorites }: Props) => {
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
        {/* Left Section */}
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">Accommodation list</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Favorites</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {/* Map Favorite Hotels */}
            {favorites?.map((item) => (
              <InfoCard
                key={item.img}
                item={item}
                favorite={true}
                fromFavPage={true}
              />
            ))}
          </div>
        </section>
        {/* MapBox, Right Section */}
        <section className="hidden lg:inline-flex flex-grow xl:min-w-[600px]">
          <div className="sticky top-[68px] w-full h-screen">
            <MapCard searchResults={favorites} favorites={true} />
          </div>
        </section>
      </main>
      <Footer />
      {/* Drawer Menu, hided by default */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="drawer-current-item">List of Favorites</p>
        <p className="drawer-item">
          <Link href={"/bookings"}>Your Bookings</Link>
        </p>
      </Drawer>
    </div>
  );
};

export default Favorites;

export const getServerSideProps = async (context: any) => {
  const { userId } = getAuth(context.req);
  
  if (!userId) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  // In the future, fetch user-specific favorites from your database
  const favorites: IResult[] = [];

  return {
    props: {
      favorites,
    },
  };
};
