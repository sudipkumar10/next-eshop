import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur md:px-12">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span>Next E-Shop</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <div className="max-w-3xl space-y-6">
          <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
            🔥 Welcome to the Future of Shopping
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Discover Quality Products at{" "}
            <span className="text-primary">Unbeatable Prices</span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            Explore our curated collection of premium goods. Fast shipping,
            secure checkout, and a seamless shopping experience designed for
            you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/sign-up">
              <Button size="lg" className="px-8 font-medium">
                Get Started
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="px-8 font-medium">
                Browse Store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Next E-Shop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
