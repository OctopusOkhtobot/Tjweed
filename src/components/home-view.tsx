import { useState } from "react";
import {
  BookOpen,
  MessageCircle,
  PenLine,
  Sprout,
  FolderSync,
  GraduationCap,
  ExternalLink,
  Scan,
  Award,
  Sparkles,
  School,
  Instagram,
  CheckCircle,
} from "lucide-react";
import { guides, type GuideId } from "@/lib/tajweed/data";
import { SCHOOL_INFO, getCurrentUser, type CurrentUser } from "@/lib/tajweed/students";
import { Chip, GhostButton, PrimaryButton } from "./ui";
import {
  AlSaneLogoGraphic,
  DanaMascotGraphic,
  PearlNecklaceGraphic,
  PearlShellGraphic,
  GardenBanner,
} from "./garden-art";
import { BarcodeLoginModal } from "./barcode-login-modal";

const steps = [
  "افتحي أساس الرواية في هذا المجلس: رواية حفص عن عاصم من طريق الشاطبية، وضبط الغنّة حركتين.",
  "في الشرح: اختاري حرفاً من كل حكم، واسمعي الحصري رحمه الله لضبط الأداء قبل الشروع.",
  "في التدريب وبستان التجويد: كل جواب صحيح يغرس بذرة شاي أو أقحوان أو جوري، وبيعي المحاصيل باللؤلؤ.",
  "في المحادثة والتصحيح: تسألكِ دانة (لؤلؤة التجويد)، وتستمعين للشيخ الحصري، وتكررين بصوتكِ مع تقييم فوري.",
  "صياغة طوق اللؤلؤ: اجمعي ٢٠ لؤلؤة مكنونة في المحارة لتصوغي طوق اللؤلؤ الكويتي الفاخر 📿.",
  "نافذة المعلمة والمصادر: متابعة تقييم الطالبات وتصفح مشاريع ورشة الذكاء الاصطناعي (الإذاعة والكتاب الذكي).",
];

export function HomeView({
  onOpen,
  onGuide,
}: {
  onOpen: (view: "sharh" | "quiz" | "majlis" | "garden" | "resources" | "teacher") => void;
  onGuide: (id: GuideId) => void;
  currentUser?: CurrentUser;
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser>(getCurrentUser());

  return (
    <div className="space-y-8">
      <BarcodeLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={(u) => setUser(u)}
      />

      {/* Top School & Institution Banner Card */}
      <section className="relative overflow-hidden rounded-card border border-emerald/20 bg-gradient-to-r from-[#e8f5e9] via-[#f1f8e9] to-[#dcedc8] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-start">
            <AlSaneLogoGraphic className="h-12 w-12 shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-emerald-deep">{SCHOOL_INFO.group}</span>
                <span className="rounded-full bg-emerald-soft px-2 py-0.5 text-[10px] font-semibold text-emerald-deep">
                  تأسست ١٩٨٦م
                </span>
                <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-semibold text-ink">
                  دولة الكويت 🇰🇼
                </span>
              </div>
              <h1 className="amiri text-2xl md:text-3xl font-bold text-ink mt-0.5">{SCHOOL_INFO.name}</h1>
              <p className="text-xs text-muted">
                {SCHOOL_INFO.ministry} · منصة التجويد التفاعلية الذكية
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={SCHOOL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-control border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink hover:border-emerald hover:text-emerald transition-colors"
            >
              <Instagram className="h-4 w-4 text-pink-600" />
              انستغرام المدرسة
            </a>

            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-control bg-paper border border-line px-3 py-1.5 text-xs font-semibold text-emerald-deep hover:bg-emerald-soft transition-colors"
            >
              <Scan className="h-4 w-4 text-emerald" />
              مسح باركود الطالبة
            </button>

            <button
              type="button"
              onClick={() => onOpen("teacher")}
              className="inline-flex items-center gap-1.5 rounded-control bg-gold-soft px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-gold transition-colors"
            >
              <GraduationCap className="h-4 w-4 text-emerald-deep" />
              نافذة تقييم الطالبات
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section: Dana the Pearl and School Campus */}
      <section className="grid items-center gap-6 lg:grid-cols-[19rem_1fr]">
        <div className="flex flex-col items-center justify-center rounded-card border-2 border-amber-300 bg-gradient-to-b from-[#fffbeb] via-[#fef3c7] to-[#fde68a]/50 p-6 shadow-sm text-center">
          <DanaMascotGraphic mood="glad" className="h-36 w-36 animate-pulse" />
          <h2 className="amiri text-2xl font-bold text-amber-950 mt-2">دانة (لؤلؤة التجويد)</h2>
          <p className="text-xs text-amber-900 mt-1 max-w-xs leading-relaxed">
            الشخصية التعليمية الذكية لمدرسة السفر الأهلية، تنبض بتراث الكويت البحري، تسأل الطالبات، وتصغي لتكرارهن مع
            الشيخ الحصري، وتمنح لآلئ مكنونة في المحارة!
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-200/90 px-3 py-1 text-xs font-bold text-amber-950">
            <span>🦪 كل ٢٠ لؤلؤة = طوق لؤلؤ فاخر 📿</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold-soft px-3 py-0.5 text-xs font-semibold text-gold">
              مشروع معلمات التجويد بالذكاء الاصطناعي
            </span>
            <span className="rounded-full bg-emerald-soft px-3 py-0.5 text-xs font-semibold text-emerald-deep">
              بستان النون الساكنة وسوق اللؤلؤ 🦪
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl text-emerald-deep font-bold">
            روضة التجويد ومجلس اللؤلؤ الكويتي
          </h2>
          <p className="amiri text-xl text-ink">أحكام النون الساكنة والتنوين برواية حفص عن عاصم</p>

          <p className="max-w-2xl text-sm md:text-base text-ink/85 leading-relaxed">
            برنامج تطبيقي متكامل يدمج بين إتقان أحكام التجويد واللفظ الصحيح بالسند المتصل، وتقنيات الذكاء الاصطناعي
            المستفادة من الورشة (Gemini كعقل منظم، Claude كصانع تفاعلي، وNotebookLM لضبط المتون):
            حاوري دانة لؤلؤة التجويد، استمعي لتلاوة الشيخ الحصري وكرري بصوتكِ، اجمعي المحاصيل وبدليها بلآلئ مكنونة،
            واصنعي <strong>طوق اللؤلؤ الكويتي الفاخر</strong>!
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <PrimaryButton onClick={() => onOpen("majlis")}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              مجلس دانة والتصحيح
            </PrimaryButton>
            <GhostButton onClick={() => onOpen("garden")}>
              <Sprout className="h-4 w-4 text-emerald" aria-hidden />
              بستان وسوق اللؤلؤ
            </GhostButton>
            <GhostButton onClick={() => onOpen("quiz")}>
              <PenLine className="h-4 w-4" aria-hidden />
              التدريب واختبار اللؤلؤ
            </GhostButton>
            <GhostButton onClick={() => onOpen("teacher")}>
              <GraduationCap className="h-4 w-4 text-emerald-deep" aria-hidden />
              لوحة تقييم المعلمة
            </GhostButton>
            <GhostButton onClick={() => onOpen("resources")}>
              <FolderSync className="h-4 w-4 text-gold" aria-hidden />
              المصادر والورشة
            </GhostButton>
          </div>
        </div>
      </section>

      {/* School Heritage & Welcome Card */}
      <section className="panel p-5 md:p-6 border-line">
        <div className="grid gap-6 md:grid-cols-[12rem_1fr] items-center">
          <div className="overflow-hidden rounded-control border border-line bg-paper/60 shadow-xs">
            <img
              src="/assets/aistudio/Screenshot_________________Chrome_86aa6818.jpg"
              alt="مبنى مدرسة السفر الأهلية - بنات في الكويت"
              className="h-40 w-full object-cover"
            />
            <div className="p-2 text-center text-[10px] font-semibold text-emerald-deep">
              مبنى مدرسة السفر الأهلية
            </div>
          </div>

          <div className="space-y-2 text-start">
            <div className="flex items-center gap-2">
              <School className="h-5 w-5 text-emerald" />
              <h3 className="amiri text-xl font-bold text-emerald-deep">
                مرحباً بزوار مدرسة السفر الأهلية - بنات (مؤسسة عبدالحميد الصانع)
              </h3>
            </div>
            <p className="text-xs text-ink/85 leading-relaxed">
              مدرسة السفر الأهلية هي جزء من مجموعة الصانع التعليمية، وتتبوأ مكانة ريادية في مجال التعليم منذ تأسيسها عام
              (1986م)، وتحظى بترخيص من وزارة التربية بدولة الكويت لكافة المراحل من رياض الأطفال حتى الثانوية.
              يأتي هذا المشروع امتداداً لرؤية المدرسة في تمكين طالباتنا من التميز في علوم القرآن الكريم وأحكام التجويد
              باستثمار أحدث أدوات الذكاء الاصطناعي والتفاعل الإبداعي.
            </p>
            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <a
                href={SCHOOL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-deep font-semibold hover:underline"
              >
                <Instagram className="h-3.5 w-3.5 text-pink-600" />
                حساب الانستغرام الرسمي: @alsafar_school
              </a>
              <span className="text-muted">·</span>
              <span className="text-muted">الموقع الرسمي: alsafarschool.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pearl Economy & Necklace Highlight */}
      <section
        onClick={() => onOpen("garden")}
        className="cursor-pointer rounded-card border-2 border-amber-300 bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#fed7aa]/40 p-5 shadow-xs transition-transform hover:scale-[1.01]"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <PearlShellGraphic className="h-20 w-20 shrink-0" glow />
            <div>
              <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-950">
                جديد في البستان: بيع المحاصيل باللؤلؤ 🦪
              </span>
              <h3 className="amiri text-xl md:text-2xl font-bold text-ink mt-1">
                سوق المحارة وصياغة طوق اللؤلؤ الكويتي
              </h3>
              <p className="text-xs text-muted max-w-xl">
                كل حكم تجويدي تتقنينه يغرس شاي أو أقحوان أو جوري؛ يمكنكِ بيع المحاصيل لكسب اللآلئ، وحين تصلين إلى ٢٠
                لؤلؤة تتوجين بـ <strong>طوق اللؤلؤ الفاخر 📿</strong> مع ملصقات الإيموجي الاحتفالية!
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <PearlNecklaceGraphic className="h-20 w-20" emojis={["🦪", "✨", "🇰🇼"]} />
          </div>
        </div>
      </section>

      {/* Garden Banner Widget */}
      <section onClick={() => onOpen("garden")} className="cursor-pointer transition-transform hover:scale-[1.01]">
        <GardenBanner />
      </section>

      {/* Foundational Rules definition */}
      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel p-5">
          <h3 className="amiri text-xl font-bold text-emerald-deep">النون الساكنة</h3>
          <p className="mt-2 text-xs md:text-sm text-ink/85 leading-relaxed">
            نون أصلية خالية من الحركة، ثابتة خطاً ولفظاً، وصلاً ووقفاً. تأتي في الأسماء والأفعال والحروف، متوسطة
            ومتطرفة. وهي أساس أحكام الباب مع حروف الهجاء الثمانية والعشرين.
          </p>
        </article>
        <article className="panel p-5">
          <h3 className="amiri text-xl font-bold text-emerald-deep">التنوين</h3>
          <p className="mt-2 text-xs md:text-sm text-ink/85 leading-relaxed">
            نون ساكنة زائدة تلحق آخر الأسماء لفظاً وتفارقه خطاً، ووصلاً وتفارقه وقفاً. علامته ضمتان أو فتحتان أو كسرتان.
            وإذا وُقف عليه سقط، أو أُبدل ألفاً عند تنوين الفتح (إلا تاء التأنيث).
          </p>
        </article>
      </section>

      {/* The 4 Rules Grid */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="amiri text-2xl text-emerald-deep font-bold">الأحكام الأربعة الشاملة</h2>
          <button
            type="button"
            onClick={() => onOpen("sharh")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline"
          >
            <BookOpen className="h-3.5 w-3.5" />
            فتح الشرح الكامل مع الأبيات
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {guides.map((guide) => (
            <button
              key={guide.id}
              type="button"
              onClick={() => onGuide(guide.id)}
              className="panel p-5 text-start transition-colors hover:bg-gold-soft/60"
            >
              <div className="flex items-center justify-between">
                <Chip tone={guide.tone}>{guide.name}</Chip>
                <span className="text-xs text-muted">اضغطي للشرح والتلاوة</span>
              </div>
              <p className="amiri mt-3 text-2xl text-ink tracking-wide">{guide.letters}</p>
              <p className="mt-2 text-xs text-muted">{guide.mnemonic}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Suggested 15-minute Classroom Flow */}
      <section className="panel p-5 md:p-6">
        <h2 className="amiri text-2xl text-emerald-deep font-bold">خطة الحصة التفاعلية (١٥ دقيقة في مدرسة السفر)</h2>
        <ol className="mt-3 space-y-3">
          {steps.map((step, index) => (
            <li key={`home-step-${index}`} className="flex gap-3 text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald font-bold">
                {index + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
