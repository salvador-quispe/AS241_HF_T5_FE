// src/components/layout/ContentLayout.tsx

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ContentLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-[#003F87]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        {children}
      </div>
    </section>
  );
}