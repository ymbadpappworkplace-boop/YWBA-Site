import type { Database } from "@/integrations/supabase/types";

export type ContentStatus = Database["public"]["Enums"]["content_status"];
export type MembershipStatus = Database["public"]["Enums"]["membership_status"];
export type ReviewDecision = Database["public"]["Enums"]["review_decision"];

export const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  revision_requested: "Revision Requested",
  approved: "Approved",
  published: "Published",
  rejected: "Rejected",
};

export const STATUS_HELP: Record<ContentStatus, string> = {
  draft: "Only you can see this. Submit it when you're ready.",
  pending_review: "Submitted. The YWBA editorial team is reviewing it.",
  revision_requested: "The editors asked for changes. Update it and submit again.",
  approved: "Approved by the editors. It will be published soon.",
  published: "Live on the YWBA website.",
  rejected: "Not accepted for publication. See the editor's note.",
};

export const MEMBERSHIP_LABELS: Record<MembershipStatus, string> = {
  pending: "Pending verification",
  active: "Verified member",
  suspended: "Suspended",
};

export const REVIEW_LABELS: Record<ReviewDecision, string> = {
  approved: "Approved",
  rejected: "Rejected",
  revision_requested: "Revision requested",
  published: "Published",
  unpublished: "Unpublished",
  edited: "Edited by editor",
};

/** Statuses in which a member may still edit their own submission. */
export const MEMBER_EDITABLE: ContentStatus[] = ["draft", "revision_requested", "rejected"];

export const THOUGHT_CATEGORIES = [
  "Buddhist Values & Teachings",
  "Personal Experiences",
  "Education",
  "Leadership",
  "Society & Service",
  "Culture",
  "Women's Empowerment",
  "Personal Reflections",
] as const;

export const SRI_LANKA_DISTRICTS = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
  "Outside Sri Lanka",
] as const;

export const ARTICLES_PAGE_SIZE = 9;
export const THOUGHTS_PAGE_SIZE = 12;
