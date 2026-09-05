import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "../shared/Container";

export function Header() {
  return (
    <header className="w-full bg-primary text-primary-foreground">
      {/* Top Banner - Using accent theme */}
      <div className="bg-accent text-accent-foreground text-xs font-bold py-1.5 px-4 text-center tracking-wide">
        Supper Sale 50%
      </div>

      {/* Main Header Area */}
      <Container className="py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wider uppercase text-white whitespace-nowrap"
        >
          AL ZAGHAW
        </Link>

        {/* Search Bar - Using secondary theme */}
        <div className="flex-1 max-w-2xl relative hidden md:flex items-center">
          <Input
            placeholder="Search group or tasks"
            className="bg-secondary text-white placeholder:text-gray-100 rounded-full pr-28 pl-10 h-11 border-none shadow-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <Search className="absolute left-3.5 w-4 h-4 text-gray-100 pointer-events-none" />
          <Button className="absolute right-1 rounded-full bg-accent text-accent-foreground hover:bg-yellow-400 h-9 px-6 font-bold text-xs shadow-none">
            Search
          </Button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/wishlist"
            className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Heart className="w-4 h-4 text-white" />
          </Link>
          <Link
            href="/cart"
            className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] h-4 w-4 p-0 flex items-center justify-center rounded-full font-bold border-0">
              0
            </Badge>
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center gap-2 bg-secondary hover:opacity-90 px-4 py-2 rounded-full text-xs font-medium transition-opacity text-white"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>
      </Container>

      {/* Navigation Links Bar */}
      <div className="bg-primary pb-4">
        <Container className="flex items-center gap-2.5 overflow-x-auto scrollbar-none text-xs">
          {/* Browse Categories Pill */}
          <button className="flex items-center gap-2 bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-full font-medium transition-opacity whitespace-nowrap">
            <Menu className="w-3.5 h-3.5" />
            <span>Browse Categories</span>
            <ChevronDown className="w-3 h-3 text-gray-100" />
          </button>

          {/* Nav Items */}
          {[
            { name: "Shop", hasDropdown: false },
            { name: "Supper Deals", hasDropdown: true },
            { name: "Find Store", hasDropdown: false },
            { name: "What's New", hasDropdown: false },
            { name: "Special Offer", hasDropdown: true },
            { name: "Weekend Offer", hasDropdown: true },
            { name: "Promos Offer", hasDropdown: true },
            { name: "Page", hasDropdown: true },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-1.5 bg-secondary hover:opacity-90 text-white px-4 py-2 rounded-full font-medium transition-opacity whitespace-nowrap"
            >
              <span>{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="w-3 h-3 text-gray-100" />
              )}
            </button>
          ))}
        </Container>
      </div>
    </header>
  );
}
