# DinoLearn: Petualangan Pulau Edukasi 🦕🏝️

## Informasi Mahasiswa
* **Nama**: Muhammad Ridho Lidinillah
* **NIM**: 43240408
* **Kelas**: SI 4A-2024

---

## Nama & Tujuan Proyek
* **Nama Proyek**: DinoLearn - Petualangan Pulau Edukasi
* **Tujuan Proyek**: Mengembangkan aplikasi web edukasi interaktif berbasis game (*gamified learning platform*) yang dirancang khusus untuk anak-anak usia dini hingga sekolah dasar. Aplikasi ini bertujuan untuk membantu anak-anak belajar huruf, pengenalan hewan, berhitung, dan logika pola melalui pengalaman belajar yang menyenangkan, adaptif, serta ramah pengguna di perangkat PC maupun *mobile*.

---

## Sasaran Pengguna
* Anak-anak usia dini hingga sekolah dasar (TK - SD) yang sedang belajar dasar-dasar literasi dan numerasi.
* Orang tua dan pendidik yang membutuhkan media pembelajaran interaktif berbasis web.

---

## Daftar Halaman & Fitur
1. **Halaman Profil & Pemilihan Karakter**:
   * Pendaftaran nama pemain tanpa opsi *default* (bebas input).
   * Pemilihan avatar karakter kustom untuk mempersonalisasi permainan.
2. **Halaman Peta Pulau Edukasi (Island Navigation)**:
   * **Hutan Huruf**: Modul latihan mengenal abjad dan membaca huruf awal.
   * **Lembah Hewan**: Modul pengenalan jenis dan nama hewan.
   * **Gunung Angka**: Latihan berhitung dasar dan operasi aritmatika.
   * **Gua Pola**: Latihan pemecahan masalah dan pengenalan pola/urutan.
   * **Pulau Juara**: Modul tantangan evaluasi gabungan seluruh materi.
3. **Sistem Suara & Interaktivitas**:
   * **Web Speech API**: Pengucapan soal secara otomatis dalam bahasa Indonesia (`id-ID`).
   * **Audio Synthesizer (Web Audio API)**: Efek suara interaktif untuk jawaban benar, salah, klik tombol, serta musik latar belakang (*BGM*).
4. **Halaman Sertifikat & Penghargaan**:
   * Tampilan perolehan bintang (*star rating*) dan skor akhir.
   * Sertifikat kemenangan digital yang dipersonalisasi sesuai nama pemain.

---

## Tautan Proyek
* **Tautan Figma**: [https://www.figma.com/design/cFNnhVSNWCLlDv1e8WVfda/Projek-Akhir-Desain-Web---Game-Anak?node-id=0-1&t=FpMEwfPVieWvpZIG-1]
* **Tautan Video Pengerjaan Figma**: [https://drive.google.com/file/d/1Fkuqz1FC29_c8tv6LQMOE4NVrnN6rbOl/view?usp=sharing]
* **Tautan Video Demonstrasi Aplikasi**: [https://drive.google.com/file/d/129GSCKWlxJwj5Ru63C7XAK2tPBPjmUK1/view?usp=sharing]
* **Tautan Live Preview (GitHub Pages)**: [https://ridholidinillah.github.io/43240408_Muhammad-Ridho-Lidinillah_Proyek-Akhir-Desain-Web/source-code/]

---

## Cara Menjalankan Halaman Web
1. **Melalui Live Preview (Browser)**:
   * Buka tautan GitHub Pages yang tertera di atas pada browser komputer atau *smartphone*.
2. **Melalui Perangkat Lokal**:
   * *Clone* atau *download* repositori ini ke komputer kamu.
   * Buka direktori `source-code/`.
   * Buka file `index.html` menggunakan browser favorit kamu (Google Chrome, Edge, Safari, atau Firefox).

---

## Catatan Hasil Pengujian & Perbaikan

| No | Modul / Fitur | Kendala / Masalah Utama | Perbaikan yang Dilakukan |
|---|---|---|---|
| 1 | Responsivitas Perangkat | Tampilan antarmuka (*UI*) kurang rapi saat dibuka pada layar HP/Mobile. | Menambahkan *responsive layout design* (Flexbox/Grid) dan optimasi ukuran tombol touch-friendly. |
| 2 | Sistem Suara (Audio) | Suara pengucapan soal tidak muncul di beberapa browser mobile. | Mengoptimalkan *fallback* Web Speech API dan sintesis audio berbasis Web Audio API agar kompatibel di lintas browser. |
| 3 | Input Profil Pemain | Terkadang profil terisi nama default secara otomatis. | Memperbaiki logika form agar input nama murni dimulai dari kondisi kosong (*zero default pre-selected name*). |
| 4 | Pola Soal & Navigasi | Transisi antar modul pulau terasa kaku. | Menambahkan efek animasi CSS (bounce & floating particles) serta konfeti saat menyelesaikan pulau. |