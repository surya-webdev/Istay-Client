import SelectCountry from "@/app/_components/SelectCountry";
import UpdateForm from "@/app/_components/UpdateForm";
import { auth, session } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export default async function Page() {
  const session = await auth();
  // console.log(session);
  const user = await getGuest(session.user.email);
  const guest = user.at(0);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateForm guest={guest}>
        <SelectCountry
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          name="nationality"
          id="nationality"
          defaultCountry={guest.nationality}
        />
      </UpdateForm>
    </div>
  );
}
