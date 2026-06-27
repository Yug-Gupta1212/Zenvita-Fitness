import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, MessageSquare, Heart, Share2, Send, Plus, 
  UserPlus, UserCheck, MessageCircle, X, ChevronRight, Check
} from "lucide-react";
import { AppShell, SectionHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { auth } from "@/lib/supabase";
import { getSafeLocalStorage } from "@/lib/browser-safe";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Zenvita — Fitness Community" },
    ],
  }),
  component: CommunityPage,
});

interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  hasLiked: boolean;
  comments: Array<{ author: string; text: string }>;
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  fitnessGoal: string;
  isFollowing: boolean;
  status: "online" | "offline";
}

interface Message {
  id: string;
  senderId: "me" | string;
  text: string;
  timestamp: string;
}

function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"feed" | "friends">("feed");
  const [feedFilter, setFeedFilter] = useState<"global" | "following">("global");
  const storage = getSafeLocalStorage();
  
  // States
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  
  // Post Creation
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState("");

  // Messaging Panel
  const [activeChatMember, setActiveChatMember] = useState<Member | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [typedMessage, setTypedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Load session info
    auth.getSession().then(({ data }) => {
      if (data.session) {
        setProfile(data.session.profile);
      }
    });

    // Load or set default posts
    const storedPosts = storage?.getItem("zenvita_comm_posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const defaultPosts: Post[] = [
        {
          id: "p1",
          authorName: "Coach Marcus",
          authorAvatar: "M",
          content: "Remember to focus on posture during your deadlifts today! Keep the bar close to your shins, engage your core, and drive through the heels. Let's make this week count! 🔥",
          likes: 42,
          hasLiked: false,
          comments: [
            { author: "Alex Morgan", text: "Great cue, Marcus! Helped with my lumbar posture today." },
            { author: "Elena Rostova", text: "Will apply this in my afternoon lifting block!" }
          ],
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: "p2",
          authorName: "Sarah Jenkins",
          authorAvatar: "S",
          content: "Smashed my 5km baseline run this morning! Hit a new personal record of 22:45. The sunrise at the park was absolutely gorgeous too. 🌅🏃‍♀️",
          likes: 28,
          hasLiked: false,
          comments: [],
          createdAt: new Date(Date.now() - 14400000).toISOString()
        },
        {
          id: "p3",
          authorName: "David Chen",
          authorAvatar: "D",
          content: "Post-workout nutrition is key! Made a high-protein shake with vegan protein, almond butter, spinach, and half a frozen banana. Perfect macro balance.",
          likes: 15,
          hasLiked: false,
          comments: [
            { author: "Sarah Jenkins", text: "Add some hemp seeds for extra healthy fats!" }
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setPosts(defaultPosts);
      storage?.setItem("zenvita_comm_posts", JSON.stringify(defaultPosts));
    }

    // Load or set default members
    const storedMembers = storage?.getItem("zenvita_comm_members");
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    } else {
      const defaultMembers: Member[] = [
        { id: "m1", name: "Coach Marcus", avatar: "M", bio: "Certified Strength Coach & Nutrition Advisor.", fitnessGoal: "Build Muscle", isFollowing: true, status: "online" },
        { id: "m2", name: "Sarah Jenkins", avatar: "S", bio: "Marathon runner and recovery enthusiast.", fitnessGoal: "Improve Fitness", isFollowing: true, status: "online" },
        { id: "m3", name: "David Chen", avatar: "D", bio: "Plant-based weightlifter. Hydration advocate.", fitnessGoal: "Build Muscle", isFollowing: false, status: "offline" },
        { id: "m4", name: "Elena Rostova", avatar: "E", bio: "Yoga instructor & flexibility practitioner.", fitnessGoal: "Improve Fitness", isFollowing: false, status: "online" }
      ];
      setMembers(defaultMembers);
      storage?.setItem("zenvita_comm_members", JSON.stringify(defaultMembers));
    }

    // Load messages database
    const storedMessages = storage?.getItem("zenvita_comm_messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const defaultMessages: Record<string, Message[]> = {
        "m1": [
          { id: "msg1", senderId: "m1", text: "Hi Alex! How did your morning lifting session go?", timestamp: new Date(Date.now() - 7200000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
          { id: "msg2", senderId: "me", text: "It went great Marcus! Kept my deadlift form tight.", timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
        ],
        "m2": [
          { id: "msg3", senderId: "m2", text: "Hey! Let's schedule a running session at the park this weekend.", timestamp: new Date(Date.now() - 86400000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
        ]
      };
      setMessages(defaultMessages);
      storage?.setItem("zenvita_comm_messages", JSON.stringify(defaultMessages));
    }
  }, []);

  const handleLikePost = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    });
    setPosts(updated);
    storage?.setItem("zenvita_comm_posts", JSON.stringify(updated));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: "post-" + Math.random().toString(36).substring(2, 11),
      authorName: profile?.name || "Alex Morgan",
      authorAvatar: (profile?.name?.[0] || "U").toUpperCase(),
      content: newPostText,
      likes: 0,
      hasLiked: false,
      comments: [],
      createdAt: new Date().toISOString()
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    storage?.setItem("zenvita_comm_posts", JSON.stringify(updated));
    setNewPostText("");
  };

  const handleFollowToggle = (memberId: string) => {
    const updated = members.map((m) => {
      if (m.id === memberId) {
        return { ...m, isFollowing: !m.isFollowing };
      }
      return m;
    });
    setMembers(updated);
    storage?.setItem("zenvita_comm_members", JSON.stringify(updated));
  };

  // Chat message submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChatMember) return;

    const friendId = activeChatMember.id;
    const userMsg: Message = {
      id: "msg-" + Math.random().toString(36).substring(2, 11),
      senderId: "me",
      text: typedMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const thread = messages[friendId] || [];
    const updatedThread = [...thread, userMsg];
    
    const updatedMessages = {
      ...messages,
      [friendId]: updatedThread
    };
    
    setMessages(updatedMessages);
    storage?.setItem("zenvita_comm_messages", JSON.stringify(updatedMessages));
    setTypedMessage("");

    // Simulate realistic typing and response!
    setIsTyping(true);
    setTimeout(() => {
      const responses: Record<string, string[]> = {
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

      const systemMsg: Message = {
        id: "msg-" + Math.random().toString(36).substring(2, 11),
        senderId: friendId,
        text: chosenText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      const finalThread = [...updatedThread, systemMsg];
      const finalMessages = {
        ...updatedMessages,
        [friendId]: finalThread
      };
      
      setMessages(finalMessages);
      storage?.setItem("zenvita_comm_messages", JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 1500);
  };

  const filteredPosts = posts.filter((post) => {
    if (feedFilter === "global") return true;
    const authorMember = members.find((m) => m.name === post.authorName);
    return authorMember ? authorMember.isFollowing : post.authorName === (profile?.name || "Alex Morgan");
  });

  return (
    <AppShell subtitle="Connect & share" title="Community">
      {/* Community Feed / Friends Navigation Tab Switches */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        <button
          onClick={() => setActiveTab("feed")}
          className={`relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
            activeTab === "feed" ? "text-white" : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeTab === "feed" && (
            <motion.span
              layoutId="commTabGlow"
              className="absolute inset-0 rounded-full bg-gradient-brand shadow-glow"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5"><Users className="h-4 w-4" /> Community Feed</span>
        </button>

        <button
          onClick={() => setActiveTab("friends")}
          className={`relative px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
            activeTab === "friends" ? "text-white" : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeTab === "friends" && (
            <motion.span
              layoutId="commTabGlow"
              className="absolute inset-0 rounded-full bg-gradient-brand shadow-glow"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Fitness Buddies</span>
        </button>
      </div>

      {/* FEED TAB */}
      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Feed Filter Switches (Global vs Following) */}
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex gap-3 text-xs">
              <button 
                onClick={() => setFeedFilter("global")}
                className={`font-semibold pb-1.5 border-b-2 transition-all cursor-pointer ${feedFilter === "global" ? "text-[var(--brand)] border-[var(--brand)]" : "text-muted-foreground border-transparent"}`}
              >
                Global
              </button>
              <button 
                onClick={() => setFeedFilter("following")}
                className={`font-semibold pb-1.5 border-b-2 transition-all cursor-pointer ${feedFilter === "following" ? "text-[var(--brand)] border-[var(--brand)]" : "text-muted-foreground border-transparent"}`}
              >
                Following
              </button>
            </div>
          </div>

          {/* New Post Form */}
          <form onSubmit={handleCreatePost} className="rounded-2xl glass p-4 border border-border shadow-card space-y-3">
            <textarea
              required
              rows={2}
              placeholder="What are your fitness goals or accomplishments today? Share with the community..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl p-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--brand)] resize-none"
            />
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="rounded-full bg-gradient-brand text-white font-semibold text-xs px-4.5 py-2 cursor-pointer shadow-glow hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" /> Share Post
              </button>
            </div>
          </form>

          {/* Posts list */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="rounded-2xl glass p-5 border border-border shadow-card space-y-3.5 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-white font-[Instrument_Serif] font-bold text-lg shadow-glow shrink-0">
                    {post.authorAvatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{post.authorName}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })} at {new Date(post.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>

                <div className="flex items-center gap-4 pt-2 border-t border-border text-[11px] font-semibold text-muted-foreground">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer ${post.hasLiked ? "text-red-400" : ""}`}
                  >
                    <Heart className={`h-4 w-4 ${post.hasLiked ? "fill-red-400" : ""}`} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                    <MessageCircle className="h-4 w-4" /> {post.comments.length} Comments
                  </button>
                </div>

                {/* Comments block */}
                {post.comments.length > 0 && (
                  <div className="bg-muted/50 border border-border rounded-xl p-3.5 space-y-2.5 mt-2">
                    {post.comments.map((comment, cidx) => (
                      <div key={cidx} className="text-xs text-muted-foreground">
                        <span className="font-bold text-foreground pr-2">{comment.author}:</span>
                        <span>{comment.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FITNESS BUDDIES / DIRECT CHAT TAB */}
      {activeTab === "friends" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Members List (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <SectionHeader title="Active Members & suggested friends" />
            <div className="rounded-2xl glass p-3 border border-border space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-all">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-muted border border-border grid place-items-center text-[var(--brand)] font-bold shadow-inner shrink-0">
                      {member.avatar}
                    </div>
                    {member.status === "online" && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#0d0d0d] shadow-glow" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{member.name}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5 truncate">{member.bio}</p>
                  </div>
                  
                  <div className="flex gap-1 shrink-0">
                    <button 
                      onClick={() => setActiveChatMember(member)}
                      className="p-2 rounded-lg bg-muted text-[var(--brand)] hover:bg-[var(--brand)]/10 transition-colors cursor-pointer"
                      aria-label="Direct message"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleFollowToggle(member.id)}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        member.isFollowing 
                          ? "bg-[var(--brand)] text-white shadow-glow" 
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {member.isFollowing ? <UserCheck className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window Panel (7 Cols) */}
          <div className="lg:col-span-7">
            {activeChatMember ? (
              <div className="rounded-3xl glass-strong border border-border shadow-card flex flex-col h-[400px] relative overflow-hidden">
                {/* Chat header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] grid place-items-center font-bold text-sm">
                      {activeChatMember.avatar}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-foreground">{activeChatMember.name}</p>
                      <p className="text-[9px] text-emerald-400 font-medium">
                        {activeChatMember.status === "online" ? "online" : "offline"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveChatMember(null)}
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Messages ledger */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {(messages[activeChatMember.id] || []).map((msg) => {
                    const isMe = msg.senderId === "me";
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col max-w-[75%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className={`p-3 rounded-2xl text-xs leading-normal ${
                          isMe 
                            ? "bg-gradient-brand text-white shadow-glow rounded-tr-none" 
                            : "bg-muted text-muted-foreground border border-border rounded-tl-none text-left"
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[8px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    );
                  })}

                  {/* Typing animation block */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 mr-auto bg-muted border border-border rounded-2xl rounded-tl-none p-3 max-w-[50%]">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>

                {/* Message Send Form */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Type your message..."
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    className="flex-1 bg-muted border border-border rounded-xl py-2 px-3 text-xs text-foreground focus:outline-none focus:border-[var(--brand)]"
                  />
                  <button
                    type="submit"
                    className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

              </div>
            ) : (
              <div className="rounded-3xl glass border border-border h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                <Users className="h-10 w-10 text-muted-foreground/20 mb-2" />
                <p className="text-xs font-semibold">Select a buddy to start messaging</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 max-w-[200px]">
                  Share routines, logs, and celebrate daily streaks together!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
