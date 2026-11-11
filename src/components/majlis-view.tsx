import { useEffect, useRef, useState } from "react";
import { Mic, Square, Volume2, Sprout } from "lucide-react";
import { clsx } from "clsx";
import { ayahs } from "@/lib/tajweed/ayahs";
import { arNum } from "@/lib/tajweed/audio";
import { choicesOf, majlis, spotById, type MajlisCard } from "@/lib/tajweed/data";
import { judgeText, phraseScore } from "@/lib/tajweed/judge";
import { playNoona, speakArabic } from "@/lib/noona-voice";
import { plantRewardSeed } from "@/lib/tajweed/garden";
import {
  TeaPlantGraphic,
  ChrysanthemumGraphic,
  DamaskRoseGraphic,
  DanaMascotGraphic,
  PearlShellGraphic,
} from "./garden-art";
import { AyahText, ListenButton } from "./ayah-text";
import { Fireworks } from "./fireworks";
import { GhostButton, PrimaryButton } from "./ui";

type Role = "noona" | "me";
type Msg = { id: string; role: Role; text: string };
type Phase = "ask" | "coach" | "repeat";
type CompanionMode = "dana" | "garden";

export function MajlisView({ onGarden }: { onGarden?: () => void }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ask");
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [cued, setCued] = useState(false);
  const [burst, setBurst] = useState(0);
  const [mood, setMood] = useState<"calm" | "glad" | "kind">("calm");
  const [companion, setCompanion] = useState<CompanionMode>("dana");
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  const opening = majlis[0].steps[0];
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "msg-initial-0",
      role: "noona",
      text: `أنا دانة، لؤلؤة التجويد بمدرسة السفر الأهلية. الآية الكريمة أمامكِ، وأنا أسأل. ${opening.ask}`,
    },
  ]);
  const seq = useRef(1);
  const scroller = useRef<HTMLDivElement>(null);
  const recRef = useRef<SpeechRec | null>(null);
  const lock = useRef(false);
  const card = majlis[cardIndex];
  const step = card.steps[stepIndex];
  const spot = spotById(card.spotId);

  useEffect(() => {
    const w = window as SpeechWindow;
    setMicReady(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => recRef.current?.stop();
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, phase]);

  useEffect(() => {
    lock.current = false;
  }, [cardIndex, stepIndex, phase]);

  function say(role: Role, text: string) {
    seq.current += 1;
    const uniqueId = `msg-${seq.current}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setMessages((list) => [...list, { id: uniqueId, role, text }]);
  }

  function rewardGarden() {
    let pType: "tea" | "chrysanthemum" | "rose" = "rose";
    if (spot.rule === "izhar" || spot.rule === "mutlaq") pType = "chrysanthemum";
    else if (spot.rule === "idgham-gh" || spot.rule === "idgham-nogh") pType = "tea";
    else pType = "rose";

    const { newPlant, earnedPearls } = plantRewardSeed(pType, card.kicker);
    setSeedNotice(`+ ${newPlant.name} و (+${earnedPearls}) لؤلؤة مكنونة في المحارة 🦪✨`);
    setTimeout(() => setSeedNotice(null), 4000);
  }

  function openCard(nextCard: number, nextStep: number) {
    const item = majlis[nextCard];
    const asking = item.steps[nextStep];
    recRef.current?.stop();
    setListening(false);
    setCardIndex(nextCard);
    setStepIndex(nextStep);
    setPhase("ask");
    setCued(false);
    setDraft("");
    setMood("calm");
    seq.current += 1;
    const hello =
      nextStep === 0
        ? `موضع جديد في ${item.kicker}. ${asking.ask}`
        : asking.ask;
    const uniqueId = `msg-${seq.current}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setMessages([{ id: uniqueId, role: "noona", text: hello }]);
  }

  function answer(choiceId: string, label: string) {
    if (phase !== "ask" || lock.current) return;
    lock.current = true;
    say("me", label);
    finishAsk(choiceId === step.correct ? "right" : "wrong");
  }

  function finishAsk(verdict: "right" | "partial" | "wrong") {
    if (verdict === "partial") {
      setMood("kind");
      playNoona("near");
      say("noona", "إدغام، والباب صحيح. أبغنة أم بغير غنة؟ ينمو فيها غنة، واللام والراء عند حفص بلا غنة.");
      lock.current = false;
      return;
    }
    if (verdict === "right") {
      setMood("glad");
      setBurst((value) => value + 1);
      playNoona("praise");
      rewardGarden();
    } else {
      setMood("kind");
      playNoona("gentle");
    }
    say("noona", verdict === "right" ? step.ok : step.no);
    if (stepIndex < card.steps.length - 1) {
      const next = card.steps[stepIndex + 1];
      say("noona", next.ask);
      setStepIndex(stepIndex + 1);
      setPhase("ask");
      return;
    }
    say("noona", "اسمعي الشيخ الحصري، ثم كرري ورائي. أنا أصحّح الحكم، والتلاوة هي مرجع اللفظ.");
    setPhase("coach");
  }

  function sendDraft() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    if (phase !== "ask") {
      judgeRepeat(text);
      return;
    }
    if (lock.current) return;
    lock.current = true;
    say("me", text);
    finishAsk(judgeText(text, step.correct));
  }

  function cueListen() {
    if (cued) return;
    setCued(true);
    say("noona", `${card.listen} كرري الآن: ${card.repeat}`);
    setPhase("repeat");
  }

  function judgeRepeat(text: string) {
    say("me", text);
    const score = phraseScore(text, card.expect);
    if (score >= 0.72) {
      setMood("glad");
      setBurst((v) => v + 1);
      playNoona("heard");
      rewardGarden();
      say("noona", `سمعتُكِ تقولين: «${text}». ${card.heardOk}`);
    } else if (score >= 0.4) {
      setMood("kind");
      playNoona("near");
      say("noona", `اقتربتِ. وصلني: «${text}». أعيدي بعد الحصري: ${card.repeat}`);
    } else {
      setMood("kind");
      playNoona("retry");
      say("noona", `وصلني: «${text}». ${card.heardNo}`);
    }
    setPhase("coach");
  }

  function startMic() {
    const w = window as SpeechWindow;
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      say("noona", "هذا المتصفح لا يفتح الميكروفون، وغالباً يعمل في كروم. اكتبي التكرار في السطر، أو كرري بصوتكِ في الصف بعد الحصري.");
      return;
    }
    recRef.current?.stop();
    const rec = new Ctor();
    rec.lang = "ar-SA";
    rec.interimResults = false;
    rec.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript ?? "";
      setListening(false);
      if (text) judgeRepeat(text);
      else say("noona", "لم يصلني صوت واضح. قرّبي الجهاز وكرري الموضع.");
    };
    rec.onerror = () => {
      setListening(false);
      say("noona", "لم يُفتح الميكروفون. اكتبي ما كررتِه، أو أعيدي المحاولة بعد السماح بالصوت.");
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
      setPhase("repeat");
    } catch {
      setListening(false);
    }
  }

  function stopMic() {
    recRef.current?.stop();
    setListening(false);
  }

  function speakLast() {
    const last = [...messages].reverse().find((msg) => msg.role === "noona");
    if (!last) return;
    speakArabic(last.text);
  }

  const choices = choicesOf(step.choiceIds);
  const status = listening
    ? "تصغي لؤلؤة التجويد إلى تكراركِ"
    : mood === "glad"
    ? "تتلألأ دانة فرحاً بإتقانكِ وتمنحكِ لؤلؤة!"
    : phase === "ask"
    ? "دانة تسأل عن الآية الكريمة"
    : "تصحّح برفق وتوجّه للأصل";

  const isIzhar = spot.rule === "izhar" || spot.rule === "mutlaq";
  const isIdgham = spot.rule === "idgham-gh" || spot.rule === "idgham-nogh";

  return (
    <div className="space-y-4">
      <Fireworks token={burst} />

      {/* Top Companion Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2">
        <div className="flex items-center gap-1 rounded-control border border-line bg-paper p-1 text-xs">
          <button
            type="button"
            onClick={() => setCompanion("dana")}
            className={clsx(
              "rounded-control px-3 py-1 font-medium transition-colors",
              companion === "dana" ? "bg-amber-500 text-white font-bold" : "text-muted hover:text-ink"
            )}
          >
            دانة (لؤلؤة التجويد) 🦪
          </button>
          <button
            type="button"
            onClick={() => setCompanion("garden")}
            className={clsx(
              "rounded-control px-3 py-1 font-medium transition-colors",
              companion === "garden" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            )}
          >
            بستان التجويد والزهور 🌿
          </button>
        </div>

        {onGarden ? (
          <button
            type="button"
            onClick={onGarden}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline"
          >
            <Sprout className="h-3.5 w-3.5" />
            تفقدي بستانكِ وسوق اللؤلؤ
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[17rem_1fr]">
        <aside className="panel flex items-center gap-3 p-3 lg:block lg:p-0 overflow-hidden">
          {companion === "dana" ? (
            <div className="flex h-24 w-24 lg:h-72 lg:w-full flex-col items-center justify-center bg-gradient-to-b from-[#fffbeb] to-[#fef3c7] p-3 shrink-0 rounded-card lg:rounded-none">
              <DanaMascotGraphic
                mood={listening ? "listening" : mood === "glad" ? "glad" : mood === "kind" ? "kind" : "calm"}
                className="h-20 w-20 lg:h-44 lg:w-44 transition-transform hover:scale-105"
              />
              <span className="hidden lg:block text-xs font-bold text-amber-900 mt-2">
                {listening ? "دانة تصغي لتكراركِ" : mood === "glad" ? "تتلألأ دانة فرحاً بكِ!" : "دانة - لؤلؤة التجويد"}
              </span>
            </div>
          ) : (
            <div className="flex h-24 w-24 lg:h-72 lg:w-full flex-col items-center justify-center bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9] p-3 shrink-0 rounded-card lg:rounded-none">
              {isIdgham ? (
                <TeaPlantGraphic className="h-16 w-16 lg:h-36 lg:w-36 animate-pulse" />
              ) : isIzhar ? (
                <ChrysanthemumGraphic className="h-16 w-16 lg:h-36 lg:w-36 animate-pulse" />
              ) : (
                <DamaskRoseGraphic className="h-16 w-16 lg:h-36 lg:w-36 animate-pulse" />
              )}
              <span className="hidden lg:block text-xs font-semibold text-emerald-deep mt-2">
                {isIdgham ? "مزرعة شاي الإدغام" : isIzhar ? "أقحوانة الإظهار" : "وردة جوري الغنة"}
              </span>
            </div>
          )}

          <div className="lg:p-4">
            <p className="amiri text-2xl lg:text-3xl font-bold text-emerald-deep">
              {companion === "dana" ? "دانة (لؤلؤة التجويد)" : "روضة التجويد"}
            </p>
            <p className="text-xs text-muted">{status}</p>

            {seedNotice ? (
              <div className="rise mt-2 rounded-control bg-amber-100 border border-amber-300 p-2 text-xs font-bold text-amber-950">
                {seedNotice}
              </div>
            ) : null}

            <p className="mt-2 text-sm">
              الموضع {arNum(cardIndex + 1)} من {arNum(majlis.length)}
            </p>
            <div className="mt-3 flex gap-1">
              {majlis.map((item, index) => (
                <span
                  key={`majlis-dot-${item.id}-${index}`}
                  className={
                    index === cardIndex
                      ? "h-2 w-6 rounded-full bg-emerald"
                      : index < cardIndex
                        ? "h-2 w-2 rounded-full bg-gold"
                        : "h-2 w-2 rounded-full bg-line"
                  }
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          <article className="panel space-y-3 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gold">{card.kicker}</p>
              <span className="text-xs text-muted">حفص عن عاصم</span>
            </div>
            <AyahText text={ayahs[spot.ayahKey] ?? ""} focus={step.focus} />
            <p className="text-sm text-muted">
              سورة {spot.surahName} · الآية {arNum(spot.ayah)}
            </p>
          </article>

          <section className="panel overflow-hidden">
            <div ref={scroller} className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <p
                  key={msg.id}
                  className={msg.role === "noona" ? "bubble-noona me-8 px-4 py-3" : "bubble-me ms-8 px-4 py-3"}
                >
                  <span className="mb-1 block text-xs opacity-70">
                    {msg.role === "noona" ? (companion === "dana" ? "دانة (لؤلؤة التجويد)" : "المعلمة التجويدية") : "أنتِ"}
                  </span>
                  {msg.text}
                </p>
              ))}
            </div>
            <div className="space-y-3 border-t border-line p-3">
              {phase === "ask" ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {choices.map((choice, cIdx) => (
                    <GhostButton
                      key={`choice-${card.id}-${stepIndex}-${choice.id}-${cIdx}`}
                      onClick={() => answer(choice.id, choice.label)}
                    >
                      {choice.label}
                    </GhostButton>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <ListenButton surah={spot.surah} ayah={spot.ayah} onPlay={cueListen} quiet label="اسمعي الحصري ثم كرري" />
                  {listening ? (
                    <GhostButton onClick={stopMic}>
                      <Square className="h-4 w-4" aria-hidden />
                      إيقاف
                    </GhostButton>
                  ) : (
                    <GhostButton onClick={startMic}>
                      <Mic className="h-4 w-4" aria-hidden />
                      {micReady ? "أكرر بصوتي" : "الميكروفون غير متاح"}
                    </GhostButton>
                  )}
                  <GhostButton onClick={speakLast}>
                    <Volume2 className="h-4 w-4" aria-hidden />
                    قراءة الشرح
                  </GhostButton>
                </div>
              )}
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendDraft();
                }}
              >
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={phase === "repeat" ? "أو اكتبي ما كررتِه للتصحيح" : "أو اكتبي الحكم في السطر"}
                  className="min-h-11 w-full rounded-control border border-line bg-paper px-3 text-ink"
                  aria-label="جوابكِ"
                />
                <PrimaryButton type="submit">إرسال</PrimaryButton>
              </form>
              <div className="flex flex-wrap gap-2">
                {cardIndex > 0 ? (
                  <button type="button" className="min-h-11 px-2 text-sm text-muted" onClick={() => openCard(cardIndex - 1, 0)}>
                    السابق
                  </button>
                ) : null}
                {cardIndex < majlis.length - 1 ? (
                  <button type="button" className="min-h-11 px-2 text-sm text-emerald font-medium" onClick={() => openCard(cardIndex + 1, 0)}>
                    الموضع التالي
                  </button>
                ) : (
                  <button type="button" className="min-h-11 px-2 text-sm text-emerald font-medium" onClick={() => openCard(0, 0)}>
                    أعيدي المجلس
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <TeacherNote card={card} />
    </div>
  );
}

function TeacherNote({ card }: { card: MajlisCard }) {
  return (
    <details className="panel p-4">
      <summary className="font-medium text-emerald-deep">ملاحظة للمعلمة في هذا الموضع</summary>
      <p className="mt-2 text-sm leading-relaxed">
        التشجيع بصوت نونة الثابت على كل جهاز. تلاوة الآية مسجلة بصوت الشيخ الحصري (رحمه الله) برواية حفص عن عاصم من طريق الشاطبية.
        الميكروفون يطابق الألفاظ والتكرار: إتقان من سبعة أعشار، واقتراب من أربعة أعشار.
        المطلوب تكراره هنا: <strong>{card.repeat}</strong>.
      </p>
    </details>
  );
}

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRec;
  webkitSpeechRecognition?: new () => SpeechRec;
};
