import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image src="/logo.png" height="60" width="60" alt="IStay logo" />
      <span className="text-xl font-semibold text-primary-100">IStay</span>
    </Link>
  );
}

export default Logo;
