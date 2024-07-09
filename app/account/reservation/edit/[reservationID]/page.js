import { SubmitButton } from "@/app/_components/SubmitButton";
import { updateBookingItem } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
// import { useTransition } from "react";

export default async function Page({ params }) {
  // to get the id
  const { reservationID } = params;
  // to get the cabin id to get maxcapacity
  const { cabinId, observations, numGuests } = await getBooking(reservationID);
  //
  // console.log(typeof numGuests);
  const { maxCapacity } = await getCabin(cabinId);
  //

  // const [isPending, startTransition] = useTransition();
  // function handleUpdate() {
  //   startTransition(() => updateBookingItem);
  // }

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation {reservationID}
      </h2>

      <form
        action={updateBookingItem}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            value={numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value={numGuests} key={numGuests}>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>
        <input name="reservationID" value={reservationID} hidden />
        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating......">
            Update reservation
          </SubmitButton>
          {/* {isPending ? "Updating......" : "Update reservation"} */}
        </div>
      </form>
    </div>
  );
}
