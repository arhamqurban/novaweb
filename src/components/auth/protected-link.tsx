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

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      const callbackUrl = encodeURIComponent(href);
      window.location.href = `/login?callbackUrl=${callbackUrl}`;
    }
  };

  return (
    <Link href={session ? href : "#"} className={className} onClick={onClick || handleClick}>
      {children}
    </Link>
  );
}
