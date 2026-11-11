export type StudentRuleKey = "izhar" | "idgham" | "iqlab" | "ikhfa";

export type Student = {
  id: string;
  name: string;
  grade: string;
  email: string;
  barcode: string;
  pearls: number;
  necklaces: number;
  rulesMastery: Record<StudentRuleKey, { score: number; status: "mastered" | "learning" | "needs-work" }>;
  recitationScore: number; // النسبة المئوية لإتقان النطق مع الشيخ الحصري
  quizScore: number; // عدد الإجابات الصحيحة في الاختبار
  teacherNotes: { id: string; date: string; text: string; teacherName: string }[];
  lastActive: string;
};

export type CurrentUser = {
  role: "student" | "teacher";
  student?: Student;
  teacherName?: string;
};

const STORAGE_KEY = "alsafar-students-roster-v1";
const AUTH_KEY = "alsafar-current-auth-v1";

export const SCHOOL_INFO = {
  name: "مدرسة السفر الأهلية - بنات",
  group: "مؤسسة عبدالحميد الصانع التعليمية",
  established: 1986,
  country: "دولة الكويت",
  instagram: "https://www.instagram.com/alsafar_school?psln=M3VvY3FucWh6cHJx",
  website: "alsafarschool.com",
  phone: "+965 2488 4000",
  ministry: "تحت إشراف وترخيص وزارة التربية بدولة الكويت",
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "std-01",
    name: "مريم أحمد الصانع",
    grade: "الصف السابع / أ",
    email: "maryam.sane@alsafarschool.com",
    barcode: "KUW-SAFAR-701",
    pearls: 24,
    necklaces: 1,
    rulesMastery: {
      izhar: { score: 100, status: "mastered" },
      idgham: { score: 95, status: "mastered" },
      iqlab: { score: 92, status: "mastered" },
      ikhfa: { score: 90, status: "mastered" },
    },
    recitationScore: 97,
    quizScore: 10,
    teacherNotes: [
      { id: "note-1", date: "منذ يومين", text: "أداء متميز في التمييز بين الإدغام بغنة وبغير غنة ومواضع الإظهار المطلق.", teacherName: "أ. وفاء الكندري" },
    ],
    lastActive: "اليوم 09:15 ص",
  },
  {
    id: "std-02",
    name: "نورة فهد الصباح",
    grade: "الصف السابع / أ",
    email: "noura.fahad@alsafarschool.com",
    barcode: "KUW-SAFAR-702",
    pearls: 18,
    necklaces: 0,
    rulesMastery: {
      izhar: { score: 95, status: "mastered" },
      idgham: { score: 88, status: "learning" },
      iqlab: { score: 100, status: "mastered" },
      ikhfa: { score: 85, status: "learning" },
    },
    recitationScore: 91,
    quizScore: 9,
    teacherNotes: [
      { id: "note-2", date: "أمس", text: "بقي لؤلؤتان على صياغة طوق اللؤلؤ الأول! تدربتِ بشكل رائع على غنة الإقلاب.", teacherName: "أ. وفاء الكندري" },
    ],
    lastActive: "أمس 11:30 ص",
  },
  {
    id: "std-03",
    name: "لولوة راشد المطيري",
    grade: "الصف الثامن / ب",
    email: "lulwa.mutairi@alsafarschool.com",
    barcode: "KUW-SAFAR-801",
    pearls: 35,
    necklaces: 1,
    rulesMastery: {
      izhar: { score: 100, status: "mastered" },
      idgham: { score: 96, status: "mastered" },
      iqlab: { score: 95, status: "mastered" },
      ikhfa: { score: 94, status: "mastered" },
    },
    recitationScore: 96,
    quizScore: 10,
    teacherNotes: [
      { id: "note-3", date: "منذ 3 أيام", text: "حازت على طوق اللؤلؤ بجدارة، وتكرارها مع الحصري دقيق للغاية.", teacherName: "أ. منيرة السفر" },
    ],
    lastActive: "اليوم 08:40 ص",
  },
  {
    id: "std-04",
    name: "دانة حمد السفر",
    grade: "الصف السادس / أ",
    email: "dana.safar@alsafarschool.com",
    barcode: "KUW-SAFAR-601",
    pearls: 15,
    necklaces: 0,
    rulesMastery: {
      izhar: { score: 90, status: "mastered" },
      idgham: { score: 82, status: "learning" },
      iqlab: { score: 90, status: "mastered" },
      ikhfa: { score: 78, status: "learning" },
    },
    recitationScore: 88,
    quizScore: 8,
    teacherNotes: [
      { id: "note-4", date: "منذ 4 أيام", text: "تحتاج إلى مراجعة مراتب الإخفاء (أعلى الإخفاء عند الطاء والدال والتاء).", teacherName: "أ. وفاء الكندري" },
    ],
    lastActive: "اليوم 10:05 ص",
  },
  {
    id: "std-05",
    name: "سارة ناصر العجمي",
    grade: "الصف السادس / ب",
    email: "sara.ajmi@alsafarschool.com",
    barcode: "KUW-SAFAR-602",
    pearls: 21,
    necklaces: 1,
    rulesMastery: {
      izhar: { score: 92, status: "mastered" },
      idgham: { score: 90, status: "mastered" },
      iqlab: { score: 85, status: "learning" },
      ikhfa: { score: 88, status: "learning" },
    },
    recitationScore: 90,
    quizScore: 9,
    teacherNotes: [
      { id: "note-5", date: "أمس", text: "باركت لها صياغة طوق اللؤلؤ الكويتي في الإذاعة المدرسية.", teacherName: "أ. منيرة السفر" },
    ],
    lastActive: "أمس 01:20 م",
  },
  {
    id: "std-06",
    name: "فاطمة مشعل العازمي",
    grade: "الصف السابع / ب",
    email: "fatima.azmi@alsafarschool.com",
    barcode: "KUW-SAFAR-703",
    pearls: 12,
    necklaces: 0,
    rulesMastery: {
      izhar: { score: 88, status: "learning" },
      idgham: { score: 75, status: "needs-work" },
      iqlab: { score: 85, status: "learning" },
      ikhfa: { score: 80, status: "learning" },
    },
    recitationScore: 84,
    quizScore: 7,
    teacherNotes: [
      { id: "note-6", date: "منذ أسبوع", text: "تم تكليفها بالاستماع إلى موضع (من يقول) و (من وال) خمس مرات مع الشيخ الحصري.", teacherName: "أ. وفاء الكندري" },
    ],
    lastActive: "منذ يومين",
  },
  {
    id: "std-07",
    name: "عائشة خالد الكندري",
    grade: "الصف الثامن / أ",
    email: "aisha.kandari@alsafarschool.com",
    barcode: "KUW-SAFAR-802",
    pearls: 42,
    necklaces: 2,
    rulesMastery: {
      izhar: { score: 100, status: "mastered" },
      idgham: { score: 98, status: "mastered" },
      iqlab: { score: 100, status: "mastered" },
      ikhfa: { score: 96, status: "mastered" },
    },
    recitationScore: 99,
    quizScore: 10,
    teacherNotes: [
      { id: "note-7", date: "أمس", text: "حصلت على طوقين من اللؤلؤ! نموذج يحتذى به في إتقان أحكام التجويد.", teacherName: "أ. وفاء الكندري" },
    ],
    lastActive: "اليوم 09:50 ص",
  },
];

export function getStudentsList(): Student[] {
  if (typeof window === "undefined") return INITIAL_STUDENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (err) {
    console.error("Failed to load students:", err);
  }
  return INITIAL_STUDENTS;
}

export function saveStudentsList(list: Student[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save students:", err);
  }
}

export function getCurrentUser(): CurrentUser {
  if (typeof window === "undefined") {
    return { role: "student", student: INITIAL_STUDENTS[0] };
  }
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      const defaultUser: CurrentUser = { role: "student", student: INITIAL_STUDENTS[0] };
      localStorage.setItem(AUTH_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  } catch (err) {
    console.error("Failed to load current auth:", err);
  }
  return { role: "student", student: INITIAL_STUDENTS[0] };
}

export function setCurrentUser(user: CurrentUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save auth:", err);
  }
}

export function loginByBarcode(code: string): { success: boolean; student?: Student; isTeacher?: boolean; message: string } {
  const clean = code.trim().toUpperCase();
  if (clean === "TEACHER" || clean === "KUW-TEACHER-100" || clean.includes("TEACHER")) {
    const teacherUser: CurrentUser = { role: "teacher", teacherName: "أ. وفاء الكندري (معلمة التجويد)" };
    setCurrentUser(teacherUser);
    return { success: true, isTeacher: true, message: "أهلاً بكِ أستاذة وفاء الكندري في نافذة تقييم الطالبات بمدرسة السفر الأهلية." };
  }

  const list = getStudentsList();
  const found = list.find((s) => s.barcode.toUpperCase() === clean || s.id.toUpperCase() === clean);
  if (found) {
    setCurrentUser({ role: "student", student: found });
    return { success: true, student: found, message: `أهلاً بالطالبة المبدعة ${found.name} (${found.grade}) في مجلس التجويد.` };
  }

  return { success: false, message: "لم يتم العثور على بطاقة مطابقة. تأكدي من رمز الباركود أو جربي أحد الأكواد التجريبية المرفقة." };
}

export function loginByEmail(email: string): { success: boolean; student?: Student; isTeacher?: boolean; message: string } {
  const clean = email.trim().toLowerCase();
  if (clean.includes("teacher") || clean === "wafaa@alsafarschool.com") {
    const teacherUser: CurrentUser = { role: "teacher", teacherName: "أ. وفاء الكندري (معلمة التجويد)" };
    setCurrentUser(teacherUser);
    return { success: true, isTeacher: true, message: "أهلاً بكِ أستاذة وفاء الكندري في نافذة تقييم الطالبات." };
  }

  const list = getStudentsList();
  const found = list.find((s) => s.email.toLowerCase() === clean);
  if (found) {
    setCurrentUser({ role: "student", student: found });
    return { success: true, student: found, message: `مرحباً بكِ ${found.name}! تم تسجيل دخولكِ بنجاح.` };
  }

  // إذا كان إيميل جديد للطالبة
  const newStudent: Student = {
    id: `std-${Date.now().toString().slice(-4)}`,
    name: email.split("@")[0].replace(/[._]/g, " "),
    grade: "الصف السابع / أ",
    email: clean,
    barcode: `KUW-SAFAR-${Math.floor(100 + Math.random() * 900)}`,
    pearls: 16,
    necklaces: 0,
    rulesMastery: {
      izhar: { score: 85, status: "learning" },
      idgham: { score: 80, status: "learning" },
      iqlab: { score: 90, status: "mastered" },
      ikhfa: { score: 80, status: "learning" },
    },
    recitationScore: 88,
    quizScore: 8,
    teacherNotes: [{ id: "n-init", date: "اليوم", text: "مرحباً بكِ في مدرسة السفر وبستان التجويد واللؤلؤ.", teacherName: "أ. وفاء الكندري" }],
    lastActive: "الآن",
  };

  const updated = [newStudent, ...list];
  saveStudentsList(updated);
  setCurrentUser({ role: "student", student: newStudent });
  return { success: true, student: newStudent, message: `تم تفعيل حساب جديد للطالبة ${newStudent.name} بنجاح.` };
}

export function awardStudentPearls(studentId: string, count: number, noteText?: string): Student | null {
  const list = getStudentsList();
  let updatedStudent: Student | null = null;
  const nextList = list.map((s) => {
    if (s.id === studentId) {
      const nextPearls = s.pearls + count;
      const nextNotes = noteText
        ? [{ id: `note-${Date.now()}`, date: "الآن", text: noteText, teacherName: "أ. وفاء الكندري" }, ...s.teacherNotes]
        : s.teacherNotes;
      updatedStudent = { ...s, pearls: nextPearls, teacherNotes: nextNotes };
      return updatedStudent;
    }
    return s;
  });

  if (updatedStudent) {
    saveStudentsList(nextList);
    // إذا كانت الطالبة الحالية هي المعنية، نحدث جلستها
    const curr = getCurrentUser();
    if (curr.student?.id === studentId) {
      setCurrentUser({ ...curr, student: updatedStudent });
    }
  }
  return updatedStudent;
}

export function addTeacherNote(studentId: string, text: string): Student | null {
  const list = getStudentsList();
  let updatedStudent: Student | null = null;
  const nextList = list.map((s) => {
    if (s.id === studentId) {
      const newNote = { id: `note-${Date.now()}`, date: "الآن", text, teacherName: "أ. وفاء الكندري" };
      updatedStudent = { ...s, teacherNotes: [newNote, ...s.teacherNotes] };
      return updatedStudent;
    }
    return s;
  });

  if (updatedStudent) {
    saveStudentsList(nextList);
  }
  return updatedStudent;
}
