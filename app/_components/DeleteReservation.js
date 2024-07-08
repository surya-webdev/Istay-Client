"use client";

import { useFormStatus } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(bookingId) {
    if (confirm("Are you sure want to delete the reservation?"))
      startTransition(deleteReservation(bookingId));
  }

  return (
    <button
      onClick={() => handleDelete(bookingId)}
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <span className="mt-1">Delete</span>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
        </>
      ) : (
        <span className="block flex justify-center">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
