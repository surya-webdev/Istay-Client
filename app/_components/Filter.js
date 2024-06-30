"use client";

import {
  useSearchParams,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";

const options = [
  {
    title: "All",
    href: "all",
  },
  {
    title: "1-3 Cabins",
    href: "small",
  },
  {
    title: "3-7 Cabins",
    href: "medium",
  },
  {
    title: "More than 8",
    href: "large",
  },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const active = searchParams.get("capacity") ?? "all";

  function handler(filter) {
    // console.log(filter);
    const search = new URLSearchParams(searchParams);
    search.set("capacity", filter);
    router.replace(`${pathName}?${"capacity"}=${filter}`, { scroll: false });
  }
  return (
    <>
      {options.map((el) => (
        <Button active={active} handler={handler} options={el} key={el.title} />
      ))}
    </>
  );
}

function Button({ options, handler, active }) {
  const { title, href } = options;
  return (
    <button
      onClick={() => handler(href)}
      className={`mx-2 px-6 py-4 text-xl transition-all duration-100 hover:bg-primary-500 ${href === active ? "bg-primary-500" : ""}`}
    >
      {title}
    </button>
  );
}
