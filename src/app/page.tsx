import { getProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { SortDropdown } from "@/components/SortDropdown";
import { SearchBar } from "@/components/SearchBar";
import { AddToCartButton } from "@/components/AddToCartButton";
import { CartBadge } from "@/components/CartBadge";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: "newest" | "price-asc" | "price-desc" | "name-asc";
    page?: string;
  }>;
}

const limit = 12;

export default async function StorefrontPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const categorySlug = resolvedParams.category || "";
  const sort = resolvedParams.sort || "newest";
  const page = Number(resolvedParams.page) || 1;

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts({
      search,
      categorySlug,
      sort,
      page,
      limit,
    }),
    getCategories(),
  ]);

  const products = productsRes.success ? productsRes.data : [];
  const meta = productsRes.meta;
  const categories = categoriesRes.success ? categoriesRes.data : [];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            E-STORE<span className="text-foreground">.</span>
          </Link>

          {/* Instant Search Bar Component */}
          <SearchBar />

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <CartBadge />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 bg-card border border-border rounded-2xl p-8 sm:p-12 text-card-foreground shadow-sm">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Next-Gen Shopping Experience
          </h1>
          <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
            Explore our curated collection of high-performance essentials built
            for modern lifestyles.
          </p>
        </div>

        {/* Categories & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !categorySlug
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-card-foreground hover:bg-secondary"
              }`}
            >
              All Products
            </Link>
            {categories.map((cat) => {
              const isActive = categorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/?category=${cat.slug}${search ? `&search=${search}` : ""}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-card-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.name} ({cat._count.products})
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <SortDropdown defaultValue={sort} />
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
            <p className="text-muted-foreground text-lg mb-2">
              No products found
            </p>
            <Link
              href="/"
              className="text-primary font-medium text-sm hover:underline"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden border-border bg-card hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-square bg-muted w-full overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      No Image
                    </div>
                  )}
                  {product.isFeatured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-sm">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardHeader className="p-4 pb-2 flex-grow">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {product.category.name}
                  </span>
                  <h3 className="font-semibold text-card-foreground text-base line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </CardHeader>

                <CardContent className="p-4 pt-0 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-card-foreground">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <AddToCartButton product={product} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            {meta.hasPrevPage && (
              <Link
                href={`/?page=${meta.page - 1}${categorySlug ? `&category=${categorySlug}` : ""}${search ? `&search=${search}` : ""}`}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary text-card-foreground transition-colors"
              >
                Previous
              </Link>
            )}
            <span className="text-sm text-muted-foreground">
              Page {meta.page} of {meta.totalPages}
            </span>
            {meta.hasNextPage && (
              <Link
                href={`/?page=${meta.page + 1}${categorySlug ? `&category=${categorySlug}` : ""}${search ? `&search=${search}` : ""}`}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary text-card-foreground transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
