import { appUrl } from "@/lib/app-url";

export function AppLink({
  path,
  className,
  children,
}: {
  path: "/register" | "/login" | "/plans";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={appUrl(path)} className={className}>
      {children}
    </a>
  );
}
