import LoginForm from "../components/LoginForm";
import { Sparkles, CalendarDays, Wallet, Users, Heart, Bot, CheckCircle2 } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col justify-center relative overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background ambient glow effects */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative luxury grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Luxury Showcase */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/30 text-2xl">
                💍
              </div>
              <div>
                <span className="text-2xl font-black font-display tracking-tight text-white flex items-center gap-1.5">
                  WeddingVerse <span className="text-rose-400 font-extrabold text-sm px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">AI</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Intelligent Luxury Wedding Planning</p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-rose-300">
                <Sparkles size={14} className="text-rose-400" />
                Next-Gen AI Wedding Architect
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display tracking-tight leading-[1.1] text-white">
                Plan your forever, <br />
                <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                  effortlessly intelligent.
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Experience the world's most elegant AI wedding companion. From automated timelines and budget forecasting to customized invitations and vendor management.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2 max-w-xl">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Timeline Advisor</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Automated countdowns & milestones</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Wallet size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Smart Budget Guard</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Expense tracking & savings insights</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">RSVP & Guest Analytics</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Meal preferences & side distribution</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24/7 AI Wedding Assistant</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Instant planning advice on demand</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-white/10 max-w-xl">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">P</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">R</div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">A</div>
              </div>
              <p>Trusted by over <strong className="text-white font-semibold">10,000+ happy couples</strong> planning stress-free weddings.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Luxury Auth Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="relative">
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-rose-500/50 via-purple-500/30 to-indigo-500/40 rounded-3xl blur-sm opacity-70" />
              
              <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/40 text-slate-800">
                <LoginForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;