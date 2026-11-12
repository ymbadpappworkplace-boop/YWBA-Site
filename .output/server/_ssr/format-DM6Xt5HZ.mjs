import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/format-DM6Xt5HZ.js
/** Read-only client for public data (RLS applies as the anonymous visitor). */
function createPublicClient() {
	const url = processModule.env["SUPABASE_URL"];
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	return createClient(url, key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
var THOUGHT_CATEGORIES = [
	"Buddhist Values & Teachings",
	"Personal Experiences",
	"Education",
	"Leadership",
	"Society & Service",
	"Culture",
	"Women's Empowerment",
	"Personal Reflections"
];
function formatDate(value, pattern = "d MMMM yyyy") {
	if (!value) return "";
	try {
		return format(new Date(value), pattern);
	} catch {
		return "";
	}
}
function initials(name) {
	const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "Y";
	return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}
function readingTime(text) {
	const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}
/** Removes characters that would break a PostgREST `or()` filter. */
function sanitizeSearch(q) {
	return q.replace(/[%,()*:\\]/g, " ").trim().slice(0, 80);
}
//#endregion
export { readingTime as a, initials as i, createPublicClient as n, sanitizeSearch as o, formatDate as r, THOUGHT_CATEGORIES as t };
