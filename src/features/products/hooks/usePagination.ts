import { useState, useMemo } from 'react';

export const usePagination = <T,>(items: T[], itemsPerPage: number) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page, itemsPerPage]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    page,
    totalPages,
    paginatedItems,
    handleNext,
    handlePrev,
  };
};