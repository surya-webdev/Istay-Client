// const { default: Spinner } = require("./_components/Spinner");
import Spinner from "@/app/_components/Spinner";

export default function loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
