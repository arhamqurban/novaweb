const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export function SearchConsoleVerification() {
  if (!GSC_VERIFICATION) return null;

  return (
    <meta
      name="google-site-verification"
      content={GSC_VERIFICATION}
    />
  );
}
