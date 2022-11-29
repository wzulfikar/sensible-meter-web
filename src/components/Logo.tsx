import Link from "next/link";

export const Logo = () => (
  <Link href="/">
    <div className="flex gap-2">
      <span className="text-[hsl(280,100%,70%)]">Sensible</span> Meter
    </div>
  </Link>
);
