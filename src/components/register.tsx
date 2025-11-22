import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../context/context";
import { CountdownTimer } from "./ui/CountdownTimer";
import logo from "../assets/dg.png";
import viloyatlar from "../components/district/viloyat.json";
import tumanlar from "../components/district/tuman.json";

type Params = { id?: string };

type Viloyat = {
  id: number;
  soato_id: number;
  name_uz: string;
  name_oz: string;
  name_ru: string;
};

type Tuman = {
  id: number;
  region_id: number;
  soato_id: number;
  name_uz: string;
  name_oz: string;
  name_ru: string;
};

type BlockType = {
  id: number | string;
  title: string;
  desc?: string;
  image?: string;
  size?: "small" | "large";
  link?: string;
  gifts?: string[];
};

type PersonData = {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  email: string;
  study_place: string;
  region: string;
  district: string;
};

type RegisterPayload = {
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
  email: string;
  study_place: string;
  region: string;
  district: string;
  direction: string;
  partner_data?: PersonData;
};

const DIRECTION_ALIASES: Record<string, string> = {
  rfutbol: "rfutbol",
  rsumo: "rsumo",
  fixtirolar: "fixtirolar",
  ixtirolar: "ixtirolar",
  contest: "contest",
  ai: "ai",
};

// rfutbol uchun 2 kishi kerak
const TEAM_DIRECTIONS = ["rfutbol"];

// Form inputsiz ko'rsatiladigan yo'nalishlar
const NO_FORM_DIRECTIONS = ["contest"];

const SEATS_DEFAULT: Record<string, number> = {
  ai: 60,
  robosumo: 30,
  contest: 40,
  robofutbol: 24,
  ixtirolar: 20,
};

export default function Register(): JSX.Element {
  const [agree, setAgree] = useState(false);
  const { id } = useParams<Params>();
  const location = useLocation();
  const navigate = useNavigate();
  const { blocks = [] as BlockType[] } = useModal();

  const detected = (id || location.pathname.split("/").pop() || "ai")
    .toString()
    .toLowerCase();
  const eventKey = DIRECTION_ALIASES[detected] ?? detected;

  // rfutbol bo'lsa 2 kishi kerak
  const needsPartner = TEAM_DIRECTIONS.includes(eventKey);

  // contest bo'lsa form ko'rsatilmaydi
  const noForm = NO_FORM_DIRECTIONS.includes(eventKey);

  const block: BlockType | undefined =
    blocks.find(
      (b) =>
        String(b.id) === eventKey ||
        b.link === `/register/${eventKey}` ||
        (b.link && b.link.endsWith(eventKey))
    ) ?? blocks[0];

  const eventTitle = block?.title ?? "Ro'yxat";
  const eventDesc = block?.desc ?? "";
  const eventImage = block?.image ?? "";
  const eventGifts = block?.gifts ?? [];

  const seatsTotal = SEATS_DEFAULT[eventKey] ?? 50;
  const [seatsLeft, setSeatsLeft] = useState<number>(seatsTotal);

  const firstNameRef = useRef<HTMLInputElement | null>(null);

  // Asosiy foydalanuvchi ma'lumotlari
  const [mainForm, setMainForm] = useState<PersonData & { direction: string }>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: "",
    email: "",
    study_place: "",
    region: "",
    district: "",
    direction: eventKey,
  });

  // Sherik ma'lumotlari (rfutbol uchun)
  const [partnerForm, setPartnerForm] = useState<PersonData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: "",
    email: "",
    study_place: "",
    region: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Viloyat va tuman - asosiy user
  const [mainRegionId, setMainRegionId] = useState<number | null>(null);
  const mainTumanlar = mainRegionId
    ? (tumanlar as Tuman[]).filter((t) => t.region_id === mainRegionId)
    : [];

  // Viloyat va tuman - sherik uchun
  const [partnerRegionId, setPartnerRegionId] = useState<number | null>(null);
  const partnerTumanlar = partnerRegionId
    ? (tumanlar as Tuman[]).filter((t) => t.region_id === partnerRegionId)
    : [];

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // Asosiy form uchun handleChange
  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainForm((prev) => ({ ...prev, [name]: value }));
  };

  // Sherik form uchun handleChange
  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  // Asosiy user - viloyat
  const handleMainRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = e.target.value ? Number(e.target.value) : null;
    const selectedViloyat = (viloyatlar as Viloyat[]).find(
      (v) => v.id === regionId
    );
    setMainRegionId(regionId);
    setMainForm((prev) => ({
      ...prev,
      region: selectedViloyat?.name_uz || "",
      district: "",
    }));
  };

  // Asosiy user - tuman
  const handleMainDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tumanId = e.target.value ? Number(e.target.value) : null;
    const selectedTuman = (tumanlar as Tuman[]).find((t) => t.id === tumanId);
    setMainForm((prev) => ({
      ...prev,
      district: selectedTuman?.name_uz || "",
    }));
  };

  // Sherik - viloyat
  const handlePartnerRegionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const regionId = e.target.value ? Number(e.target.value) : null;
    const selectedViloyat = (viloyatlar as Viloyat[]).find(
      (v) => v.id === regionId
    );
    setPartnerRegionId(regionId);
    setPartnerForm((prev) => ({
      ...prev,
      region: selectedViloyat?.name_uz || "",
      district: "",
    }));
  };

  // Sherik - tuman
  const handlePartnerDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tumanId = e.target.value ? Number(e.target.value) : null;
    const selectedTuman = (tumanlar as Tuman[]).find((t) => t.id === tumanId);
    setPartnerForm((prev) => ({
      ...prev,
      district: selectedTuman?.name_uz || "",
    }));
  };

  // Ma'lumotlarni yig'ish
  const sendData = (): RegisterPayload => {
    const data: RegisterPayload = {
      first_name: mainForm.first_name.trim(),
      last_name: mainForm.last_name.trim(),
      phone_number: mainForm.phone_number.trim(),
      birth_date: mainForm.birth_date,
      email: mainForm.email.trim(),
      study_place: mainForm.study_place.trim(),
      region: mainForm.region.trim(),
      district: mainForm.district.trim(),
      direction: mainForm.direction || eventKey,
    };

    // rfutbol bo'lsa sherik ma'lumotlarini qo'shish
    if (needsPartner) {
      data.partner_data = {
        first_name: partnerForm.first_name.trim(),
        last_name: partnerForm.last_name.trim(),
        phone_number: partnerForm.phone_number.trim(),
        birth_date: partnerForm.birth_date,
        email: partnerForm.email.trim(),
        study_place: partnerForm.study_place.trim(),
        region: partnerForm.region.trim(),
        district: partnerForm.district.trim(),
      };
    }

    console.log("=== FORM DATA ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("=================");

    return data;
  };

  function validate(): string | null {
    // Asosiy foydalanuvchi validatsiyasi
    if (!mainForm.first_name.trim()) return "Ismingizni kiriting.";
    if (!mainForm.phone_number.trim()) return "Telefon raqamingizni kiriting.";
    if (!mainForm.email.trim()) return "Email kiriting.";
    if (!/^\S+@\S+\.\S+$/.test(mainForm.email))
      return "Yaroqli email kiriting.";

    // rfutbol uchun sherik validatsiyasi
    if (needsPartner) {
      if (!partnerForm.first_name.trim()) return "Sherigingiz ismini kiriting.";
      if (!partnerForm.phone_number.trim())
        return "Sherigingiz telefon raqamini kiriting.";
      if (!partnerForm.email.trim()) return "Sherigingiz emailini kiriting.";
      if (!/^\S+@\S+\.\S+$/.test(partnerForm.email))
        return "Sherigingiz uchun yaroqli email kiriting.";
    }

    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Contest uchun validatsiya o'tkazilmaydi
    if (noForm) {
      if (agree) {
        window.location.href = "https://raqamliavlod.uz/";
      }
      return;
    }

    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    if (seatsLeft <= 0) {
      setError("Kechirasiz, bu yo'nalishda joylar tugagan.");
      return;
    }

    const payload = sendData();

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

      console.info(
        "register response status:",
        res.status,
        "body:",
        data ?? text
      );

      if (!res.ok) {
        const serverMsg =
          (data && (data.detail || data.message || data.errors)) ||
          (typeof data === "string" ? data : `Server xatosi: ${res.status}`);
        const errStr =
          typeof serverMsg === "object"
            ? JSON.stringify(serverMsg)
            : String(serverMsg);
        setError(errStr);
        return;
      }

      setSeatsLeft((s) => Math.max(0, s - 1));
      setDone(true);
      const successMsg =
        (data && (data.message || data.detail)) ||
        "Ro'yxatdan muvaffaqiyatli o'tdingiz!";
      setSuccessMessage(successMsg);
    } catch (err) {
      console.error("Network/Fetch error:", err);
      setError((err as Error).message || "Yuborishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  }

  // Input komponenti - takrorlanmaslik uchun
  const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    inputRef,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
  }) => (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition"
        required={required}
      />
    </label>
  );

  // Select komponenti
  const SelectField = ({
    label,
    value,
    onChange,
    disabled = false,
    placeholder,
    options,
  }: {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    placeholder: string;
    options: { id: number; name_uz: string }[];
  }) => (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full h-10 rounded-xl bg-gray-800 text-white border-2 border-purple-500/30 px-4 focus:outline-none focus:border-purple-500 transition cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name_uz}
          </option>
        ))}
      </select>
    </label>
  );

  const FormSection = ({
    title,
    number,
    form,
    regionId,
    tumanlar,
    onInputChange,
    onRegionChange,
    onDistrictChange,
    showNumber = false, // Default: raqam ko'rsatilmasin
  }: {
    title: string;
    number: number;
    form: PersonData;
    regionId: number | null;
    tumanlar: Tuman[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onDistrictChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showNumber?: boolean;
  }) => (
    <div className="space-y-4">
      {showNumber ? (
        <div className="flex items-center gap-2 text-purple-300 font-semibold border-b border-purple-500/30 pb-2">
          <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
            {number}
          </span>
          {title}
        </div>
      ) : (
        <div className="text-purple-300 font-semibold border-b border-purple-500/30 pb-2">
          {title}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label="Ism"
          name="first_name"
          value={form.first_name}
          onChange={onInputChange}
          required
          inputRef={number === 1 ? firstNameRef : undefined}
        />
        <InputField
          label="Familiya"
          name="last_name"
          value={form.last_name}
          onChange={onInputChange}
        />
      </div>

      <InputField
        label="Telefon"
        name="phone_number"
        value={form.phone_number}
        onChange={onInputChange}
        type="tel"
        placeholder="+998901234567"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label="Tug'ilgan sana"
          name="birth_date"
          value={form.birth_date}
          onChange={onInputChange}
          type="date"
        />
        <InputField
          label="Ta'lim / O'qish joyi"
          name="study_place"
          value={form.study_place}
          onChange={onInputChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-white mb-1 block">Viloyat / Hudud</label>
          <select
            value={regionId || ""}
            onChange={onRegionChange}
            className="w-full selectV  text-white border border-gray-700 rounded-lg p-2 "
          >
            <option value="">Viloyatni tanlang</option>
            {viloyatlar.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name_uz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white mb-1 block">Tuman / Shahar</label>
          <select
            value={
              (tumanlar as Tuman[]).find((t) => t.name_uz === form.district)
                ?.id || ""
            }
            onChange={onDistrictChange}
            disabled={!regionId}
            className={`w-full selectV text-white border border-gray-700 rounded-lg p-2 ${
              !regionId && "opacity-50 cursor-not-allowed"
            } `}
          >
            <option value="" disabled>
              {regionId ? "Tumanni tanlang" : "Avval viloyat tanlang"}
            </option>

            {regionId &&
              tumanlar.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name_uz}
                </option>
              ))}
          </select>
        </div>
      </div>

      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={onInputChange}
        type="email"
        required
      />
    </div>
  );
  // Contest uchun maxsus komponent
  const ContestContent = () => (
    <div className="text-center topp space-y-6">
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-4">
          Contest Yo'nalishi
        </h3>
        <p className="text-gray-300 mb-6">
          Quyidagi media sahifalarimizga obuna bo'ling va <br />
          keyingi qadamlar haqida xabardor bo'ling.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://t.me/digitalgeneration_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold flex items-center gap-2"
          >
            <i className="fab fa-telegram-plane"></i>
            Telegram
          </a>
          <a
            href="https://www.instagram.com/dguzbekistan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-semibold flex items-center gap-2"
          >
            <i className="fab fa-instagram"></i>
            Instagram
          </a>
        </div>
      </div>

      <div className="box2">
        <label className="flex items-center justify-center gap-2 cursor-pointer">
          <input
            className="boxx"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          Shartlarni to'liq bajardingizmi?
        </label>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          type="button"
          disabled={loading || !agree}
          onClick={() => {
            if (agree) {
              window.location.href = "https://raqamliavlod.uz/";
            }
          }}
          className={`
                            flex-1 px-4 py-3 rounded-xl transition font-semibold
                            ${
                              loading || !agree ? "btn-disabled" : "btn-enabled"
                            }
                          `}
        >
          {loading ? "Tasdiqlanmoqda..." : "Tasdiqlash"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-black relative z-50">
      <div className="mtop max-w-6xl mx-auto text-white py-10 p-[20px] px-4 m-auto flex flex-col items-center justify-center">
        <img src={logo} className="logoo" alt="" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              {needsPartner && (
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/40 rounded-xl">
                  <p className="text-blue-300 text-sm">
                    ⚽ Bu yo'nalishda 2 kishilik jamoa kerak. Sherigingiz
                    ma'lumotlarini ham kiriting.
                  </p>
                </div>
              )}
              {noForm && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/40 rounded-xl">
                  <p className="text-green-300 text-sm">
                    🎯 Bu yo'nalish uchun media sahifalarimizga obuna bo'ling.
                  </p>
                </div>
              )}
              <CountdownTimer targetDate="2025-11-29T00:00:00" />
            </div>
          </aside>

          <main className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-2xl">
            {done ? (
              <div className="text-center space-y-6 rounded-r-lg">
                <div className="flex justify-center rounded-r-lg">
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
                <p className="text-gray-400 text-sm">
                  {noForm
                    ? "Siz contest yo'nalishi uchun muvaffaqiyatli ro'yxatdan o'tdingiz!"
                    : needsPartner
                    ? "Siz va sherigingiz muvaffaqiyatli ro'yxatdan o'tdingiz!"
                    : "Siz muvaffaqiyatli ro'yxatdan o'tdingiz!"}
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
                    href="https://www.instagram.com/dguzbekistan"
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
                <div className="flex items-center justify-between">
                  <h2 id="register-heading" className="text-xl font-semibold">
                    {eventTitle} — Ro'yxatdan o'tish
                  </h2>
                  <a
                    className="flex items-center justify-center  nzom"
                    href="../../public/nizom.pdf"
                    target="_blank" // yangi tabda ochadi
                    rel="noopener noreferrer"
                  >
                    Nizomni ko'rish
                  </a>
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    {error}
                  </div>
                )}
                {/* ===== CONTEST YO'NALISHI (formsiz) ===== */}
                {noForm ? (
                  <ContestContent />
                ) : (
                  <>
                    <FormSection
                      title="Ishtirokchi"
                      number={1}
                      form={mainForm}
                      regionId={mainRegionId}
                      tumanlar={mainTumanlar}
                      onInputChange={handleMainChange}
                      onRegionChange={handleMainRegionChange}
                      onDistrictChange={handleMainDistrictChange}
                      showNumber={needsPartner} // Faqat rfutbolda raqam ko'rsatiladi
                    />

                    {/* SHERIK (faqat rfutbol uchun) */}
                    {needsPartner && (
                      <div className="mt-6 pt-6 border-t-2 border-dashed border-purple-500/30">
                        <FormSection
                          title="Ishtirokchi"
                          number={2}
                          form={partnerForm}
                          regionId={partnerRegionId}
                          tumanlar={partnerTumanlar}
                          onInputChange={handlePartnerChange}
                          onRegionChange={handlePartnerRegionChange}
                          onDistrictChange={handlePartnerDistrictChange}
                          showNumber={true} // Har doim ko'rsatiladi
                        />
                      </div>
                    )}

                    <h2 className="text-center">
                      Ro'yxatdan to'liq o'tish uchun <br /> bizning media
                      sahifalarimizga ham obuna bo'ling. 👇
                    </h2>
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
                        href="https://www.instagram.com/dguzbekistan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                      >
                        <i className="fab fa-instagram text-lg"></i>
                        Instagram
                      </a>
                    </div>

                    <div>
                      <div className="box2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            className="boxx"
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                          />
                          Shartlarni to'liq bajardingizmi?
                        </label>
                      </div>
                      <div className="flex buttonSend gap-3 mt-6">
                        <button
                          type="submit"
                          disabled={loading || !agree}
                          className={`
          flex-1 px-4 py-3 rounded-xl transition font-semibold
          ${loading || !agree ? "btn-disabled" : "btn-enabled"}
        `}
                        >
                          {loading
                            ? "Yuborilmoqda..."
                            : needsPartner
                            ? "Jamoani ro'yxatdan o'tkazish"
                            : "Ro'yxatdan o'tish"}
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(-1)}
                          className="px-4 cansell py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </form>
            )}
          </main>
        </div>

        {/* Sovg'alar qismi - barcha yo'nalishlar uchun */}
        <div className="mb-5 w-full flex flex-col flex-wrap gap-8">
          <div className="text-center">
            <p className="text-purple-200 font-bold textp">
              Ishtirokchilar yutib olishi mumkin bo'lgan sovg'alar
            </p>
          </div>

          <div className="w-full justify-between py-3 flex gap-6">
            {eventGifts?.length ? (
              eventGifts?.map((gift, index) => (
                <div
                  key={index}
                  className="group carddd relative w-full bg-gradient-to-br from-gray-900/80 to-purple-900/60 rounded-2xl p-6 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
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
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-white font-bold text-xl mb-3 leading-tight">
                        {gift}
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
