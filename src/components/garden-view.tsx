import { useState, useEffect } from "react";
import { Sparkles, Sprout, Droplets, RotateCcw, ArrowRight, ShoppingBag, Award, Coins } from "lucide-react";
import {
  loadGarden,
  resetGarden,
  plantRewardSeed,
  sellProduceForPearls,
  craftPearlNecklace,
  toggleCelebrationEmoji,
  CELEBRATION_EMOJIS,
  type GardenState,
  type PlantItem,
} from "@/lib/tajweed/garden";
import {
  TeaPlantGraphic,
  ChrysanthemumGraphic,
  DamaskRoseGraphic,
  SproutGraphic,
  SeedGraphic,
  PearlShellGraphic,
  PearlNecklaceGraphic,
} from "./garden-art";
import { PrimaryButton, GhostButton } from "./ui";
import { Fireworks } from "./fireworks";

export function GardenView({
  onStartQuiz,
  onOpenMajlis,
}: {
  onStartQuiz: () => void;
  onOpenMajlis: () => void;
}) {
  const [garden, setGarden] = useState<GardenState>(loadGarden());
  const [selectedPlant, setSelectedPlant] = useState<PlantItem | null>(null);
  const [burst, setBurst] = useState(0);
  const [filter, setFilter] = useState<"all" | "tea" | "chrysanthemum" | "rose">("all");
  const [waterEffect, setWaterEffect] = useState(false);
  const [marketNotice, setMarketNotice] = useState<string | null>(null);

  useEffect(() => {
    setGarden(loadGarden());
  }, []);

  function handleWaterAll() {
    setWaterEffect(true);
    setBurst((b) => b + 1);
    setTimeout(() => setWaterEffect(false), 2000);
  }

  function handleQuickPlant(type: "tea" | "chrysanthemum" | "rose") {
    const rules = {
      tea: "إدغام بغنة (ينمو)",
      chrysanthemum: "إظهار حلقي (ء هـ ع ح غ خ)",
      rose: "إخفاء وغنة عاطرة",
    };
    const { state, newPlant } = plantRewardSeed(type, rules[type]);
    setGarden({ ...state });
    setSelectedPlant(newPlant);
    setBurst((b) => b + 1);
  }

  function handleSellPlant(plantId: string) {
    const res = sellProduceForPearls(plantId);
    if (res) {
      setGarden({ ...res.state });
      setSelectedPlant(null);
      setBurst((b) => b + 1);
      setMarketNotice(`تم بيع «${res.soldPlantName}» بنجاح مقابل +${res.earned} لآلئ مكنونة في المحارة 🦪✨`);
      setTimeout(() => setMarketNotice(null), 4500);
    }
  }

  function handleSellAllMature() {
    const mature = garden.plants.filter((p) => p.level >= 2);
    if (!mature.length) {
      setMarketNotice("لا توجد نباتات يانعة جاهزة للبيع حالياً. استمري في التدريب والتكرار لتنمو نباتات جديدة!");
      setTimeout(() => setMarketNotice(null), 4000);
      return;
    }

    let earnedTotal = 0;
    mature.forEach((p) => {
      const res = sellProduceForPearls(p.id);
      if (res) earnedTotal += res.earned;
    });

    const updated = loadGarden();
    setGarden({ ...updated });
    setSelectedPlant(null);
    setBurst((b) => b + 2);
    setMarketNotice(`ما شاء الله! تم بيع ${mature.length} محاصيل يانعة مقابل +${earnedTotal} لؤلؤة مكنونة في المحارة 🦪✨`);
    setTimeout(() => setMarketNotice(null), 5000);
  }

  function handleCraftNecklace() {
    const res = craftPearlNecklace();
    if (res.success) {
      setGarden({ ...res.state });
      setBurst((b) => b + 3);
      setMarketNotice("مبارك! تمت صياغة طوق اللؤلؤ الكويتي الفاخر (٢٠ لؤلؤة) 📿✨ دانة تتلألأ بإتقانكِ للقرآن!");
      setTimeout(() => setMarketNotice(null), 6000);
    } else {
      setMarketNotice(`تحتاجين إلى ٢٠ لؤلؤة على الأقل لصياغة طوق اللؤلؤ. لديكِ حالياً ${garden.pearlsCount} لؤلؤة.`);
      setTimeout(() => setMarketNotice(null), 4000);
    }
  }

  function handleToggleEmoji(emoji: string) {
    const nextState = toggleCelebrationEmoji(emoji);
    setGarden({ ...nextState });
  }

  function handleReset() {
    if (confirm("هل تريدين إعادة زراعة البستان ورصيد اللؤلؤ من جديد؟")) {
      const fresh = resetGarden();
      setGarden({ ...fresh });
      setSelectedPlant(null);
    }
  }

  const filteredPlants =
    filter === "all" ? garden.plants : garden.plants.filter((p) => p.type === filter);

  // Pearls progress toward 20
  const progressInCurrentNecklace = garden.pearlsCount >= 20 ? 20 : garden.pearlsCount;
  const neededForNextNecklace = Math.max(0, 20 - garden.pearlsCount);

  return (
    <div className="space-y-6">
      <Fireworks token={burst} />

      {/* Market / Celebration Notice */}
      {marketNotice ? (
        <div className="rise flex items-center justify-between rounded-control border border-amber-300 bg-amber-50 p-3 text-xs font-bold text-amber-900 shadow-xs">
          <span>{marketNotice}</span>
          <button
            type="button"
            onClick={() => setMarketNotice(null)}
            className="text-amber-700 hover:text-amber-950 font-normal text-[11px]"
          >
            إغلاق
          </button>
        </div>
      ) : null}

      {/* Hero Panorama Card */}
      <section className="relative overflow-hidden rounded-card border border-line bg-gradient-to-b from-[#f4fbf5] via-[#ebf7ee] to-[#dff0e4] p-6 md:p-8 shadow-sm">
        <div className="pointer-events-none absolute -top-16 -left-16 h-60 w-60 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="pointer-events-none absolute top-12 right-12 text-6xl opacity-15">🍃</div>
        <div className="pointer-events-none absolute bottom-4 left-1/4 text-5xl opacity-15">🌸</div>

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-soft/90 px-3.5 py-1 text-xs font-semibold text-emerald-deep shadow-2xs">
              <Sprout className="h-4 w-4" />
              مدرسة السفر الأهلية · بستان التجويد وسوق اللؤلؤ الكويتي
            </div>
            <h1 className="amiri text-3xl text-emerald-deep md:text-5xl">
              بستان النون الساكنة ومحارة اللؤلؤ
            </h1>
            <p className="max-w-2xl text-base text-ink/85 leading-relaxed">
              تُزرع شجيرات الشاي وأزهار الأقحوان وورود الجوري مع كل آية تُتقنينها. يمكنكِ بيع محاصيل البستان في سوق
              المحارة لكسب <strong>لآلئ مكنونة</strong>، وحين تبلغين <strong>٢٠ لؤلؤة</strong> تُصاغ لكِ قلادة{" "}
              <strong>طوق اللؤلؤ الكويتي الفاخر 📿</strong>!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <PrimaryButton onClick={handleWaterAll} className="gap-2">
              <Droplets className="h-4 w-4" />
              {waterEffect ? "جاري سقي البستان الندِي..." : "سقي البستان بالندى"}
            </PrimaryButton>
            <GhostButton onClick={onStartQuiz} className="gap-2">
              اكسبي بذوراً في التدريب
              <ArrowRight className="h-4 w-4" />
            </GhostButton>
          </div>
        </div>

        {/* 4 Metric counters */}
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-control border border-emerald/20 bg-paper/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">إجمالي الغراس والبذور</span>
              <span className="text-lg">🌱</span>
            </div>
            <p className="amiri mt-1 text-3xl font-bold text-emerald-deep">{garden.seedsCount}</p>
          </div>

          <div className="rounded-control border border-emerald/20 bg-paper/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">مزارع شاي الإدغام</span>
              <TeaPlantGraphic className="h-6 w-6" />
            </div>
            <p className="amiri mt-1 text-3xl font-bold text-emerald">{garden.teaLevel} شجيرات</p>
          </div>

          <div className="rounded-control border border-gold/30 bg-paper/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">أقحوان الإظهار الذهبي</span>
              <ChrysanthemumGraphic className="h-6 w-6" />
            </div>
            <p className="amiri mt-1 text-3xl font-bold text-gold">{garden.chrysanthemumLevel} زهرات</p>
          </div>

          <div className="rounded-control border border-clay/30 bg-paper/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">جوري الإقلاب والإخفاء</span>
              <DamaskRoseGraphic className="h-6 w-6" />
            </div>
            <p className="amiri mt-1 text-3xl font-bold text-clay">{garden.roseLevel} وردات</p>
          </div>
        </div>
      </section>

      {/* Kuwait Pearl & Oyster Economy Section */}
      <section className="rounded-card border-2 border-amber-300/80 bg-gradient-to-b from-[#fffbeb] via-[#fef3c7]/60 to-[#fde68a]/30 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Pearl inside Oyster shell illustration */}
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-start gap-4">
            <PearlShellGraphic className="h-32 w-32 shrink-0" pearlCount={garden.pearlsCount} glow />
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/80 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                <Coins className="h-3.5 w-3.5" />
                سوق المحارة الكويتي · بيع البستان باللؤلؤ
              </span>
              <h2 className="amiri text-2xl md:text-3xl font-bold text-ink mt-1">
                رصيدكِ الحالي: {garden.pearlsCount} لؤلؤة مكنونة 🦪
              </h2>
              <p className="text-xs text-muted max-w-md mt-1 leading-relaxed">
                بيعي محاصيل الشاي والأقحوان والجوري لكسب اللؤلؤ. كل ٢٠ لؤلؤة تُصاغ طوق لؤلؤ كويتي فاخر يُعلّق في لوحة
                شرفكِ المدرسية بمدرسة السفر!
              </p>
            </div>
          </div>

          {/* Pearl Necklace Progression & Actions */}
          <div className="w-full lg:w-96 rounded-control border border-amber-300 bg-paper/90 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-ink">التقدم نحو طوق اللؤلؤ (٢٠ لؤلؤة):</span>
              <span className="text-amber-700">{progressInCurrentNecklace} / 20</span>
            </div>

            {/* Progress bar */}
            <div className="h-3 w-full rounded-full bg-amber-100 overflow-hidden border border-amber-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                style={{ width: `${Math.min(100, (progressInCurrentNecklace / 20) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-muted text-start">
              {garden.pearlsCount >= 20 ? (
                <span className="font-bold text-emerald-deep">
                  ✨ لديكِ لآلئ كافية لصياغة طوق لؤلؤ كويتي فاخر الآن!
                </span>
              ) : (
                <span>بقي {neededForNextNecklace} لؤلؤة لصياغة طوق اللؤلؤ القادم.</span>
              )}
            </p>

            <div className="flex flex-col gap-2 pt-1">
              {garden.pearlsCount >= 20 ? (
                <button
                  type="button"
                  onClick={handleCraftNecklace}
                  className="w-full flex items-center justify-center gap-2 rounded-control bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-2.5 text-xs font-bold text-white shadow-md transition-all animate-pulse"
                >
                  <Award className="h-4 w-4" />
                  صياغة طوق اللؤلؤ الفاخر الآن (٢٠ لؤلؤة) 📿✨
                </button>
              ) : null}

              <button
                type="button"
                onClick={handleSellAllMature}
                className="w-full flex items-center justify-center gap-1.5 rounded-control border border-amber-300 bg-amber-100/60 hover:bg-amber-200/80 py-2 text-xs font-semibold text-amber-900 transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                بيع جميع المحاصيل اليانعة باللؤلؤ 🦪
              </button>
            </div>
          </div>
        </div>

        {/* Display completed Pearl Necklaces if any */}
        {garden.necklacesCount > 0 ? (
          <div className="mt-6 border-t border-amber-200 pt-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <PearlNecklaceGraphic className="h-28 w-28 shrink-0" emojis={garden.selectedEmojis} />
                <div>
                  <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                    📿 وسام طوق اللؤلؤ الكويتي المنجز ({garden.necklacesCount} أطواق)
                  </span>
                  <h3 className="amiri text-2xl font-bold text-emerald-deep mt-1">
                    طوق اللؤلؤ الطبيعي الفاخر · دانة السفر
                  </h3>
                  <p className="text-xs text-muted max-w-lg mt-0.5">
                    تتويج مستحق لعشرين لؤلؤة كسبتِها بإتقان التلاوة وضبط أحكام النون الساكنة والتنوين.
                  </p>
                </div>
              </div>

              {/* Emoji Customizer ("ويضيف ايموجي فقط") */}
              <div className="rounded-control border border-amber-300 bg-paper/90 p-3 text-center sm:text-start">
                <p className="text-[11px] font-bold text-ink mb-1.5">أضيفي إيموجي احتفالي يزين طوقكِ:</p>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {CELEBRATION_EMOJIS.map((emoji) => {
                    const active = garden.selectedEmojis.includes(emoji);
                    return (
                      <button
                        key={`garden-emoji-${emoji}`}
                        type="button"
                        onClick={() => handleToggleEmoji(emoji)}
                        className={`rounded-control px-2 py-1 text-sm transition-transform ${
                          active
                            ? "bg-amber-200 ring-2 ring-amber-500 scale-110"
                            : "bg-paper border border-line hover:bg-gold-soft"
                        }`}
                        title="إضافة إيموجي"
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Filter Tabs and Quick Planting */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5 rounded-control border border-line bg-paper p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-control px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "all" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            كل النباتات ({garden.plants.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("tea")}
            className={`rounded-control px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "tea" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            مزارع الشاي
          </button>
          <button
            type="button"
            onClick={() => setFilter("chrysanthemum")}
            className={`rounded-control px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "chrysanthemum" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            أزهار الأقحوان
          </button>
          <button
            type="button"
            onClick={() => setFilter("rose")}
            className={`rounded-control px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "rose" ? "bg-emerald text-on-emerald" : "text-muted hover:text-ink"
            }`}
          >
            ورود الجوري
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">ازرعي برعماً تجريبياً:</span>
          <button
            type="button"
            onClick={() => handleQuickPlant("tea")}
            className="rounded-control border border-emerald/30 bg-emerald-soft px-2.5 py-1 text-xs font-medium text-emerald-deep hover:bg-emerald/20"
          >
            + شاي
          </button>
          <button
            type="button"
            onClick={() => handleQuickPlant("chrysanthemum")}
            className="rounded-control border border-gold/30 bg-gold-soft px-2.5 py-1 text-xs font-medium text-gold hover:bg-gold/20"
          >
            + أقحوان
          </button>
          <button
            type="button"
            onClick={() => handleQuickPlant("rose")}
            className="rounded-control border border-clay/30 bg-clay-soft px-2.5 py-1 text-xs font-medium text-clay hover:bg-clay/20"
          >
            + جوري
          </button>
        </div>
      </div>

      {/* Grid of living plants in the garden */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredPlants.map((plant, pIdx) => {
          const isSelected = selectedPlant?.id === plant.id;
          const sellPrice = plant.level === 3 ? 4 : plant.level === 2 ? 2 : 1;
          return (
            <div
              key={`garden-plant-${plant.id}-${pIdx}`}
              className={`panel group flex flex-col items-center justify-between p-3.5 text-center transition-all hover:-translate-y-1 ${
                isSelected ? "border-emerald ring-2 ring-emerald/30 bg-emerald-soft/30" : "hover:border-emerald/40"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedPlant(plant)}
                className="w-full flex flex-col items-center"
              >
                <div className="relative mb-2 transition-transform group-hover:scale-105">
                  {plant.level === 1 ? (
                    <SeedGraphic className="h-16 w-16" />
                  ) : plant.level === 2 ? (
                    <SproutGraphic className="h-16 w-16" />
                  ) : plant.type === "tea" ? (
                    <TeaPlantGraphic className="h-16 w-16" />
                  ) : plant.type === "chrysanthemum" ? (
                    <ChrysanthemumGraphic className="h-16 w-16" />
                  ) : (
                    <DamaskRoseGraphic className="h-16 w-16" />
                  )}
                  {waterEffect ? (
                    <span className="absolute -top-1 -right-1 animate-ping text-xs text-sky-500">💧</span>
                  ) : null}
                </div>
                <p className="line-clamp-1 text-xs font-semibold text-ink">{plant.name}</p>
                <span className="mt-0.5 text-[11px] text-muted">{plant.ruleLinked}</span>
                <span
                  className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] ${
                    plant.level === 3
                      ? "bg-emerald-soft text-emerald-deep font-medium"
                      : plant.level === 2
                      ? "bg-gold-soft text-gold"
                      : "bg-paper text-muted border border-line"
                  }`}
                >
                  {plant.level === 3 ? "مزهرة يانعة" : plant.level === 2 ? "برعم ريان" : "بذرة في التربة"}
                </span>
              </button>

              {/* Direct Sell button for this plant */}
              <button
                type="button"
                onClick={() => handleSellPlant(plant.id)}
                className="mt-2.5 w-full flex items-center justify-center gap-1 rounded-control bg-amber-100/80 hover:bg-amber-200 px-2 py-1 text-[11px] font-bold text-amber-900 transition-colors"
                title="بيعي هذا المحصول لكسب لآلئ للمحارة"
              >
                <Coins className="h-3 w-3" />
                بيع (+{sellPrice} 🦪)
              </button>
            </div>
          );
        })}
      </section>

      {/* Inspection Modal / Details Drawer if a plant is selected */}
      {selectedPlant ? (
        <article className="rise panel border-emerald/30 bg-emerald-soft/20 p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-card border border-line bg-paper p-3 shadow-2xs">
                {selectedPlant.type === "tea" ? (
                  <TeaPlantGraphic className="h-14 w-14" />
                ) : selectedPlant.type === "chrysanthemum" ? (
                  <ChrysanthemumGraphic className="h-14 w-14" />
                ) : (
                  <DamaskRoseGraphic className="h-14 w-14" />
                )}
              </div>
              <div>
                <span className="text-xs font-medium text-gold">نبات بستان التجويد</span>
                <h3 className="amiri text-2xl text-emerald-deep">{selectedPlant.name}</h3>
                <p className="text-sm text-ink/85">
                  ارتبط غرسها بإتقان حكم: <span className="font-semibold text-emerald">{selectedPlant.ruleLinked}</span>
                </p>
                <p className="text-xs text-amber-800 font-semibold mt-1">
                  قيمة البيع في سوق المحارة: {selectedPlant.level === 3 ? "٤ لآلئ مكنونة" : selectedPlant.level === 2 ? "لؤلؤتان" : "لؤلؤة واحدة"} 🦪
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSellPlant(selectedPlant.id)}
                className="inline-flex items-center gap-1.5 rounded-control bg-amber-500 hover:bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs"
              >
                <Coins className="h-4 w-4" />
                بيع المحصول باللؤلؤ
              </button>
              <PrimaryButton onClick={onOpenMajlis} className="text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                تدربي على آية جديدة
              </PrimaryButton>
              <GhostButton onClick={() => setSelectedPlant(null)} className="text-xs">
                إغلاق
              </GhostButton>
            </div>
          </div>
        </article>
      ) : null}

      {/* Guide explanation of botanical symbolism */}
      <section className="grid gap-4 md:grid-cols-3">
        <article className="panel p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <TeaPlantGraphic className="h-8 w-8" />
            <h3 className="text-lg font-semibold text-emerald-deep">مزارع الشاي الخضراء</h3>
          </div>
          <p className="text-sm text-ink/85 leading-relaxed">
            ترمز للهدوء والرسوخ والتكرار الصبور. تُغرس مع كل إتقان لأحكام الإدغام بغنة والإدغام بغير غنة،
            حيث تمتد التلال الخضراء المدرجة لتشهد على صفاء التلاوة واستقرار النفس مع القرآن.
          </p>
        </article>

        <article className="panel p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <ChrysanthemumGraphic className="h-8 w-8" />
            <h3 className="text-lg font-semibold text-gold">أزهار الأقحوان الذهبية</h3>
          </div>
          <p className="text-sm text-ink/85 leading-relaxed">
            ترمز لوضوح النطق وجلاء الحروف كشمس الصباح. تُثمر مع كل إتقان لحكم الإظهار الحلقي الستة والإظهار المطلق
            في الكلمات الأربع (دنيا، بنيان، قنوان، صنوان) بدون غنة زائدة.
          </p>
        </article>

        <article className="panel p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <DamaskRoseGraphic className="h-8 w-8" />
            <h3 className="text-lg font-semibold text-clay">ورود الجوري الدمشقي</h3>
          </div>
          <p className="text-sm text-ink/85 leading-relaxed">
            ترمز لرقة الغنة العاطرة بمقدار حركتين. تتفتح مع إتقان حكم الإقلاب عند الباء (إطباق الشفتين بلطف دون كزّ)
            وأحكام الإخفاء الحقيقي الخمسة عشر مع تفخيم الغنة وترقيقها بحسب الحرف.
          </p>
        </article>
      </section>

      {/* Footer controls */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-clay"
        >
          <RotateCcw className="h-3 w-3" />
          إعادة تعيين بستان التجويد ورصيد اللؤلؤ
        </button>
      </div>
    </div>
  );
}
