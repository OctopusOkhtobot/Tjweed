import { useState } from "react";
import { Scan, Mail, QrCode, X, CheckCircle2, User, GraduationCap, ShieldCheck } from "lucide-react";
import {
  getCurrentUser,
  loginByBarcode,
  loginByEmail,
  setCurrentUser,
  INITIAL_STUDENTS,
  SCHOOL_INFO,
  type CurrentUser,
} from "@/lib/tajweed/students";
import { AlSaneLogoGraphic, PearlShellGraphic } from "./garden-art";

export function BarcodeLoginModal({
  isOpen,
  onClose,
  onLoggedIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoggedIn: (user: CurrentUser) => void;
}) {
  const [tab, setTab] = useState<"barcode" | "email">("barcode");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const current = getCurrentUser();

  function handleBarcodeSubmit(valueToScan?: string) {
    const val = valueToScan || code;
    if (!val.trim()) return;

    setIsScanning(true);
    setFeedback(null);

    setTimeout(() => {
      setIsScanning(false);
      const res = loginByBarcode(val);
      setFeedback({ success: res.success, message: res.message });
      if (res.success) {
        setTimeout(() => {
          onLoggedIn(getCurrentUser());
          onClose();
        }, 1200);
      }
    }, 700);
  }

  function handleEmailSubmit() {
    if (!email.trim()) return;
    setFeedback(null);
    const res = loginByEmail(email);
    setFeedback({ success: res.success, message: res.message });
    if (res.success) {
      setTimeout(() => {
        onLoggedIn(getCurrentUser());
        onClose();
      }, 1000);
    }
  }

  function quickSelect(barcode: string) {
    setCode(barcode);
    handleBarcodeSubmit(barcode);
  }

  function switchToTeacher() {
    const teacherUser: CurrentUser = {
      role: "teacher",
      teacherName: "أ. وفاء الكندري (معلمة التجويد)",
    };
    setCurrentUser(teacherUser);
    setFeedback({ success: true, message: "تم الدخول بنجاح بحساب المعلمة: أ. وفاء الكندري." });
    setTimeout(() => {
      onLoggedIn(teacherUser);
      onClose();
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card border border-emerald/30 bg-paper p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 rounded-full p-1 text-muted hover:bg-gold-soft hover:text-ink"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>

        {/* School Header */}
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <AlSaneLogoGraphic className="h-10 w-10 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-emerald-deep">{SCHOOL_INFO.group}</p>
            <h2 className="amiri text-xl font-bold text-ink">{SCHOOL_INFO.name}</h2>
            <p className="text-[11px] text-muted">بوابة تسجيل الدخول الذكية بالباركود والبريد المدرسي</p>
          </div>
        </div>

        {/* Current logged-in badge */}
        <div className="mt-3 flex items-center justify-between rounded-control bg-emerald-soft/40 p-2.5 text-xs text-emerald-deep">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>
              الحساب الحالي:{" "}
              <strong>
                {current.role === "teacher"
                  ? current.teacherName || "المعلمة"
                  : `${current.student?.name} (${current.student?.grade})`}
              </strong>
            </span>
          </div>
          {current.role === "student" ? (
            <span className="rounded-full bg-emerald px-2 py-0.5 text-[10px] font-bold text-on-emerald">
              طالبة
            </span>
          ) : (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-ink">
              معلمة
            </span>
          )}
        </div>

        {/* Tab switch */}
        <div className="mt-4 flex rounded-control border border-line bg-paper/60 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab("barcode")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-control py-2 transition-colors ${
              tab === "barcode" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            <Scan className="h-4 w-4" />
            مسح الباركود / الكود المدرسي
          </button>
          <button
            type="button"
            onClick={() => setTab("email")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-control py-2 transition-colors ${
              tab === "email" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            <Mail className="h-4 w-4" />
            الدخول بالبريد المدرسي
          </button>
        </div>

        {/* Feedback message */}
        {feedback ? (
          <div
            className={`mt-3 flex items-center gap-2 rounded-control p-3 text-xs font-semibold ${
              feedback.success
                ? "bg-emerald-soft text-emerald-deep border border-emerald/30"
                : "bg-clay-soft text-clay border border-clay/30"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        ) : null}

        {/* Barcode Tab */}
        {tab === "barcode" ? (
          <div className="mt-4 space-y-4">
            {/* Scanner View Simulation */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-control border-2 border-dashed border-emerald/50 bg-emerald-deep/5 p-6 text-center">
              {/* Laser scan animation line */}
              <div
                className={`pointer-events-none absolute inset-x-0 h-0.5 bg-red-500 shadow-[0_0_12px_red] transition-all duration-700 ${
                  isScanning ? "top-3/4 animate-bounce" : "top-1/2"
                }`}
              />
              <QrCode className="h-14 w-14 text-emerald mb-2" />
              <p className="text-xs font-medium text-ink">وجهي باركود بطاقة الطالبة نحو الماسح الضوئي</p>
              <p className="text-[11px] text-muted">يدعم ماسح الباركود بطاقات طالبات مدرسة السفر الأهلية</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBarcodeSubmit();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="أدخلي رمز الباركود مثل: KUW-SAFAR-701"
                className="flex-1 rounded-control border border-line bg-paper px-3 py-2 text-xs text-ink"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="rounded-control bg-emerald px-4 py-2 text-xs font-semibold text-on-emerald hover:bg-emerald-deep transition-colors"
              >
                {isScanning ? "جارِ المسح..." : "مسح"}
              </button>
            </form>

            {/* Quick Demo Cards */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-muted">بطاقات طالبات مدرسة السفر المتاحة للتجربة السريعة:</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {INITIAL_STUDENTS.slice(0, 4).map((std) => (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => quickSelect(std.barcode)}
                    className="flex flex-col items-start rounded-control border border-line bg-paper/80 p-2 text-start hover:border-emerald hover:bg-emerald-soft/20 transition-colors"
                  >
                    <span className="font-semibold text-ink">{std.name}</span>
                    <span className="text-[10px] text-muted">
                      {std.grade} · {std.barcode}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Email Tab */
          <div className="mt-4 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmailSubmit();
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-ink mb-1">البريد الإلكتروني المدرسي للطالبة:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="مثال: maryam.sane@alsafarschool.com"
                  className="w-full rounded-control border border-line bg-paper px-3 py-2 text-xs text-ink"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-control bg-emerald py-2.5 text-xs font-semibold text-on-emerald hover:bg-emerald-deep transition-colors"
              >
                تسجيل الدخول بالبريد
              </button>
            </form>

            <div className="space-y-1 pt-1 text-xs">
              <p className="text-[11px] font-semibold text-muted">أو جربي أحد الحسابات النموذجية:</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("maryam.sane@alsafarschool.com");
                    loginByEmail("maryam.sane@alsafarschool.com");
                    onClose();
                  }}
                  className="rounded-control border border-line bg-paper px-2.5 py-1 text-[11px] text-ink hover:border-emerald"
                >
                  مريم الصانع
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("noura.fahad@alsafarschool.com");
                    loginByEmail("noura.fahad@alsafarschool.com");
                    onClose();
                  }}
                  className="rounded-control border border-line bg-paper px-2.5 py-1 text-[11px] text-ink hover:border-emerald"
                >
                  نورة الصباح
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("aisha.kandari@alsafarschool.com");
                    loginByEmail("aisha.kandari@alsafarschool.com");
                    onClose();
                  }}
                  className="rounded-control border border-line bg-paper px-2.5 py-1 text-[11px] text-ink hover:border-emerald"
                >
                  عائشة الكندري (طوقين لؤلؤ)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teacher Switch Section */}
        <div className="mt-5 border-t border-line pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xs font-semibold text-ink">بوابة المعلمات والمشرفات</p>
              <p className="text-[10px] text-muted">الاطلاع على تقييم الطالبات وإتقان الأحكام</p>
            </div>
          </div>
          <button
            type="button"
            onClick={switchToTeacher}
            className="flex items-center gap-1 rounded-control bg-gold-soft px-3 py-1.5 text-xs font-semibold text-ink hover:bg-gold transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            دخول كمعلمة
          </button>
        </div>
      </div>
    </div>
  );
}
