import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function DateReservation({ cabin }) {
  // to fetch the all promise in the same time
  const [settings, bookedDate] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  //

  const session = await auth();

  // console.log(user);
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-10 border border-primary-400 px-2 py-10 sm:grid-cols-2">
      <DateSelector cabin={cabin} settings={settings} bookedDate={bookedDate} />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default DateReservation;
