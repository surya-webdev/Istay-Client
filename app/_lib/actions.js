"use server";

import { revalidatePath } from "next/cache";
//

import { auth, session, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signinAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signoutAction() {
  await signOut("google", { redirectTo: "/" });
}

export async function updateGuestData(formData) {
  const session = await auth();

  if (!session) throw new Error("Not an authendicated user");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a correct NationalID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };
  // console.log(updateData);

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("Not an authendicated user");

  const guestBookingCheck = await getBookings(session.user.guestId);

  if (guestBookingCheck.map((el) => el.id === bookingId))
    await deleteBooking(bookingId);
  else throw new Error("You don't have the access to delete this booking");

  revalidatePath("/account/reservation");
}

export async function updateBookingItem(formData) {
  const session = await auth();

  if (!session) throw new Error("Not an authendicated user");

  // console.log(formData);
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const reservationID = formData.get("reservationID");

  const updatedData = {
    numGuests,
    observations,
  };
  console.log(updatedData);
  await updateBooking(reservationID, updatedData);
  revalidatePath(`/account/reservation/edit/${reservationID}`);
  redirect("/account/reservation");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("Not an authendicated user");

  const { startDate, endDate, id, cabinPrice, numNights } = bookingData;

  const newBooking = {
    cabinId: id,
    guestId: session?.user.guestId,
    startDate,
    endDate,
    totalPrice: cabinPrice,
    numNights,
    isPaid: "false",
    extraPrice: 0,
    hasBreakfast: "false",
    status: "unconfirmed",
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 500),
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${id}`);

  redirect("/thankyou");
}
