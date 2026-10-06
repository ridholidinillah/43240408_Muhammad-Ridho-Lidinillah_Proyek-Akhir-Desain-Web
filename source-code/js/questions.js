/**
 * DinoLearn: Bank Soal & Modul Game Edukasi
 * Terdiri dari 5 Stage x 5 Soal Interaktif (Total 25 Soal Lengkap)
 * Bahasa Indonesia, Kaya Konteks Visual & Audio
 */

const DINO_GAME_STAGES = [
  // =========================================================================
  // STAGE 1: HUTAN HURUF (Mengenal Huruf, Vokal, Alfabet Dasar)
  // =========================================================================
  {
    id: 1,
    key: 'hutan-huruf',
    title: 'Hutan Huruf',
    themeIcon: '🌲',
    badgeClass: 'bg-mint',
    tagline: 'Tahap 1: Petualangan Huruf Pertama',
    questions: [
      {
        id: 's1_q1',
        prompt: 'Huruf apa yang menjadi awalan untuk buah APEL yang manis ini?',
        visual: {
          type: 'big-icon',
          icon: '🍎',
          word: '_ P E L'
        },
        options: [
          { label: 'A', sub: 'Huruf A', isCorrect: true, icon: '🅰️' },
          { label: 'B', sub: 'Huruf B', isCorrect: false, icon: '🅱️' },
          { label: 'C', sub: 'Huruf C', isCorrect: false, icon: '🅲' },
          { label: 'D', sub: 'Huruf D', isCorrect: false, icon: '🅳' }
        ],
        explanation: 'Benar sekali! Apel diawali dengan huruf A! A untuk Apel! 🍎'
      },
      {
        id: 's1_q2',
        prompt: 'Manakah huruf "B" untuk BEBEK lucu yang suka berenang?',
        visual: {
          type: 'big-icon',
          icon: '🦆',
          word: 'B E B E K'
        },
        options: [
          { label: 'D', sub: 'Bukan B', isCorrect: false, icon: '🅳' },
          { label: 'B', sub: 'Tepat sekali!', isCorrect: true, icon: '🅱️' },
          { label: 'P', sub: 'Bukan B', isCorrect: false, icon: '🅿️' },
          { label: 'R', sub: 'Bukan B', isCorrect: false, icon: '🇷' }
        ],
        explanation: 'Keren! B adalah untuk Bebek yang berenang riang kwek-kwek! 🦆'
      },
      {
        id: 's1_q3',
        prompt: 'Lengkapi huruf yang hilang untuk sahabat kita: D - I - N - [ ? ]',
        visual: {
          type: 'big-icon',
          icon: '🦖',
          word: 'D - I - N - ?'
        },
        options: [
          { label: 'O', sub: 'Membentuk DINO', isCorrect: true, icon: '🅾️' },
          { label: 'A', sub: 'Membentuk DINA', isCorrect: false, icon: '🅰️' },
          { label: 'U', sub: 'Membentuk DINU', isCorrect: false, icon: '🇺' },
          { label: 'I', sub: 'Membentuk DINI', isCorrect: false, icon: 'ℹ️' }
        ],
        explanation: 'Hebat! Huruf O melengkapi kata D - I - N - O! Rawrr! 🦖'
      },
      {
        id: 's1_q4',
        prompt: 'Manakah di bawah ini yang merupakan Huruf VOKAL (A, I, U, E, O)?',
        visual: {
          type: 'big-icon',
          icon: '🌟',
          word: 'HURUF VOKAL'
        },
        options: [
          { label: 'K', sub: 'Huruf Konsonan', isCorrect: false, icon: '🅺' },
          { label: 'E', sub: 'Huruf Vokal', isCorrect: true, icon: '🅴' },
          { label: 'T', sub: 'Huruf Konsonan', isCorrect: false, icon: '🆃' },
          { label: 'M', sub: 'Huruf Konsonan', isCorrect: false, icon: '🅼' }
        ],
        explanation: 'Tepat! Huruf E adalah huruf vokal seperti pada Es Krim dan Elang! 🍦'
      },
      {
        id: 's1_q5',
        prompt: 'Manakah bentuk huruf KECIL yang cocok untuk huruf BESAR "M"?',
        visual: {
          type: 'big-icon',
          icon: '☀️',
          word: 'HURUF [ M ]'
        },
        options: [
          { label: 'm', sub: 'Huruf kecil m', isCorrect: true, icon: 'ⓜ' },
          { label: 'n', sub: 'Huruf kecil n', isCorrect: false, icon: 'ⓝ' },
          { label: 'w', sub: 'Huruf kecil w', isCorrect: false, icon: 'ⓦ' },
          { label: 'u', sub: 'Huruf kecil u', isCorrect: false, icon: 'ⓤ' }
        ],
        explanation: 'Pintar! Pasangan dari M besar adalah m kecil seperti pada Matahari! ☀️'
      }
    ]
  },

  // =========================================================================
  // STAGE 2: LEMBAH HEWAN (Mengenal Hewan, Dino, Habitat & Karakteristik)
  // =========================================================================
  {
    id: 2,
    key: 'lembah-hewan',
    title: 'Lembah Hewan',
    themeIcon: '🦁',
    badgeClass: 'bg-sky',
    tagline: 'Tahap 2: Sahabat Fauna Rimba',
    questions: [
      {
        id: 's2_q1',
        prompt: 'Hewan gagah manakah yang berjuluk Raja Hutan dan bersuara "ROAAAR"?',
        visual: {
          type: 'big-icon',
          icon: '👑',
          word: 'RAJA RIMBA'
        },
        options: [
          { label: 'Singa', sub: 'Raja Hutan', isCorrect: true, icon: '🦁' },
          { label: 'Kucing', sub: 'Meow kecil', isCorrect: false, icon: '🐱' },
          { label: 'Kelinci', sub: 'Suka wortel', isCorrect: false, icon: '🐰' },
          { label: 'Kuda', sub: 'Ringkik', isCorrect: false, icon: '🐴' }
        ],
        explanation: 'Tepat sekali! Singa adalah raja rimba yang gagah dan pemberani! 🦁'
      },
      {
        id: 's2_q2',
        prompt: 'Dinosaurus leher panjang pemakan daun di pohon tinggi adalah...',
        visual: {
          type: 'big-icon',
          icon: '🌿',
          word: 'LEHER PANJANG'
        },
        options: [
          { label: 'Brontosaurus', sub: 'Leher Panjang', isCorrect: true, icon: '🦕' },
          { label: 'T-Rex', sub: 'Tangan Kecil', isCorrect: false, icon: '🦖' },
          { label: 'Triceratops', sub: 'Cula Tiga', isCorrect: false, icon: '🦏' },
          { label: 'Velociraptor', sub: 'Pelari Cepat', isCorrect: false, icon: '🦎' }
        ],
        explanation: 'Brontosaurus punya leher sangat panjang untuk memetik dedaunan hijau! 🦕'
      },
      {
        id: 's2_q3',
        prompt: 'Hewan zaman purba yang memiliki sayap lebar dan bisa terbang di angkasa adalah...',
        visual: {
          type: 'big-icon',
          icon: '☁️',
          word: 'SAYAP TERBANG'
        },
        options: [
          { label: 'Pterodactyl', sub: 'Dino Terbang', isCorrect: true, icon: '🦅' },
          { label: 'Stegosaurus', sub: 'Punggung Duri', isCorrect: false, icon: '🐊' },
          { label: 'Ikan Purba', sub: 'Berenang di Air', isCorrect: false, icon: '🐟' },
          { label: 'Gajah Purba', sub: 'Berjalan di Darat', isCorrect: false, icon: '🐘' }
        ],
        explanation: 'Hebat! Pterodactyl terbang bebas melintasi awan dan gunung berapi! 🦅'
      },
      {
        id: 's2_q4',
        prompt: 'Dinosaurus pemakan tumbuhan dan dedaunan segar disebut...',
        visual: {
          type: 'big-icon',
          icon: '🥗',
          word: 'MAKAN RUMPUT'
        },
        options: [
          { label: 'Herbivora', sub: 'Pemakan Tumbuhan', isCorrect: true, icon: '🌱' },
          { label: 'Karnivora', sub: 'Pemakan Daging', isCorrect: false, icon: '🍖' },
          { label: 'Insektivora', sub: 'Pemakan Serangga', isCorrect: false, icon: '🐛' },
          { label: 'Robot Dino', sub: 'Mesin Buatan', isCorrect: false, icon: '🤖' }
        ],
        explanation: 'Pintar! Hewan herbivora sangat suka memakan daun, rumput, dan buah-buahan! 🥗'
      },
      {
        id: 's2_q5',
        prompt: 'Serangga mungil bergaris hitam-kuning yang menghasilkan madu manis lezat adalah...',
        visual: {
          type: 'big-icon',
          icon: '🍯',
          word: 'PENGHASIL MADU'
        },
        options: [
          { label: 'Lebah Madu', sub: 'Bzz... Bzz...', isCorrect: true, icon: '🐝' },
          { label: 'Kupu-kupu', sub: 'Sayap Indah', isCorrect: false, icon: '🦋' },
          { label: 'Kumbang', sub: 'Sayap Keras', isCorrect: false, icon: '🐞' },
          { label: 'Capung', sub: 'Terbang Lincah', isCorrect: false, icon: '🦗' }
        ],
        explanation: 'Tepat! Lebah madu mengumpulkan nektar bunga menjadi madu yang bergizi! 🐝🍯'
      }
    ]
  },

  // =========================================================================
  // STAGE 3: GUNUNG ANGKA (Menghitung Objek, Penjumlahan & Pengurangan)
  // =========================================================================
  {
    id: 3,
    key: 'gunung-angka',
    title: 'Gunung Angka',
    themeIcon: '⛰️',
    badgeClass: 'bg-yellow',
    tagline: 'Tahap 3: Menghitung Telur Emas',
    questions: [
      {
        id: 's3_q1',
        prompt: 'Ayo hitung bersama! Ada berapa telur dino emas di dalam sarang?',
        visual: {
          type: 'count-objects',
          items: ['🥚', '🥚', '🥚'],
          hint: 'Hitung satu per satu!'
        },
        options: [
          { label: '3', sub: 'Tiga Telur', isCorrect: true, icon: '3️⃣' },
          { label: '2', sub: 'Dua Telur', isCorrect: false, icon: '2️⃣' },
          { label: '4', sub: 'Empat Telur', isCorrect: false, icon: '4️⃣' },
          { label: '5', sub: 'Lima Telur', isCorrect: false, icon: '5️⃣' }
        ],
        explanation: 'Luar biasa! Tepat ada 3 telur dino emas: satu, dua, tiga! 🥚🥚🥚'
      },
      {
        id: 's3_q2',
        prompt: 'Rexy punya 2 apel 🍎🍎. Tricey memberi 2 apel lagi 🍎🍎. Berapa total apel sekarang? (2 + 2 = ?)',
        visual: {
          type: 'count-objects',
          items: ['🍎', '🍎', '➕', '🍎', '🍎'],
          hint: '2 ditambah 2 sama dengan berapa?'
        },
        options: [
          { label: '4', sub: 'Empat Apel', isCorrect: true, icon: '4️⃣' },
          { label: '3', sub: 'Tiga Apel', isCorrect: false, icon: '3️⃣' },
          { label: '5', sub: 'Lima Apel', isCorrect: false, icon: '5️⃣' },
          { label: '6', sub: 'Enam Apel', isCorrect: false, icon: '6️⃣' }
        ],
        explanation: 'Hebat sekali! 2 + 2 = 4 apel segar dan lezat! 🍎'
      },
      {
        id: 's3_q3',
        prompt: 'Berapa banyak buah pisang kuning yang ada di dalam keranjang Stego?',
        visual: {
          type: 'count-objects',
          items: ['🍌', '🍌', '🍌', '🍌', '🍌'],
          hint: 'Hitung semua pisang kuning!'
        },
        options: [
          { label: '5', sub: 'Lima Pisang', isCorrect: true, icon: '5️⃣' },
          { label: '4', sub: 'Empat Pisang', isCorrect: false, icon: '4️⃣' },
          { label: '6', sub: 'Enam Pisang', isCorrect: false, icon: '6️⃣' },
          { label: '7', sub: 'Tujuh Pisang', isCorrect: false, icon: '7️⃣' }
        ],
        explanation: 'Pintar! Ada 5 pisang manis untuk sarapan para dino cilik! 🍌'
      },
      {
        id: 's3_q4',
        prompt: 'Ibu Dino punya 5 kue mangkok 🧁. Stego memakan 1 kue. Sisa berapa kue sekarang? (5 - 1 = ?)',
        visual: {
          type: 'count-objects',
          items: ['🧁', '🧁', '🧁', '🧁', '❌'],
          hint: '5 dikurangi 1 sama dengan...'
        },
        options: [
          { label: '4', sub: 'Empat Kue Sisa', isCorrect: true, icon: '4️⃣' },
          { label: '3', sub: 'Tiga Kue Sisa', isCorrect: false, icon: '3️⃣' },
          { label: '2', sub: 'Dua Kue Sisa', isCorrect: false, icon: '2️⃣' },
          { label: '5', sub: 'Masih utuh', isCorrect: false, icon: '5️⃣' }
        ],
        explanation: 'Tepat sekali! 5 kue dimakan 1, maka tersisa 4 kue lezat! 🧁'
      },
      {
        id: 's3_q5',
        prompt: 'Manakah angka yang LEBIH BESAR antara 7 dan 4?',
        visual: {
          type: 'big-icon',
          icon: '⚖️',
          word: '7 vs 4'
        },
        options: [
          { label: '7', sub: 'Tujuh lebih banyak', isCorrect: true, icon: '7️⃣' },
          { label: '4', sub: 'Empat lebih sedikit', isCorrect: false, icon: '4️⃣' },
          { label: 'Sama besar', sub: 'Sama nilainya', isCorrect: false, icon: '🟰' },
          { label: '0', sub: 'Nol', isCorrect: false, icon: '0️⃣' }
        ],
        explanation: 'Hebat! Angka 7 tentu lebih besar dan lebih banyak daripada 4! ⭐'
      }
    ]
  },

  // =========================================================================
  // STAGE 4: GUA POLA (Mengenal Pola Warna, Bentuk Geometri & Logika)
  // =========================================================================
  {
    id: 4,
    key: 'gua-pola',
    title: 'Gua Pola',
    themeIcon: '🔮',
    badgeClass: 'bg-purple',
    tagline: 'Tahap 4: Rahasia Kristal Ajaib',
    questions: [
      {
        id: 's4_q1',
        prompt: 'Perhatikan pola kristal gua ini: Merah 🔴 ➔ Kuning 🟡 ➔ Merah 🔴 ➔ [ ? ]',
        visual: {
          type: 'pattern',
          sequence: ['🔴', '🟡', '🔴', '❓']
        },
        options: [
          { label: '🟡 Kuning', sub: 'Pola selang-seling', isCorrect: true, icon: '🟡' },
          { label: '🔴 Merah', sub: 'Bukan merah lagi', isCorrect: false, icon: '🔴' },
          { label: '🔵 Biru', sub: 'Tidak ada biru', isCorrect: false, icon: '🔵' },
          { label: '🟢 Hijau', sub: 'Tidak ada hijau', isCorrect: false, icon: '🟢' }
        ],
        explanation: 'Keren! Polanya berselang-seling: Merah, Kuning, Merah, lalu Kuning lagi! 🟡'
      },
      {
        id: 's4_q2',
        prompt: 'Bentuk geometri apa yang melengkapi pola: Lingkaran 🔵 ➔ Segitiga 🔺 ➔ Lingkaran 🔵 ➔ [ ? ]',
        visual: {
          type: 'pattern',
          sequence: ['🔵', '🔺', '🔵', '❓']
        },
        options: [
          { label: '🔺 Segitiga', sub: 'Pola Geometri', isCorrect: true, icon: '🔺' },
          { label: '🔵 Lingkaran', sub: 'Sudah ada', isCorrect: false, icon: '🔵' },
          { label: '🟩 Kotak', sub: 'Belum muncul', isCorrect: false, icon: '🟩' },
          { label: '⭐ Bintang', sub: 'Bukan pola ini', isCorrect: false, icon: '⭐' }
        ],
        explanation: 'Tepat! Setelah Lingkaran muncul Segitiga 🔺! Kamu cerdas!'
      },
      {
        id: 's4_q3',
        prompt: 'Lengkapi pola ukuran keluarga dino: Dino Kecil 🐣 ➔ Dino Sedang 🦖 ➔ Dino Besar 🦕 ➔ Dino Kecil 🐣 ➔ [ ? ]',
        visual: {
          type: 'pattern',
          sequence: ['🐣', '🦖', '🦕', '🐣', '❓']
        },
        options: [
          { label: '🦖 Dino Sedang', sub: 'Urutan berikutnya', isCorrect: true, icon: '🦖' },
          { label: '🦕 Dino Besar', sub: 'Terlalu awal', isCorrect: false, icon: '🦕' },
          { label: '🐣 Dino Kecil', sub: 'Sudah baru saja', isCorrect: false, icon: '🐣' },
          { label: '🥚 Telur', sub: 'Bukan telur', isCorrect: false, icon: '🥚' }
        ],
        explanation: 'Bagus sekali! Pola ukuran berulang: Kecil, Sedang, Besar! Selanjutnya Sedang 🦖!'
      },
      {
        id: 's4_q4',
        prompt: 'Bantu Stego melengkapi deret angka ajaib kelipatan 2: 2 ➔ 4 ➔ 6 ➔ [ ? ]',
        visual: {
          type: 'pattern',
          sequence: ['2️⃣', '4️⃣', '6️⃣', '❓']
        },
        options: [
          { label: '8', sub: 'Lompat 2 angka', isCorrect: true, icon: '8️⃣' },
          { label: '7', sub: 'Hanya lompat 1', isCorrect: false, icon: '7️⃣' },
          { label: '9', sub: 'Bukan kelipatan', isCorrect: false, icon: '9️⃣' },
          { label: '10', sub: 'Terlalu jauh', isCorrect: false, icon: '🔟' }
        ],
        explanation: 'Wah jago berhitung! 2, 4, 6, lalu 8! Setiap langkah bertambah 2! 8️⃣'
      },
      {
        id: 's4_q5',
        prompt: 'Perhatikan arah lompatan Bronto: Panah Atas ⬆️ ➔ Panah Bawah ⬇️ ➔ Panah Atas ⬆️ ➔ [ ? ]',
        visual: {
          type: 'pattern',
          sequence: ['⬆️', '⬇️', '⬆️', '❓']
        },
        options: [
          { label: '⬇️ Bawah', sub: 'Arah berikutnya', isCorrect: true, icon: '⬇️' },
          { label: '⬆️ Atas', sub: 'Sudah sebelumnya', isCorrect: false, icon: '⬆️' },
          { label: '➡️ Kanan', sub: 'Bukan pola ini', isCorrect: false, icon: '➡️' },
          { label: '⬅️ Kiri', sub: 'Bukan pola ini', isCorrect: false, icon: '⬅️' }
        ],
        explanation: 'Hebat! Atas lalu Bawah, Atas lalu Bawah ⬇️! Gua Pola terbuka lebar!'
      }
    ]
  },

  // =========================================================================
  // STAGE 5: PULAU JUARA (Tantangan Pamungkas Huruf, Angka & Logika Juara)
  // =========================================================================
  {
    id: 5,
    key: 'pulau-juara',
    title: 'Pulau Juara',
    themeIcon: '🏝️',
    badgeClass: 'bg-coral',
    tagline: 'Tahap 5: Puncak Tantangan Kejuaraan',
    questions: [
      {
        id: 's5_q1',
        prompt: 'Ayo susun kata rahasia pemenang sejati: J - U - A - R - [ ? ]',
        visual: {
          type: 'big-icon',
          icon: '🏆',
          word: 'J - U - A - R - ?'
        },
        options: [
          { label: 'A', sub: 'Membentuk JUARA', isCorrect: true, icon: '🅰️' },
          { label: 'I', sub: 'Membentuk JUARI', isCorrect: false, icon: 'ℹ️' },
          { label: 'U', sub: 'Membentuk JUARU', isCorrect: false, icon: '🇺' },
          { label: 'E', sub: 'Membentuk JUARE', isCorrect: false, icon: '🅴' }
        ],
        explanation: 'YAY! Huruf A melengkapi kata J - U - A - R - A! Kamu memang juara! 🏆'
      },
      {
        id: 's5_q2',
        prompt: 'Peti emas terbuka jika kamu menebak angka genap di antara 8 dan 12! Angka berapakah itu?',
        visual: {
          type: 'big-icon',
          icon: '🪙',
          word: '8 ... [ ? ] ... 12'
        },
        options: [
          { label: '10', sub: 'Angka Sepuluh', isCorrect: true, icon: '🔟' },
          { label: '9', sub: 'Angka Ganjil', isCorrect: false, icon: '9️⃣' },
          { label: '11', sub: 'Angka Ganjil', isCorrect: false, icon: '1️⃣' },
          { label: '7', sub: 'Kurang dari 8', isCorrect: false, icon: '7️⃣' }
        ],
        explanation: 'Tepat sekali! Angka 10 ada di tengah-tengah antara 8 dan 12! Peti emas terbuka! 🪙'
      },
      {
        id: 's5_q3',
        prompt: 'Di Pulau Juara ada 4 dino hijau 🦖 dan 4 dino biru 🦕 sedang berpesta. Berapa total dino? (4 + 4 = ?)',
        visual: {
          type: 'count-objects',
          items: ['🦖', '🦖', '🦖', '🦖', '➕', '🦕', '🦕', '🦕', '🦕'],
          hint: 'Hitung semua dino yang sedang berdansa!'
        },
        options: [
          { label: '8', sub: 'Delapan Dino', isCorrect: true, icon: '8️⃣' },
          { label: '7', sub: 'Tujuh Dino', isCorrect: false, icon: '7️⃣' },
          { label: '9', sub: 'Sembilan Dino', isCorrect: false, icon: '9️⃣' },
          { label: '6', sub: 'Enam Dino', isCorrect: false, icon: '6️⃣' }
        ],
        explanation: 'Hebat! 4 + 4 = 8 dino bersukaria menyambut sang juara! 🦖🦕'
      },
      {
        id: 's5_q4',
        prompt: 'Matahari ☀️ menyinari pulau, pohon tumbuh hijau 🌴, dan burung bernyanyi 🐦. Warna apakah langit cerah di siang hari?',
        visual: {
          type: 'big-icon',
          icon: '☀️',
          word: 'LANGIT SIANG'
        },
        options: [
          { label: 'Biru Cerah', sub: 'Warna Langit', isCorrect: true, icon: '🟦' },
          { label: 'Hitam Gelap', sub: 'Warna Malam', isCorrect: false, icon: '⬛' },
          { label: 'Cokelat Tanah', sub: 'Warna Bumi', isCorrect: false, icon: '🟫' },
          { label: 'Abu-Abu Mendung', sub: 'Hujan badai', isCorrect: false, icon: '⬜' }
        ],
        explanation: 'Benar sekali! Langit di siang hari berwarna biru cerah mempesona! 🌤️'
      },
      {
        id: 's5_q5',
        prompt: 'Apa sikap terpuji seorang Petualang Cilik DinoLearn saat belajar bersama?',
        visual: {
          type: 'big-icon',
          icon: '💖',
          word: 'SIKAP JUARA'
        },
        options: [
          { label: 'Selalu Jujur, Gembira, & Suka Menolong!', sub: 'Petualang Hebat', isCorrect: true, icon: '🌟' },
          { label: 'Cepat marah jika kalah', sub: 'Tidak baik', isCorrect: false, icon: '😠' },
          { label: 'Malas mencoba', sub: 'Tidak boleh', isCorrect: false, icon: '😴' },
          { label: 'Menyontek teman', sub: 'Tidak jujur', isCorrect: false, icon: '🙈' }
        ],
        explanation: 'LUAR BIASA! Petualang sejati selalu jujur, ceria, tekun, dan senang menolong! Kamu adalah Juara Sejati! 🎓🎉'
      }
    ]
  }
];

// Helper untuk mengambil stage berdasarkan ID
function getStageById(stageId) {
  return DINO_GAME_STAGES.find(s => s.id === Number(stageId)) || DINO_GAME_STAGES[0];
}
