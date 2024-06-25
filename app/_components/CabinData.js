import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinData() {
  const cabins = await getCabins();
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinData;
