import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ayahs } from "@/lib/tajweed/ayahs";
import { quiz, spotById, type QuizQuestion } from "@/lib/tajweed/data";
import { playNoona } from "@/lib/noona-voice";
import { plantRewardSeed, type PlantItem } from "@/lib/tajweed/garden";
import {
  TeaPlantGraphic,
  ChrysanthemumGraphic,
  DamaskRoseGraphic,
  DanaMascotGraphic,
} from "./garden-art";
import { AyahCaption, AyahText, ListenButton } from "./ayah-text";
import { Fireworks } from "./fireworks";
import { GhostButton, PrimaryButton } from "./ui";

type Miss = { prompt: string; explain: string };

export function QuizView({
  onMajlis,
  onGarden,
}: {
  onMajlis: () => void;
  onGarden?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [misses, setMisses] = useState<Miss[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const [burst, setBurst] = useState(0);
  const [lastRight, setLastRight] = useState(false);
  const [newPlantReward, setNewPlantReward] = useState<PlantItem | null>(null);
  const [sessionSeeds, setSessionSeeds] = useState<PlantItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("noona-quiz-best");
    if (stored) setBest(Number(stored));
  }, []);

  const question = quiz[index];

  function choose(id: string) {
    if (picked || !question) return;
    setPicked(id);
    const right = id === question.correct;
    setLastRight(right);

    if (right) {
      setCorrectCount((count) => count + 1);
      setBurst((value) => value + 1);
      playNoona("praise");

      // Award a garden seed based on the question topic
      let plantType: "tea" | "chrysanthemum" | "rose" = "rose";
      let ruleName = "إتقان التجويد";
      if (question.spotId) {
        const spot = spotById(question.spotId);
        if (spot.rule === "izhar" || spot.rule === "mutlaq") {
          plantType = "chrysanthemum";
          ruleName = spot.rule === "mutlaq" ? "إظهار مطلق" : "إظهار حلقي";
        } else if (spot.rule === "idgham-gh" || spot.rule === "idgham-nogh") {
          plantType = "tea";
          ruleName = spot.rule === "idgham-gh" ? "إدغام بغنة" : "إدغام بلا غنة";
        } else {
          plantType = "rose";
          ruleName = spot.rule === "iqlab" ? "إقلاب" : "إخفاء حقيقي";
        }
      } else if (index % 3 === 0) {
        plantType = "chrysanthemum";
        ruleName = "وضوح الإظهار";
      } else if (index % 3 === 1) {
        plantType = "tea";
        ruleName = "ثبات الإدغام";
      } else {
        plantType = "rose";
        ruleName = "رقة الغنة";
      }

      const { newPlant } = plantRewardSeed(plantType, ruleName);
      setNewPlantReward(newPlant);
      setSessionSeeds((prev) => [...prev, newPlant]);
    } else {
      playNoona("gentle");
      setMisses((list) => [...list, { prompt: question.prompt, explain: question.explain }]);
      setNewPlantReward(null);
    }
  }

  function next() {
    if (index + 1 >= quiz.length) {
      const score = correctCount;
      setDone(true);
      playNoona(score >= quiz.length - 2 ? "done" : "praise");
      setBurst((value) => value + 1);
      setBest((prev) => {
        const value = Math.max(prev ?? 0, score);
        localStorage.setItem("noona-quiz-best", String(value));
        return value;
      });
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
    setNewPlantReward(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setMisses([]);
    setCorrectCount(0);
    setDone(false);
    setLastRight(false);
    setNewPlantReward(null);
    setSessionSeeds([]);
  }

  if (done) {
    return (
      <section className="panel space-y-6 p-5 md:p-8">
        <Fireworks token={burst} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <img
            src={correctCount >= quiz.length / 2 ? "/noona-happy.jpg" : "/noona-face.jpg"}
            alt="نونة"
            className="noona-pop h-24 w-24 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="text-sm text-gold">نتيجة التدريب وبستان التجويد</p>
            <h2 className="amiri text-4xl text-emerald-deep">
              {correctCount} من {quiz.length} صواب
            </h2>
            <p className="mt-1 text-sm text-ink/80">
              {correctCount === quiz.length
                ? "ما شاء الله! تفتحت أزهار بستانكِ بالكامل وازدهرت مزارع الشاي والأقحوان والجوري."
                : "أحسنتِ المحاولة! كل بذرة سُقيت تثبت لفظاً، والمواضع التي تطلب إعادة معروضة أدناه."}
            </p>
          </div>
        </div>

        {/* Harvest Summary */}
        {sessionSeeds.length > 0 ? (
          <div className="rounded-card border border-emerald/20 bg-emerald-soft/30 p-4">
            <h3 className="text-base font-semibold text-emerald-deep mb-2 flex items-center gap-2">
              🌿 غراس وبذور أضيفت لبستانكِ في هذه الجلسة ({sessionSeeds.length} نبتة):
            </h3>
            <div className="flex flex-wrap gap-2">
              {sessionSeeds.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center gap-1.5 rounded-control bg-paper px-3 py-1.5 border border-line text-xs font-medium"
                >
                  {item.type === "tea" ? (
                    <TeaPlantGraphic className="h-5 w-5" />
                  ) : item.type === "chrysanthemum" ? (
                    <ChrysanthemumGraphic className="h-5 w-5" />
                  ) : (
                    <DamaskRoseGraphic className="h-5 w-5" />
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <p className="text-xs text-muted">
          {best !== null ? `أحسن نتيجة محفوظة على هذا الجهاز: ${best} من ${quiz.length}.` : ""}
        </p>

        {misses.length ? (
          <div className="space-y-3">
            <h3 className="text-xl text-clay">ما يُعاد تثبيته مع دانة (لؤلؤة التجويد)</h3>
            {misses.map((miss, mIdx) => (
              <article key={`quiz-miss-${mIdx}-${miss.prompt.slice(0, 15)}`} className="rounded-control bg-clay-soft p-4">
                <p className="font-medium">{miss.prompt}</p>
                <p className="mt-1 text-sm">{miss.explain}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-emerald">
            أحكام الباب مستقرة تماماً. انتقلي إلى المجلس للتكرار الصوتي مع الحصري، أو تفقدي بستانكِ وسوق اللؤلؤ.
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryButton onClick={onMajlis}>اجلسي في مجلس دانة والتكرار</PrimaryButton>
          {onGarden ? <GhostButton onClick={onGarden}>افتحي بستان وسوق اللؤلؤ 🦪</GhostButton> : null}
          <GhostButton onClick={restart}>أعيدي التدريب</GhostButton>
        </div>
      </section>
    );
  }

  if (!question) return null;

  return (
    <section className="space-y-4">
      <Fireworks token={burst} />

      {/* Top Banner showing Dana & Garden Seed Status */}
      <div className="panel flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-3">
          <DanaMascotGraphic
            mood={picked ? (lastRight ? "glad" : "kind") : "calm"}
            className="h-16 w-16 shrink-0"
          />
          <p className="text-xs sm:text-sm leading-relaxed">
            {!picked
              ? "خذي وقتكِ يا مبدعة مدرسة السفر، فالحكم للحرف التالي مباشرة. كل جواب صحيح يغرس نبتة ويمنحكِ لؤلؤة مكنونة!"
              : lastRight
                ? "أحسنتِ! غُرست بذرة يانعة في بستانكِ ونلتِ لؤلؤة مكنونة في المحارة 🦪✨"
                : "لا بأس. قفي عند التصحيح، ففهم العلة هو أصل العلم."}
          </p>
        </div>

        {/* Live Seed Reward Badge */}
        {newPlantReward ? (
          <div className="rise hidden sm:flex items-center gap-2 rounded-control bg-emerald-soft px-3 py-1.5 border border-emerald/30 text-xs font-semibold text-emerald-deep">
            {newPlantReward.type === "tea" ? (
              <TeaPlantGraphic className="h-6 w-6" />
            ) : newPlantReward.type === "chrysanthemum" ? (
              <ChrysanthemumGraphic className="h-6 w-6" />
            ) : (
              <DamaskRoseGraphic className="h-6 w-6" />
            )}
            <span>+ نبتة {newPlantReward.ruleLinked}</span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          سؤال {index + 1} من {quiz.length}
        </span>
        <span className="flex items-center gap-1 font-medium text-emerald">
          <span>الصواب حتى الآن: {correctCount}</span>
          <span className="text-xs">🌱</span>
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-line">
        <div className="h-full bg-emerald transition-all" style={{ width: `${((index + 1) / quiz.length) * 100}%` }} />
      </div>

      <QuestionCard question={question} picked={picked} onChoose={choose} />

      {picked ? (
        <div className="flex justify-end gap-2">
          {onGarden ? (
            <GhostButton onClick={onGarden} className="text-xs">
              معاينة البستان 🌿
            </GhostButton>
          ) : null}
          <PrimaryButton onClick={next}>{index + 1 === quiz.length ? "عرض النتيجة" : "السؤال التالي"}</PrimaryButton>
        </div>
      ) : null}
    </section>
  );
}

function QuestionCard({
  question,
  picked,
  onChoose,
}: {
  question: QuizQuestion;
  picked: string | null;
  onChoose: (id: string) => void;
}) {
  const spot = question.spotId ? spotById(question.spotId) : null;
  const focus = question.focus ?? spot?.focus;
  const right = picked === question.correct;

  return (
    <article className="panel space-y-4 p-5 md:p-6">
      <h2 className="text-2xl text-emerald-deep">{question.prompt}</h2>
      {spot ? (
        <div className="space-y-2">
          <AyahText text={ayahs[spot.ayahKey] ?? ""} focus={focus} />
          <AyahCaption surahName={spot.surahName} ayah={spot.ayah} />
        </div>
      ) : null}
      <div className="grid gap-2">
        {question.choices.map((choice) => {
          const state = !picked ? "idle" : choice.id === question.correct ? "right" : choice.id === picked ? "wrong" : "idle";
          return (
            <button
              key={`q-${question.id}-choice-${choice.id}`}
              type="button"
              disabled={picked !== null}
              onClick={() => onChoose(choice.id)}
              className={clsx(
                "min-h-11 rounded-control border px-4 py-3 text-start font-medium transition-colors",
                state === "right" && "border-emerald bg-emerald-soft text-emerald-deep font-semibold",
                state === "wrong" && "border-clay bg-clay-soft text-clay",
                state === "idle" && "border-line bg-paper text-ink hover:bg-gold-soft",
              )}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {picked ? (
        <div className={clsx("rise rounded-control p-4 border", right ? "bg-emerald-soft/70 border-emerald/30" : "bg-clay-soft/70 border-clay/30")}>
          <p className="font-semibold">{right ? "صواب مبارك! 🌿" : "لا بأس. يُصحَّح هكذا:"}</p>
          <p className="mt-1 text-sm">{question.explain}</p>
          {spot ? (
            <div className="mt-3">
              <ListenButton surah={spot.surah} ayah={spot.ayah} label="اسمعي الشيخ الحصري" />
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
