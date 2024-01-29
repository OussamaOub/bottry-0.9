import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={"/heroes/not-found.png"}
        alt="Empty"
        className="dark:hidden"
        height={300}
        width={300}
      />
      <Image
        src={"/heroes/not-found-dark.png"}
        alt="Empty"
        className="hidden dark:block"
        height={300}
        width={300}
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
}

export default Error;
