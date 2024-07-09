import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  //

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        <li className="flex items-center justify-center gap-4">
          {session?.user ? (
            <>
              <img
                className="h-10 w-10 rounded-3xl"
                src={session?.user.image}
                alt={session?.user.name}
              />
              <Link
                href="/account"
                className="tran sition-colors hover:text-accent-400"
              >
                Guest area
              </Link>
            </>
          ) : (
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
