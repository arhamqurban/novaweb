import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container-nova text-center">
        <span className="font-heading text-[120px] font-bold text-accent-primary leading-none">
          404
        </span>
        <h1 className="heading-1 text-white mt-4 mb-4">Page Not Found</h1>
        <p className="body-lg text-text-secondary max-w-md mx-auto mb-8">
          Even the best URLs wander sometimes. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-text-inverse transition-all hover:shadow-cyan-md"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
