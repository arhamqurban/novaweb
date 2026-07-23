"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProtectedLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * A link that checks authentication before navigating.
 * If the user is not signed in, it redirects to the login page
 * with a callbackUrl so they return to the intended page after login.
 */
export function ProtectedLink({ href, className, children, onClick }: ProtectedLinkProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const loginUrl = `/login?callbackUrl=${encodeURIComponent(href)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    if (!session && !isLoading) {
      e.preventDefault();
      window.location.href = loginUrl;
    }
  };

  // During session loading, render a normal link
  // After loading: if logged in → booking page, if not → login page
  const resolvedHref = isLoading ? href : session ? href : loginUrl;

  return (
    <Link href={resolvedHref} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
