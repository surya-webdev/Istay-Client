import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function DateReservation({ cabin }) {
  console.log(cabin);
  const [settings, bookedDate] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  //

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-10 border border-primary-400 px-2 py-10 sm:grid-cols-2">
      <DateSelector settings={settings} bookedDate={bookedDate} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default DateReservation;
