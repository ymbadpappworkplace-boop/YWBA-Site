import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, UsersRound } from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/hero-temple.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "register";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode: AuthMode } => ({
    mode: search.mode === "register" ? "register" : "signin",
  }),
  head: () => ({
    meta: [
      { title: "Sign in or join — YWBA" },
      {
        name: "description",
        content: "Sign in to your YWBA account or register to become a member of our community.",
      },
    ],
  }),
  component: AuthPage,
});

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="h-12 bg-card pl-10 pr-11 shadow-none"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.74 2.98-4.31 2.98-7.41Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.36l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.64.39 3.19 1.04 4.55l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z" />
    </svg>
  );
}

function AuthPage() {
  const { mode } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isRegister = mode === "register";

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/dashboard", replace: true });
  }, [loading, navigate, user]);

  const switchMode = (nextMode: AuthMode) => {
    setPassword("");
    setConfirmPassword("");
    void navigate({ to: "/auth", search: { mode: nextMode }, replace: true });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegister && password !== confirmPassword) {
      toast.error("Your passwords do not match.");
      return;
    }
    if (isRegister && !acceptedTerms) {
      toast.error("Please accept the community guidelines to continue.");
      return;
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() } },
        });
        if (error) throw error;

        if (data.session) {
          toast.success("Welcome to YWBA. Your account is ready.");
          await navigate({ to: "/dashboard", replace: true });
        } else {
          toast.success("Almost there — check your email to confirm your account.");
          switchMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Welcome back.");
        await navigate({ to: "/dashboard", replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn't complete that request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetPassword = async () => {
    if (!email.trim()) {
      toast.error("Enter your email address first, then choose ‘Forgot password?’");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?mode=signin`,
      });
      if (error) throw error;
      toast.success("Password reset instructions are on their way.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn't send the reset email.");
    } finally {
      setSubmitting(false);
    }
  };

  const continueWithGoogle = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth?mode=signin` },
      });
      if (error) throw error;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn't connect to Google.");
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(32rem,0.95fr)]">
        <div className="relative hidden min-h-[45rem] overflow-hidden bg-primary lg:block">
          <img
            src={heroImage}
            alt="Ancient temple steps glowing in the morning light"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary/55 to-primary/20" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-primary-foreground xl:p-16">
            <p className="eyebrow !text-gold">A place to belong</p>
            <blockquote className="mt-5 max-w-xl font-serif text-4xl leading-tight xl:text-5xl">
              “Many voices, one community, a shared journey of wisdom.”
            </blockquote>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2"><Check className="size-4 text-gold" /> Share your voice</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-gold" /> Connect with members</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-gold" /> Grow together</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20">
          <div className="pointer-events-none absolute right-0 top-0 size-56 rounded-bl-full bg-gold-soft/45" aria-hidden />
          <div className="relative w-full max-w-md">
            <div className="mb-8">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-gold-soft text-primary lg:hidden">
                <UsersRound className="size-5" />
              </div>
              <p className="eyebrow !text-primary">Member portal</p>
              <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                {isRegister ? "Join our community." : "Welcome back."}
              </h1>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {isRegister
                  ? "Create your account and become part of the YWBA community."
                  : "Sign in to continue to your member dashboard."}
              </p>
            </div>

            <div className="mb-7 grid grid-cols-2 border-b border-border" role="tablist" aria-label="Account access">
              {(["signin", "register"] as const).map((tab) => {
                const selected = mode === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => switchMode(tab)}
                    className={cn(
                      "relative pb-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab === "signin" ? "Sign in" : "Sign up"}
                    {selected ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" /> : null}
                  </button>
                );
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full bg-background"
              onClick={() => void continueWithGoogle()}
              disabled={submitting || loading}
            >
              <GoogleMark />
              Continue with Google
            </Button>

            <div className="my-6 flex items-center gap-4" aria-hidden="true">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">or use email</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="space-y-5">
              {isRegister ? (
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full name</Label>
                  <Input
                    id="full-name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    className="h-12 bg-card shadow-none"
                  />
                </div>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-12 bg-card pl-10 shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="password">Password</Label>
                  {!isRegister ? (
                    <button
                      type="button"
                      onClick={() => void resetPassword()}
                      className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </button>
                  ) : null}
                </div>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={setPassword}
                  placeholder={isRegister ? "At least 8 characters" : "Enter your password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  minLength={isRegister ? 8 : undefined}
                />
              </div>

              {isRegister ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <PasswordInput
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Enter your password again"
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Checkbox
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      className="mt-0.5"
                    />
                    <span>
                      I agree to uphold the YWBA community guidelines and respect the privacy of fellow members.
                    </span>
                  </label>
                </>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting || loading}>
                {submitting ? <LoaderCircle className="animate-spin" /> : null}
                {submitting ? "Please wait…" : isRegister ? "Create my account" : "Sign in"}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              {isRegister ? "Already a member?" : "New to YWBA?"}{" "}
              <button
                type="button"
                onClick={() => switchMode(isRegister ? "signin" : "register")}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {isRegister ? "Sign in" : "Create an account"}
              </button>
            </p>
            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
              By continuing, you acknowledge our respectful community values. Need help?{" "}
              <Link to="/about" className="font-semibold text-foreground hover:text-primary">Contact YWBA</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
