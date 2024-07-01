import { Suspense } from "react";
import CabinData from "@/app/_components/CabinData";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import { getCabins } from "../_lib/data-service";
import ReservationReminder from "@/app/_components/ReservationReminder";
import { auth } from "../_lib/auth";

// import { useSearchParams } from "next/navigation";

export const metadata = {
  title: "Cabin",
};
export default async function Page({ searchParams }) {
  const session = await auth();
  console.log(session);
  console.log("yessssss");
  //
  let displayData;

  const filter = searchParams?.capacity ?? "all";
  const cabins = await getCabins();

  if (filter === "all") displayData = cabins;

  if (filter === "small")
    displayData = cabins.filter((el) => el.maxCapacity <= 2);

  if (filter === "medium")
    displayData = cabins.filter(
      (el) => el.maxCapacity >= 3 && el.maxCapacity < 7,
    );

  if (filter === "large")
    displayData = cabins.filter((el) => el.maxCapacity >= 8);

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end">
        <div className="my-4 border-[2px] border-primary-800">
          <Filter />
        </div>
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinData cabins={displayData} />
      </Suspense>

      <ReservationReminder />
    </div>
  );
}
