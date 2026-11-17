import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronsLeft,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessagesSquare,
  Newspaper,
  PenLine,
  UserPlus,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAuth, useSignOut } from "@/hooks/use-auth";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { LotusMark } from "./logo";

const PRIMARY_NAV = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/articles", label: "Articles", icon: Newspaper, exact: false },
  { to: "/voices", label: "Voices", icon: MessagesSquare, exact: false },
  { to: "/about", label: "About", icon: Info, exact: false },
] as const;

const MEMBER_NAV = [
  { to: "/dashboard", label: "Member dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/profile", label: "My profile", icon: UserRound, exact: true },
  { to: "/dashboard/voices/new", label: "Share a reflection", icon: PenLine, exact: true },
] as const;

const sidebarItem = cn(
  "group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors",
  "hover:bg-secondary/80 hover:text-foreground",
  "data-[status=active]:bg-secondary data-[status=active]:text-primary data-[status=active]:shadow-soft",
);

type SidebarPanelProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

function SidebarPanel({ collapsed = false, onNavigate }: SidebarPanelProps) {
  const { user, profile, loading } = useAuth();
  const signOut = useSignOut();
  const name = profile?.full_name || user?.email || "";
  const close = () => onNavigate?.();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Workspace identity */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-1.5 pb-1 pt-1",
          collapsed && "justify-center px-0",
        )}
      >
        <Link
          to="/"
          onClick={close}
          aria-label="YWBA home"
          className="flex min-w-0 items-center gap-2.5"
        >
          <span className="mesh-primary flex size-9 shrink-0 items-center justify-center rounded-xl text-gold shadow-soft ring-1 ring-gold/25">
            <LotusMark className="size-5" />
          </span>
          {collapsed ? null : (
            <span className="min-w-0">
              <span className="block font-serif text-lg font-medium leading-none tracking-[0.08em] text-primary">
                YWBA
              </span>
              <span className="mt-1 block truncate text-[0.6rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Member community
              </span>
            </span>
          )}
        </Link>
      </div>

      <nav
        aria-label="Main"
        className="mt-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain px-0.5 pb-2"
      >
        <div>
          {collapsed ? null : (
            <p className="mb-2 px-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
              Workspace
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={close}
                title={collapsed ? item.label : undefined}
                className={cn(sidebarItem, collapsed && "justify-center px-0")}
              >
                <item.icon className="size-[1.05rem] shrink-0" />
                {collapsed ? (
                  <span className="sr-only">{item.label}</span>
                ) : (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {collapsed ? <div className="mx-2 h-px bg-border/70" aria-hidden /> : null}

        <div>
          {collapsed ? null : (
            <p className="mb-2 px-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
              Member area
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {MEMBER_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={close}
                title={collapsed ? item.label : undefined}
                className={cn(sidebarItem, collapsed && "justify-center px-0")}
              >
                <item.icon className="size-[1.05rem] shrink-0" />
                {collapsed ? (
                  <span className="sr-only">{item.label}</span>
                ) : (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Account / membership footer */}
      <div className="mt-auto border-t border-border/70 pt-3">
        {loading ? (
          <div
            className={cn("h-10 rounded-xl bg-secondary/60", collapsed ? "w-10" : "w-full")}
            aria-hidden
          />
        ) : user ? (
          collapsed ? (
            <div className="flex flex-col items-center gap-1.5">
              <Link
                to="/dashboard/profile"
                onClick={close}
                title={name || "My profile"}
                className="rounded-full outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="size-9 border border-border shadow-soft">
                  {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
                  <AvatarFallback className="bg-gold-soft font-serif text-xs text-primary">
                    {initials(name)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                title="Sign out"
                aria-label="Sign out"
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card/80 p-2.5 shadow-soft">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-9 shrink-0 border border-border">
                  {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
                  <AvatarFallback className="bg-gold-soft font-serif text-xs text-primary">
                    {initials(name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.82rem] font-semibold">{name || "YWBA member"}</p>
                  <p className="truncate font-mono text-[0.62rem] text-muted-foreground">
                    {profile?.member_id ?? "Member"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  title="Sign out"
                  aria-label="Sign out"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
          )
        ) : collapsed ? (
          <div className="flex flex-col items-center gap-1.5">
            <Link
              to="/auth"
              search={{ mode: "register" }}
              onClick={close}
              title="Join YWBA"
              aria-label="Join YWBA"
              className="flex size-9 items-center justify-center rounded-xl border border-gold/40 bg-gold-soft/50 text-primary transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <UserPlus className="size-4" />
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signin" }}
              onClick={close}
              title="Sign in"
              aria-label="Sign in"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <LogIn className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card/85 p-3 shadow-soft">
            <p className="eyebrow !text-[0.55rem] !text-primary">Membership</p>
            <p className="mt-1.5 font-serif text-[1.05rem] leading-snug">
              Your voice has a place here.
            </p>
            <Button asChild size="sm" className="mt-3 w-full rounded-lg" onClick={close}>
              <Link to="/auth" search={{ mode: "register" }}>
                Join YWBA <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
            <Link
              to="/auth"
              search={{ mode: "signin" }}
              onClick={close}
              className="mt-2 block text-center text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Restore the last sidebar state without causing a hydration mismatch.
  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem("ywba:sidebar") === "collapsed");
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem("ywba:sidebar", next ? "collapsed" : "expanded");
      } catch {
        /* storage may be unavailable */
      }
      return next;
    });
  };

  return (
    <>
      {/* Compact top bar for small screens only */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 glass lg:hidden">
        <div className="flex h-[3.75rem] items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="YWBA home">
            <LotusMark className="size-7" />
            <span className="font-serif text-lg font-medium tracking-[0.08em] text-primary">
              YWBA
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="!size-5" />
          </Button>
        </div>
        <div className="hairline-gold" aria-hidden />
      </header>

      {/* Desktop sidebar */}
      <aside
        aria-label="Sidebar"
        className={cn(
          "fixed bottom-3 left-3 top-3 z-40 hidden flex-col rounded-2xl border border-border/70 glass p-2.5 shadow-card transition-[width] duration-300 ease-out lg:flex",
          collapsed ? "w-[4.5rem]" : "w-[17rem]",
        )}
      >
        <span className="hairline-gold pointer-events-none absolute inset-x-6 top-0" aria-hidden />
        <SidebarPanel collapsed={collapsed} />
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="absolute -right-3 top-7 flex size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-soft transition-colors hover:border-gold hover:text-primary"
        >
          <ChevronsLeft
            className={cn("size-3.5 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
      </aside>

      <div
        className={cn(
          "flex min-h-screen flex-col pt-[3.75rem] transition-[padding-left] duration-300 ease-out lg:pt-0",
          collapsed ? "lg:pl-[6rem]" : "lg:pl-[18.5rem]",
        )}
      >
        {children}
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="flex w-[19rem] max-w-[85vw] flex-col border-r-border bg-background p-2.5"
        >
          <SheetTitle className="sr-only">Main menu</SheetTitle>
          <SidebarPanel onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
