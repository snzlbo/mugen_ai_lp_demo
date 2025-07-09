'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function Bread() {
  const links = [
    { href: '/', label: 'TOP' },
    { href: '/', label: '∞AI LP' },
    { href: '/', label: '競合分析' },
    { href: '/', label: '競合分析結果' },
    { href: '/', label: '改善案生成' },
    { href: '/', label: '改善案生成結果' },
  ];
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink className="text-[#212121]" href={link.href}>
              {link.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
