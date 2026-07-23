import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <span className="font-heading text-[80px] font-bold text-error leading-none">403</span>
        <h1 className="heading-1 text-white mt-4 mb-3">Access Denied</h1>
        <p className="body text-text-secondary mb-8">
          You don&apos;t have permission to access this area. If you believe this is a mistake, please contact the administrator.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="gradient-cyan inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-text-inverse transition-all hover:shadow-cyan-md">
            Back to Homepage
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-text-inverse">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
