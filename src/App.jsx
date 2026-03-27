import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, HelpCircle, FlaskConical, ArrowRight, CheckCircle2, XCircle, RefreshCw, Beaker as BeakerIcon, ClipboardList, BookMarked, PenTool } from 'lucide-react';

// --- DATA & CONTENT ---
const indicatorsData = [
  {
    id: 'hco3_acid',
    labType: 'tube',
    organism: 'snail',
    name: { en: 'Hydrogencarbonate Indicator', zh: '碳酸氫鹽指示劑' },
    substance: { en: 'Carbon Dioxide (Respiration)', zh: '二氧化碳 (呼吸作用)' },
    action: { en: 'Respire', zh: '進行呼吸' },
    buttonText: { en: 'Add Snail', zh: '放入蝸牛' },
    originalColor: { en: 'Red', zh: '紅色', hex: '#ef4444', topHex: '#f87171' },
    finalColor: { en: 'Yellow', zh: '黃色', hex: '#eab308', topHex: '#fde047' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'CO₂ dissolves in water to form carbonic acid. The increase in acidity changes the indicator\'s colour to yellow.',
      zh: '二氧化碳溶於水形成碳酸。酸性增加使指示劑的顏色變成黃色。'
    },
    examEn: "When **carbon dioxide** is bubbled into the **hydrogencarbonate indicator**, its colour changes from **red** to **yellow**.",
    examZh: "當把 **二氧化碳** 吹入 **碳酸氫鹽指示劑** 時，其顏色會由 **紅色** 變成 **黃色**。"
  },
  {
    id: 'hco3_alkali',
    labType: 'tube',
    organism: 'plant',
    name: { en: 'Hydrogencarbonate Indicator', zh: '碳酸氫鹽指示劑' },
    substance: { en: 'Decrease in CO₂ (Photosynthesis)', zh: '二氧化碳減少 (光合作用)' },
    action: { en: 'Photosynthesize', zh: '進行光合' },
    buttonText: { en: 'Add Plant (Light)', zh: '放入水草照光' },
    originalColor: { en: 'Red', zh: '紅色', hex: '#ef4444', topHex: '#f87171' },
    finalColor: { en: 'Purple', zh: '紫色', hex: '#a855f7', topHex: '#c084fc' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'A decrease in CO₂ level makes the solution less acidic, changing the colour of the indicator to purple.',
      zh: '二氧化碳水平下降使溶液酸性減弱，指示劑的顏色會變成紫色。'
    },
    examEn: "When the level of **carbon dioxide decreases**, the colour of the **hydrogencarbonate indicator** changes from **red** to **purple**.",
    examZh: "當 **二氧化碳水平下降** 時，**碳酸氫鹽指示劑** 的顏色會由 **紅色** 變成 **紫色**。"
  },
  {
    id: 'limewater',
    labType: 'tube',
    organism: 'gas',
    name: { en: 'Limewater', zh: '石灰水' },
    substance: { en: 'Carbon Dioxide (CO₂)', zh: '二氧化碳' },
    action: { en: 'Bubble', zh: '吹入' },
    buttonText: { en: 'Bubble CO₂', zh: '吹入 CO₂' },
    originalColor: { en: 'Colourless', zh: '無色', hex: 'rgba(255,255,255,0.1)', topHex: 'rgba(255,255,255,0.2)' },
    finalColor: { en: 'Milky', zh: '奶白色', hex: '#fdfdfd', topHex: '#ffffff' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'CO₂ reacts with limewater to form insoluble calcium carbonate, which appears as a milky white precipitate.',
      zh: '二氧化碳與石灰水反應生成不溶於水的碳酸鈣，形成奶白色沉澱物。'
    },
    examEn: "When **carbon dioxide** is bubbled into **limewater**, the limewater **turns milky**.",
    examZh: "當把 **二氧化碳** 吹入 **石灰水** 時，石灰水會 **變成奶白色 / 變得渾濁**。"
  },
  {
    id: 'glowing_splint',
    labType: 'gas_tube',
    gasType: 'oxygen',
    name: { en: 'Glowing Splint', zh: '有餘燼的木條' },
    substance: { en: 'Oxygen gas (O₂)', zh: '氧氣' },
    action: { en: 'Insert', zh: '放入' },
    buttonText: { en: 'Test for O₂', zh: '測試氧氣' },
    originalColor: { en: 'Glowing Ember', zh: '有餘燼', hex: '#ea580c' },
    finalColor: { en: 'Relights (Flame)', zh: '重燃', hex: '#fde047' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Oxygen is a gas that supports combustion. It provides enough oxygen to rekindle the glowing splint into a flame.',
      zh: '氧氣是一種助燃的氣體。它提供足夠氧氣使有餘燼的木條重新燃燒。'
    },
    examEn: "When a **glowing splint** is placed at the mouth of a test tube of **oxygen gas**, the glowing splint **relights**.",
    examZh: "當把 **有餘燼的木條** 放在充滿 **氧氣** 的試管口時，木條會 **重燃**。"
  },
  {
    id: 'burning_splint',
    labType: 'gas_tube',
    gasType: 'hydrogen',
    name: { en: 'Burning Splint', zh: '燃燒中的木條' },
    substance: { en: 'Hydrogen gas (H₂)', zh: '氫氣' },
    action: { en: 'Insert', zh: '放入' },
    buttonText: { en: 'Test for H₂', zh: '測試氫氣' },
    originalColor: { en: 'Burning (Flame)', zh: '燃燒中', hex: '#fde047' },
    finalColor: { en: '"Pop" Sound', zh: '「啵」一聲', hex: '#94a3b8' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Hydrogen is a flammable gas. It burns explosively with oxygen in the air to produce water, creating a "pop" sound.',
      zh: '氫氣是易燃氣體。它與空氣中的氧氣產生爆炸性燃燒並生成水，發出「啵」一聲。'
    },
    examEn: "When a **burning splint** is placed at the mouth of a test tube of **hydrogen gas**, it burns with a **'pop' sound**.",
    examZh: "當把 **燃燒中的木條** 放在充滿 **氫氣** 的試管口時，氣體會發出 **「啵」一聲** 燃燒。"
  },
  {
    id: 'iodine',
    labType: 'spot',
    name: { en: 'Iodine Solution', zh: '碘液' },
    substance: { en: 'Starch', zh: '澱粉' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Starch', zh: '加入澱粉' },
    originalColor: { en: 'Brown', zh: '棕色', hex: '#d97706', topHex: '#f59e0b' },
    finalColor: { en: 'Blue-black', zh: '藍黑色', hex: '#1e1b4b', topHex: '#312e81' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Iodine solution is used to test for the presence of starch. The physical interaction turns the mixture dark blue-black.',
      zh: '碘液用於測試澱粉的存在。兩者的物理相互作用會令混合物變成深藍黑色。'
    },
    examEn: "When **iodine solution** is added to **starch**, the colour changes from **brown** to **blue-black**.",
    examZh: "當把 **碘液** 加入 **澱粉** 時，顏色會由 **棕色** 變成 **藍黑色**。"
  },
  {
    id: 'cobalt',
    labType: 'paper',
    name: { en: 'Dry Cobalt(II) Chloride Paper', zh: '乾氯化鈷(II)試紙' },
    substance: { en: 'Water', zh: '水' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Water', zh: '滴加水' },
    originalColor: { en: 'Blue', zh: '藍色', hex: '#3b82f6', topHex: '#60a5fa' },
    finalColor: { en: 'Pink', zh: '粉紅色', hex: '#ec4899', topHex: '#f472b6' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Dry cobalt(II) chloride paper is used to test for water. Binding with water changes its crystal structure to turn it pink.',
      zh: '乾氯化鈷(II)試紙用於測試水。與水結合會改變其晶體結構，使其變成粉紅色。'
    },
    examEn: "When **water** is added, it changes the colour of **dry cobalt(II) chloride paper** from **blue** to **pink**.",
    examZh: "當加入 **水** 時，**乾氯化鈷(II)試紙** 的顏色會由 **藍色** 變成 **粉紅色**。"
  },
  {
    id: 'blue_litmus',
    labType: 'paper',
    name: { en: 'Blue Litmus Paper', zh: '藍色石蕊試紙' },
    substance: { en: 'Acid', zh: '酸' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Acid', zh: '加入酸' },
    originalColor: { en: 'Blue', zh: '藍色', hex: '#3b82f6', topHex: '#60a5fa' },
    finalColor: { en: 'Red', zh: '紅色', hex: '#ef4444', topHex: '#f87171' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Litmus paper is a simple acid-alkali indicator. An acid turns blue litmus paper red.',
      zh: '石蕊試紙是一種簡單的酸鹼指示劑。酸會令藍色石蕊試紙變成紅色。'
    },
    examEn: "An **acid** turns **blue litmus paper** **red**.",
    examZh: "**酸** 會令 **藍色石蕊試紙** 變成 **紅色**。"
  },
  {
    id: 'red_litmus',
    labType: 'paper',
    name: { en: 'Red Litmus Paper', zh: '紅色石蕊試紙' },
    substance: { en: 'Alkali', zh: '鹼' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Alkali', zh: '加入鹼' },
    originalColor: { en: 'Red', zh: '紅色', hex: '#ef4444', topHex: '#f87171' },
    finalColor: { en: 'Blue', zh: '藍色', hex: '#3b82f6', topHex: '#60a5fa' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Litmus paper is a simple acid-alkali indicator. An alkali turns red litmus paper blue.',
      zh: '石蕊試紙是一種簡單的酸鹼指示劑。鹼會令紅色石蕊試紙變成藍色。'
    },
    examEn: "An **alkali** turns **red litmus paper** **blue**.",
    examZh: "**鹼** 會令 **紅色石蕊試紙** 變成 **藍色**。"
  },
  {
    id: 'universal_acid',
    labType: 'beaker',
    name: { en: 'Universal Indicator', zh: '通用指示劑' },
    substance: { en: 'Acid', zh: '酸' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Acid', zh: '加入酸' },
    originalColor: { en: 'Green', zh: '綠色', hex: '#22c55e', topHex: '#4ade80' },
    finalColor: { en: 'Red / Orange', zh: '紅色/橙色', hex: '#ea580c', topHex: '#f97316' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Acids have a pH lower than 7. Universal indicator turns warm colours (red, orange, or yellow) in acidic solutions.',
      zh: '酸的pH值低於7。通用指示劑在酸性溶液中會呈現暖色（紅色、橙色或黃色）。'
    },
    examEn: "An **acid** changes the colour of **universal indicator** from **green** to **red, orange or yellow**.",
    examZh: "**酸** 會令 **通用指示劑** 的顏色由 **綠色** 變成 **紅色、橙色或黃色**。"
  },
  {
    id: 'universal_alkali',
    labType: 'beaker',
    name: { en: 'Universal Indicator', zh: '通用指示劑' },
    substance: { en: 'Alkali', zh: '鹼' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Alkali', zh: '加入鹼' },
    originalColor: { en: 'Green', zh: '綠色', hex: '#22c55e', topHex: '#4ade80' },
    finalColor: { en: 'Blue / Purple', zh: '藍色/紫色', hex: '#6366f1', topHex: '#818cf8' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'Alkalis have a pH higher than 7. Universal indicator turns cool colours (blue or purple) in alkaline solutions.',
      zh: '鹼的pH值高於7。通用指示劑在鹼性溶液中會呈現冷色（藍色或紫色）。'
    },
    examEn: "An **alkali** changes the colour of **universal indicator** from **green** to **blue or purple**.",
    examZh: "**鹼** 會令 **通用指示劑** 的顏色由 **綠色** 變成 **藍色或紫色**。"
  },
  {
    id: 'phpaper_acid',
    labType: 'paper',
    name: { en: 'pH Paper', zh: 'pH 試紙' },
    substance: { en: 'Acid', zh: '酸' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Acid', zh: '加入酸' },
    originalColor: { en: 'Yellow', zh: '黃色', hex: '#fde047', topHex: '#fef08a' },
    finalColor: { en: 'Red', zh: '紅色', hex: '#ef4444', topHex: '#f87171' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'pH paper contains a mixture of indicators. It turns red, orange or yellow to indicate the presence of an acid (pH < 7).',
      zh: 'pH試紙含有混合指示劑。它變成紅色、橙色或黃色以顯示酸的存在（pH < 7）。'
    },
    examEn: "When an **acid** is added, the colour of the **pH paper** changes to **red, orange or yellow**.",
    examZh: "當加入 **酸** 時，**pH 試紙** 的顏色會變成 **紅色、橙色或黃色**。"
  },
  {
    id: 'phpaper_alkali',
    labType: 'paper',
    name: { en: 'pH Paper', zh: 'pH 試紙' },
    substance: { en: 'Alkali', zh: '鹼' },
    action: { en: 'Add', zh: '加入' },
    buttonText: { en: 'Add Alkali', zh: '加入鹼' },
    originalColor: { en: 'Yellow', zh: '黃色', hex: '#fde047', topHex: '#fef08a' },
    finalColor: { en: 'Dark Blue', zh: '深藍色', hex: '#1e3a8a', topHex: '#1e40af' },
    dropColor: 'rgba(255,255,255,0.4)',
    explanation: {
      en: 'pH paper contains a mixture of indicators. It turns blue or purple to indicate the presence of an alkali (pH > 7).',
      zh: 'pH試紙含有混合指示劑。它變成藍色或紫色以顯示鹼的存在（pH > 7）。'
    },
    examEn: "When an **alkali** is added, the colour of the **pH paper** changes to **blue or purple**.",
    examZh: "當加入 **鹼** 時，**pH 試紙** 的顏色會變成 **藍色或紫色**。"
  }
];

// --- VIRTUAL LAB GROUPING LOGIC ---
const labGroups = [
  {
    id: 'hco3',
    name: { en: 'Hydrogencarbonate Indicator', zh: '碳酸氫鹽指示劑' },
    labType: 'tube',
    tests: indicatorsData.filter(i => i.id.startsWith('hco3'))
  },
  {
    id: 'limewater',
    name: { en: 'Limewater', zh: '石灰水' },
    labType: 'tube',
    tests: indicatorsData.filter(i => i.id === 'limewater')
  },
  {
    id: 'glowing_splint',
    name: { en: 'Glowing Splint Test', zh: '有餘燼的木條測試' },
    labType: 'gas_tube',
    tests: indicatorsData.filter(i => i.id === 'glowing_splint')
  },
  {
    id: 'burning_splint',
    name: { en: 'Burning Splint Test', zh: '燃燒中的木條測試' },
    labType: 'gas_tube',
    tests: indicatorsData.filter(i => i.id === 'burning_splint')
  },
  {
    id: 'iodine',
    name: { en: 'Iodine Solution', zh: '碘液' },
    labType: 'spot',
    tests: indicatorsData.filter(i => i.id === 'iodine')
  },
  {
    id: 'cobalt',
    name: { en: 'Cobalt(II) Chloride Paper', zh: '氯化鈷(II)試紙' },
    labType: 'paper',
    tests: indicatorsData.filter(i => i.id === 'cobalt')
  },
  {
    id: 'blue_litmus',
    name: { en: 'Blue Litmus Paper', zh: '藍色石蕊試紙' },
    labType: 'paper',
    tests: indicatorsData.filter(i => i.id === 'blue_litmus')
  },
  {
    id: 'red_litmus',
    name: { en: 'Red Litmus Paper', zh: '紅色石蕊試紙' },
    labType: 'paper',
    tests: indicatorsData.filter(i => i.id === 'red_litmus')
  },
  {
    id: 'universal',
    name: { en: 'Universal Indicator', zh: '通用指示劑' },
    labType: 'beaker',
    tests: indicatorsData.filter(i => i.id.startsWith('universal'))
  },
  {
    id: 'phpaper',
    name: { en: 'pH Paper', zh: 'pH 試紙' },
    labType: 'paper',
    tests: indicatorsData.filter(i => i.id.startsWith('phpaper'))
  }
];

const ParseSentence = ({ text }) => {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className="font-bold text-blue-700 border-b border-blue-200">{part.slice(2, -2)}</span>;
    }
    return <span key={i} className="text-slate-800">{part}</span>;
  });
};

const playPopSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1200;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.5, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.01);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start(ctx.currentTime);
    osc.start(ctx.currentTime);

    noise.stop(ctx.currentTime + 0.15);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('lab');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes rise-wobble {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-75px) translateX(-5px) scale(1.2); opacity: 0.5; }
          100% { transform: translateY(-150px) translateX(5px) scale(1.5); opacity: 0; }
        }
        @keyframes flame-flicker {
          0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          50% { transform: scale(1.1) rotate(2deg); opacity: 1; }
        }
        @keyframes squeeze {
          0% { transform: scaleY(1); }
          30% { transform: scaleY(0.7) translateY(5px); }
          60% { transform: scaleY(0.7) translateY(5px); }
          100% { transform: scaleY(1); }
        }
        @keyframes fall-beaker {
          0%, 30% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(80px) scale(0.9); opacity: 1; }
          81%, 100% { opacity: 0; }
        }
        @keyframes fall-spot {
          0%, 30% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(40px) scale(0.9); opacity: 1; }
          81%, 100% { opacity: 0; }
        }
        @keyframes fall-paper {
          0%, 30% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(60px) scale(0.9); opacity: 1; }
          81%, 100% { opacity: 0; }
        }
        @keyframes diffuse {
          0%, 79% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(20); opacity: 0; }
        }
        @keyframes flash {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scale(0.5); opacity: 0.8; }
          100% { transform: translateY(-50px) scale(2); opacity: 0; }
        }
      `}</style>

      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <FlaskConical className="text-blue-600 h-6 w-6 sm:h-8 sm:w-8" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Science Tests 🧪</h1>
              <p className="text-[10px] sm:text-xs text-slate-500">Master your science indicators!</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8 overflow-hidden">
        <div className="flex space-x-1 sm:space-x-2 mb-6 sm:mb-8 bg-slate-200/50 p-1 sm:p-1.5 rounded-xl text-xs sm:text-base">
          <button onClick={() => setActiveTab('revision')} className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium transition-all ${activeTab === 'revision' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Study Mode</span><span className="sm:hidden">Study</span>
          </button>
          <button onClick={() => setActiveTab('lab')} className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium transition-all ${activeTab === 'lab' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
            <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Virtual Lab</span><span className="sm:hidden">Lab</span>
          </button>
          <button onClick={() => setActiveTab('quiz')} className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium transition-all ${activeTab === 'quiz' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Quiz Mode</span><span className="sm:hidden">Quiz</span>
          </button>
        </div>

        {activeTab === 'revision' && <RevisionView />}
        {activeTab === 'lab' && <VirtualLabView />}
        {activeTab === 'quiz' && <QuizView />}
      </main>
    </div>
  );
}

// --- VIRTUAL LAB MODE ---
function VirtualLabView() {
  const [activeGroupId, setActiveGroupId] = useState(labGroups[0].id);
  const [activeTest, setActiveTest] = useState(null);
  const [isReacted, setIsReacted] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const timerRef = useRef(null);

  const activeGroup = labGroups.find(g => g.id === activeGroupId);

  useEffect(() => {
    setIsReacted(false);
    setIsReacting(false);
    setActiveTest(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [activeGroupId]);

  const runExperiment = (test) => {
    if (isReacting) return;
    setActiveTest(test);
    setIsReacted(false);
    setIsReacting(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsReacted(true);
      setIsReacting(false);

      if (test.id === 'burning_splint') {
        playPopSound();
      }
    }, 1200);
  };

  const resetExperiment = () => {
    setIsReacted(false);
    setIsReacting(false);
    setActiveTest(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const displayTest = activeTest || activeGroup.tests[0];
  const currentColor = isReacted ? displayTest.finalColor.hex : (activeTest ? activeTest.originalColor.hex : activeGroup.tests[0].originalColor.hex);
  const currentTopColor = isReacted ? displayTest.finalColor.topHex : (activeTest ? activeTest.originalColor.topHex : activeGroup.tests[0].originalColor.topHex);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">

      {/* Sidebar */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-2 sm:gap-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 px-2 flex items-center gap-2">
          <BeakerIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
          Lab Bench <span className="text-xs sm:text-sm font-normal text-slate-500">(實驗桌)</span>
        </h2>
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:max-h-[600px] snap-x scrollbar-hide px-1">
          {labGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className={`flex-shrink-0 w-48 sm:w-56 lg:w-full text-left p-3 sm:p-4 rounded-xl transition-all flex flex-col snap-center border-2 ${activeGroupId === group.id ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white lg:bg-transparent border-slate-200 hover:bg-slate-50'}`}
            >
              <span className={`font-bold text-sm sm:text-base block truncate ${activeGroupId === group.id ? 'text-blue-800' : 'text-slate-700'}`}>
                {group.name.en}
              </span>
              <span className={`text-[10px] sm:text-xs block mt-1 truncate ${activeGroupId === group.id ? 'text-blue-600' : 'text-slate-500'}`}>
                {group.name.zh}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Bench */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full">
        <div className="bg-slate-800 rounded-2xl sm:rounded-3xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden relative min-h-[450px] sm:min-h-[500px] flex flex-col p-4 sm:p-6 border-[6px] border-slate-700 w-full">

          <div className="flex justify-between items-start w-full z-20 gap-2 relative">
            <div className="bg-slate-900/60 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-600 shadow-lg shrink min-w-0">
              <h3 className="text-white font-bold tracking-wider text-xs sm:text-base truncate">{activeGroup.name.en}</h3>
            </div>

            <div className="flex flex-col gap-2 items-end shrink-0">
              {!isReacted && !isReacting ? (
                activeGroup.tests.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => runExperiment(test)}
                    className="px-3 sm:px-6 py-2 sm:py-3 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all active:scale-95 shadow-lg border-b-4 border-blue-800 text-xs sm:text-base"
                  >
                    <span className="flex flex-col items-center">
                      <span>{test.buttonText.en}</span>
                      <span className="text-[10px] font-normal opacity-80 mt-0.5">({test.buttonText.zh})</span>
                    </span>
                  </button>
                ))
              ) : (
                <button
                  onClick={resetExperiment}
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-bold text-slate-200 bg-slate-600 rounded-xl hover:bg-slate-500 transition-all active:scale-95 shadow-lg border-b-4 border-slate-800 text-xs sm:text-base"
                >
                  <RefreshCw className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Reset Bench</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center w-full justify-center mt-4">
            <LabApparatus type={activeGroup.labType} color={currentColor} topColor={currentTopColor} isReacting={isReacting} isReacted={isReacted} activeTest={displayTest} />
          </div>

          <div className="w-full flex items-center justify-center mt-auto z-30 pt-4">
             <div className="flex items-center justify-center gap-2 sm:gap-3 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-slate-600 shadow-2xl">
                <span className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-inner border border-white/40 flex-shrink-0`} style={{ backgroundColor: currentColor }}></span>
                <span className="text-white font-bold tracking-wide text-xs sm:text-base">
                  {isReacted ? displayTest.finalColor.en : displayTest.originalColor.en}
                </span>
             </div>
          </div>
        </div>

        <div className={`grid transition-all duration-500 ease-in-out ${isReacted && activeTest ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
          <div className="overflow-hidden">
            <div className="bg-yellow-50/90 backdrop-blur-sm rounded-2xl shadow-sm border border-yellow-300 p-5 sm:p-6 relative mt-2 sm:mt-4 mb-2">
              <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 bg-yellow-300 text-yellow-900 px-3 sm:px-4 py-1 rounded-full font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 sm:gap-2 border border-yellow-400">
                <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4" />
                Teacher's Notes (老師筆記)
              </div>
              <p className="text-slate-800 text-sm sm:text-lg leading-relaxed mt-2 font-medium">{activeTest?.explanation.en}</p>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed mt-2 sm:mt-3 border-t border-yellow-300/60 pt-2 sm:pt-3">{activeTest?.explanation.zh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- REALISTIC APPARATUS COMPONENTS ---
function LabApparatus({ type, color, topColor, isReacting, isReacted, activeTest }) {
  const displayColor = (activeTest?.id === 'limewater' || (!activeTest && type === 'tube' && color === 'rgba(255,255,255,0.1)')) && !isReacted ? 'rgba(255,255,255,0.15)' : color;
  const displayTopColor = (activeTest?.id === 'limewater' || (!activeTest && type === 'tube')) && !isReacted ? 'rgba(255,255,255,0.25)' : topColor;

  const Pipette = ({ activeTop, fallAnim }) => (
    <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-40 transition-all duration-700 ease-in-out
      ${isReacting ? activeTop : 'top-[-200px] opacity-0'}
    `}>
      <div className={`w-8 h-12 sm:w-10 sm:h-14 bg-red-600 rounded-t-full rounded-b-lg border-2 border-red-800 shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.5)] z-10 transition-transform duration-300 ${isReacting ? 'animate-[squeeze_1.2s_ease-in-out]' : ''}`}>
         <div className="absolute top-2 right-2 w-2 h-6 bg-white/40 rounded-full blur-[1px]"></div>
      </div>
      <div className="w-2 sm:w-3 h-12 sm:h-16 bg-gradient-to-r from-white/40 via-white/10 to-white/40 border-x border-b border-white/60 rounded-b-md backdrop-blur-sm -mt-2 flex flex-col items-center justify-around py-2">
         <div className="w-full h-[1px] bg-white/60"></div>
         <div className="w-full h-[1px] bg-white/60"></div>
      </div>

      <div className={`absolute w-3 h-4 rounded-full shadow-sm bottom-[-10px]
        ${isReacting ? fallAnim : 'opacity-0'}
      `} style={{backgroundColor: activeTest?.dropColor || 'rgba(255,255,255,0.4)'}}></div>
    </div>
  );

  if (type === 'beaker') {
    return (
      <div className="relative w-40 h-48 sm:w-48 sm:h-56 flex items-end justify-center mb-8 scale-90 sm:scale-100">
        <Pipette activeTop="top-[-100px] sm:top-[-110px]" fallAnim="animate-[fall-beaker_1.2s_ease-in_forwards]" />
        <div className="relative w-full h-full rounded-b-3xl border-x-[4px] border-b-[4px] border-white/40 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm shadow-[inset_0_-10px_20px_rgba(255,255,255,0.2),0_10px_15px_rgba(0,0,0,0.3)] flex items-end overflow-hidden z-20">
          <div className="absolute top-2 left-3 w-3 h-3/4 bg-white/20 rounded-full blur-[2px]"></div>

          <div className="absolute left-0 bottom-8 w-4 h-[2px] bg-white/50"></div>
          <div className="absolute left-0 bottom-16 w-8 h-[2px] bg-white/50 text-[10px] text-white/70 font-bold flex items-center pl-10">50</div>
          <div className="absolute left-0 bottom-24 w-4 h-[2px] bg-white/50"></div>
          <div className="absolute left-0 bottom-32 w-8 h-[2px] bg-white/50 text-[10px] text-white/70 font-bold flex items-center pl-10">100</div>

          <div className="relative w-full transition-colors duration-1000 ease-in-out" style={{ height: '60%', backgroundColor: displayColor }}>
             <div className="absolute top-0 left-0 w-full h-6 rounded-[50%] -translate-y-1/2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]" style={{backgroundColor: displayTopColor}}></div>
             {isReacting && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-white/50 animate-[diffuse_1.2s_ease-out_forwards]"></div>}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'spot') {
    return (
      <div className="relative w-64 h-40 sm:w-80 sm:h-56 flex items-center justify-center mb-8 perspective-1000 scale-90 sm:scale-100">
        <Pipette activeTop="top-[-40px] sm:top-[-60px]" fallAnim="animate-[fall-spot_1.2s_ease-in_forwards]" />
        <div className="relative w-full h-full bg-slate-100 rounded-xl shadow-[0_15px_25px_rgba(0,0,0,0.5),inset_0_2px_5px_white] border-b-8 border-r-4 border-slate-300 flex items-center justify-center transform rotateX-[15deg] z-20 p-4">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-full bg-slate-200 shadow-[inset_0_5px_15px_rgba(0,0,0,0.3),0_2px_2px_white] flex items-center justify-center overflow-hidden w-12 h-12 sm:w-16 sm:h-16 mx-auto">
                 {i === 4 ? (
                   <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-colors duration-1000 ease-in-out shadow-[inset_0_-2px_6px_rgba(255,255,255,0.5)] relative" style={{ backgroundColor: displayColor }}>
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 bg-white/40 rounded-full blur-[1px]"></div>
                   </div>
                 ) : (
                   <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-[inset_0_-2px_6px_rgba(255,255,255,0.2)]"></div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'paper') {
    return (
      <div className="relative w-full h-56 sm:h-64 flex flex-col items-center justify-center mb-8 scale-90 sm:scale-100">
        <Pipette activeTop="top-[-80px] sm:top-[-100px]" fallAnim="animate-[fall-paper_1.2s_ease-in_forwards]" />
        <div className="relative w-20 h-40 sm:w-24 sm:h-48 rounded shadow-[2px_5px_15px_rgba(0,0,0,0.3)] transition-colors duration-1000 ease-in-out z-20 border border-black/10 flex items-center justify-center overflow-hidden" style={{ backgroundColor: displayColor }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
          <div className={`w-full bg-black/10 rounded filter blur-md transition-all duration-1000 ease-out ${isReacting || isReacted ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>
        </div>
      </div>
    );
  }

  if (type === 'gas_tube') {
    return (
      <div className="relative w-28 h-56 sm:w-32 sm:h-64 flex items-end justify-center mb-8 scale-90 sm:scale-100">

         {/* Hovering Splint */}
         <div className={`absolute w-3 sm:w-4 bg-[#c19a6b] rounded-t-sm shadow-xl transition-all duration-700 ease-in-out z-30 flex flex-col items-center border-l-2 border-[#8b5a2b] h-32 sm:h-40
            ${!isReacting && !isReacted ? '-top-20 sm:-top-24 translate-x-20 sm:translate-x-24 rotate-[30deg] opacity-100 scale-100' : '-top-[3.5rem] sm:-top-[4rem] translate-x-0 rotate-0 opacity-100 scale-100 delay-300'}
         `}>
            <div className="absolute -bottom-4 w-12 h-16 flex flex-col items-center justify-end z-40">
               {activeTest?.gasType === 'oxygen' && !isReacted && (
                 <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full blur-[2px] animate-[flame-flicker_1s_infinite_alternate] shadow-[0_0_15px_orange]"></div>
               )}

               {((activeTest?.gasType === 'oxygen' && isReacted) || (activeTest?.gasType === 'hydrogen' && !isReacted)) && (
                 <div className="relative w-5 h-10 sm:w-6 sm:h-12 origin-bottom animate-[flame-flicker_0.3s_infinite_alternate]">
                   <div className="absolute bottom-0 w-full h-[80%] bg-orange-500 rounded-b-full rounded-t-[50%] blur-[2px] shadow-[0_0_20px_orange]"></div>
                   <div className="absolute bottom-0 left-1 w-[60%] h-[70%] bg-yellow-300 rounded-b-full rounded-t-[50%] blur-[1px]"></div>
                   <div className="absolute bottom-0 left-1.5 w-[30%] h-[40%] bg-white rounded-b-full rounded-t-[50%]"></div>
                 </div>
               )}

               {activeTest?.gasType === 'hydrogen' && isReacted && (
                 <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full blur-xl opacity-0 animate-[flash_0.5s_ease-out]"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-400 rounded-full blur-md opacity-80 animate-[smoke_2s_ease-out_forwards]"></div>
                 </div>
               )}
            </div>
         </div>

         {/* Rubber Stopper */}
         <div className={`absolute w-24 h-10 sm:w-28 sm:h-12 bg-gray-800 rounded-t-xl rounded-b-md transition-all duration-500 ease-out z-20
            ${isReacting || isReacted ? '-top-10 sm:-top-12 translate-x-24 sm:translate-x-32 rotate-[70deg] opacity-100' : '-top-4 sm:-top-5 translate-x-0 rotate-0 opacity-100'}`}
            style={{ boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.6), inset 2px 2px 5px rgba(255,255,255,0.2)' }}
         >
         </div>

         {/* The Glass Tube */}
         <div className="relative w-full h-full border-x-[4px] sm:border-x-[5px] border-b-[4px] sm:border-b-[5px] border-white/40 rounded-b-[40px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm shadow-[inset_0_-10px_20px_rgba(255,255,255,0.2),0_10px_15px_rgba(0,0,0,0.3)] z-10 flex flex-col items-center justify-end overflow-hidden pb-4">
            <div className="absolute top-2 left-2 w-1.5 sm:w-2 h-3/4 bg-white/20 rounded-full blur-[2px]"></div>
            <span className="text-white/40 font-bold tracking-widest text-lg sm:text-xl absolute top-1/2">GAS</span>
         </div>
      </div>
    );
  }

  if (type === 'tube') {
    return (
      <div className="relative w-28 h-56 sm:w-32 sm:h-64 flex items-end justify-center mb-8 scale-90 sm:scale-100">

        {/* Blowing Straw for CO2 */}
        {activeTest?.organism === 'gas' && (
           <div className={`absolute left-1/2 -translate-x-1/2 w-2 sm:w-3 bg-gradient-to-r from-slate-300 via-white to-slate-300 border-x border-slate-400 rounded-b-full z-10 transition-all duration-1000 ease-in-out
              ${isReacting || isReacted ? 'top-[-20px] sm:top-[-30px] h-[240px] sm:h-[280px] opacity-100' : 'top-[-150px] sm:top-[-200px] h-[240px] sm:h-[280px] opacity-0'}
           `}></div>
        )}

        {(activeTest?.organism === 'plant' && (isReacting || isReacted)) && (
           <div className="absolute -left-12 sm:-left-16 bottom-0 text-5xl sm:text-6xl animate-in fade-in z-20 drop-shadow-md">🌿</div>
        )}
        {(activeTest?.organism === 'snail' && (isReacting || isReacted)) && (
           <div className="absolute -left-12 sm:-left-16 bottom-0 text-4xl sm:text-5xl animate-in fade-in z-20 drop-shadow-md">🐌</div>
        )}
        {(activeTest?.organism === 'plant' && (isReacting || isReacted)) && (
           <div className="absolute -top-4 -right-10 sm:-right-12 text-4xl sm:text-5xl animate-in fade-in zoom-in duration-1000 drop-shadow-lg z-20">☀️</div>
        )}

        {/* The Indicator Test Tube */}
        <div className="relative w-full h-full rounded-b-[40px] border-x-[4px] sm:border-x-[5px] border-b-[4px] sm:border-b-[5px] border-white/40 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm shadow-[inset_0_-10px_20px_rgba(255,255,255,0.2),0_10px_15px_rgba(0,0,0,0.3)] flex items-end overflow-hidden z-20">
          <div className="absolute top-2 left-1.5 w-1.5 sm:w-2 h-3/4 bg-white/20 rounded-full blur-[1px]"></div>

          <div className="relative w-full transition-colors duration-1000 ease-in-out flex flex-col items-center justify-end pb-2" style={{ height: '65%', backgroundColor: displayColor }}>
             <div className="absolute top-0 left-0 w-full h-3 sm:h-4 rounded-[50%] -translate-y-1/2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]" style={{backgroundColor: displayTopColor}}></div>

             {isReacting && (
               <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-end z-30">
                  <div className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/80 animate-[rise-wobble_1s_infinite_ease-in]"></div>
                  <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/80 animate-[rise-wobble_1.2s_infinite_ease-in_0.2s] ml-4 sm:ml-6"></div>
                  <div className="absolute w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-white/70 animate-[rise-wobble_0.8s_infinite_ease-in_0.4s] -ml-4 sm:-ml-6"></div>
                  <div className="absolute w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white/90 animate-[rise-wobble_0.9s_infinite_ease-in_0.6s] ml-2 sm:ml-3"></div>
                  <div className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/70 animate-[rise-wobble_1.1s_infinite_ease-in_0.8s] -ml-2 sm:-ml-3"></div>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// --- QUIZ AND REVISION MODE ---

function RevisionView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {indicatorsData.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex h-20 sm:h-24 w-full relative">
            <div className={`flex-1 flex flex-col items-center justify-center font-semibold text-shadow-sm text-sm sm:text-base ${['limewater'].includes(item.id) ? 'text-slate-700' : 'text-white/90'}`} style={{ backgroundColor: item.originalColor.hex }}>
              <span className={`text-center px-1 ${['limewater'].includes(item.id) ? 'bg-white/60 rounded-full px-2 py-0.5 mt-1' : ''}`}>{item.originalColor.en}</span>
              <span className="text-[10px] sm:text-xs opacity-80">{item.originalColor.zh}</span>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-1.5 shadow-md z-10">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            </div>
            <div className={`flex-1 flex flex-col items-center justify-center font-semibold text-shadow-sm text-sm sm:text-base ${['limewater', 'burning_splint'].includes(item.id) ? 'text-slate-700' : 'text-white/90'}`} style={{ backgroundColor: item.finalColor.hex }}>
              <span className={`text-center px-1 ${['limewater', 'burning_splint'].includes(item.id) ? 'bg-black/10 rounded-full px-2 py-0.5 mt-1' : ''}`}>{item.finalColor.en}</span>
              <span className="text-[10px] sm:text-xs opacity-80">{item.finalColor.zh}</span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">{item.name.en}</h3>
            <p className="text-xs sm:text-sm font-medium text-blue-600 mb-3 sm:mb-4 bg-blue-50 inline-block px-3 py-1 rounded-full">
              Tests for: {item.substance.en}
            </p>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-3">
              <p className="text-[10px] sm:text-xs font-bold text-amber-800 flex items-center gap-1 mb-1"><PenTool className="w-3 h-3" /> Exam Sentence (答題句型)</p>
              <p className="text-xs sm:text-sm font-medium text-slate-800 mb-1"><ParseSentence text={item.examEn} /></p>
              <p className="text-[10px] sm:text-xs text-slate-600 border-t border-amber-200/50 pt-1 mt-1"><ParseSentence text={item.examZh} /></p>
            </div>

            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Principle</p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-1">{item.explanation.en}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{item.explanation.zh}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuizView() {
  const [quizState, setQuizState] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const generateQuestions = () => {
    const shuffled = [...indicatorsData].sort(() => 0.5 - Math.random()).slice(0, 5);
    const generatedQs = shuffled.map(indicator => {
      const allFinalColors = Array.from(new Set(indicatorsData.map(i => JSON.stringify(i.finalColor)))).map(str => JSON.parse(str));
      let options = allFinalColors.filter(c => c.en !== indicator.finalColor.en).sort(() => 0.5 - Math.random()).slice(0, 3);
      options.push(indicator.finalColor);
      options = options.sort(() => 0.5 - Math.random());
      return { indicator, options, correctAnswer: indicator.finalColor };
    });
    setQuestions(generatedQs);
    setQuizState('playing');
    setCurrentQIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option.en === questions[currentQIndex].correctAnswer.en) setScore(score + 1);
  };

  if (quizState === 'start') {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 text-center max-w-xl mx-auto mt-4 sm:mt-8">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 border-blue-100">
          <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1 sm:mb-2">Lab Quiz</h2>
        <p className="text-slate-500 font-medium mb-6 sm:mb-8 text-xs sm:text-base">測驗模式</p>
        <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-lg">Test your memory! Predict the final observation.<br/><span className="text-[10px] sm:text-sm text-slate-500 block mt-1 sm:mt-2">(測試你的記憶力！預測不同物質測試後的最終觀察結果。)</span></p>
        <button onClick={generateQuestions} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-base sm:text-lg w-full sm:w-auto">Start Quiz <span className="text-blue-200 text-xs sm:text-sm ml-1 sm:ml-2 font-normal">(開始測驗)</span></button>
      </div>
    );
  }

  if (quizState === 'end') {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 text-center max-w-xl mx-auto mt-4 sm:mt-8">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 bg-green-50 border-4 border-green-100"><span className="text-4xl sm:text-5xl">🏆</span></div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1 sm:mb-2">Quiz Complete!</h2>
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-1 sm:mb-2">Final Score</p>
          <p className="text-4xl sm:text-5xl font-black text-blue-600">{score} <span className="text-xl sm:text-2xl text-slate-400">/ {questions.length}</span></p>
        </div>
        <button onClick={generateQuestions} className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all shadow-md active:scale-95 text-base sm:text-lg"><RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" /> Play Again <span className="text-slate-400 text-xs sm:text-sm font-normal">(再玩一次)</span></button>
      </div>
    );
  }

  const ind = questions[currentQIndex].indicator;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 sm:mb-8">
        <div className="flex justify-between items-end mb-1 sm:mb-2">
          <span className="font-bold text-slate-700 text-sm sm:text-base">Question {currentQIndex + 1} <span className="text-slate-400 font-normal text-xs sm:text-sm ml-1">/ {questions.length}</span></span>
          <span className="font-bold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Score: {score}</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 sm:h-2 rounded-full overflow-hidden"><div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${((currentQIndex) / questions.length) * 100}%` }}></div></div>
      </div>
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-4 sm:p-8 border-b border-slate-200">
          <h3 className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed text-center">What is the final observation when you test <span className="inline-block bg-blue-100 text-blue-800 font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg mx-1 sm:mx-2 border border-blue-200">{ind.substance.en}</span> using <span className="inline-block bg-purple-100 text-purple-800 font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg mx-1 sm:mx-2 border border-purple-200">{ind.name.en}</span>?</h3>
        </div>
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {questions[currentQIndex].options.map((option, idx) => {
              let btnStyle = "bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400";
              if (isAnswered) {
                if (option.en === questions[currentQIndex].correctAnswer.en) btnStyle = "bg-green-50 border-2 border-green-500 text-green-800";
                else if (selectedAnswer?.en === option.en) btnStyle = "bg-red-50 border-2 border-red-400 text-red-800 opacity-80";
                else btnStyle = "bg-white border-2 border-slate-100 text-slate-400 opacity-50";
              }
              return (
                <button key={idx} onClick={() => handleAnswer(option)} disabled={isAnswered} className={`relative p-3 sm:p-5 rounded-xl sm:rounded-2xl font-bold transition-all text-left flex items-center gap-3 sm:gap-4 group ${btnStyle}`}>
                  <span className="w-6 h-6 sm:w-10 sm:h-10 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: option.hex }}></span>
                  <div className="flex flex-col pr-4 sm:pr-6"><span className="text-sm sm:text-lg">{option.en}</span><span className="text-[10px] sm:text-sm font-normal opacity-70">{option.zh}</span></div>
                  {isAnswered && option.en === questions[currentQIndex].correctAnswer.en && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 absolute right-3 sm:right-5" />}
                  {isAnswered && selectedAnswer?.en === option.en && option.en !== questions[currentQIndex].correctAnswer.en && <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 absolute right-3 sm:right-5" />}
                </button>
              )
            })}
          </div>
          {isAnswered && (
            <div className="mt-6 sm:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 ${selectedAnswer.en === questions[currentQIndex].correctAnswer.en ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div>
                  <h4 className={`text-base sm:text-xl font-bold mb-1 sm:mb-3 flex items-center gap-2 ${selectedAnswer.en === questions[currentQIndex].correctAnswer.en ? 'text-green-800' : 'text-red-800'}`}>
                    {selectedAnswer.en === questions[currentQIndex].correctAnswer.en ? 'Correct! (答對了!)' : 'Not quite. (再想想看。)'}
                  </h4>
                  <p className="text-slate-800 font-medium text-sm sm:text-lg leading-relaxed mb-1 sm:mb-2">{ind.explanation.en}</p>
                  <p className="text-slate-600 leading-relaxed text-[10px] sm:text-sm">{ind.explanation.zh}</p>
                </div>
              </div>
              <button onClick={() => currentQIndex < questions.length - 1 ? (setCurrentQIndex(currentQIndex + 1), setIsAnswered(false), setSelectedAnswer(null)) : setQuizState('end')} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-5 rounded-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg shadow-md active:scale-95">
                {currentQIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
