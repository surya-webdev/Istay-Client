"use client";

import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDate, cabin }) {
  const { setRange, range, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDate) ? {} : range;
  // console.log("range");
  // console.log(range);
  // console.log("displayRange");
  // console.log(displayRange);

  const { regularPrice, discount } = cabin;

  const numNights = differenceInDays(displayRange?.to, displayRange?.from);

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between text-lg">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        // captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={setRange}
        selected={displayRange}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDate.some((date) => isSameDay(date, currDate))
        }
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                {/* price */}
                <span className="text-2xl">₹{regularPrice}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ₹{discount}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">₹{cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {displayRange?.from || displayRange?.to ? (
          <div>
            <button
              className="border border-primary-800 px-4 py-2 text-sm font-semibold"
              onClick={() => resetRange()}
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
