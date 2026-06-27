import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-DG2bxhYa.js
var supabaseUrl = void 0;
var supabaseAnonKey = void 0;
var isRealSupabase = Boolean(supabaseUrl);
var realSupabase = isRealSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;
var STORAGE_PREFIX = "zenvita_";
var getStorageItem = (key, defaultValue) => {
	if (typeof window === "undefined") return defaultValue;
	const stored = localStorage.getItem(STORAGE_PREFIX + key);
	return stored ? JSON.parse(stored) : defaultValue;
};
var setStorageItem = (key, value) => {
	if (typeof window !== "undefined") localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
};
var initMockDB = () => {
	const users = getStorageItem("users", {});
	if (Object.keys(users).length === 0) {
		const defaultUserId = "mock-user-alex";
		users[defaultUserId] = {
			password: "password123",
			profile: {
				id: defaultUserId,
				name: "Alex Morgan",
				email: "alex@zenvita.ai",
				age: 28,
				gender: "Female",
				height: 168,
				weight: 62,
				activityLevel: "moderate",
				fitnessGoal: "improve_fitness",
				streak: 5,
				workoutsCount: 24,
				joinDate: "June 2026"
			}
		};
		setStorageItem("users", users);
		setStorageItem("meals", [
			{
				id: "m1",
				userId: defaultUserId,
				mealType: "Breakfast",
				foodName: "Oatmeal with berries & almond butter",
				quantity: "1 bowl",
				calories: 420,
				protein: 14,
				carbs: 58,
				fats: 16,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				foodsList: [
					{
						name: "Oatmeal",
						quantity: "1 cup",
						calories: 150,
						protein: 5,
						carbs: 27,
						fats: 3
					},
					{
						name: "Mixed Berries",
						quantity: "0.5 cup",
						calories: 40,
						protein: 1,
						carbs: 9,
						fats: 0
					},
					{
						name: "Almond Butter",
						quantity: "2 tbsp",
						calories: 230,
						protein: 8,
						carbs: 22,
						fats: 13
					}
				]
			},
			{
				id: "m2",
				userId: defaultUserId,
				mealType: "Lunch",
				foodName: "Grilled chicken quinoa bowl",
				quantity: "1 bowl",
				calories: 580,
				protein: 42,
				carbs: 64,
				fats: 12,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				foodsList: [
					{
						name: "Grilled Chicken",
						quantity: "150g",
						calories: 250,
						protein: 35,
						carbs: 0,
						fats: 6
					},
					{
						name: "Quinoa",
						quantity: "1 cup cooked",
						calories: 220,
						protein: 8,
						carbs: 39,
						fats: 4
					},
					{
						name: "Mixed Vegetables",
						quantity: "1 cup",
						calories: 110,
						protein: 0,
						carbs: 25,
						fats: 2
					}
				]
			},
			{
				id: "m3",
				userId: defaultUserId,
				mealType: "Snack",
				foodName: "Greek yogurt with honey & walnuts",
				quantity: "200g",
				calories: 220,
				protein: 18,
				carbs: 18,
				fats: 10,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				foodsList: [
					{
						name: "Greek Yogurt",
						quantity: "1 cup",
						calories: 130,
						protein: 15,
						carbs: 6,
						fats: 4
					},
					{
						name: "Honey",
						quantity: "1 tbsp",
						calories: 60,
						protein: 0,
						carbs: 17,
						fats: 0
					},
					{
						name: "Walnuts",
						quantity: "2 tbsp",
						calories: 30,
						protein: 3,
						carbs: -5,
						fats: 6
					}
				]
			}
		]);
		setStorageItem("sleeps", [
			{
				id: "s1",
				userId: defaultUserId,
				bedtime: "22:45",
				wakeTime: "06:30",
				duration: 7.7,
				quality: 88,
				restingHeartRate: 58,
				date: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().split("T")[0]
			},
			{
				id: "s2",
				userId: defaultUserId,
				bedtime: "23:00",
				wakeTime: "07:00",
				duration: 8,
				quality: 82,
				restingHeartRate: 60,
				date: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString().split("T")[0]
			},
			{
				id: "s3",
				userId: defaultUserId,
				bedtime: "22:30",
				wakeTime: "06:15",
				duration: 7.75,
				quality: 91,
				restingHeartRate: 56,
				date: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString().split("T")[0]
			},
			{
				id: "s4",
				userId: defaultUserId,
				bedtime: "23:15",
				wakeTime: "07:15",
				duration: 8,
				quality: 78,
				restingHeartRate: 62,
				date: (/* @__PURE__ */ new Date(Date.now() - 3456e5)).toISOString().split("T")[0]
			},
			{
				id: "s5",
				userId: defaultUserId,
				bedtime: "22:15",
				wakeTime: "06:30",
				duration: 8.25,
				quality: 94,
				restingHeartRate: 55,
				date: (/* @__PURE__ */ new Date(Date.now() - 432e6)).toISOString().split("T")[0]
			}
		]);
		setStorageItem("notifications", [
			{
				id: "n1",
				userId: defaultUserId,
				title: "Sleep Goal Reached",
				message: "Amazing! You achieved 8 hours of restful sleep last night.",
				type: "sleep",
				read: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			},
			{
				id: "n2",
				userId: defaultUserId,
				title: "Hydration Check",
				message: "Time to log some water! You are at 1.8L / 3.0L today.",
				type: "ai",
				read: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			},
			{
				id: "n3",
				userId: defaultUserId,
				title: "Weekly Wrap Ready",
				message: "Your weekly health summary report has been compiled.",
				type: "wrap",
				read: true,
				createdAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
			}
		]);
	}
};
if (typeof window !== "undefined") initMockDB();
var authListeners = /* @__PURE__ */ new Set();
var triggerAuthChange = (event, session) => {
	authListeners.forEach((listener) => listener(event, session));
};
var mockAuth = {
	signUp: async ({ email, password, options }) => {
		const users = getStorageItem("users", {});
		if (Object.values(users).some((u) => u.profile.email === email)) return {
			data: { user: null },
			error: /* @__PURE__ */ new Error("User already exists")
		};
		const userId = "user-" + Math.random().toString(36).substring(2, 11);
		const newProfile = {
			id: userId,
			name: options?.data?.name || email.split("@")[0],
			email,
			age: options?.data?.age || 25,
			gender: options?.data?.gender || "Not specified",
			height: options?.data?.height || 170,
			weight: options?.data?.weight || 70,
			activityLevel: options?.data?.activityLevel || "moderate",
			fitnessGoal: options?.data?.fitnessGoal || "maintain",
			streak: 1,
			workoutsCount: 0,
			joinDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric"
			})
		};
		users[userId] = {
			password,
			profile: newProfile
		};
		setStorageItem("users", users);
		const session = {
			user: {
				id: userId,
				email
			},
			profile: newProfile
		};
		setStorageItem("current_session", session);
		triggerAuthChange("SIGNED_IN", session);
		return {
			data: { user: {
				id: userId,
				email
			} },
			error: null
		};
	},
	signInWithPassword: async ({ email, password }) => {
		const users = getStorageItem("users", {});
		const match = Object.values(users).find((u) => u.profile.email === email && u.password === password);
		if (!match) return {
			data: { session: null },
			error: /* @__PURE__ */ new Error("Invalid credentials")
		};
		const session = {
			user: {
				id: match.profile.id,
				email
			},
			profile: match.profile
		};
		setStorageItem("current_session", session);
		triggerAuthChange("SIGNED_IN", session);
		return {
			data: { session },
			error: null
		};
	},
	signOut: async () => {
		if (typeof window !== "undefined") localStorage.removeItem("zenvita_current_session");
		triggerAuthChange("SIGNED_OUT", null);
		return { error: null };
	},
	getSession: async () => {
		return { data: { session: getStorageItem("current_session", null) } };
	},
	onAuthStateChange: (callback) => {
		authListeners.add(callback);
		callback("INITIAL_SESSION", getStorageItem("current_session", null));
		return { data: { subscription: { unsubscribe: () => {
			authListeners.delete(callback);
		} } } };
	}
};
var mockDB = {
	getMeals: async (userId) => {
		return getStorageItem("meals", []).filter((m) => m.userId === userId);
	},
	addMeal: async (meal) => {
		const meals = getStorageItem("meals", []);
		const newMeal = {
			...meal,
			id: "meal-" + Math.random().toString(36).substring(2, 11),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		meals.push(newMeal);
		setStorageItem("meals", meals);
		return newMeal;
	},
	getSleepLogs: async (userId) => {
		return getStorageItem("sleeps", []).filter((s) => s.userId === userId).sort((a, b) => a.date.localeCompare(b.date));
	},
	addSleepLog: async (sleep) => {
		const sleeps = getStorageItem("sleeps", []);
		const newSleep = {
			...sleep,
			id: "sleep-" + Math.random().toString(36).substring(2, 11)
		};
		const users = getStorageItem("users", {});
		if (users[sleep.userId]) {
			users[sleep.userId].profile.streak = (users[sleep.userId].profile.streak || 0) + 1;
			setStorageItem("users", users);
			const currentSession = getStorageItem("current_session", null);
			if (currentSession && currentSession.user.id === sleep.userId) {
				currentSession.profile = users[sleep.userId].profile;
				setStorageItem("current_session", currentSession);
				triggerAuthChange("USER_UPDATED", currentSession);
			}
		}
		const filtered = sleeps.filter((s) => !(s.userId === sleep.userId && s.date === sleep.date));
		filtered.push(newSleep);
		setStorageItem("sleeps", filtered);
		return newSleep;
	},
	getNotifications: async (userId) => {
		return getStorageItem("notifications", []).filter((n) => n.userId === userId);
	},
	markNotificationRead: async (notificationId) => {
		setStorageItem("notifications", getStorageItem("notifications", []).map((n) => n.id === notificationId ? {
			...n,
			read: true
		} : n));
		return true;
	},
	addNotification: async (notification) => {
		const notifications = getStorageItem("notifications", []);
		const newNotif = {
			...notification,
			id: "notif-" + Math.random().toString(36).substring(2, 11),
			read: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		notifications.push(newNotif);
		setStorageItem("notifications", notifications);
		return newNotif;
	},
	updateProfile: async (userId, updates) => {
		const users = getStorageItem("users", {});
		if (!users[userId]) return null;
		users[userId].profile = {
			...users[userId].profile,
			...updates
		};
		setStorageItem("users", users);
		const currentSession = getStorageItem("current_session", null);
		if (currentSession && currentSession.user.id === userId) {
			currentSession.profile = users[userId].profile;
			setStorageItem("current_session", currentSession);
			triggerAuthChange("USER_UPDATED", currentSession);
		}
		return users[userId].profile;
	},
	incrementWorkout: async (userId) => {
		const users = getStorageItem("users", {});
		if (users[userId]) {
			users[userId].profile.workoutsCount = (users[userId].profile.workoutsCount || 0) + 1;
			users[userId].profile.streak = (users[userId].profile.streak || 0) + 1;
			setStorageItem("users", users);
			const currentSession = getStorageItem("current_session", null);
			if (currentSession && currentSession.user.id === userId) {
				currentSession.profile = users[userId].profile;
				setStorageItem("current_session", currentSession);
				triggerAuthChange("USER_UPDATED", currentSession);
			}
		}
	}
};
var auth = isRealSupabase ? realSupabase.auth : mockAuth;
var db = mockDB;
//#endregion
export { db as n, auth as t };
