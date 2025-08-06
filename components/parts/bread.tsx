import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react"; 
import { usePathname } from "next/navigation";

export function Breadcrumb({ children, className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" className={cn("mb-8", className)} {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ children, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className="flex flex-wrap text-muted-foreground items-center space-x-2"
      {...props}
    >
      {children}
    </ol>
  );
}

export function BreadcrumbItem({ children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className="inline-flex items-center gap-1.5" {...props}>
      {children}
    </li>
  );
}

export function BreadcrumbLink({
  href,
  children,
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a href={href} className={cn("font-medium", className)} {...props}>
      {children}
    </a>
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </span>
  );
}

export function Bread() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'TOP' },
    { href: '/', label: '∞AI LP' },
    { href: '/', label: '競合分析' },
    { href: '/', label: '競合分析結果' },
    { href: '/', label: '改善案生成' },
    { href: '/improvement-result', label: '改善案生成結果' },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <BreadcrumbItem key={index}>
             <BreadcrumbLink
                className={cn(
                  "text-[12px]", 
                  isActive ? "text-[#777777]" : "text-[#212121]"
                )}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </BreadcrumbLink>
              {index < links.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}