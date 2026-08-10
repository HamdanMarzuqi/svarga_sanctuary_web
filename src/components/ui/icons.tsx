// Icons Lucide tidak punya: WhatsApp & Kompas dekoratif. Inline SVG supaya bebas dependency.
type IconProps = { size?: number; className?: string };

export function WhatsappLogo({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M128 0C57.6 0 0 57.6 0 128c0 22.6 5.9 43.8 16.2 62.2L0 256l67.7-15.8A127.4 127.4 0 0 0 128 256c70.4 0 128-57.6 128-128S198.4 0 128 0Zm0 233.6a105 105 0 0 1-54.6-15.3l-4-2.3-40.1 9.4 9.7-39.1-2.6-4.1A105 105 0 0 1 22.4 128C22.4 69.8 69.8 22.4 128 22.4S233.6 69.8 233.6 128 186.2 233.6 128 233.6Zm57.8-78.9c-3.2-1.6-18.7-9.2-21.6-10.3-2.9-1-5-1.6-7.2 1.6-2.1 3.2-8.3 10.3-10.1 12.4-1.9 2.1-3.7 2.4-6.9.8-3.2-1.6-13.4-4.9-25.5-15.7-9.4-8.4-15.8-18.8-17.7-22-1.9-3.2-.2-4.9 1.4-6.5 1.4-1.4 3.2-3.7 4.8-5.6 1.6-1.9 2.1-3.2 3.2-5.3 1-2.1.5-4-.3-5.6-.8-1.6-7.2-17.4-9.9-23.8-2.6-6.3-5.2-5.4-7.2-5.5h-6.1c-2.1 0-5.6.8-8.5 4-2.9 3.2-11.2 10.9-11.2 26.6s11.4 30.9 13 33c1.6 2.1 22.5 34.3 54.5 48.1 7.6 3.3 13.6 5.2 18.2 6.7 7.7 2.4 14.6 2.1 20.1 1.3 6.1-.9 18.7-7.6 21.4-15 2.6-7.4 2.6-13.7 1.9-15-.8-1.3-2.9-2.1-6.1-3.7Z"/>
    </svg>
  );
}

export function Compass({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
