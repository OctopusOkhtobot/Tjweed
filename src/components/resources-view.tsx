import { useState } from "react";
import {
  Radio,
  BookOpen,
  FolderSync,
  Code2,
  Copy,
  Check,
  Download,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PrimaryButton, GhostButton } from "./ui";

export function ResourcesView() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"radio" | "book" | "cloud" | "quiz-builder">("radio");
  const [openRadioScene, setOpenRadioScene] = useState<number>(0);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  }

  function downloadQuizHtml() {
    const blob = new Blob([SAMPLE_QUIZ_HTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tajweed-quiz.html";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <section className="panel space-y-3 p-6 md:p-8 border-gold/30 bg-gradient-to-br from-paper via-emerald-soft/20 to-gold-soft/30">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
          <Sparkles className="h-4 w-4" />
          مدرسة السفر الأهلية - بنات · مؤسسة عبدالحميد الصانع التعليمية (الكويت 🇰🇼)
        </div>
        <h1 className="amiri text-3xl text-emerald-deep md:text-5xl font-bold">
          المصادر والمشاريع المدرسية التفاعلية
        </h1>
        <p className="max-w-3xl text-base text-ink/85 leading-relaxed">
          توثيق تطبيقي كامل لمنظومة الذكاء الاصطناعي في تعليم التجويد لطالبات مدرسة السفر:
          استثمار <strong>Gemini كعقل منظم</strong> للأفكار، و<strong>Claude كصانع تفاعلي وبرمجي</strong>،
          و<strong>NotebookLM لضبط المتون والمصادر</strong>، مع الربط السحابي في <strong>Office 365 و Google Drive</strong>،
          وسوق اللؤلؤ والمحارة، ودليل بناء ونشر الاختبارات التفاعلية المجانية للنون الساكنة.
        </p>
      </section>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setActiveTab("radio")}
          className={`panel flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
            activeTab === "radio" ? "bg-emerald text-on-emerald" : "hover:bg-gold-soft text-ink"
          }`}
        >
          <Radio className="h-4 w-4" />
          إذاعة التجويد التفاعلية
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("book")}
          className={`panel flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
            activeTab === "book" ? "bg-emerald text-on-emerald" : "hover:bg-gold-soft text-ink"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          الكتاب التفاعلي الذكي
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cloud")}
          className={`panel flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
            activeTab === "cloud" ? "bg-emerald text-on-emerald" : "hover:bg-gold-soft text-ink"
          }`}
        >
          <FolderSync className="h-4 w-4" />
          السحابة والمهارات (Drive/365)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("quiz-builder")}
          className={`panel flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
            activeTab === "quiz-builder" ? "bg-emerald text-on-emerald" : "hover:bg-gold-soft text-ink"
          }`}
        >
          <Code2 className="h-4 w-4" />
          دليل بناء الاختبار المجاني
        </button>
      </div>

      {/* Tab 1: الإذاعة التفاعلية */}
      {activeTab === "radio" ? (
        <div className="space-y-6">
          <section className="panel space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-card bg-emerald-soft p-3 text-emerald-deep">
                <Radio className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl text-emerald-deep">مشروع «إذاعة التجويد التفاعلية»</h2>
                <p className="text-sm text-muted">استثمار تجربة الإذاعة والشات المنظم للنون الساكنة والتنوين</p>
              </div>
            </div>

            <div className="rounded-control bg-emerald-soft/50 p-4 text-sm text-ink space-y-2">
              <p className="font-semibold text-emerald-deep">🎯 فكرة المشروع وآلية تطبيقها بالأدوات:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>العقل المنظم (Gemini):</strong> صياغة وتوليد سيناريو إذاعي مدرسي متكامل، يوزع الأدوار بدقة بين: (المذيعة، المعلمة التجويدية، الطالبة المتسائلة).
                </li>
                <li>
                  <strong>التحويل التفاعلي (Claude):</strong> تحويل الحوار الإذاعي المكتوب إلى صفحة تفاعلية صوتية تضم أزرار استماع ومسابقات بين الطالبات.
                </li>
                <li>
                  <strong>التسجيل الصوتي:</strong> تسجيل قراءات الطالبات ومقارنتها بتلاوة الشيخ محمود خليل الحصري برواية حفص عن عاصم.
                </li>
              </ul>
            </div>

            <h3 className="amiri text-xl text-emerald-deep pt-2">سيناريو إذاعي مدرسي نموذجي قابل للتطبيق في الصف:</h3>

            <div className="space-y-3">
              {RADIO_SCENES.map((scene, idx) => (
                <div key={scene.title} className="rounded-control border border-line bg-paper overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenRadioScene(openRadioScene === idx ? -1 : idx)}
                    className="flex w-full items-center justify-between p-4 text-start font-medium hover:bg-gold-soft/50 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-emerald-deep">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald">
                        {idx + 1}
                      </span>
                      {scene.title}
                    </span>
                    {openRadioScene === idx ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {openRadioScene === idx ? (
                    <div className="border-t border-line p-4 space-y-3 text-sm bg-paper/60">
                      {scene.dialogue.map((d, dIdx) => (
                        <div key={`radio-scene-${idx}-line-${dIdx}-${d.role}`} className="flex gap-3">
                          <span className={`shrink-0 rounded-control px-2 py-0.5 text-xs font-semibold ${d.badgeClass}`}>
                            {d.role}
                          </span>
                          <p className="leading-relaxed">{d.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <GhostButton
                onClick={() =>
                  copyToClipboard(
                    RADIO_SCENES.map((s) => `${s.title}\n` + s.dialogue.map((d) => `${d.role}: ${d.text}`).join("\n")).join("\n\n"),
                    "radio-script"
                  )
                }
              >
                {copiedSection === "radio-script" ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                نسخ سيناريو الإذاعة بالكامل
              </GhostButton>
            </div>
          </section>
        </div>
      ) : null}

      {/* Tab 2: الكتاب التفاعلي الذكي */}
      {activeTab === "book" ? (
        <div className="space-y-6">
          <section className="panel space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-card bg-emerald-soft p-3 text-emerald-deep">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl text-emerald-deep">مشروع «الكتاب التفاعلي الذكي للنون الساكنة»</h2>
                <p className="text-sm text-muted">تحويل العروض الثابتة وكتب التجويد إلى تجارب حية تفاعلية</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="rounded-control bg-gold-soft px-2 py-0.5 text-xs font-semibold text-gold">المرحلة الأولى</span>
                <h3 className="text-lg font-semibold text-emerald-deep">1. ضبط المتن عبر NotebookLM</h3>
                <p className="text-sm text-ink/80">
                  رفع متن <em>تحفة الأطفال</em> ومذكرات التجويد المدرسية المعتمدة في الكويت إلى NotebookLM لتلخيص الأحكام والشواهد بدقة وحصر استثناءات النون الساكنة.
                </p>
              </article>

              <article className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="rounded-control bg-emerald-soft px-2 py-0.5 text-xs font-semibold text-emerald-deep">المرحلة الثانية</span>
                <h3 className="text-lg font-semibold text-emerald-deep">2. تحويل PowerPoint عبر Claude</h3>
                <p className="text-sm text-ink/80">
                  إدخال الشرائح الثابتة إلى Claude لتوليد مكونات تفاعلية مستجيبة: تلوين النون والتنوين، إظهار مخرج الحرف بالنقر، وتوليد لعبة تصنيف الكلمات.
                </p>
              </article>

              <article className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="rounded-control bg-clay-soft px-2 py-0.5 text-xs font-semibold text-clay">المرحلة الثالثة</span>
                <h3 className="text-lg font-semibold text-emerald-deep">3. التفاعل والتصحيح الصوتي</h3>
                <p className="text-sm text-ink/80">
                  دمج التلاوة المرتلة (الشيخ الحصري) مع نافذة التكرار والمطابقة الصوتية، فتقرأ الطالبة ويقيس النظام صحة النطق والغنّة.
                </p>
              </article>
            </div>

            {/* NotebookLM Prompt Blueprint */}
            <div className="rounded-control border border-line bg-emerald-soft/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-deep">أمر موجه جاهز لـ NotebookLM و Gemini:</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      "حلل متن تحفة الأطفال في باب النون الساكنة والتنوين، واستخرج جدولاً مقارناً يوضح: اسم الحكم، حروفه الستة أو الخمسة عشر، علامته في مصحف المدينة المنورة، مقدار الغنة، مع أمثلة قرآنية من سورة البقرة وقريش والفاتحة لكل حكم.",
                      "prompt-notebooklm"
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs text-emerald-deep hover:underline"
                >
                  {copiedSection === "prompt-notebooklm" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  نسخ الأمر
                </button>
              </div>
              <p className="rounded-control bg-paper p-3 text-xs font-mono text-ink">
                «حلل متن تحفة الأطفال في باب النون الساكنة والتنوين، واستخرج جدولاً مقارناً يوضح: اسم الحكم، حروفه،
                علامته في مصحف المدينة المنورة، مقدار الغنة، مع أمثلة قرآنية من سورة البقرة وقريش والفاتحة لكل حكم.»
              </p>
            </div>
          </section>
        </div>
      ) : null}

      {/* Tab 3: السحابة والمهارات */}
      {activeTab === "cloud" ? (
        <div className="space-y-6">
          <section className="panel space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-card bg-emerald-soft p-3 text-emerald-deep">
                <FolderSync className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl text-emerald-deep">مشروع «مساعد التجويد والربط السحابي»</h2>
                <p className="text-sm text-muted">تنظيم ملفات الأنشطة التفاعلية في Office 365 و Google Drive وإنشاء المهارات المخصصة</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-card border border-line bg-paper p-5 space-y-3">
                <h3 className="amiri text-xl text-emerald-deep">1. هيكل المجلدات السحابية لمعلمة التجويد</h3>
                <pre className="overflow-x-auto rounded-control bg-emerald-soft/30 p-3 text-xs font-mono text-ink">
{`📁 تجويد_المدرسة_بنات/
├── 📁 01_أوراق_العمل_التفاعلية/
│   ├── ورقة_الإظهار_الحلقي.docx (Office 365)
│   ├── تدريبات_الإدغام_والمطلق.docx
│   └── جدول_الإقلاب_والإخفاء.xlsx
├── 📁 02_العروض_المتحركة/
│   ├── عرض_النون_الساكنة_المتحرك.pptx
│   └── شرائح_تحفة_الأطفال_تفاعلية.pptx
├── 📁 03_بنك_الأسئلة_والاختبارات/
│   ├── نماذج_Google_Forms_للاختبارات
│   └── tajweed-quiz.html (الاختبار التفاعلي المباشر)
└── 📁 04_سجلات_الإتقان_والبستان/
    └── رصد_بذور_وإنجازات_الطالبات.xlsx`}
                </pre>
              </div>

              <div className="rounded-card border border-line bg-paper p-5 space-y-3">
                <h3 className="amiri text-xl text-emerald-deep">2. بناء مهارة تجويد مخصصة (Custom Skill)</h3>
                <p className="text-sm text-ink/80 leading-relaxed">
                  تم تدريب المعلمات على إنشاء مهارة ذكاء اصطناعي تفاعلية؛ وظيفتها استقبال أي آية قرآنية من المعلمة وتوليد:
                </p>
                <ul className="text-xs space-y-2 text-ink/85 list-disc list-inside">
                  <li>استخراج مواضع النون الساكنة والتنوين وتلوينها بدقة.</li>
                  <li>تحديد الحكم التجويدي وسببه والشاهد من تحفة الأطفال.</li>
                  <li>توليد 3 أسئلة فورية مع خيارات تصحيحية لاختبار الطالبات في الصف.</li>
                  <li>ربط النتيجة بملف إكسل للمتابعة على OneDrive أو Google Sheets.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* Tab 4: دليل بناء ونشر الاختبار المجاني */}
      {activeTab === "quiz-builder" ? (
        <div className="space-y-6">
          <section className="panel space-y-5 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-card bg-emerald-soft p-3 text-emerald-deep">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl text-emerald-deep">خطوات إنشاء ونشر اختبار تفاعلي مجاني 100%</h2>
                <p className="text-sm text-muted">بدون اشتراك مدفوع — خطوة بخطوة كما طُبقت في ورشة المعلمات</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald font-bold">1</span>
                <h3 className="font-semibold text-emerald-deep">توليد الأسئلة</h3>
                <p className="text-xs text-muted">استخدام Gemini أو Grok لتوليد 10 أسئلة مصنفة مع ذكر سبب الحكم.</p>
              </div>
              <div className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald font-bold">2</span>
                <h3 className="font-semibold text-emerald-deep">كود الويب بـ Claude</h3>
                <p className="text-xs text-muted">إدخال الأسئلة لـ Claude لإنتاج ملف HTML تفاعلي كامل ملون وجاهز.</p>
              </div>
              <div className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald font-bold">3</span>
                <h3 className="font-semibold text-emerald-deep">التجربة المحلية</h3>
                <p className="text-xs text-muted">حفظ الملف باسم quiz.html وفتحه بنقرتين في متصفح Chrome أو Edge.</p>
              </div>
              <div className="rounded-card border border-line bg-paper p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs text-on-emerald font-bold">4</span>
                <h3 className="font-semibold text-emerald-deep">النشر والمشاركة</h3>
                <p className="text-xs text-muted">سحب الملف وإفلاته في Tiiny.host أو Netlify Drop للحصول على رابط مجاني للطالبات.</p>
              </div>
            </div>

            {/* Ready-to-use HTML Exporter */}
            <div className="rounded-card border border-gold/30 bg-gold-soft/20 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="amiri text-xl text-emerald-deep">ملف الاختبار التفاعلي الجاهز للتحميل والنشر فوراً</h3>
                  <p className="text-xs text-ink/80">
                    تم تضمين كود HTML/CSS/JS تفاعلي كامل ومجرب، يمكنكِ تحميله فوراً وفتحه محلياً أو إرساله للطالبات.
                  </p>
                </div>
                <div className="flex gap-2">
                  <PrimaryButton onClick={downloadQuizHtml} className="text-xs gap-1.5">
                    <Download className="h-4 w-4" />
                    تحميل tajweed-quiz.html
                  </PrimaryButton>
                  <GhostButton
                    onClick={() => copyToClipboard(SAMPLE_QUIZ_HTML, "full-html-quiz")}
                    className="text-xs gap-1.5"
                  >
                    {copiedSection === "full-html-quiz" ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                    نسخ الكود البرمجي
                  </GhostButton>
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto rounded-control bg-paper border border-line p-3 text-xs font-mono text-ink">
                <pre>{SAMPLE_QUIZ_HTML.slice(0, 700)}... (تم اختصار المعاينة، انقري تحميل للحصول على الملف كاملاً)</pre>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted">
                <span>روابط منصات النشر المجانية المباشرة:</span>
                <a
                  href="https://tiiny.host"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald hover:underline font-semibold"
                >
                  Tiiny.host <ExternalLink className="h-3 w-3" />
                </a>
                <span>·</span>
                <a
                  href="https://app.netlify.com/drop"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald hover:underline font-semibold"
                >
                  Netlify Drop <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

const RADIO_SCENES = [
  {
    title: "المشهد الأول: الافتتاحية وتقديم مجلس النون الساكنة",
    dialogue: [
      {
        role: "المذيعة الطالبة",
        badgeClass: "bg-emerald-soft text-emerald-deep",
        text: "بسم الله الرحمن الرحيم، والصلاة والسلام على رسولنا الكريم. أهلاً بكم في إذاعة التجويد المدرسية! لقاؤنا اليوم مع أحكام النون الساكنة والتنوين، ومعنا المعلمة الفاضلة لنرتشف من معين علم التجويد.",
      },
      {
        role: "المعلمة التجويدية",
        badgeClass: "bg-gold-soft text-gold",
        text: "أهلاً بكِ وببناتنا الطالبات. النون الساكنة حرف مبارك، يدور مع حروف الهجاء في أربعة أحكام جامعة ذكرها الجمزوري في تحفته: للنون إن تسكن وللتنوينِ .. أربعُ أحكامٍ فخذ تبييني.",
      },
      {
        role: "الطالبة المتسائلة",
        badgeClass: "bg-clay-soft text-clay",
        text: "يا أستاذتي، كيف أعرف حكم النون في الآية التي أمامي؟ هل أنظر للحرف الذي قبلها أم بعدها؟",
      },
      {
        role: "المعلمة التجويدية",
        badgeClass: "bg-gold-soft text-gold",
        text: "سؤال ممتاز يا بنتي! الحكم دائماً للحرف الذي يأتي بعدها مباشرة. فإن كان حلقياً فهو الإظهار، وإن كان من يرملون فهو الإدغام، وعند الباء إقلاب، ومع الخمسة عشر الباقية إخفاء حقيقي.",
      },
    ],
  },
  {
    title: "المشهد الثاني: تحدي الإظهار والإدغام وسؤال الاستثناء المطلق",
    dialogue: [
      {
        role: "المذيعة الطالبة",
        badgeClass: "bg-emerald-soft text-emerald-deep",
        text: "والآن ننتقل إلى فقرة التحدي السريع في إذاعتنا! سؤالنا الموجه لطالبات الصف: ما حكم النون في قوله تعالى: (الدُّنْيَا)؟ هل تدغم في الياء لأن الياء من يرملون؟",
      },
      {
        role: "الطالبة المتسائلة",
        badgeClass: "bg-clay-soft text-clay",
        text: "كنت أظنها إدغاماً، لكن المعلمة علمتنا أن شرط الإدغام أن يكون في كلمتين! أما إذا اجتمعا في كلمة واحدة فهو إظهار مطلق كدنيا وصنوان وقنوان وبنيان.",
      },
      {
        role: "المعلمة التجويدية",
        badgeClass: "bg-gold-soft text-gold",
        text: "بارك الله فيكِ! وهذا ما نظمه الجمزوري: إلا إذا كانا بكلمةٍ فلا .. تُدغم كدنيا ثم صنوانٍ تلا.",
      },
    ],
  },
  {
    title: "المشهد الثالث: فقرة التلاوة المرتلة وغرس بذور الإتقان",
    dialogue: [
      {
        role: "المذيعة الطالبة",
        badgeClass: "bg-emerald-soft text-emerald-deep",
        text: "نختم إذاعتنا بفقرة التلاوة المتقنة؛ نستمع للشيخ الحصري رحمه الله، ثم نكرر خلفه مع دانة لؤلؤة التجويد ونغرس في بستاننا بذور الشاي والأقحوان والجوري، ونكسب اللآلئ المكنونة لنصوغ طوق اللؤلؤ الكويتي الفاخر لطالبات مدرسة السفر الأهلية.",
      },
      {
        role: "المعلمة التجويدية",
        badgeClass: "bg-gold-soft text-gold",
        text: "جعلكم الله من أهل القرآن، وخيركم من تعلم القرآن وعلمه. دمتم ودامت مدرسة السفر منارة للعلم والقرآن، والسلام عليكم ورحمة الله وبركاته.",
      },
    ],
  },
];

const SAMPLE_QUIZ_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>اختبار أحكام النون الساكنة والتنوين التفاعلي</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Readex+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f5fbf6;
      --card: #ffffff;
      --emerald: #1e4a3a;
      --emerald-soft: #e6f0ea;
      --gold: #8a6424;
      --gold-soft: #fbf5e8;
      --clay: #b91c1c;
      --clay-soft: #fee2e2;
      --ink: #1c241f;
      --line: #e2dcd2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Readex Pro", sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
      padding: 24px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 20px;
      max-width: 600px;
      width: 100%;
      padding: 32px 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    .title {
      font-family: "Amiri", serif;
      font-size: 28px;
      color: var(--emerald);
      text-align: center;
      margin-bottom: 8px;
    }
    .subtitle {
      text-align: center;
      font-size: 14px;
      color: var(--gold);
      margin-bottom: 24px;
    }
    .progress-bar {
      height: 8px;
      background: var(--line);
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .progress-fill {
      height: 100%;
      background: var(--emerald);
      width: 0%;
      transition: width 0.3s ease;
    }
    .question-box {
      font-size: 18px;
      font-weight: 600;
      color: var(--emerald);
      margin-bottom: 16px;
    }
    .ayah-box {
      font-family: "Amiri", serif;
      font-size: 24px;
      background: var(--gold-soft);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 14px;
      text-align: center;
      margin-bottom: 20px;
    }
    .options {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .opt-btn {
      background: #fafafa;
      border: 1px solid var(--line);
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 15px;
      cursor: pointer;
      text-align: right;
      transition: all 0.2s;
    }
    .opt-btn:hover { background: var(--emerald-soft); }
    .opt-btn.correct { background: var(--emerald-soft); border-color: var(--emerald); color: var(--emerald); font-weight: bold; }
    .opt-btn.wrong { background: var(--clay-soft); border-color: var(--clay); color: var(--clay); }
    .feedback {
      background: var(--emerald-soft);
      padding: 14px;
      border-radius: 12px;
      font-size: 14px;
      margin-bottom: 20px;
      display: none;
    }
    .feedback.show { display: block; }
    .action-btn {
      background: var(--emerald);
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
    }
    .result-screen { text-align: center; display: none; }
    .score-big { font-size: 48px; font-family: "Amiri", serif; color: var(--emerald); margin: 16px 0; }
  </style>
</head>
<body>
  <div class="card" id="quiz-card">
    <h1 class="title">اختبار أحكام النون الساكنة والتنوين</h1>
    <p class="subtitle">مشروع تفاعلي · ورشة تعليم التجويد بالذكاء الاصطناعي</p>
    <div class="progress-bar"><div class="progress-fill" id="progress"></div></div>
    
    <div id="quiz-body">
      <div class="question-box" id="q-prompt">جارٍ تحميل السؤال...</div>
      <div class="ayah-box" id="q-ayah"></div>
      <div class="options" id="options-container"></div>
      <div class="feedback" id="feedback"></div>
      <button class="action-btn" id="next-btn" style="display: none;" onclick="nextQuestion()">السؤال التالي</button>
    </div>

    <div class="result-screen" id="result-screen">
      <div class="score-big" id="final-score"></div>
      <p id="result-msg" style="margin-bottom: 24px;"></p>
      <button class="action-btn" onclick="location.reload()">إعادة الاختبار</button>
    </div>
  </div>

  <script>
    const questions = [
      {
        prompt: "ما حكم النون الساكنة في قوله تعالى؟",
        ayah: "مِّن رَّبِّهِمْ",
        options: ["إظهار حلقي", "إدغام بلا غنة", "إدغام بغنة", "إخفاء حقيقي"],
        correct: 1,
        explain: "الراء من حروف يرملون، والإدغام مع اللام والراء يكون بغير غنة لحفص عن عاصم من طريق الشاطبية."
      },
      {
        prompt: "ما حكم النون الساكنة في الموضع التالي؟",
        ayah: "مَنْ ءَامَنَ",
        options: ["إظهار حلقي", "إقلاب", "إدغام بغنة", "إخفاء حقيقي"],
        correct: 0,
        explain: "الهمزة من حروف الحلق الستة (ء هـ ع ح غ خ)، والحكم إظهار حلقي بلا غنة زائدة."
      },
      {
        prompt: "ما حكم التنوين في قوله تعالى؟",
        ayah: "أَلِيمٌۢ بِمَا",
        options: ["إدغام كامل", "إظهار مطلق", "إقلاب", "إخفاء حقيقي"],
        correct: 2,
        explain: "جاء بعد التنوين باء، فتقلب النون الساكنة ميماً مخفاة بغنة حركتين مع إطباق الشفتين بلطف."
      },
      {
        prompt: "لماذا لا تدغم النون في قوله تعالى؟",
        ayah: "ٱلدُّنْيَا",
        options: ["لأنها إظهار مطلق في كلمة واحدة", "لأن الياء ليست من يرملون", "لأن النون مفتوحة", "لأنها في آخر الحزب"],
        correct: 0,
        explain: "اجتمعت النون مع الياء في كلمة واحدة، وشرط الإدغام أن يكونا في كلمتين؛ لذا فهو إظهار مطلق."
      },
      {
        prompt: "ما حكم النون الساكنة في قوله تعالى؟",
        ayah: "مِن قَبْلِكَ",
        options: ["إظهار حلقي", "إدغام ناقص", "إخفاء حقيقي بغنة مفخمة", "إقلاب"],
        correct: 2,
        explain: "القاف من حروف الإخفاء الـ 15، ولأن القاف مستعلية فإن الغنة تفخم بمقدار حركتين."
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
      answered = false;
      const q = questions[current];
      document.getElementById("q-prompt").innerText = q.prompt;
      document.getElementById("q-ayah").innerText = q.ayah;
      document.getElementById("progress").style.width = ((current / questions.length) * 100) + "%";
      document.getElementById("next-btn").style.display = "none";
      const fb = document.getElementById("feedback");
      fb.className = "feedback";
      fb.style.display = "none";

      const container = document.getElementById("options-container");
      container.innerHTML = "";
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx);
        container.appendChild(btn);
      });
    }

    function selectOption(idx) {
      if (answered) return;
      answered = true;
      const q = questions[current];
      const buttons = document.querySelectorAll(".opt-btn");
      const fb = document.getElementById("feedback");

      if (idx === q.correct) {
        score++;
        buttons[idx].classList.add("correct");
        fb.innerHTML = "<strong>صواب مبارك! 🌿</strong> " + q.explain;
        fb.style.background = "var(--emerald-soft)";
        fb.style.color = "var(--emerald)";
      } else {
        buttons[idx].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
        fb.innerHTML = "<strong>يُصحَّح هكذا:</strong> " + q.explain;
        fb.style.background = "var(--clay-soft)";
        fb.style.color = "var(--clay)";
      }
      fb.style.display = "block";
      document.getElementById("next-btn").style.display = "block";
    }

    function nextQuestion() {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        document.getElementById("quiz-body").style.display = "none";
        document.getElementById("result-screen").style.display = "block";
        document.getElementById("final-score").innerText = score + " من " + questions.length;
        document.getElementById("result-msg").innerText = score >= 4 
          ? "مبارك! أحسنتِ إتقان أحكام النون الساكنة والتنوين وتفتحت أزهار بستانكِ." 
          : "أحسنتِ المحاولة، راجعي الشرح والمواضع مع نونة لتثبيت اللفظ والغنة.";
        document.getElementById("progress").style.width = "100%";
      }
    }

    renderQuestion();
  </script>
</body>
</html>`;
