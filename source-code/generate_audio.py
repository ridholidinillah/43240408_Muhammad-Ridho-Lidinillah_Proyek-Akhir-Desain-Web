import asyncio
import os
import edge_tts

VOICE = "id-ID-GadisNeural"
RATE = "-5%" # Sedikit lebih perlahan dan ramah untuk anak-anak

AUDIO_DATA = {
    # STAGE 1: HUTAN HURUF
    "s1_q1": "Huruf apa yang menjadi awalan untuk buah Apel yang manis ini?",
    "s1_q2": "Manakah huruf B untuk bebek lucu yang suka berenang?",
    "s1_q3": "Lengkapi huruf yang hilang untuk sahabat kita: D, I, N, lalu apa ya?",
    "s1_q4": "Manakah di bawah ini yang merupakan huruf vokal?",
    "s1_q5": "Manakah bentuk huruf kecil yang cocok untuk huruf besar M?",

    # STAGE 2: LEMBAH HEWAN
    "s2_q1": "Hewan gagah manakah yang berjuluk Raja Hutan dan bersuara Roaaar?",
    "s2_q2": "Dinosaurus leher panjang pemakan daun di pohon tinggi adalah siapa ya?",
    "s2_q3": "Hewan zaman purba yang memiliki sayap lebar dan bisa terbang di angkasa adalah...",
    "s2_q4": "Dinosaurus pemakan tumbuhan dan dedaunan segar disebut apa ya?",
    "s2_q5": "Serangga mungil bergaris hitam kuning yang menghasilkan madu manis lezat adalah...",

    # STAGE 3: GUNUNG ANGKA
    "s3_q1": "Ayo hitung bersama! Ada berapa telur dino emas di dalam sarang?",
    "s3_q2": "Rexy punya dua apel. Tricey memberi dua apel lagi. Berapa total apel sekarang? Dua ditambah dua, sama dengan berapa?",
    "s3_q3": "Berapa banyak buah pisang kuning yang ada di dalam keranjang Stego?",
    "s3_q4": "Ibu Dino punya lima kue mangkok. Stego memakan satu kue. Sisa berapa kue sekarang? Lima dikurangi satu, sama dengan berapa?",
    "s3_q5": "Manakah angka yang lebih besar antara tujuh dan empat?",

    # STAGE 4: GUA POLA
    "s4_q1": "Perhatikan pola kristal gua ini: Merah, Kuning, Merah, lalu warna apa ya?",
    "s4_q2": "Bentuk geometri apa yang melengkapi pola: Lingkaran, Segitiga, Lingkaran, lalu bentuk apa ya?",
    "s4_q3": "Lengkapi pola ukuran keluarga dino: Dino Kecil, Dino Sedang, Dino Besar, Dino Kecil, lalu dino apa ya?",
    "s4_q4": "Bantu Stego melengkapi deret angka ajaib: Dua, Empat, Enam, lalu angka berapa ya?",
    "s4_q5": "Perhatikan arah lompatan Bronto: Panah Atas, Panah Bawah, Panah Atas, lalu arah ke mana ya?",

    # STAGE 5: PULAU JUARA
    "s5_q1": "Ayo susun kata rahasia pemenang sejati: J, U, A, R, lalu huruf apa ya?",
    "s5_q2": "Peti emas terbuka jika kamu menebak angka genap di antara delapan dan dua belas! Angka berapakah itu?",
    "s5_q3": "Di Pulau Juara ada empat dino hijau dan empat dino biru sedang berpesta. Berapa total dino semuanya? Empat ditambah empat, sama dengan berapa?",
    "s5_q4": "Matahari menyinari pulau, pohon tumbuh hijau, dan burung bernyanyi. Warna apakah langit cerah di siang hari?",
    "s5_q5": "Apa sikap terpuji seorang Petualang Cilik DinoLearn saat belajar bersama teman-teman?",

    # FEEDBACK AUDIO
    "praise_correct": "Horeee! Jawabanmu benar sekali! Hebat!",
    "try_again": "Ayo coba lagi sahabat dino, kamu pasti bisa!",
    "stage_complete": "Luar biasa! Kamu berhasil menyelesaikan tahap ini dengan sangat gemilang!",
    "grand_complete": "Selamat! Kamu adalah Juara Sejati DinoLearn! Semua pulau telah kamu taklukkan!"
}

async def generate_all():
    os.makedirs("audio", exist_ok=True)
    for key, text in AUDIO_DATA.items():
        output_path = os.path.join("audio", f"{key}.mp3")
        print(f"Generating {key}: {text}")
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        await communicate.save(output_path)
    print("All audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate_all())
