import RegisterForm from "../components/RegisterForm";
import { Sparkles, HeartHandshake, ShieldCheck, Zap, BellRing, Wand2 } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col justify-center relative overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background ambient glow effects */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Luxury pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Benefits */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/30 text-2xl">
                💍
              </div>
              <div>
                <span className="text-2xl font-black font-display tracking-tight text-white flex items-center gap-1.5">
                  WeddingVerse <span className="text-rose-400 font-extrabold text-sm px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">AI</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Create Your Forever Experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-rose-300">
                <Sparkles size={14} className="text-rose-400" />
                Free Wedding Planning Suite
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display tracking-tight leading-[1.1] text-white">
                Start crafting your <br />
                <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                  unforgettable day.
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Unlock all premium AI tools for your wedding: smart budgeting, vendor coordination, invitation drafting, and real-time reminders.
              </p>
            </div>

            <div className="space-y-3.5 pt-2 max-w-xl">
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Wand2 size={16} />
                </div>
                <span className="text-sm font-medium text-slate-200">Generate a complete customized AI planning roadmap in seconds</span>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <span className="text-sm font-medium text-slate-200">100% Private, secure & encrypted wedding data management</span>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <BellRing size={16} />
                </div>
                <span className="text-sm font-medium text-slate-200">Real-time alerts for overdue tasks and pending vendor payments</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Register Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-rose-500/50 via-purple-500/30 to-indigo-500/40 rounded-3xl blur-sm opacity-70" />
              
              <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/40 text-slate-800">
                <RegisterForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;