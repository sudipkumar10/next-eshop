"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    // Debounce timer to prevent excessive URL updates while typing[cite: 2]
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1"); // Reset to page 1 on new search[cite: 2]

      // Only push if the search value actually changed from URL[cite: 2]
      const currentQuery = searchParams.get("search") || "";
      if (searchTerm.trim() !== currentQuery) {
        router.push(`/?${params.toString()}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, router, searchParams]);

  return (
    <div className="flex-1 max-w-md relative hidden sm:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-9 pr-4 rounded-full bg-background"
      />
    </div>
  );
}
