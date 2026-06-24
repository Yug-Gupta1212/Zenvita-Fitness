import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isRealSupabase = Boolean(supabaseUrl && supabaseAnonKey);

// Define type schema for mock profile
export interface Profile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  fitnessGoal: "lose_weight" | "maintain" | "build_muscle" | "improve_fitness";
  streak: number;
  workoutsCount: number;
  joinDate: string;
}

// Define type schema for food item analyzed by AI
export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

// Define type schema for nutrition logs
export interface MealLog {
  id: string;
  userId: string;
  foodName: string;
  mealType: "Breakfast" | "Lunch" | "Snack" | "Dinner";
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  createdAt: string;
  foodsList?: FoodItem[];
}

// Define type schema for sleep logs
export interface SleepLog {
  id: string;
  userId: string;
  bedtime: string; // e.g. "22:45"
  wakeTime: string; // e.g. "06:30"
  duration: number; // hours
  quality: number; // 0-100
  restingHeartRate: number;
  date: string; // "YYYY-MM-DD"
}

// Define type schema for notifications
export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "sleep" | "medication" | "wrap" | "ai";
  read: boolean;
  createdAt: string;
}

// Real Supabase client instance (if configured)
export const realSupabase = isRealSupabase
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Mock database store
const STORAGE_PREFIX = "zenvita_";

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(STORAGE_PREFIX + key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }
};

// Initial setup logic
const initMockDB = () => {
  const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
  
  // If empty, add a default test user
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
        joinDate: "June 2026",
      }
    };
    setStorageItem("users", users);
    
    // Add default meal logs
    const defaultMeals: MealLog[] = [
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
        createdAt: new Date().toISOString(),
        foodsList: [
          { name: "Oatmeal", quantity: "1 cup", calories: 150, protein: 5, carbs: 27, fats: 3 },
          { name: "Mixed Berries", quantity: "0.5 cup", calories: 40, protein: 1, carbs: 9, fats: 0 },
          { name: "Almond Butter", quantity: "2 tbsp", calories: 230, protein: 8, carbs: 22, fats: 13 }
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
        createdAt: new Date().toISOString(),
        foodsList: [
          { name: "Grilled Chicken", quantity: "150g", calories: 250, protein: 35, carbs: 0, fats: 6 },
          { name: "Quinoa", quantity: "1 cup cooked", calories: 220, protein: 8, carbs: 39, fats: 4 },
          { name: "Mixed Vegetables", quantity: "1 cup", calories: 110, protein: 0, carbs: 25, fats: 2 }
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
        createdAt: new Date().toISOString(),
        foodsList: [
          { name: "Greek Yogurt", quantity: "1 cup", calories: 130, protein: 15, carbs: 6, fats: 4 },
          { name: "Honey", quantity: "1 tbsp", calories: 60, protein: 0, carbs: 17, fats: 0 },
          { name: "Walnuts", quantity: "2 tbsp", calories: 30, protein: 3, carbs: -5, fats: 6 }
        ]
      },
    ];
    setStorageItem("meals", defaultMeals);

    // Add default sleep logs
    const defaultSleeps: SleepLog[] = [
      { id: "s1", userId: defaultUserId, bedtime: "22:45", wakeTime: "06:30", duration: 7.7, quality: 88, restingHeartRate: 58, date: new Date(Date.now() - 86400000).toISOString().split("T")[0] },
      { id: "s2", userId: defaultUserId, bedtime: "23:00", wakeTime: "07:00", duration: 8.0, quality: 82, restingHeartRate: 60, date: new Date(Date.now() - 172800000).toISOString().split("T")[0] },
      { id: "s3", userId: defaultUserId, bedtime: "22:30", wakeTime: "06:15", duration: 7.75, quality: 91, restingHeartRate: 56, date: new Date(Date.now() - 259200000).toISOString().split("T")[0] },
      { id: "s4", userId: defaultUserId, bedtime: "23:15", wakeTime: "07:15", duration: 8.0, quality: 78, restingHeartRate: 62, date: new Date(Date.now() - 345600000).toISOString().split("T")[0] },
      { id: "s5", userId: defaultUserId, bedtime: "22:15", wakeTime: "06:30", duration: 8.25, quality: 94, restingHeartRate: 55, date: new Date(Date.now() - 432000000).toISOString().split("T")[0] },
    ];
    setStorageItem("sleeps", defaultSleeps);

    // Add default notifications
    const defaultNotifications: AppNotification[] = [
      { id: "n1", userId: defaultUserId, title: "Sleep Goal Reached", message: "Amazing! You achieved 8 hours of restful sleep last night.", type: "sleep", read: false, createdAt: new Date().toISOString() },
      { id: "n2", userId: defaultUserId, title: "Hydration Check", message: "Time to log some water! You are at 1.8L / 3.0L today.", type: "ai", read: false, createdAt: new Date().toISOString() },
      { id: "n3", userId: defaultUserId, title: "Weekly Wrap Ready", message: "Your weekly health summary report has been compiled.", type: "wrap", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    ];
    setStorageItem("notifications", defaultNotifications);
  }
};

if (typeof window !== "undefined") {
  initMockDB();
}

// Authentication listeners list
type AuthListener = (event: string, session: any) => void;
const authListeners: Set<AuthListener> = new Set();

const triggerAuthChange = (event: string, session: any) => {
  authListeners.forEach((listener) => listener(event, session));
};

// Mock Authentication Client
const mockAuth = {
  signUp: async ({ email, password, options }: any) => {
    const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
    if (Object.values(users).some((u) => u.profile.email === email)) {
      return { data: { user: null }, error: new Error("User already exists") };
    }
    const userId = "user-" + Math.random().toString(36).substring(2, 11);
    const newProfile: Profile = {
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
      joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    users[userId] = { password, profile: newProfile };
    setStorageItem("users", users);

    const session = { user: { id: userId, email }, profile: newProfile };
    setStorageItem("current_session", session);
    triggerAuthChange("SIGNED_IN", session);

    return { data: { user: { id: userId, email } }, error: null };
  },

  signInWithPassword: async ({ email, password }: any) => {
    const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
    const match = Object.values(users).find(
      (u) => u.profile.email === email && u.password === password
    );

    if (!match) {
      return { data: { session: null }, error: new Error("Invalid credentials") };
    }

    const session = { user: { id: match.profile.id, email }, profile: match.profile };
    setStorageItem("current_session", session);
    triggerAuthChange("SIGNED_IN", session);

    return { data: { session }, error: null };
  },

  signOut: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_PREFIX + "current_session");
    }
    triggerAuthChange("SIGNED_OUT", null);
    return { error: null };
  },

  getSession: async () => {
    const session = getStorageItem<any>("current_session", null);
    return { data: { session } };
  },

  onAuthStateChange: (callback: AuthListener) => {
    authListeners.add(callback);
    const session = getStorageItem<any>("current_session", null);
    callback("INITIAL_SESSION", session);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            authListeners.delete(callback);
          },
        },
      },
    };
  },
};

// Database interfaces mock-up
const mockDB = {
  // Meals log operations
  getMeals: async (userId: string) => {
    const meals = getStorageItem<MealLog[]>("meals", []);
    return meals.filter((m) => m.userId === userId);
  },
  addMeal: async (meal: Omit<MealLog, "id" | "createdAt">) => {
    const meals = getStorageItem<MealLog[]>("meals", []);
    const newMeal: MealLog = {
      ...meal,
      id: "meal-" + Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    meals.push(newMeal);
    setStorageItem("meals", meals);
    return newMeal;
  },

  // Sleep logs operations
  getSleepLogs: async (userId: string) => {
    const sleeps = getStorageItem<SleepLog[]>("sleeps", []);
    return sleeps.filter((s) => s.userId === userId).sort((a, b) => a.date.localeCompare(b.date));
  },
  addSleepLog: async (sleep: Omit<SleepLog, "id">) => {
    const sleeps = getStorageItem<SleepLog[]>("sleeps", []);
    const newSleep: SleepLog = {
      ...sleep,
      id: "sleep-" + Math.random().toString(36).substring(2, 11),
    };
    
    // update user streak if slept consecutive days
    const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
    if (users[sleep.userId]) {
      users[sleep.userId].profile.streak = (users[sleep.userId].profile.streak || 0) + 1;
      setStorageItem("users", users);
      // Update session profile too
      const currentSession = getStorageItem<any>("current_session", null);
      if (currentSession && currentSession.user.id === sleep.userId) {
        currentSession.profile = users[sleep.userId].profile;
        setStorageItem("current_session", currentSession);
        triggerAuthChange("USER_UPDATED", currentSession);
      }
    }

    // Filter out same date log if exists, then add
    const filtered = sleeps.filter((s) => !(s.userId === sleep.userId && s.date === sleep.date));
    filtered.push(newSleep);
    setStorageItem("sleeps", filtered);
    return newSleep;
  },

  // Notifications operations
  getNotifications: async (userId: string) => {
    const notifications = getStorageItem<AppNotification[]>("notifications", []);
    return notifications.filter((n) => n.userId === userId);
  },
  markNotificationRead: async (notificationId: string) => {
    const notifications = getStorageItem<AppNotification[]>("notifications", []);
    const updated = notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setStorageItem("notifications", updated);
    return true;
  },
  addNotification: async (notification: Omit<AppNotification, "id" | "createdAt" | "read">) => {
    const notifications = getStorageItem<AppNotification[]>("notifications", []);
    const newNotif: AppNotification = {
      ...notification,
      id: "notif-" + Math.random().toString(36).substring(2, 11),
      read: false,
      createdAt: new Date().toISOString(),
    };
    notifications.push(newNotif);
    setStorageItem("notifications", notifications);
    return newNotif;
  },

  // Profile update operations
  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
    if (!users[userId]) return null;

    users[userId].profile = { ...users[userId].profile, ...updates };
    setStorageItem("users", users);

    // Sync session
    const currentSession = getStorageItem<any>("current_session", null);
    if (currentSession && currentSession.user.id === userId) {
      currentSession.profile = users[userId].profile;
      setStorageItem("current_session", currentSession);
      triggerAuthChange("USER_UPDATED", currentSession);
    }
    return users[userId].profile;
  },
  
  incrementWorkout: async (userId: string) => {
    const users = getStorageItem<Record<string, { password?: string; profile: Profile }>>("users", {});
    if (users[userId]) {
      users[userId].profile.workoutsCount = (users[userId].profile.workoutsCount || 0) + 1;
      users[userId].profile.streak = (users[userId].profile.streak || 0) + 1;
      setStorageItem("users", users);
      
      const currentSession = getStorageItem<any>("current_session", null);
      if (currentSession && currentSession.user.id === userId) {
        currentSession.profile = users[userId].profile;
        setStorageItem("current_session", currentSession);
        triggerAuthChange("USER_UPDATED", currentSession);
      }
    }
  }
};

// Export unified API
export const auth = isRealSupabase ? realSupabase!.auth : mockAuth;

// Database hooks mapper
export const db = mockDB; // Fallback mapping, can extend for Supabase client calls if keys active
