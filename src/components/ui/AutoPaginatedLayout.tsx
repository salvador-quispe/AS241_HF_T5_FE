import { useState } from "react";
import type { ReactNode } from "react";

interface AutoPaginatedLayoutProps {
  sections: ReactNode[];
  sectionsPerPage?: number;
  pagination?: (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => ReactNode;
}

export default function AutoPaginatedLayout({ sections, sectionsPerPage = 1, pagination }: AutoPaginatedLayoutProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const pages: ReactNode[][] = [];
  for (let i = 0; i < sections.length; i += sectionsPerPage) {
    pages.push(sections.slice(i, i + sectionsPerPage));
  }

  const totalPages = pages.length;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">
        {pages[currentPage - 1]?.map((section, i) => (
          <div key={i} className="h-full">
            {section}
          </div>
        ))}
      </div>
      {totalPages > 1 && pagination && pagination(currentPage, totalPages, setCurrentPage)}
    </div>
  );
}
