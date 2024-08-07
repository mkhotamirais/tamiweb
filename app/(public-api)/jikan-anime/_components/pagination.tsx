"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useJikanAnimeStore } from "@/hooks/useJikanAnimeStore";

export const Pagination = ({ lastPage, total }: { lastPage: number; total: number }) => {
  const { page, setPage } = useJikanAnimeStore();
  const [editPage, setEditPage] = useState(false);
  const [newPage, setNewPage] = useState(page);
  const inputPageRef = useRef<HTMLInputElement | null>(null);

  const handlePrev = () => {
    setPage(page - 1);
    scrollTo({ top: 0, behavior: "smooth" });
    setEditPage(false);
  };

  const handleNext = () => {
    setPage(page + 1);
    scrollTo({ top: 0, behavior: "smooth" });
    setEditPage(false);
  };

  const handleEditPage = () => {
    setEditPage(true);
  };

  const handleFocus = useCallback(() => {
    if (editPage && inputPageRef.current) {
      inputPageRef.current.select();
    }
  }, [editPage]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newPage < 1) {
        setNewPage(1);
        setPage(1);
      } else if (newPage > lastPage) {
        setNewPage(lastPage);
        setPage(lastPage);
      } else {
        setPage(newPage);
        setEditPage(false);
      }
    }
  };

  useEffect(() => {
    handleFocus();
  }, [handleFocus]);

  useEffect(() => {
    setNewPage(page);
  }, [page]);

  if (total === 0) return null;

  return (
    <div className="flex gap-1 text-sm py-3">
      {page > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="bg-jikan-accent p-1 leading-none rounded-lg hover:opacity-80 transition-all border-jikan-accent"
        >
          Prev
        </button>
      )}
      <div onClick={handleEditPage} className="border border-jikan-accent rounded-lg p-1 px-2 flex gap-2">
        {editPage ? (
          <input
            title="page"
            min={1}
            max={lastPage}
            ref={inputPageRef}
            type="number"
            autoFocus
            onFocus={handleFocus}
            value={newPage}
            className="max-w-8 spin-btn-none focus:outline-none bg-inherit"
            onChange={(e) => setNewPage(parseInt(e.target.value))}
            onKeyUp={handleKeyUp}
          />
        ) : (
          <div className="max-w-10">{page}</div>
        )}
        of {lastPage || 0}
      </div>
      {page < lastPage && (
        <button
          type="button"
          onClick={handleNext}
          className="bg-jikan-accent p-1 leading-none rounded-lg hover:opacity-80 transition-all border-jikan-accent"
        >
          Next
        </button>
      )}
    </div>
  );
};
