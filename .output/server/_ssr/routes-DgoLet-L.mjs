import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-oFxiYaZx.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as homeQuery } from "./queries-CfWi0d_Q.mjs";
import { t as hero_temple_default } from "./hero-temple-C7sLtb7g.mjs";
import { r as formatDate } from "./format-DM6Xt5HZ.mjs";
import { t as ArticleCard } from "./article-card-Z6yKtGIf.mjs";
import { C as ArrowRight, o as Pin, u as Megaphone } from "../_libs/lucide-react.mjs";
import { i as SectionHeading, t as EmptyState } from "./common-FJ6yPft2.mjs";
import { t as ThoughtCard } from "./thought-card-BpnvV_-n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgoLet-L.js
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	{
		title: "Wisdom",
		text: "Study and practise the Dhamma together, and bring its insight into everyday life."
	},
	{
		title: "Unity",
		text: "Connect with young women across every district in one welcoming community."
	},
	{
		title: "Voice",
		text: "Write, reflect and publish — your experiences are part of our shared story."
	}
];
function HomePage() {
	const { data } = useSuspenseQuery(homeQuery());
	const [lead, ...restFeatured] = data.featured;
	const latest = data.latest.filter((a) => a.id !== lead?.id).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow !text-primary",
							children: "Young Women's Buddhist Association"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-serif text-[2.75rem] leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.4rem]",
							children: data.hero.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule-gold mt-8 w-16" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground",
							children: data.hero.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "register" },
									children: "Become a member"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/articles",
									children: "Read the articles"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_temple_default,
							alt: "A young woman seated in quiet reflection on the steps of an ancient temple at sunrise",
							width: 1600,
							height: 1104,
							className: "aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -bottom-6 left-6 hidden bg-background px-6 py-5 shadow-soft md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-3xl text-primary",
								children: data.publishedCount
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow mt-1 !text-[0.62rem]",
								children: "Articles published"
							})]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page grid gap-12 py-20 md:py-24 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Who we are"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl leading-tight",
						children: "A living tradition, gathered in one place."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 leading-relaxed text-muted-foreground",
						children: "For generations, YWBA has brought young women together to learn the Dhamma, serve their communities and grow into confident leaders. This platform carries that tradition forward — a home for our members' knowledge, creativity and voices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all",
						children: ["About the Association ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-8",
				children: PILLARS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-foreground/80 pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-serif text-sm text-gold",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-serif text-2xl",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: p.text
						})
					]
				}, p.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page pb-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Featured",
				title: "From the editors",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/articles",
					className: "hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex",
					children: ["All articles ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			}), lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-12 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
						article: lead,
						variant: "feature"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border lg:col-span-4 lg:border-l lg:border-border lg:pl-10",
					children: restFeatured.length > 0 ? restFeatured.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, {
						article: a,
						variant: "row"
					}, a.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-5 text-sm text-muted-foreground",
						children: "More featured writing coming soon."
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No featured articles yet",
				className: "mt-10",
				children: "Featured writing chosen by the editorial team will appear here."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page pb-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Latest",
				title: "Recently published"
			}), latest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3",
				children: latest.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCard, { article: a }, a.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Nothing published yet",
				className: "mt-10"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page py-20 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-12 md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Community contributions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-serif text-4xl leading-tight md:text-5xl",
								children: "Voices of YWBA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl leading-relaxed text-muted-foreground",
								children: "Short reflections, experiences and ideas shared by our members — on the Dhamma, education, leadership, culture and the lives of young women today."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 md:col-span-5 md:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/voices",
								children: "Read all voices"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard/voices/new",
								children: "Share your voice"
							})
						})]
					})]
				}), data.thoughts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: data.thoughts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThoughtCard, { thought: t }, t.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Be the first voice",
					className: "mt-12",
					children: "Members' reflections will appear here once reviewed."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page grid gap-10 py-20 md:py-24 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Notices"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl leading-tight",
						children: "Announcements"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "News, programmes and calls for contributions from the Association."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8",
				children: data.announcements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border border-y border-border",
					children: data.announcements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
							dateTime: a.created_at,
							className: "flex items-start gap-2 text-sm text-muted-foreground",
							children: [a.is_pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
								className: "mt-0.5 h-3.5 w-3.5 text-gold",
								"aria-label": "Pinned"
							}) : null, formatDate(a.created_at, "d MMM yyyy")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl leading-snug",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: a.body
						})] })]
					}, a.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-y border-border py-8 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-5 w-5" }), " No announcements right now."]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/30",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-gold/20",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow !text-gold",
								children: "Membership"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-serif text-4xl leading-tight md:text-5xl",
								children: "Your voice has a place here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-lg leading-relaxed text-primary-foreground/80",
								children: "Join YWBA to receive your membership ID, share your reflections, submit articles for publication and stay close to the Association's programmes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "light",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "register" },
										children: "Register as a member"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "lightOutline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										children: "Learn about YWBA"
									})
								})]
							})
						]
					})
				]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
