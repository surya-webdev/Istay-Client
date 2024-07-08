"use server";

import { revalidatePath } from "next/cache";
//

import { auth, session, signIn, signOut } from "./auth";
import { deleteBooking, getBookings, updateGuest } from "./data-service";

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
