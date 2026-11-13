import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Menu, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth, useSignOut } from "@/hooks/use-auth";
import { initials } from "@/lib/format";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/articles", label: "Articles", exact: false },
  { to: "/voices", label: "Voices of YWBA", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

export function SiteHeader() {
  const { user, profile, isAdmin, loading } = useAuth();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);
  const name = profile?.full_name || user?.email || "";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="relative py-1 text-sm font-medium text-foreground/75 transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-[1.55rem] data-[status=active]:after:h-px data-[status=active]:after:bg-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-24" aria-hidden />
          ) : user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard">
                  <LayoutDashboard /> Dashboard
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Account menu"
                >
                  <Avatar className="h-9 w-9 border border-border">
                    {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
                    <AvatarFallback className="bg-gold-soft font-serif text-sm text-primary">
                      {initials(name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel className="font-normal">
                    <div className="truncate text-sm font-medium">{name}</div>
                    {profile?.member_id ? (
                      <div className="mt-0.5 font-mono text-xs text-muted-foreground">{profile.member_id}</div>
                    ) : null}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">
                      <UserRound /> My profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <ShieldCheck /> Administration
                      </Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => void signOut()}>
                    <LogOut /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/auth" search={{ mode: "register" }}>
                Become a member
              </Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetHeader>
                <SheetTitle className="font-serif text-xl font-medium">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-4 flex flex-col px-4">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.exact }}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3.5 font-serif text-lg data-[status=active]:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-2">
                  {user ? (
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link to="/dashboard">Go to dashboard</Link>
                    </Button>
                  ) : (
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link to="/auth" search={{ mode: "register" }}>
                        Become a member
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
