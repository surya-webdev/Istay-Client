// import { metadata } from "../layout";

import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};
async function page() {
  const session = await auth();

  return (
    <div className="mx-10 text-accent-500">{`Welcome ${session?.user.name} `}</div>
  );
}

export default page;
