import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as auth } from "./supabase-DG2bxhYa.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { A as MessageSquare, C as Plus, i as Users, j as MessageCircle, n as X, o as UserPlus, s as UserCheck, y as Send, z as Heart } from "../_libs/lucide-react.mjs";
import { n as SectionHeader, t as AppShell } from "./AppShell-oSNVi1Cx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-D7TTbwqJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommunityPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("feed");
	const [feedFilter, setFeedFilter] = (0, import_react.useState)("global");
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)([]);
	const [newPostText, setNewPostText] = (0, import_react.useState)("");
	const [newPostImage, setNewPostImage] = (0, import_react.useState)("");
	const [activeChatMember, setActiveChatMember] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)({});
	const [typedMessage, setTypedMessage] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		auth.getSession().then(({ data }) => {
			if (data.session) setProfile(data.session.profile);
		});
		const storedPosts = localStorage.getItem("zenvita_comm_posts");
		if (storedPosts) setPosts(JSON.parse(storedPosts));
		else {
			const defaultPosts = [
				{
					id: "p1",
					authorName: "Coach Marcus",
					authorAvatar: "M",
					content: "Remember to focus on posture during your deadlifts today! Keep the bar close to your shins, engage your core, and drive through the heels. Let's make this week count! 🔥",
					likes: 42,
					hasLiked: false,
					comments: [{
						author: "Alex Morgan",
						text: "Great cue, Marcus! Helped with my lumbar posture today."
					}, {
						author: "Elena Rostova",
						text: "Will apply this in my afternoon lifting block!"
					}],
					createdAt: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString()
				},
				{
					id: "p2",
					authorName: "Sarah Jenkins",
					authorAvatar: "S",
					content: "Smashed my 5km baseline run this morning! Hit a new personal record of 22:45. The sunrise at the park was absolutely gorgeous too. 🌅🏃‍♀️",
					likes: 28,
					hasLiked: false,
					comments: [],
					createdAt: (/* @__PURE__ */ new Date(Date.now() - 144e5)).toISOString()
				},
				{
					id: "p3",
					authorName: "David Chen",
					authorAvatar: "D",
					content: "Post-workout nutrition is key! Made a high-protein shake with vegan protein, almond butter, spinach, and half a frozen banana. Perfect macro balance.",
					likes: 15,
					hasLiked: false,
					comments: [{
						author: "Sarah Jenkins",
						text: "Add some hemp seeds for extra healthy fats!"
					}],
					createdAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
				}
			];
			setPosts(defaultPosts);
			localStorage.setItem("zenvita_comm_posts", JSON.stringify(defaultPosts));
		}
		const storedMembers = localStorage.getItem("zenvita_comm_members");
		if (storedMembers) setMembers(JSON.parse(storedMembers));
		else {
			const defaultMembers = [
				{
					id: "m1",
					name: "Coach Marcus",
					avatar: "M",
					bio: "Certified Strength Coach & Nutrition Advisor.",
					fitnessGoal: "Build Muscle",
					isFollowing: true,
					status: "online"
				},
				{
					id: "m2",
					name: "Sarah Jenkins",
					avatar: "S",
					bio: "Marathon runner and recovery enthusiast.",
					fitnessGoal: "Improve Fitness",
					isFollowing: true,
					status: "online"
				},
				{
					id: "m3",
					name: "David Chen",
					avatar: "D",
					bio: "Plant-based weightlifter. Hydration advocate.",
					fitnessGoal: "Build Muscle",
					isFollowing: false,
					status: "offline"
				},
				{
					id: "m4",
					name: "Elena Rostova",
					avatar: "E",
					bio: "Yoga instructor & flexibility practitioner.",
					fitnessGoal: "Improve Fitness",
					isFollowing: false,
					status: "online"
				}
			];
			setMembers(defaultMembers);
			localStorage.setItem("zenvita_comm_members", JSON.stringify(defaultMembers));
		}
		const storedMessages = localStorage.getItem("zenvita_comm_messages");
		if (storedMessages) setMessages(JSON.parse(storedMessages));
		else {
			const defaultMessages = {
				"m1": [{
					id: "msg1",
					senderId: "m1",
					text: "Hi Alex! How did your morning lifting session go?",
					timestamp: (/* @__PURE__ */ new Date(Date.now() - 72e5)).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})
				}, {
					id: "msg2",
					senderId: "me",
					text: "It went great Marcus! Kept my deadlift form tight.",
					timestamp: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})
				}],
				"m2": [{
					id: "msg3",
					senderId: "m2",
					text: "Hey! Let's schedule a running session at the park this weekend.",
					timestamp: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})
				}]
			};
			setMessages(defaultMessages);
			localStorage.setItem("zenvita_comm_messages", JSON.stringify(defaultMessages));
		}
	}, []);
	const handleLikePost = (postId) => {
		const updated = posts.map((post) => {
			if (post.id === postId) return {
				...post,
				likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
				hasLiked: !post.hasLiked
			};
			return post;
		});
		setPosts(updated);
		localStorage.setItem("zenvita_comm_posts", JSON.stringify(updated));
	};
	const handleCreatePost = (e) => {
		e.preventDefault();
		if (!newPostText.trim()) return;
		const updated = [{
			id: "post-" + Math.random().toString(36).substring(2, 11),
			authorName: profile?.name || "Alex Morgan",
			authorAvatar: (profile?.name?.[0] || "U").toUpperCase(),
			content: newPostText,
			likes: 0,
			hasLiked: false,
			comments: [],
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...posts];
		setPosts(updated);
		localStorage.setItem("zenvita_comm_posts", JSON.stringify(updated));
		setNewPostText("");
	};
	const handleFollowToggle = (memberId) => {
		const updated = members.map((m) => {
			if (m.id === memberId) return {
				...m,
				isFollowing: !m.isFollowing
			};
			return m;
		});
		setMembers(updated);
		localStorage.setItem("zenvita_comm_members", JSON.stringify(updated));
	};
	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!typedMessage.trim() || !activeChatMember) return;
		const friendId = activeChatMember.id;
		const userMsg = {
			id: "msg-" + Math.random().toString(36).substring(2, 11),
			senderId: "me",
			text: typedMessage,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		const updatedThread = [...messages[friendId] || [], userMsg];
		const updatedMessages = {
			...messages,
			[friendId]: updatedThread
		};
		setMessages(updatedMessages);
		localStorage.setItem("zenvita_comm_messages", JSON.stringify(updatedMessages));
		setTypedMessage("");
		setIsTyping(true);
		setTimeout(() => {
			const responses = {
				"m1": [
					"Outstanding effort! Consistency is exactly what drives results.",
					"Perfect! Remember to hydrate well and recover properly tonight.",
					"Keep pushing. Next week we increase the working volume."
				],
				"m2": [
					"Nice job! Looking forward to crushing our weekend run.",
					"Awesome. What was your hydration score today?",
					"That sounds amazing! Let's push for a new pace baseline."
				],
				"default": [
					"That is awesome! Let's stay active and support each other.",
					"Agreed! Keep up the good work.",
					"Consistency is key!"
				]
			};
			const resOptions = responses[friendId] || responses["default"];
			const chosenText = resOptions[Math.floor(Math.random() * resOptions.length)];
			const systemMsg = {
				id: "msg-" + Math.random().toString(36).substring(2, 11),
				senderId: friendId,
				text: chosenText,
				timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				})
			};
			const finalThread = [...updatedThread, systemMsg];
			const finalMessages = {
				...updatedMessages,
				[friendId]: finalThread
			};
			setMessages(finalMessages);
			localStorage.setItem("zenvita_comm_messages", JSON.stringify(finalMessages));
			setIsTyping(false);
		}, 1500);
	};
	const filteredPosts = posts.filter((post) => {
		if (feedFilter === "global") return true;
		const authorMember = members.find((m) => m.name === post.authorName);
		return authorMember ? authorMember.isFollowing : post.authorName === (profile?.name || "Alex Morgan");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		subtitle: "Connect & share",
		title: "Community",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-3 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("feed"),
					className: `relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${activeTab === "feed" ? "text-white" : "glass text-muted-foreground hover:text-foreground"}`,
					children: [activeTab === "feed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						layoutId: "commTabGlow",
						className: "absolute inset-0 rounded-full bg-gradient-brand shadow-glow",
						transition: {
							type: "spring",
							stiffness: 350,
							damping: 28
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative z-10 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Community Feed"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("friends"),
					className: `relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${activeTab === "friends" ? "text-white" : "glass text-muted-foreground hover:text-foreground"}`,
					children: [activeTab === "friends" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						layoutId: "commTabGlow",
						className: "absolute inset-0 rounded-full bg-gradient-brand shadow-glow",
						transition: {
							type: "spring",
							stiffness: 350,
							damping: 28
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative z-10 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " Fitness Buddies"]
					})]
				})]
			}),
			activeTab === "feed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between border-b border-border pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFeedFilter("global"),
								className: `font-semibold pb-1.5 border-b-2 transition-all cursor-pointer ${feedFilter === "global" ? "text-[var(--brand)] border-[var(--brand)]" : "text-muted-foreground border-transparent"}`,
								children: "Global"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFeedFilter("following"),
								className: `font-semibold pb-1.5 border-b-2 transition-all cursor-pointer ${feedFilter === "following" ? "text-[var(--brand)] border-[var(--brand)]" : "text-muted-foreground border-transparent"}`,
								children: "Following"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreatePost,
						className: "rounded-2xl glass p-4 border border-border shadow-card space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 2,
							placeholder: "What are your fitness goals or accomplishments today? Share with the community...",
							value: newPostText,
							onChange: (e) => setNewPostText(e.target.value),
							className: "w-full bg-muted border border-border rounded-xl p-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] resize-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "rounded-full bg-gradient-brand text-white font-semibold text-xs px-4.5 py-2 cursor-pointer shadow-glow hover:opacity-95 transition-all flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Share Post"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: filteredPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-5 border border-border shadow-card space-y-3.5 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-white font-[Instrument_Serif] font-bold text-lg shadow-glow shrink-0",
										children: post.authorAvatar
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-foreground",
										children: post.authorName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] text-muted-foreground mt-0.5",
										children: [
											new Date(post.createdAt).toLocaleDateString([], {
												month: "short",
												day: "numeric"
											}),
											" at ",
											new Date(post.createdAt).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap",
									children: post.content
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 pt-2 border-t border-border text-[11px] font-semibold text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleLikePost(post.id),
										className: `flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer ${post.hasLiked ? "text-red-400" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${post.hasLiked ? "fill-red-400" : ""}` }),
											" ",
											post.likes
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
											" ",
											post.comments.length,
											" Comments"
										]
									})]
								}),
								post.comments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-muted/50 border border-border rounded-xl p-3.5 space-y-2.5 mt-2",
									children: post.comments.map((comment, cidx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-foreground pr-2",
											children: [comment.author, ":"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: comment.text })]
									}, cidx))
								})
							]
						}, post.id))
					})
				]
			}),
			activeTab === "friends" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Active Members & suggested friends" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl glass p-3 border border-border space-y-2",
						children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full bg-muted border border-border grid place-items-center text-[var(--brand)] font-bold shadow-inner shrink-0",
										children: member.avatar
									}), member.status === "online" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#0d0d0d] shadow-glow" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold text-foreground truncate",
										children: member.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-muted-foreground mt-0.5 truncate",
										children: member.bio
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setActiveChatMember(member),
										className: "p-2 rounded-lg bg-muted text-[var(--brand)] hover:bg-[var(--brand)]/10 transition-colors cursor-pointer",
										"aria-label": "Direct message",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleFollowToggle(member.id),
										className: `p-2 rounded-lg transition-all cursor-pointer ${member.isFollowing ? "bg-[var(--brand)] text-white shadow-glow" : "bg-muted text-muted-foreground hover:text-foreground"}`,
										children: member.isFollowing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5" })
									})]
								})
							]
						}, member.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7",
					children: activeChatMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl glass-strong border border-border shadow-card flex flex-col h-[400px] relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 border-b border-border flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center font-bold text-sm",
										children: activeChatMember.avatar
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-foreground",
											children: activeChatMember.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] text-emerald-400 font-medium",
											children: activeChatMember.status === "online" ? "online" : "offline"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveChatMember(null),
									className: "p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4.5 w-4.5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 overflow-y-auto p-4 space-y-3.5",
								children: [(messages[activeChatMember.id] || []).map((msg) => {
									const isMe = msg.senderId === "me";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex flex-col max-w-[75%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `p-3 rounded-2xl text-xs leading-normal ${isMe ? "bg-gradient-brand text-white shadow-glow rounded-tr-none" : "bg-muted text-muted-foreground border border-border rounded-tl-none text-left"}`,
											children: msg.text
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] text-muted-foreground mt-1 px-1",
											children: msg.timestamp
										})]
									}, msg.id);
								}), isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 mr-auto bg-muted border border-border rounded-2xl rounded-tl-none p-3 max-w-[50%]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
											style: { animationDelay: "0ms" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
											style: { animationDelay: "150ms" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce",
											style: { animationDelay: "300ms" }
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSendMessage,
								className: "p-3 border-t border-border flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "Type your message...",
									value: typedMessage,
									onChange: (e) => setTypedMessage(e.target.value),
									className: "flex-1 bg-muted border border-border rounded-xl py-2 px-3 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl glass border border-border h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-10 w-10 text-muted-foreground/20 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								children: "Select a buddy to start messaging"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground/60 mt-1 max-w-[200px]",
								children: "Share routines, logs, and celebrate daily streaks together!"
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { CommunityPage as component };
