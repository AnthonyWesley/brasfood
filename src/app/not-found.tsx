import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-20">
      <div className="card max-w-lg p-10 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-8 text-3xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go to home
          </Link>
          <Link href="/catalogue" className="btn-light">
            Customer portal
          </Link>
        </div>
      </div>
    </main>
  );
}
