// Sitedeki tüm içerik bu dosyada.
// Her metin { tr, en } şeklinde iki dilde yazılır.

export type Lang = "tr" | "en";
export type T = Record<Lang, string>;

export const profile = {
  name: "Arda Özan",
  role: { tr: "Bilgisayar Mühendisi", en: "Computer Engineer" } as T,
  headline: {
    tr: "Backend API'ler, full-stack uygulamalar ve gerçek zamanlı sistemler geliştiriyorum.",
    en: "I build backend APIs, full-stack applications and real-time systems.",
  } as T,
  location: { tr: "Ankara, Türkiye", en: "Ankara, Turkey" } as T,
  intro: {
    tr: "Başkent Üniversitesi Bilgisayar Mühendisliği mezunuyum. Çoğunlukla backend API'ler ve full-stack projeler geliştiriyorum; son zamanlarda gerçek zamanlı sistemler ve bilgisayarlı görüyle uğraşıyorum.",
    en: "Computer Engineering graduate from Başkent University. I mostly build backend APIs and full-stack projects, and lately I've been branching out into real-time systems and computer vision.",
  } as T,
  about: {
    tr: "Backend tarafında .NET ve Spring Boot ile REST API'ler, rol bazlı yetkilendirme ve veritabanı tasarımı üzerine çalışıyorum; frontend'de React kullanıyorum.\n\nBunun dışında kendi kullandığım araçları yapmayı seviyorum: el hareketleriyle medya kontrolü, çalan müziğe göre görsel üreten bir AI visualizer, tarayıcıda P2P sesli görüşme gibi. OpenCV, MediaPipe ve WebRTC şu an en çok vakit geçirdiğim alanlar.\n\nŞu anda yazılım, oyun ve robotik üzerine çalışan bağımsız bir teknoloji stüdyosu olan Neuvikon'un ekibinde gönüllü olarak yer alıyorum.",
    en: "On the backend I work with .NET and Spring Boot — REST APIs, role-based auth and database design — and I use React on the frontend.\n\nI also like building tools I actually use: media control with hand gestures, an AI visualizer that reacts to whatever music is playing, peer-to-peer voice calls in the browser. OpenCV, MediaPipe and WebRTC are where I spend most of my time right now.\n\nI'm currently a volunteer on the team at Neuvikon, an independent technology studio working in software, games and robotics.",
  } as T,
  email: "arda.ozan.dev@gmail.com",
  cv: "", // ör. "/cv.pdf" — dosyayı public/ klasörüne koy
  socials: [
    { label: "GitHub", href: "https://github.com/4RD4024N" },
    // { label: "LinkedIn", href: "https://linkedin.com/in/kullaniciadi" },
  ],
};

export const education = [
  {
    school: "Başkent Üniversitesi",
    degree: { tr: "Bilgisayar Mühendisliği, Lisans", en: "B.Sc. Computer Engineering" } as T,
    period: { tr: "Mezun", en: "Graduated" } as T,
  },
];

// Deneyim — Deneyim sayfası, Hakkımda ve ana sayfada görünür
export const experience = [
  {
    org: "Neuvikon",
    href: "https://neuvikon-labs.github.io",
    role: { tr: "Gönüllü Geliştirici", en: "Volunteer Developer" } as T,
    period: { tr: "2026 – Günümüz", en: "2026 – Present" } as T,
    summary: {
      tr: "Yazılım, oyun ve robotik üzerine çalışan bağımsız bir teknoloji stüdyosu. 4 kişilik ekibin gönüllü üyesiyim.",
      en: "An independent technology studio working in software, games and robotics. I'm a volunteer member of its four-person team.",
    } as T,
  },
];

export type NeuStatus = "live" | "dev";

export type NeuProject = {
  name: string;
  division: "games" | "tech";
  tagline: T;
  description: T;
  status: NeuStatus;
  tags: string[];
  image?: string;
  href: string; // projenin Neuvikon sitesindeki sayfası
  links?: { label: string; href: string }[];
};

// Neuvikon bilgileri ve projeleri — kaynak: neuvikon-labs.github.io
export const neuvikon = {
  name: "Neuvikon",
  site: "https://neuvikon-labs.github.io",
  tagline: {
    tr: "Yazılım, oyun ve robotik üzerine çalışan bağımsız bir teknoloji stüdyosu.",
    en: "An independent technology studio working in software, games and robotics.",
  } as T,
  description: {
    tr: "Neuvikon ürün geliştirme, mobil oyun ve gömülü sistemler alanlarında çalışan bir stüdyo. İşleri tasarımdan yayına kadar uçtan uca ekip içinde üretiyor. 2026'da kuruldu, 4 kişilik bir ekip.",
    en: "Neuvikon is a studio working across product development, mobile games and embedded systems, taking work from design to release entirely in house. Founded in 2026, with a team of four.",
  } as T,
  divisions: [
    {
      key: "games",
      name: "Neuvikon Games",
      text: {
        tr: "Kısa oturumlu, çok oyunculu mobil oyunlar — Unity ve React Native.",
        en: "Short-session, multiplayer mobile games — Unity and React Native.",
      } as T,
    },
    {
      key: "tech",
      name: "Neuvikon Tech",
      text: {
        tr: "Web ve mobil ürünler, arka uç ve gerçek zamanlı servisler.",
        en: "Web and mobile products, backends and real-time services.",
      } as T,
    },
    {
      key: "robotics",
      name: "Neuvikon Robotics",
      text: {
        tr: "Gömülü sistemler, otonom robotlar ve donanım prototipleri.",
        en: "Embedded systems, autonomous robots and hardware prototypes.",
      } as T,
    },
  ],
  projects: [
    {
      name: "GuessFast",
      division: "games",
      status: "live",
      tagline: { tr: "Sayıyı bul. Hızlı bul.", en: "Find the number. Find it fast." },
      description: {
        tr: "Yayındaki sayı tahmin oyunu: önemli olan kaç denemede değil, ne kadar sürede bulduğun.",
        en: "A released number-guessing game where what counts is how fast you find it, not how many tries.",
      },
      tags: ["React Native", "Expo"],
      image: "/neuvikon/guessfast.png",
      href: "https://neuvikon-labs.github.io/games/guessfast",
      links: [
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast" },
        { label: "App Store", href: "https://apps.apple.com/ng/app/guessfast/id6758861605" },
      ],
    },
    {
      name: "Neu-Source",
      division: "tech",
      status: "live",
      tagline: { tr: "Ajan hangi bilette, ne harcadı — tek ekranda.", en: "Which ticket the agent is on, and what it spent." },
      description: {
        tr: "Kodlama ajanlarının hangi bilet üzerinde çalıştığını ve ne kadar token harcadığını izleyen iç platform.",
        en: "An internal platform that tracks which ticket a coding agent is working on and how many tokens it spent.",
      },
      tags: ["Next.js", "TypeScript"],
      href: "https://neuvikon-labs.github.io/tech/neu-source",
      links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
    },
    {
      name: "PushBump",
      division: "games",
      status: "dev",
      tagline: { tr: "Eğ, doldur, bırak.", en: "Tilt, charge, release." },
      description: {
        tr: "Telefonu eğerek oynanan çevrimiçi çok oyunculu arena oyunu.",
        en: "An online multiplayer arena game you play by tilting your phone.",
      },
      tags: ["Unity", "Mirror"],
      image: "/neuvikon/pushbump.png",
      href: "https://neuvikon-labs.github.io/games/pushbump",
    },
    {
      name: "Neu-Pummel Party",
      division: "games",
      status: "dev",
      tagline: { tr: "2–8 telefon, 30 mini oyun, tek oda.", en: "2–8 phones, 30 minigames, one room." },
      description: {
        tr: "Telefonlarla oynanan parti oyunu; tüm görseller ve sesler kodla üretiliyor.",
        en: "A party game played on phones, with all art and audio generated in code.",
      },
      tags: ["Unity 6", "Netcode"],
      image: "/neuvikon/neuparty.png",
      href: "https://neuvikon-labs.github.io/games/neu-pummel-party",
    },
    {
      name: "UnderCard",
      division: "games",
      status: "dev",
      tagline: { tr: "Elin en düşükse çağır.", en: "Call it when your hand is lowest." },
      description: {
        tr: "Cabo tarzı, gerçek zamanlı çok oyunculu mobil kart oyunu.",
        en: "A real-time multiplayer mobile card game in the Cabo family.",
      },
      tags: ["React Native", "Firebase"],
      image: "/neuvikon/undercard.png",
      href: "https://neuvikon-labs.github.io/games/undercard",
    },
    {
      name: "EdgeOut",
      division: "games",
      status: "dev",
      tagline: { tr: "Rakibinin kürelerini tahtadan it.", en: "Push your opponent's marbles off the board." },
      description: {
        tr: "Altıgen tahtada, sunucu doğrulamalı rekabetçi çevrimiçi strateji oyunu.",
        en: "Competitive online strategy on a hexagonal board, with server-validated moves.",
      },
      tags: ["TypeScript", "WebSocket"],
      image: "/neuvikon/edgeout.png",
      href: "https://neuvikon-labs.github.io/games/edgeout",
    },
    {
      name: "Muavin Sim",
      division: "games",
      status: "dev",
      tagline: { tr: "Direksiyonda değilsin — kapıdasın.", en: "You're not at the wheel — you're at the door." },
      description: {
        tr: "Şehirlerarası otobüs muavinliği üzerine simülasyon oyunu.",
        en: "A simulation game about working as an intercity bus attendant.",
      },
      tags: ["Unity", "Blender"],
      image: "/neuvikon/muavin-sim.png",
      href: "/projects/muavin-sim",
    },
    {
      name: "Card Wars",
      division: "games",
      status: "dev",
      tagline: { tr: "Hat tabanlı kart savaşı; 1v1 ya da 2v2.", en: "Lane-based card combat, 1v1 or 2v2." },
      description: {
        tr: "Takım arkadaşını ayakta tutmanın gerçek bir karar olduğu kart savaşı oyunu.",
        en: "A card battler where keeping your teammate alive is a real decision.",
      },
      tags: ["Unity 6"],
      href: "https://neuvikon-labs.github.io/games/card-wars",
    },
    {
      name: "Eclosion",
      division: "tech",
      status: "dev",
      tagline: { tr: "Altı alanda kendini geliştir.", en: "Grow in six areas at once." },
      description: {
        tr: "Kişisel gelişimin altı alanını ayrı ayrı takip eden alışkanlık uygulaması.",
        en: "A habit tracker that follows six areas of personal development separately.",
      },
      tags: ["React Native", "Expo"],
      image: "/neuvikon/eclosion.png",
      href: "https://neuvikon-labs.github.io/tech/eclosion",
    },
  ] satisfies NeuProject[],
};

// Hakkımda sayfasındaki "Odak alanları"
export const focus: { title: T; text: T }[] = [
  {
    title: { tr: "Backend & API", en: "Backend & APIs" },
    text: {
      tr: ".NET ve Spring Boot ile katmanlı mimari, JWT ile rol bazlı yetkilendirme, EF Core / JPA ile veritabanı tasarımı.",
      en: "Layered architecture with .NET and Spring Boot, role-based auth with JWT, database design with EF Core / JPA.",
    },
  },
  {
    title: { tr: "Full-stack Web", en: "Full-stack Web" },
    text: {
      tr: "React ve TypeScript ile rol bazlı arayüzler, state yönetimi ve API entegrasyonu.",
      en: "Role-based interfaces, state management and API integration with React and TypeScript.",
    },
  },
  {
    title: { tr: "Görüntü İşleme & Gerçek Zamanlı", en: "Computer Vision & Real-time" },
    text: {
      tr: "OpenCV ve MediaPipe ile görüntü işleme, WebRTC ile P2P iletişim, gerçek zamanlı ses analizi.",
      en: "Image processing with OpenCV and MediaPipe, P2P communication over WebRTC, real-time audio analysis.",
    },
  },
];

export const skills: { group: T; items: string[] }[] = [
  { group: { tr: "Diller", en: "Languages" }, items: ["C#", "Python", "Java", "JavaScript", "TypeScript", "SQL"] },
  { group: { tr: "Backend", en: "Backend" }, items: [".NET 8", "ASP.NET Core", "Entity Framework Core", "Spring Boot", "Node.js", "Socket.IO"] },
  { group: { tr: "Frontend", en: "Frontend" }, items: ["React", "Redux Toolkit", "Vite", "WPF", "Java Swing"] },
  { group: { tr: "Görüntü İşleme & AI", en: "Computer Vision & AI" }, items: ["OpenCV", "MediaPipe", "NumPy", "Tesseract OCR", "LM Studio"] },
  { group: { tr: "Veritabanı & Araçlar", en: "Data & Tools" }, items: ["SQL Server", "Git", "Docker", "Maven", "REST APIs", "WebRTC"] },
];

export const categories = {
  web: { tr: "Web & Backend", en: "Web & Backend" },
  vision: { tr: "Görüntü İşleme & AI", en: "Vision & AI" },
  desktop: { tr: "Masaüstü & Otomasyon", en: "Desktop & Automation" },
  game: { tr: "Oyun", en: "Games" },
} satisfies Record<string, T>;

export type Category = keyof typeof categories;

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: Category;
  featured?: boolean;
  summary: T; // kartlarda görünen kısa açıklama
  overview: T; // detay sayfasındaki açıklama
  highlights: Record<Lang, string[]>;
  stack: string[];
  github?: string;
  demo?: string;
  private?: boolean; // kaynak kodu paylaşılmayan proje
  wip?: boolean; // geliştirme devam ediyor
  org?: { name: string; href: string }; // bir kuruluş bünyesindeyse
  related?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "advisory-system",
    title: "Advisory System",
    year: "2026",
    category: "web",
    featured: true,
    summary: {
      tr: "Üniversite öğrencileri ve danışmanları için full-stack danışmanlık sistemi: rol bazlı yetkilendirme, çakışma kontrollü ders kaydı, doküman paylaşımı ve bildirimler.",
      en: "Full-stack university advisory system: role-based auth, course registration with conflict detection, document sharing and notifications.",
    },
    overview: {
      tr: "Öğrenci, danışman ve yönetici rollerine sahip bir üniversite danışmanlık platformu. .NET 8 ile yazılmış REST API; kimlik doğrulama, ders kaydı, ders programı, doküman yönetimi ve bildirimleri yönetiyor. React + TypeScript arayüzü her rol için ayrı ekranlar sunuyor.",
      en: "A university advisory platform with student, advisor and admin roles. The .NET 8 REST API handles authentication, course registration, schedules, document management and notifications, while the React + TypeScript frontend provides a dedicated interface for each role.",
    },
    highlights: {
      tr: [
        "JWT + refresh token ile kimlik doğrulama ve Student / Advisor / Admin rolleri",
        "Ders kaydında otomatik zaman çakışması kontrolü ve kişisel ders programı",
        "Danışmanların öğrencilerini takip etmesi, görev ataması, puanlama ve yorum",
        "Doküman yükleme/paylaşma ve toplu bildirim gönderme",
        "Entity Framework Core ile SQL Server veritabanı ve test projesi",
      ],
      en: [
        "JWT + refresh token auth with Student / Advisor / Admin roles",
        "Automatic schedule conflict detection on course registration",
        "Advisors can track students, assign submissions, rate and comment",
        "Document upload/sharing and bulk notifications",
        "SQL Server database via Entity Framework Core, plus a test project",
      ],
    },
    stack: [".NET 8", "ASP.NET Core", "EF Core", "SQL Server", "React", "TypeScript", "Vite"],
    github: "https://github.com/4RD4024N/AdvisorySystem.Api",
    related: [{ label: "Frontend repo", href: "https://github.com/4RD4024N/advisorysystemfrontend" }],
  },
  {
    slug: "ai-music-visualizer",
    title: "AI Music Visualizer",
    year: "2026",
    category: "vision",
    featured: true,
    summary: {
      tr: "Sistem sesini dinleyip yerel bir dil modeliyle çalan müziğe göre renk paleti ve görsel parametreler üreten 60 FPS gerçek zamanlı visualizer.",
      en: "A 60 FPS real-time visualizer that listens to system audio and uses a local LLM to generate palettes and visual parameters for whatever is playing.",
    },
    overview: {
      tr: "Bilgisayarda çalan sesi WASAPI loopback ile yakalayıp FFT ile 8 frekans bandına (sub-bass'tan air'e) ayırıyor. Ses anlık görüntüleri LM Studio üzerinde çalışan yerel bir modele gönderiliyor; model bir renk paleti, ruh hali etiketi ve mandala dönüş hızı, parçacık oranı, dalga genliği gibi parametreler döndürüyor. Görseller OpenGL ile 60 FPS çiziliyor.",
      en: "Captures system output via WASAPI loopback and runs FFT analysis across 8 frequency bands (sub-bass to air). Audio snapshots are sent to a local model running in LM Studio, which returns a color palette, a mood tag and parameters such as mandala rotation speed, particle rate and wave amplitude. Visuals render at 60 FPS with OpenGL.",
    },
    highlights: {
      tr: [
        "WASAPI loopback ile sistem sesi yakalama, otomatik cihaz seçimi (VB-Cable → Stereo Mix → mikrofon)",
        "8 bantlı FFT analizi",
        "Yerel LLM'den gerçek zamanlı palet ve parametre üretimi — bulut yok",
        "pyglet / OpenGL ile 60 FPS render",
      ],
      en: [
        "System audio capture via WASAPI loopback with automatic device selection (VB-Cable → Stereo Mix → mic)",
        "8-band FFT analysis",
        "Real-time palette and parameter generation from a local LLM — no cloud",
        "60 FPS rendering with pyglet / OpenGL",
      ],
    },
    stack: ["Python", "NumPy", "OpenGL", "pyglet", "LM Studio"],
    github: "https://github.com/4RD4024N/ai-visualizer",
  },
  {
    slug: "hand-gesture-media-controller",
    title: "Hand Gesture Media Controller",
    year: "2026",
    category: "vision",
    featured: true,
    summary: {
      tr: "Webcam üzerinden el hareketleriyle ses ve medya kontrolü; sesli komutla Spotify'da şarkı arama ve çalma.",
      en: "Control volume and media with hand gestures via webcam, plus voice-controlled song search on Spotify.",
    },
    overview: {
      tr: "MediaPipe ile gerçek zamanlı el takibi yapan, hareketleri sistem medya tuşlarına ve ses seviyesine çeviren bir kontrol paneli. Sesli komutla Spotify'da şarkı arayıp çalabiliyor; görsel arayüz ikonlarla hangi hareketin ne yaptığını gösteriyor.",
      en: "A control panel that tracks your hand in real time with MediaPipe and maps gestures to system media keys and volume. You can also search and play songs on Spotify by voice, and the on-screen interface shows what each gesture does.",
    },
    highlights: {
      tr: [
        "El hareketiyle ses açma/kısma, oynat/duraklat, sonraki/önceki parça",
        "Sesli komutla Spotify'da şarkı arama ve çalma (Spotipy + SpeechRecognition)",
        "Pycaw ile Windows ses kontrolü, mikrofonu sessize alma",
        "Gizli anahtarlar .env ile yönetiliyor",
      ],
      en: [
        "Volume up/down, play/pause, next/previous via gestures",
        "Voice-controlled Spotify search and playback (Spotipy + SpeechRecognition)",
        "Windows audio control with Pycaw, mic mute/unmute",
        "Secrets managed through .env",
      ],
    },
    stack: ["Python", "OpenCV", "MediaPipe", "Spotify API", "Pycaw"],
    github: "https://github.com/4RD4024N/hand_gesture_media_controller",
  },
  {
    slug: "secure-voice-app",
    title: "Secure Voice App",
    year: "2026",
    category: "web",
    featured: true,
    summary: {
      tr: "Tarayıcıda oda tabanlı, eşten eşe (P2P) sesli görüşme. WebRTC, Socket.IO signaling ve gürültü bastırma.",
      en: "Room-based peer-to-peer voice calls in the browser, with WebRTC, Socket.IO signaling and noise suppression.",
    },
    overview: {
      tr: "Kullanıcıların bir odaya katılıp doğrudan birbirleriyle sesli görüştüğü tarayıcı uygulaması. Ses akışı WebRTC ile eşler arasında doğrudan gidiyor; Node.js + Socket.IO sunucusu yalnızca bağlantı kurulumunu (signaling) yapıyor. Mikrofon sesi RNNoise (WebAssembly) ile gürültüden arındırılıyor.",
      en: "A browser app where users join a room and talk to each other directly. Audio flows peer-to-peer over WebRTC; the Node.js + Socket.IO server only handles signaling. Microphone input is denoised with RNNoise compiled to WebAssembly.",
    },
    highlights: {
      tr: [
        "Oda tabanlı bağlantı yönetimi",
        "Sunucudan geçmeyen P2P ses akışı (STUN ile NAT geçişi)",
        "RNNoise WASM ile gerçek zamanlı gürültü bastırma",
        "Sessize alma kontrolleri, ngrok ile dışarıya açılabilir",
      ],
      en: [
        "Room-based connection management",
        "P2P audio that never passes through the server (NAT traversal via STUN)",
        "Real-time noise suppression with RNNoise WASM",
        "Mute controls; can be exposed publicly via ngrok",
      ],
    },
    stack: ["WebRTC", "Node.js", "Socket.IO", "WebAssembly", "JavaScript"],
    github: "https://github.com/4RD4024N/secure-voice-app",
  },
  {
    slug: "muavin-sim",
    title: "Muavin Sim",
    year: "2026",
    category: "game",
    org: { name: "Neuvikon Games", href: "https://neuvikon-labs.github.io/games/muavin-sim" },
    private: true,
    wip: true,
    summary: {
      tr: "Unity ile geliştirdiğim şehirlerarası otobüs muavini simülasyonu. Tüm modeller sıfırdan, hazır asset yok.",
      en: "An intercity bus attendant simulation game built in Unity. Every model is made from scratch, no store assets.",
    },
    overview: {
      tr: "Şehirlerarası otobüs muavinliğini konu alan bir simülasyon oyunu. Yolcu bagajlarını yükleme, yol üzerindeki duraklar ve kontrol noktaları gibi günlük işler oynanışın merkezinde. Oyundaki tüm 3D modeller Blender'da sıfırdan hazırlanıyor. Geliştirme devam ediyor; güzergâhlar ve oynanış kapsamı genişletilecek.",
      en: "A simulation game about being an intercity bus attendant, built around everyday tasks like loading luggage, roadside stops and checkpoints. All 3D models are made from scratch in Blender. Still in development, with more routes and gameplay planned.",
    },
    highlights: {
      tr: ["Hazır asset kullanılmadan, Blender'da sıfırdan modellenen araçlar, bagajlar ve çevre", "Unity ve yeni Input System", "Yeni güzergâhlar ve oynanış özellikleri üzerinde çalışılıyor"],
      en: ["Vehicles, luggage and environments modeled from scratch in Blender — no store assets", "Unity with the new Input System", "More routes and gameplay features in the works"],
    },
    stack: ["Unity", "C#", "Blender"],
  },
  {
    slug: "economic-advisor",
    title: "Ekonomik Danışman",
    year: "2026",
    category: "web",
    private: true,
    wip: true,
    summary: {
      tr: "Piyasa verilerini ve gündemi tek yerde toplayıp LLM destekli değerlendirme yapan, yerelde çalışan kişisel bir uygulama.",
      en: "A locally run personal app that gathers market data and news in one place and adds LLM-assisted analysis.",
    },
    overview: {
      tr: "Borsa, döviz, emtia ve kripto verilerini ekonomik gündemle bir araya getiren kişisel bir piyasa takip uygulaması. Deterministik göstergeleri LLM destekli özetlerle birleştiriyor. Geliştirme devam ediyor.",
      en: "A personal market dashboard that brings together stock, FX, commodity and crypto data with economic news, combining deterministic indicators with LLM-assisted summaries. Still in development.",
    },
    highlights: {
      tr: ["FastAPI backend, React + TypeScript arayüz", "Tamamen yerelde çalışıyor"],
      en: ["FastAPI backend, React + TypeScript frontend", "Runs entirely locally"],
    },
    stack: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "shorts-pipeline",
    title: "Shorts Pipeline",
    year: "2026",
    category: "vision",
    private: true,
    summary: {
      tr: "Senaryodan yüklemeye kadar kısa video üretimini otomatikleştiren Python pipeline'ı.",
      en: "A Python pipeline that automates short-form video production from script to upload.",
    },
    overview: {
      tr: "Kısa video içeriklerini uçtan uca otomatik üreten bir pipeline: metni bir dil modeliyle oluşturuyor, stok görüntülerle videoyu hazırlıyor ve YouTube'a yüklüyor.",
      en: "An end-to-end pipeline for short-form videos: it writes the script with a language model, assembles the video from stock footage and uploads it to YouTube.",
    },
    highlights: {
      tr: ["Claude API ile senaryo üretimi", "FFmpeg ile video kurgusu", "YouTube Data API ile yükleme"],
      en: ["Script generation with the Claude API", "Video editing with FFmpeg", "Uploads via the YouTube Data API"],
    },
    stack: ["Python", "Claude API", "FFmpeg", "YouTube API"],
  },
  {
    slug: "internship-checker",
    title: "Staj Kontrol",
    year: "2026",
    category: "desktop",
    private: true,
    summary: {
      tr: "Öğrenci transkriptini okuyup staj ön koşullarının sağlanıp sağlanmadığını kontrol eden masaüstü uygulaması.",
      en: "Desktop app that reads a student transcript and checks whether internship prerequisites are met.",
    },
    overview: {
      tr: "Staj başvurularındaki ön koşul kontrolünü otomatikleştiren bir masaüstü uygulaması. Transkript PDF'ini okuyup gerekli derslerin geçilip geçilmediğini otomatik olarak kontrol ediyor.",
      en: "A desktop app that automates prerequisite checks for internship applications. It reads a transcript PDF and automatically checks whether the required courses have been passed.",
    },
    highlights: {
      tr: ["PDF transkriptten ders ve not çıkarma", "Staj I / Staj II kurallarının otomatik kontrolü"],
      en: ["Extracts courses and grades from PDF transcripts", "Automatic checks for Internship I / II rules"],
    },
    stack: ["Electron", "JavaScript", "Python"],
  },
  {
    slug: "coin-counter",
    title: "Coin Counter",
    year: "2025",
    category: "vision",
    summary: {
      tr: "Fotoğraflardaki Türk madeni paralarını tespit edip sayan, 6 farklı değeri sınıflandıran görüntü işleme programı.",
      en: "Detects and counts Turkish coins in photos, classifying 6 denominations.",
    },
    overview: {
      tr: "Yukarıdan çekilmiş fotoğraflarda Türk madeni paralarını bulup değerlerini belirleyen ve toplamı hesaplayan bir program. Sınıflandırma paraların gerçek çap oranlarına dayandığı için farklı mesafelerden çekilen fotoğraflarda da doğru çalışıyor.",
      en: "Finds Turkish coins in top-down photos, identifies their denominations and computes the total. Classification is based on real diameter ratios, so it stays accurate across photos taken from different distances.",
    },
    highlights: {
      tr: [
        "1 TL, 50, 25, 10, 5 ve 1 Kuruş tanıma",
        "RGB kanal bazlı binary mask ve morfolojik işlemler",
        "3 tespit yöntemi: kontur, SimpleBlobDetector, connected components",
        "Ölçekten bağımsız, çap oranına dayalı sınıflandırma",
      ],
      en: [
        "Recognizes 1 TL and 50, 25, 10, 5 and 1 Kuruş",
        "RGB channel-based binary masks and morphological operations",
        "3 detection methods: contours, SimpleBlobDetector, connected components",
        "Scale-independent classification based on diameter ratios",
      ],
    },
    stack: ["Python", "OpenCV", "NumPy"],
    github: "https://github.com/4RD4024N/coin_counter",
  },
  {
    slug: "spotify-overlay",
    title: "Spotify Overlay",
    year: "2025",
    category: "desktop",
    summary: {
      tr: "Windows 11'de kaybolan medya bildirimini geri getiren masaüstü uygulaması; Spotify Web API ile şarkı bilgisi ve albüm kapağı.",
      en: "Desktop app that brings back the media overlay Windows 11 removed, using the Spotify Web API for track info and album art.",
    },
    overview: {
      tr: "Windows 10'dan 11'e geçince sol üstteki küçük medya bildirimi kayboldu; bu uygulama onu geri getiriyor. İlk sürüm Spotify pencere başlığını okuyordu, ikinci sürüm OAuth ile Spotify Web API'ye bağlanıp şarkı, albüm kapağı ve ilerleme bilgisini animasyonlu bir overlay'de gösteriyor.",
      en: "Upgrading from Windows 10 to 11 removed the small media flyout in the top-left corner — this app brings it back. The first version read the Spotify window title; the second connects to the Spotify Web API via OAuth and shows the track, album art and progress in an animated overlay.",
    },
    highlights: {
      tr: [
        "OAuth ile Spotify Web API bağlantısı",
        "Şarkı, albüm kapağı ve ilerleme çubuğu",
        "Şarkı veya ses değiştiğinde animasyonla beliren overlay",
        "Tema ve ayarlar penceresi",
      ],
      en: [
        "Spotify Web API connection via OAuth",
        "Track, album art and progress bar",
        "Overlay animates in when the track or volume changes",
        "Theme support and a settings window",
      ],
    },
    stack: ["C#", ".NET", "WPF", "Spotify API"],
    github: "https://github.com/4RD4024N/SpotifyOverlayApp-v2-w-api",
    related: [{ label: "v1 (API'siz / no API)", href: "https://github.com/4RD4024N/SpotifyOverlayApp" }],
  },
  {
    slug: "education-management-system",
    title: "Education Management System",
    year: "2024",
    category: "web",
    summary: {
      tr: "ASP.NET Core API ve React arayüzüyle öğrenci kayıt ve eğitim yönetim sistemi: dersler, bölümler, duyurular ve mesajlaşma.",
      en: "Student registry and education management system with an ASP.NET Core API and React frontend: courses, departments, announcements and messaging.",
    },
    overview: {
      tr: "Bölüm, ders, ders programı ve öğrenci kayıtlarını yöneten bir eğitim yönetim sistemi. ASP.NET Core Web API repository katmanı ve DTO'larla yazıldı, React (Vite) arayüzü aynı çözüm içinde SPA proxy ile çalışıyor.",
      en: "An education management system for departments, courses, schedules and student records. The ASP.NET Core Web API uses a repository layer and DTOs, with a React (Vite) frontend served from the same solution through an SPA proxy.",
    },
    highlights: {
      tr: [
        "Öğrenci, ders, bölüm ve ders programı yönetimi",
        "Duyurular ve bildirimler",
        "Uygulama içi mesajlaşma",
        "Kimlik doğrulama ve hoş geldin e-postası gönderimi",
      ],
      en: [
        "Student, course, department and schedule management",
        "Announcements and notifications",
        "In-app chat messaging",
        "Authentication and welcome emails",
      ],
    },
    stack: ["C#", "ASP.NET Core", "EF Core", "React", "Vite"],
    github: "https://github.com/4RD4024N/Student_registry",
  },
  {
    slug: "minesweeper-bot",
    title: "Minesweeper Bot",
    year: "2025",
    category: "desktop",
    summary: {
      tr: "Ekrandaki Mayın Tarlası oyununu görüntü işleme ve OCR ile okuyup kendi kendine oynayan bot.",
      en: "A bot that reads an on-screen Minesweeper board with image processing and OCR, then plays it on its own.",
    },
    overview: {
      tr: "Kullanıcının seçtiği ekran bölgesindeki oyun tahtasının ekran görüntüsünü alıp hücrelere bölüyor. Her hücreyi parlaklık analizi ve Tesseract OCR ile sınıflandırıp tahtanın durumunu çıkarıyor, ardından PyAutoGUI ile tıklayarak oynuyor.",
      en: "Captures the game board from a user-selected screen region and splits it into cells. Each cell is classified with brightness analysis and Tesseract OCR to reconstruct the board state, then the bot plays by clicking with PyAutoGUI.",
    },
    highlights: {
      tr: [
        "Ekran bölgesi seçimi ve ızgaraya bölme",
        "Parlaklık + OCR ile hücre sınıflandırma (kapalı / boş / sayı / mayın)",
        "Fare otomasyonuyla hamle yapma",
      ],
      en: [
        "Screen region selection and grid splitting",
        "Cell classification with brightness + OCR (covered / empty / number / mine)",
        "Moves made through mouse automation",
      ],
    },
    stack: ["Python", "OpenCV", "Tesseract OCR", "PyAutoGUI"],
    github: "https://github.com/4RD4024N/mine-game-bot",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    year: "2024",
    category: "web",
    summary: {
      tr: "Kullanıcı hesapları, harita ve paylaşım özellikleri olan React + Redux hava durumu uygulaması.",
      en: "React + Redux weather app with user accounts, a map and sharing.",
    },
    overview: {
      tr: "İlk React uygulamam. Şehir arayıp hava durumunu gösteren, haritada konum gösteren ve sonucu paylaşmaya izin veren bir web uygulaması. State yönetimi Redux Toolkit ile; kayıt, giriş, şifre sıfırlama ve profil sayfaları var.",
      en: "My first React app. Search for a city to see the weather, view the location on a map and share the result. State is managed with Redux Toolkit, and it includes sign-up, login, password reset and profile pages.",
    },
    highlights: {
      tr: [
        "Şehir arama ve hava durumu API entegrasyonu",
        "Harita görünümü ve sosyal paylaşım butonları",
        "Redux Toolkit ile hava durumu, kullanıcı, tema ve arama state'leri",
        "Kayıt / giriş / şifre sıfırlama / profil sayfaları, açık-koyu tema",
      ],
      en: [
        "City search and weather API integration",
        "Map view and social share buttons",
        "Redux Toolkit slices for weather, user, theme and search",
        "Sign-up / login / password reset / profile pages, light-dark theme",
      ],
    },
    stack: ["React", "Redux Toolkit", "React Router", "JavaScript"],
    github: "https://github.com/4RD4024N/weather-app",
  },
  {
    slug: "e-shopping-app",
    title: "E-Shopping App",
    year: "2024",
    category: "web",
    summary: {
      tr: "Spring Boot ve Maven ile yazılmış e-ticaret uygulaması: ürünler, sepet ve kullanıcı girişi.",
      en: "E-commerce application built with Spring Boot and Maven: products, cart and user login.",
    },
    overview: {
      tr: "İlk e-ticaret uygulamam. Spring Boot ile controller / service / repository katmanlarına ayrılmış bir yapı; ürün listeleme ve detay, sepete ekleme ve kullanıcı girişi sunucu tarafında render edilen sayfalarla yapılıyor.",
      en: "My first e-commerce application. A Spring Boot app split into controller / service / repository layers, with product listing and details, a shopping cart and user login rendered on the server.",
    },
    highlights: {
      tr: [
        "Controller / Service / Repository katmanlı mimari",
        "Ürün listeleme, ürün detayı ve sepet yönetimi",
        "Kullanıcı kaydı ve girişi",
        "Spring Data JPA ile veri erişimi",
      ],
      en: [
        "Layered Controller / Service / Repository architecture",
        "Product listing, product details and cart management",
        "User registration and login",
        "Data access with Spring Data JPA",
      ],
    },
    stack: ["Java", "Spring Boot", "Spring Data JPA", "Maven", "Thymeleaf"],
    github: "https://github.com/4RD4024N/Arda-veris",
  },
  {
    slug: "java-social-app",
    title: "LinkedIn-style Desktop App",
    year: "2023",
    category: "desktop",
    summary: {
      tr: "Java Swing ile LinkedIn benzeri masaüstü uygulaması: profil, arkadaş arama ve maaş verileriyle iş arama.",
      en: "LinkedIn-style desktop app in Java Swing: profiles, friend search and job search with salary data.",
    },
    overview: {
      tr: "Java Swing ile yazılmış, LinkedIn'den esinlenen bir masaüstü uygulaması. Kullanıcı profili ve profil fotoğrafı, CSV veri setinden arkadaş arama ve şirket/maaş verileriyle iş ilanı arama özellikleri var.",
      en: "A desktop app inspired by LinkedIn, written in Java Swing. It has user profiles with profile photos, friend search over a CSV dataset and job search with company and salary data.",
    },
    highlights: {
      tr: [
        "Giriş ekranı ve kullanıcı profili, dosya seçiciyle profil fotoğrafı",
        "CSV veri setinden arkadaş arama",
        "Şirket ve maaş verileriyle iş ilanı arama",
      ],
      en: [
        "Login screen and user profile, profile photo via file chooser",
        "Friend search over a CSV dataset",
        "Job search with company and salary data",
      ],
    },
    stack: ["Java", "Swing", "CSV"],
    github: "https://github.com/4RD4024N/basic_java_GUI",
  },
];

// Arayüz yazıları
export const ui = {
  nav: {
    home: { tr: "Ana Sayfa", en: "Home" },
    projects: { tr: "Projeler", en: "Projects" },
    experience: { tr: "Deneyim", en: "Experience" },
    about: { tr: "Hakkımda", en: "About" },
    contact: { tr: "İletişim", en: "Contact" },
  },
  available: { tr: "Yeni iş fırsatlarına açığım", en: "Open to new opportunities" },
  seeProjects: { tr: "Projeleri incele", en: "View projects" },
  getInTouch: { tr: "İletişime geç", en: "Get in touch" },
  downloadCv: { tr: "CV indir", en: "Download CV" },
  featured: { tr: "Öne çıkan projeler", en: "Featured projects" },
  allProjects: { tr: "Tüm projeler", en: "All projects" },
  projectsIntro: {
    tr: "Okul projelerinden kendi kullandığım araçlara kadar geliştirdiğim projeler. Çoğunun kaynak kodu GitHub'da, bazıları özel.",
    en: "Things I've built, from university projects to tools I use myself. Most are open source on GitHub; a few are private.",
  },
  all: { tr: "Tümü", en: "All" },
  details: { tr: "Detaylar", en: "Details" },
  overview: { tr: "Genel bakış", en: "Overview" },
  highlights: { tr: "Öne çıkanlar", en: "Highlights" },
  stack: { tr: "Teknolojiler", en: "Tech stack" },
  year: { tr: "Yıl", en: "Year" },
  category: { tr: "Kategori", en: "Category" },
  links: { tr: "Bağlantılar", en: "Links" },
  sourceCode: { tr: "Kaynak kod", en: "Source code" },
  privateRepo: { tr: "Özel", en: "Private" },
  privateNote: { tr: "Bu projenin kaynak kodu özel.", en: "The source code for this project is private." },
  wip: { tr: "Geliştiriliyor", en: "In progress" },
  liveDemo: { tr: "Canlı demo", en: "Live demo" },
  back: { tr: "Tüm projeler", en: "All projects" },
  next: { tr: "Sonraki proje", en: "Next project" },
  aboutTitle: { tr: "Hakkımda", en: "About me" },
  focus: { tr: "Odak alanları", en: "Focus areas" },
  skills: { tr: "Yetenekler", en: "Skills" },
  education: { tr: "Eğitim", en: "Education" },
  experienceTitle: { tr: "Deneyim", en: "Experience" },
  experienceIntro: {
    tr: "Gönüllü olarak yer aldığım Neuvikon ve stüdyonun üzerinde çalıştığı projeler.",
    en: "Neuvikon, where I volunteer, and the projects the studio is working on.",
  },
  divisions: { tr: "Bölümler", en: "Divisions" },
  studioProjects: { tr: "Neuvikon projeleri", en: "Neuvikon projects" },
  studioProjectsNote: {
    tr: "Stüdyonun yürüttüğü projeler. Ayrıntılar Neuvikon'un sitesinde.",
    en: "Projects the studio is working on. More details on Neuvikon's site.",
  },
  visitSite: { tr: "Neuvikon'un sitesi", en: "Neuvikon's website" },
  live: { tr: "Yayında", en: "Live" },
  inDev: { tr: "Geliştirmede", en: "In development" },
  seeExperience: { tr: "Deneyimi incele", en: "View experience" },
  partOf: { tr: "Bünyesinde", en: "Part of" },
  contactTitle: { tr: "Birlikte çalışalım", en: "Let's work together" },
  contactText: {
    tr: "Bir iş fırsatı ya da proje hakkında konuşmak için e-posta gönderebilirsin. Genelde bir-iki gün içinde dönüyorum.",
    en: "Reach out about a job opportunity or a project. I usually reply within a day or two.",
  },
  ctaTitle: { tr: "Bir fikrin mi var?", en: "Have something in mind?" },
  ctaText: {
    tr: "Yeni iş fırsatlarına açığım. Konuşmak istersen bir e-posta yeterli.",
    en: "I'm open to new opportunities. An email is all it takes.",
  },
  email: { tr: "E-posta", en: "Email" },
  copy: { tr: "Kopyala", en: "Copy" },
  copied: { tr: "Kopyalandı", en: "Copied" },
  elsewhere: { tr: "Diğer hesaplar", en: "Elsewhere" },
  notFound: { tr: "Aradığın sayfa bulunamadı.", en: "The page you're looking for doesn't exist." },
  goHome: { tr: "Ana sayfaya dön", en: "Back to home" },
} satisfies Record<string, T | Record<string, T>>;
