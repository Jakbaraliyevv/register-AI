import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../context/context";
import { CountdownTimer } from "./ui/CountdownTimer";
import logo from "../assets/dg.png";

type Params = { id?: string };

type BlockType = {
  id: number | string;
  title: string;
  desc?: string;
  image?: string;
  size?: "small" | "large";
  link?: string;
  gifts?: string[];
};

type RegisterPayload = {
  first_name: string;
  last_name?: string;
  phone_number: string;
  birth_date?: string;
  email: string;
  study_place?: string;
  region?: string;
  district?: string;
  direction: string;
  eventKey: string;
};

const DIRECTION_ALIASES: Record<string, string> = {
  rfutbol: "rfutbol",
  rsumo: "rsumo",
  fixtirolar: "fixtirolar",
  ixtirolar: "ixtirolar",
  contest: "contest",
  ai: "ai",
};

const SEATS_DEFAULT: Record<string, number> = {
  ai: 60,
  robosumo: 30,
  contest: 40,
  robofutbol: 24,
  ixtirolar: 20,
};

export default function Register(): JSX.Element {
  const { id } = useParams<Params>();
  const location = useLocation();
  const navigate = useNavigate();
  const { blocks = [] as BlockType[] } = useModal();

  const detected = (id || location.pathname.split("/").pop() || "ai")
    .toString()
    .toLowerCase();
  const eventKey = DIRECTION_ALIASES[detected] ?? detected;

  const block: BlockType | undefined =
    blocks.find(
      (b) =>
        String(b.id) === eventKey ||
        b.link === `/register/${eventKey}` ||
        (b.link && b.link.endsWith(eventKey))
    ) ?? blocks[0];

  const eventTitle = block?.title ?? "Ro‘yxat";
  const eventDesc = block?.desc ?? "";
  const eventImage = block?.image ?? "";
  const eventGifts = block?.gifts ?? [];

  const seatsTotal = SEATS_DEFAULT[eventKey] ?? 50;
  const [seatsLeft, setSeatsLeft] = useState<number>(seatsTotal);

  const firstNameRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<RegisterPayload>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: "",
    email: "",
    study_place: "",
    region: "",
    district: "",
    direction: eventKey,
    eventKey,
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function setField<K extends keyof RegisterPayload>(
    key: K,
    value: RegisterPayload[K]
  ) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function canonicalDirection(value: string) {
    const k = (value || "").toLowerCase();
    return DIRECTION_ALIASES[k] ?? k ?? eventKey;
  }

  function validate(): string | null {
    if (!form.first_name.trim()) return "To'liq ism kiritilsin.";
    if (!form.phone_number.trim()) return "Telefon raqam kiritilsin.";
    if (!form.email.trim()) return "Email kiritilsin.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Yaroqli email kiriting.";
    return null;
  }

  // ...existing code...
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    if (seatsLeft <= 0) {
      setError("Kechirasiz, bu yo‘nalishda joylar tugagan.");
      return;
    }

    // Build minimal payload (serverga ortiqcha maydon yubormaymiz)
    const minimalPayload: Partial<RegisterPayload> = {
      first_name: form.first_name.trim(),
      last_name: form.last_name?.trim() || undefined,
      phone_number: form.phone_number.trim(),
      birth_date: form.birth_date || undefined,
      email: form.email.trim(),
      study_place: form.study_place?.trim() || undefined,
      region: form.region?.trim() || undefined,
      district: form.district?.trim() || undefined,
      direction: canonicalDirection(form.direction || eventKey),
    };

    // remove undefined keys
    const payload = Object.fromEntries(
      Object.entries(minimalPayload).filter(
        ([_, v]) => v !== undefined && v !== ""
      )
    );

    console.debug("POST payload ->", payload);

    setLoading(true);
    try {
      const res = await fetch("https://aiday.infinite-co.uz/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text().catch(() => "");
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      // Always log raw server response for debugging
      console.info(
        "register response status:",
        res.status,
        "body:",
        data ?? text
      );

      if (!res.ok) {
        // show server-provided validation errors if any
        const serverMsg =
          (data && (data.detail || data.message || data.errors)) ||
          (typeof data === "string" ? data : `Server xatosi: ${res.status}`);
        const errStr =
          typeof serverMsg === "object"
            ? JSON.stringify(serverMsg)
            : String(serverMsg);
        setError(errStr);
        // quick alert for visibility during testing
        window.alert("Server error: " + errStr);
        return;
      }

      // success
      setSeatsLeft((s) => Math.max(0, s - 1));
      setDone(true);
      const successMsg =
        (data && (data.message || data.detail)) ||
        "Ro‘yxatdan muvaffaqiyatli o‘tdingiz!";
      setSuccessMessage(successMsg);
      window.alert(successMsg);
    } catch (err) {
      console.error("Network/Fetch error:", err);
      setError((err as Error).message || "Yuborishda xatolik yuz berdi.");
      window.alert("Network error: " + ((err as Error).message || "Unknown"));
    } finally {
      setLoading(false);
    }
  }
  // ...existing code...

  const giftIcon = (name: string) => (
    <svg
      className="w-6 h-6 text-purple-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11V6a5 5 0 0 1 10 0v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section className="bg-black relative z-50">
      <div className="mtop max-w-6xl  mx-auto text-white py-10 p-[20px] px-4   m-auto flex flex-col items-center justify-center">
        <img src={logo} className="logoo" alt="" />
        <div className="   grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 rounded-l-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg flex flex-col">
            <div className="w-full flex-1 min-h-0 bg-gray-700">
              {eventImage ? (
                <img
                  src={eventImage}
                  alt={eventTitle}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-gray-500">
                  Rasm mavjud emas
                </div>
              )}
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-950/60 via-black/60 to-blue-950/60 rounded-2xl shadow-xl backdrop-blur-md border border-white/10">
              <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
                {eventTitle}
              </h1>

              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                {eventDesc}
              </p>

              <CountdownTimer targetDate="2025-11-29T00:00:00" />
            </div>
          </aside>

          <main className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-2xl">
            {done ? (
              <div className="text-center space-y-6 rounded-r-lg ">
                <div className="flex justify-center rounded-r-lg ">
                  <svg
                    className="w-16 h-16 text-green-400 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Rahmat! 🎉</h2>
                <p className="text-gray-300 text-lg">{successMessage}</p>
                <p className="text-gray-400 text-sm">
                  Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz. Yangiliklar va
                  sovg‘alar haqida birinchi bo‘lib xabar topish uchun bizni
                  kuzatib boring!
                </p>

                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href="https://t.me/digitalgeneration_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <i className="fab fa-telegram-plane text-lg"></i>
                    Telegram
                  </a>

                  <a
                    href="https://www.instagram.com/dguzbekistan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <i className="fab fa-instagram text-lg"></i>
                    Instagram
                  </a>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-white font-semibold shadow-md flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12h18M12 3l9 9-9 9"
                      />
                    </svg>
                    Bosh sahifaga
                  </button>
                </div>
              </div>
            ) : (
              <form
                id="form"
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-labelledby="register-heading"
              >
                <h2 id="register-heading" className="text-xl font-semibold">
                  {eventTitle} — Ro'yxatdan o'tish
                </h2>

                {error && <div className="text-sm text-red-700">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-300">Ism</span>
                    <input
                      ref={firstNameRef}
                      type="text"
                      value={form.first_name}
                      onChange={(e) => setField("first_name", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-300">Familiya</span>
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={(e) => setField("last_name", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-300">Telefon</span>
                  <input
                    type="tel"
                    value={form.phone_number}
                    onChange={(e) => setField("phone_number", e.target.value)}
                    placeholder="+998901234567"
                    className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                    style={{ height: "40px" }}
                    required
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-300">
                      Tug'ilgan sana
                    </span>
                    <input
                      type="date"
                      value={form.birth_date}
                      onChange={(e) => setField("birth_date", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-300">
                      Ta'lim / O'qish joyi
                    </span>
                    <input
                      type="text"
                      value={form.study_place}
                      onChange={(e) => setField("study_place", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-300">Hudud</span>
                    <input
                      type="text"
                      value={form.region}
                      onChange={(e) => setField("region", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-gray-300">Tuman</span>
                    <input
                      type="text"
                      value={form.district}
                      onChange={(e) => setField("district", e.target.value)}
                      className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                      style={{ height: "40px" }}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-gray-300">Yo'nalish</span>
                  <input
                    type="text"
                    value={form.direction}
                    onChange={(e) => setField("direction", e.target.value)}
                    placeholder="masalan: rsumo, rfutbol, ai"
                    className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                    style={{ height: "40px" }}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-gray-300">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
                    style={{ height: "40px" }}
                    required
                  />
                </label>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 cursor-pointer rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition font-semibold"
                  >
                    {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
        <div className="mb-5  w-full flex flex-col gap-8">
          <div className="text-center ">
            <p className="text-purple-200 font-bold  textp">
              Ishtirokchilar yutib olishi mumkin bo'lgan sovg‘alar
            </p>
          </div>

          <div className="w-full justify-between py-3  flex gap-6">
            {eventGifts?.length ? (
              eventGifts?.map((gift, index) => (
                <div
                  key={index}
                  className="group w-full bg-gradient-to-br from-gray-900/80 to-purple-900/60 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Gift Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>

                    {/* Gift Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-white font-bold text-xl mb-3 leading-tight">
                        {gift}
                        {/* + Sertifikat bilan */}
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 py-12">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </div>
                <p className="text-lg">Hozircha sovg'alar mavjud emas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
