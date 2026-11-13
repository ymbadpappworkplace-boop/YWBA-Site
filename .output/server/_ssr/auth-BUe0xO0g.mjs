import { r as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-oFxiYaZx.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as hero_temple_default } from "./hero-temple-C7sLtb7g.mjs";
import { D as Check, b as Eye, g as LoaderCircle, h as LockKeyhole, p as Mail, r as UsersRound, x as EyeOff } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as supabase } from "./client-BFwA20uY.mjs";
import { n as Route, r as useAuth } from "./auth-Lkcf4ZLD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label$1 } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BUe0xO0g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Label$1.displayName;
function PasswordInput({ id, value, onChange, placeholder, autoComplete, minLength }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id,
				type: visible ? "text" : "password",
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				autoComplete,
				minLength,
				required: true,
				className: "h-12 bg-card pl-10 pr-11 shadow-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setVisible((current) => !current),
				className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"aria-label": visible ? "Hide password" : "Show password",
				children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
			})
		]
	});
}
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "size-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.74 2.98-4.31 2.98-7.41Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 22c2.7 0 4.97-.9 6.62-2.36l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.64.39 3.19 1.04 4.55l3.35-2.62Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z"
			})
		]
	});
}
function AuthPage() {
	const { mode } = Route.useSearch();
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [acceptedTerms, setAcceptedTerms] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const isRegister = mode === "register";
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({
			to: "/dashboard",
			replace: true
		});
	}, [
		loading,
		navigate,
		user
	]);
	const switchMode = (nextMode) => {
		setPassword("");
		setConfirmPassword("");
		navigate({
			to: "/auth",
			search: { mode: nextMode },
			replace: true
		});
	};
	const submit = async (event) => {
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
					options: { data: { full_name: fullName.trim() } }
				});
				if (error) throw error;
				if (data.session) {
					toast.success("Welcome to YWBA. Your account is ready.");
					await navigate({
						to: "/dashboard",
						replace: true
					});
				} else {
					toast.success("Almost there — check your email to confirm your account.");
					switchMode("signin");
				}
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (error) throw error;
				toast.success("Welcome back.");
				await navigate({
					to: "/dashboard",
					replace: true
				});
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
			const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth?mode=signin` });
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
				options: { redirectTo: `${window.location.origin}/auth?mode=signin` }
			});
			if (error) throw error;
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "We couldn't connect to Google.");
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(32rem,0.95fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative hidden min-h-[45rem] overflow-hidden bg-primary lg:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_temple_default,
						alt: "Ancient temple steps glowing in the morning light",
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary-deep via-primary/55 to-primary/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-12 text-primary-foreground xl:p-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow !text-gold",
								children: "A place to belong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "mt-5 max-w-xl font-serif text-4xl leading-tight xl:text-5xl",
								children: "“Many voices, one community, a shared journey of wisdom.”"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-gold" }), " Share your voice"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-gold" }), " Connect with members"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-gold" }), " Grow together"]
									})
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14 xl:px-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute right-0 top-0 size-56 rounded-bl-full bg-gold-soft/45",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-6 inline-flex size-12 items-center justify-center rounded-full bg-gold-soft text-primary lg:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow !text-primary",
									children: "Member portal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-3 font-serif text-4xl leading-tight sm:text-5xl",
									children: isRegister ? "Join our community." : "Welcome back."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 leading-relaxed text-muted-foreground",
									children: isRegister ? "Create your account and become part of the YWBA community." : "Sign in to continue to your member dashboard."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-7 grid grid-cols-2 border-b border-border",
							role: "tablist",
							"aria-label": "Account access",
							children: ["signin", "register"].map((tab) => {
								const selected = mode === tab;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "tab",
									"aria-selected": selected,
									onClick: () => switchMode(tab),
									className: cn("relative pb-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "text-primary" : "text-muted-foreground hover:text-foreground"),
									children: [tab === "signin" ? "Sign in" : "Sign up", selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 -bottom-px h-0.5 bg-primary" }) : null]
								}, tab);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "lg",
							className: "w-full bg-background",
							onClick: () => void continueWithGoogle(),
							disabled: submitting || loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {}), "Continue with Google"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-4",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
									children: "or use email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "space-y-5",
							children: [
								isRegister ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "full-name",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "full-name",
										value: fullName,
										onChange: (event) => setFullName(event.target.value),
										placeholder: "Your full name",
										autoComplete: "name",
										required: true,
										maxLength: 120,
										className: "h-12 bg-card shadow-none"
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Email address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											value: email,
											onChange: (event) => setEmail(event.target.value),
											placeholder: "you@example.com",
											autoComplete: "email",
											required: true,
											className: "h-12 bg-card pl-10 shadow-none"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											children: "Password"
										}), !isRegister ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => void resetPassword(),
											className: "text-xs font-semibold text-primary underline-offset-4 hover:underline",
											children: "Forgot password?"
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
										id: "password",
										value: password,
										onChange: setPassword,
										placeholder: isRegister ? "At least 8 characters" : "Enter your password",
										autoComplete: isRegister ? "new-password" : "current-password",
										minLength: isRegister ? 8 : void 0
									})]
								}),
								isRegister ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "confirm-password",
										children: "Confirm password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
										id: "confirm-password",
										value: confirmPassword,
										onChange: setConfirmPassword,
										placeholder: "Enter your password again",
										autoComplete: "new-password",
										minLength: 8
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: acceptedTerms,
										onCheckedChange: (checked) => setAcceptedTerms(checked === true),
										className: "mt-0.5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I agree to uphold the YWBA community guidelines and respect the privacy of fellow members." })]
								})] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									size: "lg",
									className: "w-full",
									disabled: submitting || loading,
									children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : null, submitting ? "Please wait…" : isRegister ? "Create my account" : "Sign in"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-7 text-center text-sm text-muted-foreground",
							children: [
								isRegister ? "Already a member?" : "New to YWBA?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => switchMode(isRegister ? "signin" : "register"),
									className: "font-semibold text-primary underline-offset-4 hover:underline",
									children: isRegister ? "Sign in" : "Create an account"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-8 text-center text-xs leading-relaxed text-muted-foreground",
							children: [
								"By continuing, you acknowledge our respectful community values. Need help?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "font-semibold text-foreground hover:text-primary",
									children: "Contact YWBA"
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
