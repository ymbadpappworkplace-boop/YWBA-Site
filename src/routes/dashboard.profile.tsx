import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, LoaderCircle, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { MembershipBadge } from "@/components/member/membership-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, initials } from "@/lib/format";

const MAX_AVATAR_BYTES = 3 * 1024 * 1024;

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "My profile — YWBA" },
      {
        name: "description",
        content: "Update your YWBA member profile, photo and contact details.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, profileLoading, refreshProfile } = useAuth();
  const fileInput = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [district, setDistrict] = useState("");
  const [background, setBackground] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name ?? "");
    setPhone(profile.phone ?? "");
    setDateOfBirth(profile.date_of_birth ?? "");
    setDistrict(profile.district ?? "");
    setBackground(profile.background ?? "");
    setBio(profile.bio ?? "");
  }, [profile]);

  const displayName = fullName || profile?.full_name || user?.email || "";

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          date_of_birth: dateOfBirth || null,
          district: district.trim() || null,
          background: background.trim() || null,
          bio: bio.trim() || null,
        })
        .eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Your profile has been updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "We couldn't save your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Please choose an image smaller than 3 MB.");
      return;
    }

    setUploading(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      // Storage policies require the first folder to be the user's id.
      const path = `${user.id}/avatar-${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const { error: saveError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);
      if (saveError) throw saveError;

      await refreshProfile();
      toast.success("Profile photo updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "We couldn't upload your photo. Please try again.",
      );
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const removeAvatar = async () => {
    if (!user) return;
    setUploading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Profile photo removed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We couldn't remove your photo.");
    } finally {
      setUploading(false);
    }
  };

  if (profileLoading && !profile) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center" role="status">
        <LoaderCircle className="size-6 animate-spin text-primary" />
        <span className="sr-only">Loading your profile</span>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <form onSubmit={save} className="order-2 space-y-6 lg:order-1">
        <div>
          <h2 className="font-serif text-2xl">Personal details</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            These details help the Association keep in touch with you. Your email address and
            membership ID are managed by YWBA and can&apos;t be edited here.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-full-name">Full name</Label>
          <Input
            id="profile-full-name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            maxLength={120}
            required
            disabled={!profile}
            className="h-12 bg-card shadow-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Phone number</Label>
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+94 77 000 0000"
              autoComplete="tel"
              maxLength={40}
              disabled={!profile}
              className="h-12 bg-card shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-dob">Date of birth</Label>
            <Input
              id="profile-dob"
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              disabled={!profile}
              className="h-12 bg-card shadow-none"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-district">District</Label>
            <Input
              id="profile-district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              placeholder="e.g. Colombo"
              maxLength={80}
              disabled={!profile}
              className="h-12 bg-card shadow-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-background">Background</Label>
            <Input
              id="profile-background"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              placeholder="School, university or profession"
              maxLength={300}
              disabled={!profile}
              className="h-12 bg-card shadow-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-bio">Short bio</Label>
          <Textarea
            id="profile-bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="A few lines about yourself and what you hope to contribute to the community."
            maxLength={1000}
            disabled={!profile}
            className="bg-card shadow-none"
          />
          <p className="text-xs text-muted-foreground">{bio.length}/1000 characters</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={!profile || saving || uploading}>
            {saving ? <LoaderCircle className="animate-spin" /> : null}
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => void refreshProfile()}
            disabled={saving || uploading}
          >
            <RotateCcw className="size-4" />
            Refresh
          </Button>
        </div>

        {!profile ? (
          <p className="rounded-md border border-gold/50 bg-gold-soft/35 p-4 text-sm leading-relaxed text-muted-foreground">
            No membership profile is linked to this account yet, so editing is disabled. An
            administrator can create it with the profile backfill script; then reload this page.
          </p>
        ) : null}
      </form>

      <aside className="order-1 space-y-6 lg:order-2">
        <section className="border border-border bg-card p-6" aria-labelledby="photo-heading">
          <h2 id="photo-heading" className="font-serif text-xl">
            Profile photo
          </h2>
          <div className="mt-5 flex flex-col items-center gap-4">
            <Avatar className="size-28 border border-border">
              {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
              <AvatarFallback className="bg-gold-soft font-serif text-3xl text-primary">
                {initials(displayName)}
              </AvatarFallback>
            </Avatar>

            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadAvatar(file);
              }}
            />

            <div className="flex w-full flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInput.current?.click()}
                disabled={!profile || uploading}
              >
                {uploading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Camera className="size-4" />
                )}
                {uploading ? "Uploading…" : "Upload photo"}
              </Button>
              {profile?.avatar_url ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => void removeAvatar()}
                  disabled={uploading}
                >
                  Remove photo
                </Button>
              ) : null}
            </div>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              JPG, PNG or WebP, up to 3 MB.
            </p>
          </div>
        </section>

        <section className="border border-border bg-card p-6" aria-labelledby="membership-heading">
          <h2 id="membership-heading" className="font-serif text-xl">
            Membership
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Member ID
              </dt>
              <dd className="mt-1 font-mono">{profile?.member_id ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Status
              </dt>
              <dd className="mt-1">
                {profile ? <MembershipBadge status={profile.membership_status} /> : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Email
              </dt>
              <dd className="mt-1 flex items-start gap-2 break-all">
                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                {user?.email}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Member since
              </dt>
              <dd className="mt-1">{formatDate(profile?.created_at) || "—"}</dd>
            </div>
          </dl>

          <p className="mt-5 flex gap-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            Your email address, member ID and membership status are protected and managed by the
            Association.
          </p>
        </section>
      </aside>
    </div>
  );
}
