import { useState } from "react";
import {
  Users,
  Award,
  Search,
  Filter,
  PlusCircle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  BookCheck,
  TrendingUp,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react";
import {
  getStudentsList,
  awardStudentPearls,
  addTeacherNote,
  SCHOOL_INFO,
  type Student,
  type StudentRuleKey,
} from "@/lib/tajweed/students";
import { AlSaneLogoGraphic, PearlNecklaceGraphic, PearlShellGraphic } from "./garden-art";

export function TeacherView({ onStartMajlis }: { onStartMajlis?: () => void }) {
  const [students, setStudents] = useState<Student[]>(getStudentsList());
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [bonusNote, setBonusNote] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  // Compute school-wide stats
  const totalStudents = students.length;
  const totalPearls = students.reduce((acc, s) => acc + s.pearls, 0);
  const totalNecklaces = students.reduce((acc, s) => acc + s.necklaces, 0);
  const avgRecitation = Math.round(students.reduce((acc, s) => acc + s.recitationScore, 0) / (totalStudents || 1));
  const avgQuiz = (students.reduce((acc, s) => acc + s.quizScore, 0) / (totalStudents || 1)).toFixed(1);

  // Filter students
  const filtered = students.filter((s) => {
    const matchesSearch = s.name.includes(search) || s.barcode.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || s.grade.includes(gradeFilter);
    return matchesSearch && matchesGrade;
  });

  function handleAwardPearl(studentId: string, count: number) {
    const updated = awardStudentPearls(studentId, count, bonusNote || "مكافأة تميز في تطبيق أحكام النون الساكنة.");
    if (updated) {
      setStudents(getStudentsList());
      setSelectedStudent(updated);
      setNotice(`تم منح الطالبة ${updated.name} (+${count}) لؤلؤة بنجاح ✨`);
      setBonusNote("");
      setTimeout(() => setNotice(null), 4000);
    }
  }

  function handleAddNote(studentId: string) {
    if (!newNoteText.trim()) return;
    const updated = addTeacherNote(studentId, newNoteText);
    if (updated) {
      setStudents(getStudentsList());
      setSelectedStudent(updated);
      setNotice(`أضيفت الملاحظة التوجيهية للطالبة ${updated.name} بنجاح.`);
      setNewNoteText("");
      setTimeout(() => setNotice(null), 4000);
    }
  }

  function printReport() {
    window.print();
  }

  const ruleNames: Record<StudentRuleKey, string> = {
    izhar: "الإظهار الحلقي",
    idgham: "الإدغام",
    iqlab: "الإقلاب",
    ikhfa: "الإخفاء",
  };

  return (
    <div className="space-y-6">
      {/* School & Teacher Banner */}
      <header className="rounded-card border border-emerald/20 bg-gradient-to-r from-[#e8f5e9] via-[#f1f8e9] to-[#dcedc8] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlSaneLogoGraphic className="h-12 w-12 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-deep">{SCHOOL_INFO.group}</p>
              <h1 className="amiri text-2xl md:text-3xl font-bold text-ink">{SCHOOL_INFO.name}</h1>
              <p className="text-xs text-muted">
                نافذة المعلمة لتقييم الطالبات ومتابعة إتقان أحكام النون الساكنة والتنوين · رواية حفص عن عاصم
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
              <ExternalLink className="h-3.5 w-3.5" />
              انستغرام المدرسة
            </a>
            <button
              type="button"
              onClick={printReport}
              className="inline-flex items-center gap-1.5 rounded-control bg-emerald px-3.5 py-1.5 text-xs font-semibold text-on-emerald hover:bg-emerald-deep transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              طباعة التقرير الشامل
            </button>
          </div>
        </div>
      </header>

      {/* Notice alert */}
      {notice ? (
        <div className="rise rounded-control border border-emerald/30 bg-emerald-soft p-3 text-xs font-bold text-emerald-deep">
          {notice}
        </div>
      ) : null}

      {/* KPI Stats Cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-card border border-line bg-paper p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted text-xs">
            <Users className="h-4 w-4 text-emerald" />
            <span>طالبات الصفوف</span>
          </div>
          <p className="amiri mt-1 text-3xl font-bold text-emerald-deep">{totalStudents}</p>
          <span className="text-[11px] text-muted">سادس، سابع، ثامن</span>
        </div>

        <div className="rounded-card border border-line bg-paper p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted text-xs">
            <TrendingUp className="h-4 w-4 text-emerald" />
            <span>متوسط النطق مع الحصري</span>
          </div>
          <p className="amiri mt-1 text-3xl font-bold text-emerald-deep">{avgRecitation}%</p>
          <span className="text-[11px] text-muted">تطابق صوتي وتكرار</span>
        </div>

        <div className="rounded-card border border-line bg-paper p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted text-xs">
            <Sparkles className="h-4 w-4 text-gold" />
            <span>لآلئ مجمعة</span>
          </div>
          <p className="amiri mt-1 text-3xl font-bold text-gold">{totalPearls} 🦪</p>
          <span className="text-[11px] text-muted">من حصاد البستان والأسئلة</span>
        </div>

        <div className="rounded-card border border-line bg-paper p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-muted text-xs">
            <Award className="h-4 w-4 text-clay" />
            <span>أطواق اللؤلؤ الفاخرة</span>
          </div>
          <p className="amiri mt-1 text-3xl font-bold text-clay">{totalNecklaces} 📿</p>
          <span className="text-[11px] text-muted">كل 20 لؤلؤة = طوق لؤلؤ</span>
        </div>
      </section>

      {/* 4 Rules Classroom Mastery Bar */}
      <section className="rounded-card border border-line bg-paper p-5">
        <h2 className="amiri text-lg font-bold text-emerald-deep mb-3 flex items-center gap-2">
          <BookCheck className="h-5 w-5" />
          مؤشر إتقان الصف لأحكام النون الساكنة والتنوين الأربعة:
        </h2>
        <div className="grid gap-3 sm:grid-cols-4">
          <div className="rounded-control bg-emerald-soft/50 p-3">
            <div className="flex justify-between text-xs font-semibold">
              <span>الإظهار الحلقي</span>
              <span className="text-emerald-deep">96%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-line overflow-hidden">
              <div className="h-full bg-emerald" style={{ width: "96%" }} />
            </div>
            <p className="mt-1 text-[10px] text-muted">همزة، هاء، عين، حاء، غين، خاء</p>
          </div>

          <div className="rounded-control bg-emerald-soft/50 p-3">
            <div className="flex justify-between text-xs font-semibold">
              <span>الإدغام (ينمو / ل ر)</span>
              <span className="text-emerald-deep">89%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-line overflow-hidden">
              <div className="h-full bg-emerald" style={{ width: "89%" }} />
            </div>
            <p className="mt-1 text-[10px] text-muted">بغنة وبغير غنة + الإظهار المطلق</p>
          </div>

          <div className="rounded-control bg-emerald-soft/50 p-3">
            <div className="flex justify-between text-xs font-semibold">
              <span>الإقلاب (عند الباء)</span>
              <span className="text-emerald-deep">94%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-line overflow-hidden">
              <div className="h-full bg-emerald" style={{ width: "94%" }} />
            </div>
            <p className="mt-1 text-[10px] text-muted">قلب النون ميماً مخفاة بغنة</p>
          </div>

          <div className="rounded-control bg-emerald-soft/50 p-3">
            <div className="flex justify-between text-xs font-semibold">
              <span>الإخفاء الحقيقي</span>
              <span className="text-emerald-deep">87%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-line overflow-hidden">
              <div className="h-full bg-emerald" style={{ width: "87%" }} />
            </div>
            <p className="mt-1 text-[10px] text-muted">١٥ حرفاً بمراتبها الثلاث</p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحثي بالاسم أو برمز الباركود..."
            className="w-full rounded-control border border-line bg-paper pr-9 pl-3 py-2 text-xs text-ink"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted shrink-0" />
          <span className="text-xs text-muted">تصفية المرحلة:</span>
          {["all", "السادس", "السابع", "الثامن"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGradeFilter(g)}
              className={`rounded-control px-2.5 py-1 text-xs font-medium transition-colors ${
                gradeFilter === g ? "bg-emerald text-on-emerald" : "border border-line bg-paper text-ink hover:bg-gold-soft"
              }`}
            >
              {g === "all" ? "الكل" : g}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto rounded-card border border-line bg-paper shadow-xs">
        <table className="w-full text-end text-xs">
          <thead className="border-b border-line bg-paper/90 text-muted">
            <tr>
              <th className="p-3 text-start">الطالبة والصف</th>
              <th className="p-3">رمز الباركود</th>
              <th className="p-3">رصيد اللؤلؤ 🦪</th>
              <th className="p-3">طوق اللؤلؤ 📿</th>
              <th className="p-3">إتقان التلاوة</th>
              <th className="p-3">نتيجة الاختبار</th>
              <th className="p-3">إتقان الأحكام الأربعة</th>
              <th className="p-3 text-center">إجراءات المعلمة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((std, idx) => (
              <tr key={`teacher-row-${std.id}-${idx}`} className="hover:bg-gold-soft/20 transition-colors">
                <td className="p-3 text-start font-medium text-ink">
                  <div>{std.name}</div>
                  <div className="text-[11px] text-muted">{std.grade}</div>
                </td>
                <td className="p-3 font-mono text-[11px] text-emerald-deep font-semibold">{std.barcode}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                    {std.pearls} لؤلؤة
                  </span>
                </td>
                <td className="p-3">
                  {std.necklaces > 0 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-800">
                      📿 {std.necklaces} طوق
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted">بانتظار ٢٠ لؤلؤة</span>
                  )}
                </td>
                <td className="p-3 font-semibold text-emerald-deep">{std.recitationScore}%</td>
                <td className="p-3 font-semibold text-ink">{std.quizScore} / 10</td>
                <td className="p-3">
                  <div className="flex gap-1 justify-end">
                    {(Object.keys(std.rulesMastery) as StudentRuleKey[]).map((rKey) => {
                      const m = std.rulesMastery[rKey];
                      return (
                        <span
                          key={`tag-${std.id}-${rKey}`}
                          title={`${ruleNames[rKey]}: ${m.score}%`}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            m.status === "mastered"
                              ? "bg-emerald-soft text-emerald-deep"
                              : m.status === "learning"
                              ? "bg-gold-soft text-gold"
                              : "bg-clay-soft text-clay"
                          }`}
                        >
                          {ruleNames[rKey].split(" ")[0]}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(std)}
                    className="rounded-control bg-emerald-soft px-3 py-1 font-semibold text-emerald-deep hover:bg-emerald hover:text-on-emerald transition-colors"
                  >
                    تقييم وتوجيه
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-card border border-emerald/30 bg-paper p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 left-4 rounded-full p-1 text-muted hover:bg-gold-soft hover:text-ink"
              aria-label="إغلاق"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Student Header */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald">{selectedStudent.grade}</span>
                <h3 className="amiri text-2xl font-bold text-emerald-deep">{selectedStudent.name}</h3>
                <p className="font-mono text-xs text-muted">الرمز المدرسي: {selectedStudent.barcode}</p>
              </div>
              <div className="flex items-center gap-2">
                <PearlShellGraphic className="h-14 w-14" pearlCount={selectedStudent.pearls} />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-control bg-paper/80 border border-line p-2">
                <span className="text-muted">اللآلئ المكنونة</span>
                <p className="amiri text-2xl font-bold text-amber-600">{selectedStudent.pearls} 🦪</p>
              </div>
              <div className="rounded-control bg-paper/80 border border-line p-2">
                <span className="text-muted">أطواق اللؤلؤ</span>
                <p className="amiri text-2xl font-bold text-clay">{selectedStudent.necklaces} 📿</p>
              </div>
              <div className="rounded-control bg-paper/80 border border-line p-2">
                <span className="text-muted">التلاوة والتكرار</span>
                <p className="amiri text-2xl font-bold text-emerald-deep">{selectedStudent.recitationScore}%</p>
              </div>
            </div>

            {/* Rules Mastery details */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-ink">مستوى الإتقان حسب الأحكام الأربعة:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(selectedStudent.rulesMastery) as StudentRuleKey[]).map((rKey) => {
                  const val = selectedStudent.rulesMastery[rKey];
                  return (
                    <div key={`modal-rule-${rKey}`} className="rounded-control border border-line bg-paper/60 p-2.5">
                      <div className="flex justify-between font-semibold">
                        <span>{ruleNames[rKey]}</span>
                        <span className="text-emerald">{val.score}%</span>
                      </div>
                      <span className="mt-1 inline-block text-[10px] text-muted">
                        الحالة: {val.status === "mastered" ? "متقنة تماماً ✨" : "بحاجة لمزيد من التكرار 🌿"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Award Bonus Pearl Action */}
            <div className="mt-5 rounded-card border border-amber-300 bg-amber-50 p-4">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <PlusCircle className="h-4 w-4 text-amber-700" />
                منح لآلئ تشجيعية للطالبة من المعلمة:
              </h4>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAwardPearl(selectedStudent.id, 1)}
                  className="rounded-control bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                >
                  + لؤلؤة واحدة 🦪
                </button>
                <button
                  type="button"
                  onClick={() => handleAwardPearl(selectedStudent.id, 3)}
                  className="rounded-control bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                >
                  + ٣ لآلئ تميز 🦪✨
                </button>
                <button
                  type="button"
                  onClick={() => handleAwardPearl(selectedStudent.id, 5)}
                  className="rounded-control bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                >
                  + ٥ لآلئ إتقان تام 🌟
                </button>
              </div>
            </div>

            {/* Teacher Notes List & Add Note */}
            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-bold text-ink flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-emerald" />
                سجل الملاحظات والتوجيهات:
              </h4>
              <div className="max-h-36 overflow-y-auto space-y-2">
                {selectedStudent.teacherNotes.map((note) => (
                  <div key={note.id} className="rounded-control border border-line bg-paper/70 p-2.5 text-xs">
                    <div className="flex justify-between text-[10px] text-muted mb-1">
                      <span>{note.teacherName}</span>
                      <span>{note.date}</span>
                    </div>
                    <p className="leading-relaxed text-ink">{note.text}</p>
                  </div>
                ))}
              </div>

              {/* Add new note */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="اكتبي توجيهاً للطالبة (مثل: ركزي على الغنة في إدغام الميم...)"
                  className="flex-1 rounded-control border border-line bg-paper px-3 py-1.5 text-xs text-ink"
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedStudent.id)}
                  className="rounded-control bg-emerald px-3 py-1.5 text-xs font-semibold text-on-emerald hover:bg-emerald-deep"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
