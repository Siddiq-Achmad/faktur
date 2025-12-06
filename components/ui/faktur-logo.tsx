import { cn } from "@/lib/utils";

interface FakturLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function FakturLogo({
  className,
  width = 24,
  height = 24
}: FakturLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 78 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M20 69H0V64.3828L20 50.6924V69ZM49 69H29V44.5312L49 30.8398V69ZM78 69H58V24.6787L78 10.9883V69ZM20 44.6328L0 58.3242V0H20V44.6328ZM49 24.7812L29 38.4717V0H49V24.7812ZM78 4.92871L58 18.6201V0H78V4.92871Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
