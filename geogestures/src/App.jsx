import { useState, useCallback } from "react";

// ── JSON Config (swappable) ──────────────────────────────────────────────────

const CONFIG = {
  maxLength: 20,
  minLength: 5,
  charLimit: 800,
  dramaMultiplier: 1.6,  // emoji count boost in dramatic mode

  fillers: ["👉","👈","✋","🤌","🤙","🤘","👏","🙌","🫳","🫴","🔁","🌀","☝️","🤚","👐","🫶","🤲","🙏","🫱","🫲"],
  chaos:   ["💥","🌪️","🎆","🔥","⚡","🌊","🎇","🫨","💫","🌀","🎭","🤯","💣","🎰","🌈","🚀","☄️","🎪","🧨","🌋"],
  openers: ["🙌","👐","🤲","✋","🤌","🫶"],
  closers: ["👏","🙌","🤌","✊","🫶","🤲"],

  keywordMap: {
    // Faults
    fault:       ["👈","👉","⚡","🔀"],
    reverse:     ["👆","☝️","⬆️","🔼"],
    normal:      ["👇","⬇️","🔽","🫳"],
    thrust:      ["🫸","👊","✊","💥"],
    "strike-slip":["🔁","↔️","🤜","🤛"],
    slip:        ["↔️","🔁","🤝"],
    listric:     ["🌀","↘️","🫲","📐"],
    detachment:  ["🫴","↔️","📐","🤚"],
    graben:      ["👇","🔽","🤜","🤛"],
    horst:       ["👆","🔼","🙌","⛰️"],
    // Folds
    fold:        ["🌀","🔄","🫳","🌊"],
    anticline:   ["🙌","👆","⛰️","🔼"],
    syncline:    ["🫳","👇","🔽","🏔️"],
    dome:        ["☝️","🙌","⛰️","🎪"],
    basin:       ["🫴","👐","🔽","🕳️"],
    monocline:   ["📐","↗️","☝️","🫱"],
    flexure:     ["🌀","🫱","📐","🌊"],
    plunge:      ["👇","📐","⬇️","🌀"],
    // Rock types
    sandstone:   ["🏖️","🪨","🤌","✋"],
    shale:       ["🫓","📄","🤏","👌"],
    limestone:   ["🦴","🪨","🤌","🐚"],
    carbonate:   ["🦀","🐚","🤌","🫴"],
    clastic:     ["🧩","🪨","🤌","🫳"],
    granite:     ["🪨","💪","✊","🏔️"],
    igneous:     ["🌋","🔥","🤌","💥"],
    metamorphic: ["♻️","🔄","💎","🫶"],
    sedimentary: ["📚","🫓","🤌","🌊"],
    evaporite:   ["💧","🧂","🫧","✋"],
    salt:        ["🧂","🌀","🫧","💫"],
    coal:        ["🪨","⬛","🔥","✋"],
    // Structures
    outcrop:     ["👀","🔍","☝️","✋"],
    bedding:     ["📐","↔️","🫴","🤚"],
    fracture:    ["⚡","💥","🤜","✂️"],
    joint:       ["✂️","⚡","🤜","🔀"],
    dip:         ["📐","↗️","↘️","🫲"],
    strike:      ["↔️","🧭","☝️","🫱"],
    unconformity:["📐","🤔","🙌","😲"],
    contact:     ["🤝","✋","🫱","🔁"],
    intrusion:   ["☝️","🌋","💥","🫸"],
    // Petroleum
    reservoir:   ["🫙","💧","🫴","🛢️"],
    seal:        ["🔒","🤚","✋","🫳"],
    trap:        ["🪤","🤲","✋","🙏"],
    source:      ["⚗️","🔥","🤌","🌡️"],
    migration:   ["➡️","🚶","👉","🌊"],
    porosity:    ["🕳️","🤌","🫧","🌀"],
    permeability:["🌊","💧","🫳","💨"],
    hydrocarbon: ["⛽","🛢️","🤌","💧"],
    oil:         ["🛢️","💧","🤌","⛽"],
    gas:         ["💨","🌬️","🫧","🔥"],
    well:        ["🕳️","⬇️","🛢️","☝️"],
    core:        ["🪨","🧪","🤌","🔬"],
    // Geomorphology
    erosion:     ["🌊","💨","🫳","⬇️"],
    deposition:  ["🫳","📦","⬇️","🌊"],
    // Geophysics
    seismic:     ["🌊","📡","🤌","🎚️"],
    velocity:    ["⚡","➡️","💨","🏃"],
    gradient:    ["📐","↗️","🌊","📈"],
    pressure:    ["💥","👊","🤜","🌡️"],
    temperature: ["🌡️","🔥","❄️","🌡️"],
    depth:       ["👇","⬇️","🕳️","🌊"],
    shallow:     ["✋","👆","🫴","☝️"],
    layer:       ["🫓","📄","🤚","📚"],
    strata:      ["📚","🫓","↔️","📐"],
    formation:   ["🏔️","⛰️","🙌","👐"],
    section:     ["✂️","📐","👐","🗺️"],
    correlation: ["↔️","🤝","📐","🔁"],
    sample:      ["🧪","🤌","🔍","✋"],
    analysis:    ["🔬","🤓","🤌","📊"],
    model:       ["🤌","🧩","☝️","🧠"],
    data:        ["📊","🤌","👆","🔢"],
    map:         ["🗺️","👀","✋","📐"],
  },

  stylePresets: {
    Auto:       null,
    Structural: ["fault","reverse","normal","thrust","strike-slip","slip","listric","detachment","graben","horst","fold","anticline","syncline","dome","basin","monocline","flexure","plunge","dip","strike","fracture","joint","unconformity","intrusion"],
    Sedimentary:["sandstone","shale","limestone","carbonate","clastic","evaporite","coal","bedding","strata","layer","deposition","erosion","contact","outcrop","formation","section"],
    Petroleum:  ["reservoir","seal","trap","source","migration","porosity","permeability","hydrocarbon","oil","gas","well","core","depth","pressure","temperature"],
    Geophysics: ["seismic","velocity","gradient","model","data","depth","pressure","temperature","layer","section","correlation"],
  },

  randomPhrases: [
    "steeply dipping reverse fault with rollover anticline",
    "regressive shallowing upward carbonate sequence",
    "listric normal fault detaching on basal shale",
    "deeply buried overpressured reservoir with tight seal",
    "four-way dip closure with structural trap",
    "high-angle strike-slip fault with flower structure",
    "incised valley fill with fluvial channel sandstones",
    "thrust-fold belt with triangle zone geometry",
    "sub-unconformity truncation trap beneath angular unconformity",
    "salt withdrawal minibasin with halokinetic sequences",
    "deeply eroded granite basement unconformably overlain by sedimentary strata",
    "shallow marine carbonate platform with progradational reef complex",
  ],
};

// ── Deterministic RNG ───────────────────────────────────────────────────────

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (Math.imul(h, 16777619)) >>> 0;
  }
  return h;
}

function seededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

// ── Generation ──────────────────────────────────────────────────────────────

const STOPWORDS = new Set(["the","a","an","and","or","but","in","on","at","to","of","with","by","for","is","are","was","were","has","have","that","this","it","as","from","into","over","under","above","below"]);

function generate(text, style, dramatic, salt = 0) {
  const seed = (hashStr(text.toLowerCase().trim()) + salt * 999983) >>> 0;
  const rng = seededRng(seed);

  const words = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).filter(Boolean);

  const allowedKeys = CONFIG.stylePresets[style];
  const keywordMap = allowedKeys
    ? Object.fromEntries(Object.entries(CONFIG.keywordMap).filter(([k]) => allowedKeys.includes(k)))
    : CONFIG.keywordMap;

  const fillerPool = dramatic
    ? [...CONFIG.fillers, ...CONFIG.chaos, ...CONFIG.chaos] // bias chaos in dramatic mode
    : CONFIG.fillers;

  const matched = [];
  for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    const entry = keywordMap[w]
      || Object.entries(keywordMap).find(([k]) => w.includes(k) || k.includes(w))?.[1];
    matched.push(entry ? pick(entry, rng) : pick(fillerPool, rng));
  }

  const baseTarget = Math.min(CONFIG.maxLength, Math.max(CONFIG.minLength, Math.ceil(matched.length * 0.85)));
  const target = dramatic ? Math.min(CONFIG.maxLength, Math.ceil(baseTarget * CONFIG.dramaMultiplier)) : baseTarget;

  // Pad with fillers if dramatic mode wants more
  while (matched.length < target - 2) matched.push(pick(fillerPool, rng));

  let seq = [pick(CONFIG.openers, rng), ...matched].slice(0, target - 1);
  seq.push(pick(CONFIG.closers, rng));

  // Dedupe runs > 2
  const out = [];
  for (const e of seq) {
    if (out.slice(-2).every(x => x === e)) out.push(pick(fillerPool, rng));
    else out.push(e);
  }

  return out;
}

// ── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [text, setText] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [style, setStyle] = useState("Auto");
  const [dramatic, setDramatic] = useState(false);
  const [salt, setSalt] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shaking, setShaking] = useState(false);

  const runGenerate = useCallback((t, st, dr, sl) => {
    if (!t.trim()) { setShaking(true); setTimeout(() => setShaking(false), 500); return; }
    setEmojis(generate(t, st, dr, sl));
  }, []);

  const handleGesture = () => {
    setSalt(0);
    runGenerate(text, style, dramatic, 0);
  };

  const handleRegenerate = () => {
    const next = salt + 1;
    setSalt(next);
    runGenerate(text, style, dramatic, next);
  };

  const copyEmojis = () => {
    navigator.clipboard.writeText(emojis.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const randomPhrase = () => {
    const phrase = CONFIG.randomPhrases[Math.floor(Math.random() * CONFIG.randomPhrases.length)];
    setText(phrase);
    setSalt(0);
    setEmojis(generate(phrase, style, dramatic, 0));
  };

  const toggleDramatic = () => {
    const next = !dramatic;
    setDramatic(next);
    if (emojis.length > 0) setEmojis(generate(text, style, next, salt));
  };

  const btnBase = {
    border: "none", cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.15s", borderRadius: 12,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: dramatic
        ? "linear-gradient(135deg, #1a0a2e 0%, #3b0764 50%, #1e0a3c 100%)"
        : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "20px", boxSizing: "border-box",
      transition: "background 0.4s",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 6, animation: dramatic ? "wiggle 0.6s infinite" : "none" }}>
          {dramatic ? "🌋✋💥" : "🪨✋🌀"}
        </div>
        <h1 style={{ color: "#e2e8f0", margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
          GeoGestures
        </h1>
        <p style={{ color: dramatic ? "#c084fc" : "#94a3b8", margin: "6px 0 0", fontSize: "0.95rem", transition: "color 0.3s" }}>
          {dramatic ? "Maximum handwaving engaged. ¡Ay caramba!" : "Paste your description, watch the handwaving."}
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${dramatic ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 20, padding: "28px",
        width: "100%", maxWidth: 620, boxSizing: "border-box",
        transition: "border-color 0.4s",
      }}>

        {/* Top controls row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          {/* Style presets */}
          {Object.keys(CONFIG.stylePresets).map(s => (
            <button key={s} onClick={() => { setStyle(s); if (emojis.length > 0) setEmojis(generate(text, s, dramatic, salt)); }}
              style={{
                padding: "4px 14px", borderRadius: 999, border: "1px solid",
                borderColor: style === s ? "#60a5fa" : "rgba(255,255,255,0.15)",
                background: style === s ? "rgba(96,165,250,0.2)" : "transparent",
                color: style === s ? "#93c5fd" : "#94a3b8",
                cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
              }}>{s}</button>
          ))}

          {/* Random */}
          <button onClick={randomPhrase} style={{
            marginLeft: "auto", padding: "4px 14px", borderRadius: 999,
            border: "1px solid rgba(251,191,36,0.4)", background: "rgba(251,191,36,0.1)",
            color: "#fbbf24", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
          }}>🎲 Random</button>

          {/* Dramatic toggle */}
          <button onClick={toggleDramatic} style={{
            padding: "4px 14px", borderRadius: 999,
            border: `1px solid ${dramatic ? "rgba(192,132,252,0.6)" : "rgba(255,255,255,0.15)"}`,
            background: dramatic ? "rgba(192,132,252,0.2)" : "transparent",
            color: dramatic ? "#e879f9" : "#94a3b8",
            cursor: "pointer", fontSize: "0.8rem", fontWeight: 700,
            animation: dramatic ? "pulse 1.5s infinite" : "none",
          }}>
            {dramatic ? "🌋 DRAMATIC" : "💥 Dramatic Mode"}
          </button>
        </div>

        {/* Textarea */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value.slice(0, CONFIG.charLimit))}
            placeholder="steeply dipping reverse fault with rollover anticline..."
            rows={4}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${shaking ? "#f87171" : dramatic ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 12, color: "#e2e8f0", fontSize: "0.95rem",
              padding: "12px 14px 28px", resize: "vertical", outline: "none",
              fontFamily: "inherit", lineHeight: 1.5,
              animation: shaking ? "shake 0.4s" : "none",
              transition: "border-color 0.3s",
            }}
            onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleGesture(); }}
          />
          <span style={{
            position: "absolute", bottom: 10, right: 12,
            fontSize: "0.75rem",
            color: text.length > CONFIG.charLimit * 0.9 ? "#f87171" : "#64748b"
          }}>{text.length}/{CONFIG.charLimit}</span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleGesture} style={{
            ...btnBase, flex: 1, padding: "12px",
            background: dramatic
              ? "linear-gradient(135deg, #7c3aed, #db2777)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            color: "white", fontWeight: 700, fontSize: "1rem",
            boxShadow: dramatic ? "0 4px 20px rgba(192,132,252,0.4)" : "0 4px 15px rgba(59,130,246,0.3)",
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {dramatic ? "🌋 GESTURE IT!!!" : "✋ Gesture It!"}
          </button>

          {emojis.length > 0 && (
            <button onClick={handleRegenerate} style={{
              ...btnBase, padding: "12px 16px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.06)",
              color: "#cbd5e1", fontWeight: 600, fontSize: "0.9rem",
            }} title="Same text, new variation">
              🔀 Regenerate
            </button>
          )}

          {text && (
            <button onClick={() => { setText(""); setEmojis([]); setSalt(0); }} style={{
              ...btnBase, padding: "12px 16px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "#64748b", fontWeight: 600, fontSize: "0.9rem",
            }}>Clear</button>
          )}
        </div>

        {/* Output */}
        {emojis.length > 0 && (
          <div style={{
            marginTop: 24,
            background: dramatic ? "rgba(109,40,217,0.15)" : "rgba(0,0,0,0.25)",
            border: `1px solid ${dramatic ? "rgba(192,132,252,0.2)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 16, padding: "20px", textAlign: "center",
            transition: "all 0.3s",
          }}>
            <div style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              letterSpacing: "0.1em", lineHeight: 1.6,
              wordBreak: "break-word", marginBottom: 14,
              animation: dramatic ? "float 2s ease-in-out infinite" : "none",
            }}>
              {emojis.join(" ")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", color: "#475569" }}>
                {dramatic ? "⚠️ Dramatic gesture sequence" : "Gesture sequence"} · variation {salt + 1}
              </span>
              <button onClick={copyEmojis} style={{
                ...btnBase, padding: "5px 14px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
                background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)",
                color: copied ? "#86efac" : "#94a3b8",
                fontSize: "0.78rem", fontWeight: 600,
              }}>{copied ? "✓ Copied!" : "📋 Copy"}</button>
            </div>
          </div>
        )}
      </div>

      <p style={{ color: "#334155", fontSize: "0.75rem", marginTop: 20, textAlign: "center" }}>
        Lovingly poking fun at geologists (including ourselves). · ⌘+Enter to gesture.
      </p>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-5deg) scale(1.05); }
          50% { transform: rotate(5deg) scale(1.1); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(232,121,249,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(232,121,249,0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        textarea::placeholder { color: #475569; }
        textarea:focus { border-color: rgba(96,165,250,0.4) !important; }
        button:hover { opacity: 0.88; }
      `}</style>
    </div>
  );
}
