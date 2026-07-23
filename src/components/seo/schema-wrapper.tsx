import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema, ServiceSchema } from "./json-ld";

/**
 * Renders all global JSON-LD schema markup.
 * Include this in the root layout once.
 */
export function GlobalSchemaMarkup() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />
      <ServiceSchema />
    </>
  );
}
