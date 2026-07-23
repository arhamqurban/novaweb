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
  const { data: session } = useSession();

  const loginUrl = `/login?callbackUrl=${encodeURIComponent(href)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      window.location.href = loginUrl;
    }
  };

  // If not logged in, link directly to login with callback
  // If logged in, link to the actual page
  return (
    <Link
      href={session ? href : loginUrl}
      className={className}
      onClick={onClick || handleClick}
    >
      {children}
    </Link>
  );
}
