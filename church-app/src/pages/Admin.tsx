import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Users, BookOpen, Tv, Bell, BarChart3, CalendarDays, Home, LogOut, Plus, Edit2, Trash2, Send } from "lucide-react";
import { DEMO_DATA } from "@/data/demo";
import { useToast } from "@/hooks/use-toast";

type AdminTab = "overview" | "announcements" | "verses" | "livestreams" | "notifications" | "users" | "services";

const ADMIN_USERS = [
  { name: "Pastor Expedito", email: "pastor@allfaith.org", role: "Admin", joined: "Jan 2024" },
  { name: "Naggawa Mariam", email: "mariam@allfaith.org", role: "Leader", joined: "Mar 2024" },
  { name: "Negohe Ivan", email: "ivan@allfaith.org", role: "Media", joined: "Feb 2024" },
  { name: "Kaduma Dasan", email: "dasan@allfaith.org", role: "Leader", joined: "Apr 2024" },
  { name: "Nkote Mariam", email: "nkote@allfaith.org", role: "Leader", joined: "May 2024" },
];

const LIVE_STREAMS = [
  { id: 1, title: "Sunday Morning Service", date: "May 18, 2026", url: "https://youtube.com/@allfaithmissionchurches" },
  { id: 2, title: "Wednesday Bible Study", date: "May 14, 2026", url: "https://youtube.com/@allfaithmissionchurches" },
  { id: 3, title: "Overnight Service", date: "May 9, 2026", url: "https://youtube.com/@allfaithmissionchurches" },
  { id: 4, title: "Youth Service", date: "May 4, 2026", url: "https://youtube.com/@allfaithmissionchurches" },
];

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl p-4 bg-[#1e293b] border border-white/10"
    >
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 glow-blue`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-white font-display">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { toast } = useToast();

  const navItems: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "verses", label: "Bible Verses", icon: BookOpen },
    { id: "livestreams", label: "Livestreams", icon: Tv },
    { id: "notifications", label: "Notifications", icon: Send },
    { id: "users", label: "Users", icon: Users },
    { id: "services", label: "Services", icon: CalendarDays },
  ];

  function demo() {
    toast({ title: "Demo Mode", description: "Connect Firebase to enable real data management." });
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/10 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8 mt-2">
          <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" fill="none" className="w-4 h-4 text-primary">
              <rect x="32" y="4" width="16" height="72" rx="4" fill="currentColor" />
              <rect x="8" y="24" width="64" height="16" rx="4" fill="currentColor" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">All Faith Mission</p>
            <p className="text-slate-500 text-[10px]">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === id
                  ? "bg-primary/20 text-primary font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`admin-nav-${id}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-white/10">
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Home className="w-4 h-4" /> Back to App
            </button>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-white font-display">Dashboard Overview</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Members" value="247" color="bg-blue-600" />
                <StatCard icon={BookOpen} label="Prayer Requests" value="18" color="bg-violet-600" />
                <StatCard icon={Tv} label="This Week Sermons" value="3" color="bg-rose-600" />
                <StatCard icon={CalendarDays} label="Departments" value="8" color="bg-emerald-600" />
              </div>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 p-5">
                <h2 className="text-white font-bold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    "New prayer request submitted by Sarah K.",
                    "Sunday service recording uploaded",
                    "3 new members joined Youth Ministry",
                    "Announcement 'Night of Wonders' was pinned",
                    "Bible verse updated for the week",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-slate-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Announcements */}
          {activeTab === "announcements" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-display">Announcements</h1>
                <button onClick={demo} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
                {DEMO_DATA.announcements.concat([
                  { id: 3, title: "Youth Camp 2026", date: "Next Month", desc: "Annual youth camp.", pinned: false },
                ]).map((a, i) => (
                  <div key={a.id} className={`flex items-start justify-between gap-4 p-4 ${i < 2 ? "border-b border-white/10" : ""}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {a.pinned && <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Pinned</span>}
                        <span className="text-slate-400 text-xs">{a.date}</span>
                      </div>
                      <p className="text-white font-semibold text-sm">{a.title}</p>
                      <p className="text-slate-400 text-xs mt-1">{a.desc}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={demo} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={demo} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bible Verses */}
          {activeTab === "verses" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-white font-display">Bible Verses</h1>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
                {DEMO_DATA.verses.map((v, i) => {
                  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                  return (
                    <div key={i} className={`flex items-start justify-between gap-4 p-4 ${i < DEMO_DATA.verses.length - 1 ? "border-b border-white/10" : ""}`}>
                      <div>
                        <p className="text-primary text-xs font-bold mb-1">{days[i]} — {v.ref}</p>
                        <p className="text-slate-300 text-sm leading-relaxed italic">"{v.text}"</p>
                      </div>
                      <button onClick={demo} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white flex-shrink-0"><Edit2 className="w-4 h-4" /></button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Livestreams */}
          {activeTab === "livestreams" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-display">Livestreams</h1>
                <button onClick={demo} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
                  <Plus className="w-4 h-4" /> Add Stream
                </button>
              </div>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
                {LIVE_STREAMS.map((s, i) => (
                  <div key={s.id} className={`flex items-center justify-between gap-4 p-4 ${i < LIVE_STREAMS.length - 1 ? "border-b border-white/10" : ""}`}>
                    <div>
                      <p className="text-white font-semibold text-sm">{s.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{s.date}</p>
                      <p className="text-primary text-xs mt-0.5 truncate max-w-[200px]">{s.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={demo} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={demo} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-white font-display">Send Notification</h1>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 p-5 max-w-lg space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Title</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Notification title" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" placeholder="Write your message..." />
                </div>
                <button onClick={demo} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm glow-blue hover:opacity-90">
                  <Send className="w-4 h-4" /> Send to All Members
                </button>
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-white font-display">Members ({ADMIN_USERS.length})</h1>
              <div className="rounded-2xl bg-[#1e293b] border border-white/10 overflow-hidden">
                <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Name</span><span>Email</span><span>Role</span><span>Joined</span>
                </div>
                {ADMIN_USERS.map((u, i) => (
                  <div key={i} className={`grid grid-cols-4 gap-4 px-4 py-3 ${i < ADMIN_USERS.length - 1 ? "border-b border-white/10" : ""}`}>
                    <span className="text-white text-sm font-medium">{u.name}</span>
                    <span className="text-slate-400 text-sm truncate">{u.email}</span>
                    <span className="text-sm"><span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary">{u.role}</span></span>
                    <span className="text-slate-400 text-sm">{u.joined}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {activeTab === "services" && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-white font-display">Service Schedules</h1>
              <div className="grid gap-4">
                {DEMO_DATA.services.map((svc) => (
                  <div key={svc.id} className="rounded-2xl bg-[#1e293b] border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-bold">{svc.title}</h3>
                      <button onClick={demo} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-2">
                      {svc.schedule.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-300">{item.event}</span>
                          <span className="text-primary font-semibold">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
