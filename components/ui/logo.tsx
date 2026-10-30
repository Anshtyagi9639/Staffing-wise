import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/** Official Staffing Wise logo (from the current website), with a transparent background for navy surfaces. */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("block shrink-0", className)} aria-label="Staffing Wise home">
      <Image
        src="/brand/staffing-wise-logo-480.png"
        alt="Staffing Wise, outsourcing made simple"
        width={480}
        height={269}
        priority={priority}
        sizes="140px"
        className="h-auto w-full"
      />
    </Link>
  );
}
