export type PlantType = "tea" | "chrysanthemum" | "rose";

export type PlantItem = {
  id: string;
  type: PlantType;
  level: number; // 1: seed, 2: sprout, 3: blooming / lush
  name: string;
  ruleLinked: string;
  plantedAt: number;
};

export type GardenState = {
  seedsCount: number;
  plants: PlantItem[];
  teaLevel: number;
  chrysanthemumLevel: number;
  roseLevel: number;
  totalHarvests: number;
  pearlsCount: number; // عدد اللآلئ المجمعة داخل المحارة
  necklacesCount: number; // عدد أطواق اللؤلؤ المصنوعة (كل 20 لؤلؤة = طوق)
  selectedEmojis: string[]; // ملصقات الإيموجي الاحتفالية المختارة
};

const STORAGE_KEY = "alsafar-tajweed-pearl-garden-v2";

export const CELEBRATION_EMOJIS = [
  "🦪", // محارة
  "📿", // طوق لؤلؤ / مسباح
  "💎", // درة مكنونة
  "🇰🇼", // علم الكويت
  "🌸", // زهرة
  "🌿", // غصن نضير
  "🌟", // نجمة التميز
  "👑", // تاج الإتقان
  "✨", // بريق اللؤلؤ
  "🌺", // وردة جوري
];

const DEFAULT_GARDEN: GardenState = {
  seedsCount: 4,
  plants: [
    { id: "init-tea-1", type: "tea", level: 3, name: "شجيرة شاي الإدغام اليانعة", ruleLinked: "الإدغام بغنة", plantedAt: Date.now() - 3600000 },
    { id: "init-chrys-1", type: "chrysanthemum", level: 3, name: "أقحوانة الإظهار الذهبية", ruleLinked: "الإظهار الحلقي", plantedAt: Date.now() - 7200000 },
    { id: "init-rose-1", type: "rose", level: 3, name: "جوري الإقلاب العاطر", ruleLinked: "الإقلاب", plantedAt: Date.now() - 1800000 },
    { id: "init-sprout-1", type: "tea", level: 2, name: "برعم الإخفاء الندي", ruleLinked: "الإخفاء الحقيقي", plantedAt: Date.now() - 900000 },
  ],
  teaLevel: 3,
  chrysanthemumLevel: 3,
  roseLevel: 3,
  totalHarvests: 6,
  pearlsCount: 16, // يبدأ بـ 16 لؤلؤة حتى يسهل للطالبة والزائر تجربة بيع محصول وبلوغ الـ 20 لصياغة طوق اللؤلؤ
  necklacesCount: 0,
  selectedEmojis: ["🦪", "✨", "🇰🇼"],
};

export function loadGarden(): GardenState {
  if (typeof window === "undefined") return DEFAULT_GARDEN;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GARDEN;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.plants)) {
      return {
        ...DEFAULT_GARDEN,
        ...parsed,
        pearlsCount: typeof parsed.pearlsCount === "number" ? parsed.pearlsCount : 16,
        necklacesCount: typeof parsed.necklacesCount === "number" ? parsed.necklacesCount : 0,
        selectedEmojis: Array.isArray(parsed.selectedEmojis) && parsed.selectedEmojis.length > 0 ? parsed.selectedEmojis : ["🦪", "✨", "🇰🇼"],
      };
    }
  } catch (err) {
    console.error("Failed to load garden state:", err);
  }
  return DEFAULT_GARDEN;
}

export function saveGarden(state: GardenState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save garden state:", err);
  }
}

export function plantRewardSeed(
  type: PlantType = "rose",
  ruleName: string = "أحكام التجويد"
): { state: GardenState; newPlant: PlantItem; unlockedBloom: boolean; earnedPearls: number } {
  const current = loadGarden();
  const id = `plant-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  
  // Find if we already have plants of this type that can bloom
  let unlockedBloom = false;
  const existingSame = current.plants.filter((p) => p.type === type);
  const nextLevel = existingSame.length >= 2 ? 3 : 2;
  if (nextLevel === 3) unlockedBloom = true;

  const typeNames: Record<PlantType, string> = {
    tea: "شجيرة شاي يانعة",
    chrysanthemum: "زهرة أقحوان ذهبية",
    rose: "وردة جوري دمشقية",
  };

  const newPlant: PlantItem = {
    id,
    type,
    level: nextLevel,
    name: `${typeNames[type]} (${ruleName})`,
    ruleLinked: ruleName,
    plantedAt: Date.now(),
  };

  const updatedPlants = [newPlant, ...current.plants].slice(0, 24);
  const earnedPearls = 1; // كل غرس صحيح يمنح لؤلؤة إضافية

  const nextState: GardenState = {
    ...current,
    seedsCount: current.seedsCount + 1,
    plants: updatedPlants,
    pearlsCount: current.pearlsCount + earnedPearls,
    teaLevel: type === "tea" ? Math.min(10, current.teaLevel + 1) : current.teaLevel,
    chrysanthemumLevel: type === "chrysanthemum" ? Math.min(10, current.chrysanthemumLevel + 1) : current.chrysanthemumLevel,
    roseLevel: type === "rose" ? Math.min(10, current.roseLevel + 1) : current.roseLevel,
    totalHarvests: current.totalHarvests + 1,
  };

  saveGarden(nextState);
  return { state: nextState, newPlant, unlockedBloom, earnedPearls };
}

/**
 * بيع محصول النبتة مقابل لآلئ مكنونة داخل المحارة
 */
export function sellProduceForPearls(plantId: string): { state: GardenState; earned: number; soldPlantName: string } | null {
  const current = loadGarden();
  const target = current.plants.find((p) => p.id === plantId);
  if (!target) return null;

  // قيمة البيع باللآلئ تعتمد على نمو النبتة:
  // زهرة متفتحة (level 3) = 4 لآلئ
  // برعم (level 2) = 2 لؤلؤتان
  // بذرة (level 1) = 1 لؤلؤة
  const earned = target.level === 3 ? 4 : target.level === 2 ? 2 : 1;

  const updatedPlants = current.plants.filter((p) => p.id !== plantId);
  const nextState: GardenState = {
    ...current,
    plants: updatedPlants,
    pearlsCount: current.pearlsCount + earned,
    totalHarvests: current.totalHarvests + 1,
  };

  saveGarden(nextState);
  return { state: nextState, earned, soldPlantName: target.name };
}

/**
 * صياغة طوق لؤلؤ كويتي فاخر عند بلوغ 20 لؤلؤة
 */
export function craftPearlNecklace(): { state: GardenState; success: boolean } {
  const current = loadGarden();
  if (current.pearlsCount < 20) {
    return { state: current, success: false };
  }

  const nextState: GardenState = {
    ...current,
    pearlsCount: current.pearlsCount - 20,
    necklacesCount: current.necklacesCount + 1,
  };

  saveGarden(nextState);
  return { state: nextState, success: true };
}

/**
 * تبديل أو إضافة إيموجي احتفالي للطوق
 */
export function toggleCelebrationEmoji(emoji: string): GardenState {
  const current = loadGarden();
  const exists = current.selectedEmojis.includes(emoji);
  let updated: string[];
  if (exists) {
    if (current.selectedEmojis.length <= 1) return current; // أبقِ واحداً على الأقل
    updated = current.selectedEmojis.filter((e) => e !== emoji);
  } else {
    updated = [...current.selectedEmojis, emoji].slice(-6); // أقصى حد 6 إيموجيات
  }

  const nextState: GardenState = {
    ...current,
    selectedEmojis: updated,
  };

  saveGarden(nextState);
  return nextState;
}

/**
 * إضافة لآلئ تشجيعية من المعلمة
 */
export function addBonusPearls(amount: number, _reason: string): GardenState {
  const current = loadGarden();
  const nextState: GardenState = {
    ...current,
    pearlsCount: current.pearlsCount + amount,
  };
  saveGarden(nextState);
  return nextState;
}

export function resetGarden(): GardenState {
  saveGarden(DEFAULT_GARDEN);
  return DEFAULT_GARDEN;
}
