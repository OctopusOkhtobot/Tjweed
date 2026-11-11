import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, House, MessageCircle, PenLine, Sprout, FolderSync, GraduationCap, Scan, Instagram, User } from "lucide-react";
import { clsx } from "clsx";
import { HomeView } from "@/components/home-view";
import { MajlisView } from "@/components/majlis-view";
import { QuizView } from "@/components/quiz-view";
import { SharhView } from "@/components/sharh-view";
import { GardenView } from "@/components/garden-view";
import { ResourcesView } from "@/components/resources-view";
import { TeacherView } from "@/components/teacher-view";
import { BarcodeLoginModal } from "@/components/barcode-login-modal";
import { AlSaneLogoGraphic } from "@/components/garden-art";
import { getCurrentUser, SCHOOL_INFO, type CurrentUser } from "@/lib/tajweed/students";
import { loadGarden } from "@/lib/tajweed/garden";
import type { GuideId } from "@/lib/tajweed/data";

export const Route = createFileRoute("/")({ component: MajlisApp });

export type View = "home" | "sharh" | "quiz" | "majlis" | "garden" | "teacher" | "resources";

const nav: { id: View; label: string; icon: typeof House }[] = [
  { id: "home", label: "الرئيسية", icon: House },
  { id: "sharh", label: "الشرح", icon: BookOpen },
  { id: "quiz", label: "التدريب", icon: PenLine },
  { id: "majlis", label: "مجلس دانة", icon: MessageCircle },
  { id: "garden", label: "بستان اللؤلؤ", icon: Sprout },
  { id: "teacher", label: "تقييم المعلمة", icon: GraduationCap },
  { id: "resources", label: "المصادر", icon: FolderSync },
];

function MajlisApp() {
  const [view, setView] = useState<View>("home");
  const [guideId, setGuideId] = useState<GuideId>("izhar");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(getCurrentUser());
  const [pearlsCount, setPearlsCount] = useState<number>(16);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const g = loadGarden();
    setPearlsCount(g.pearlsCount);
  }, [view]);

  function openGuide(id: GuideId) {
    setGuideId(id);
    setView("sharh");
  }

  function handleLoggedIn(u: CurrentUser) {
    setCurrentUser(u);
    if (u.role === "teacher") {
      setView("teacher");
    }
  }

  return (
    <div className="min-h-dvh">
      <BarcodeLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />

      {/* Top Header */}
      <header className="border-b border-line bg-paper/95 sticky top-0 z-20 backdrop-blur shadow-2xs">
        <div className="mx-auto flex max-w-5xl flex-col gap-2.5 px-4 py-2.5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlSaneLogoGraphic className="h-9 w-9 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-emerald-deep">
                  {SCHOOL_INFO.name} · {SCHOOL_INFO.group}
                </p>
                <div className="flex items-center gap-2">
                  <span className="amiri text-xl font-bold text-ink">روضة التجويد ولؤلؤة السفر</span>
                  <span className="rounded-full bg-gold-soft px-2 py-0.2 text-[10px] font-bold text-ink hidden sm:inline-block">
                    🇰🇼 الكويت
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Header buttons */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-1 rounded-full bg-emerald-soft px-2.5 py-1 text-xs font-semibold text-emerald-deep"
              >
                <Scan className="h-3 w-3" />
                باركود
              </button>
              <button
                type="button"
                onClick={() => setView("garden")}
                className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900"
              >
                🦪 {pearlsCount}
              </button>
            </div>
          </div>

          {/* Desktop Right Side: User badge + Login + Instagram + Nav */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SCHOOL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-pink-600 transition-colors"
              title="حساب مدرسة السفر على انستغرام"
            >
              <Instagram className="h-4 w-4 text-pink-600" />
              <span className="hidden lg:inline">@alsafar_school</span>
            </a>

            {/* Quick Barcode Scanner Trigger Button */}
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1.5 rounded-control border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-ink hover:border-emerald hover:bg-emerald-soft/30 transition-colors"
            >
              <Scan className="h-3.5 w-3.5 text-emerald" />
              <span>
                {currentUser.role === "teacher"
                  ? "أ. وفاء (معلمة)"
                  : currentUser.student
                  ? currentUser.student.name.split(" ")[0]
                  : "مسح باركود"}
              </span>
              <span className="text-amber-600 font-bold">({pearlsCount} 🦪)</span>
            </button>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <div className="border-t border-line/60 bg-paper/60 px-4 py-1.5 hidden md:block">
          <div className="mx-auto max-w-5xl">
            <Nav view={view} onChange={setView} className="flex justify-start gap-1" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 md:pb-10">
        {view === "home" ? <HomeView onOpen={setView} onGuide={openGuide} /> : null}
        {view === "sharh" ? <SharhView guideId={guideId} onGuide={openGuide} /> : null}
        {view === "quiz" ? (
          <QuizView onMajlis={() => setView("majlis")} onGarden={() => setView("garden")} />
        ) : null}
        {view === "majlis" ? <MajlisView onGarden={() => setView("garden")} /> : null}
        {view === "garden" ? (
          <GardenView onStartQuiz={() => setView("quiz")} onOpenMajlis={() => setView("majlis")} />
        ) : null}
        {view === "teacher" ? <TeacherView onStartMajlis={() => setView("majlis")} /> : null}
        {view === "resources" ? <ResourcesView /> : null}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 backdrop-blur md:hidden shadow-lg">
        <Nav view={view} onChange={setView} className="grid grid-cols-7 px-1 py-1" />
      </nav>
    </div>
  );
}

function Nav({ view, onChange, className }: { view: View; onChange: (view: View) => void; className?: string }) {
  return (
    <div className={clsx("gap-1", className)}>
      {nav.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={clsx(
              "inline-flex min-h-11 flex-col md:flex-row items-center justify-center gap-1 md:gap-1.5 rounded-control px-1.5 md:px-3 py-1 md:py-1.5 text-[11px] md:text-xs font-semibold transition-colors",
              active ? "bg-emerald text-on-emerald shadow-2xs" : "text-ink hover:bg-gold-soft/50",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
