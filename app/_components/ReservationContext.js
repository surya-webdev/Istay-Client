"use client";

import { createContext, useContext, useState } from "react";

const Reservation = createContext();

const initalState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initalState);

  const resetRange = () => setRange(initalState);

  return (
    <Reservation.Provider value={{ range, setRange, resetRange }}>
      {children}
    </Reservation.Provider>
  );
}

function useReservation() {
  const context = useContext(Reservation);

  if (context === undefined) throw new Error("Using a context outside");

  return context;
}

export { useReservation, ReservationProvider };
