"use client";

interface TrustBarProps {
  heading: string;
  logos: Array<{ name: string; src: string }>;
}

export function TrustBar({ heading, logos }: TrustBarProps) {
  return (
    <section className="border-y border-border-default bg-bg-secondary">
      <div className="container-nova py-10 text-center">
        <p className="overline text-text-muted mb-8">
          {heading}
        </p>

        {/* Desktop: Auto-scrolling logos */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex animate-marquee gap-16">
            {/* Double the logos for seamless scroll */}
            {[...logos, ...logos].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="h-8 w-28 rounded bg-gradient-to-r from-gray-700/40 to-gray-600/20 flex items-center justify-center">
                  <span className="text-xs text-text-muted font-medium tracking-wider opacity-50">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Static grid */}
        <div className="grid grid-cols-3 gap-6 md:hidden">
          {logos.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center"
            >
              <div className="h-8 w-full rounded bg-gradient-to-r from-gray-700/40 to-gray-600/20 flex items-center justify-center">
                <span className="text-xs text-text-muted font-medium tracking-wider opacity-50">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
