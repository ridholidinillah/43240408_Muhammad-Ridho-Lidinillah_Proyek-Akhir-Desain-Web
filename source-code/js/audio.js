/**
 * DinoLearn Audio Engine (v3 - Studio Human Voice MP3 & Instant BGM Toggle)
 * - Suara Voice Manusia Asli Bahasa Indonesia (Jernih, Ramah Anak, Tanpa Robot)
 * - Pemutaran berkas MP3 lokal di folder audio/ (100% Berfungsi Offline & Online)
 * - Efek Karaoke Highlight Kata demi Kata
 * - Kontrol BGM On/Off Instan & Responsif
 */

class DinoAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isBgmActive = false;
    this.isBgmEnabled = true;
    this.isSfxEnabled = true;
    this.isVoiceEnabled = true;
    this.bgmInterval = null;

    // Active voice player
    this.currentVoiceAudio = null;
    this.isSpeaking = false;
    this.karaokeInterval = null;
  }

  // Lazy initialize AudioContext pada interaksi pengguna pertama
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master Gain Nodes
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // -------------------------------------------------------------------------
  // KONTROL MUSIK LATAR (BGM) - INSTAN MATI / NYALA
  // -------------------------------------------------------------------------

  startBGM() {
    this.initContext();
    if (!this.ctx) return;

    // Hentikan interval lama jika ada
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }

    this.isBgmActive = true;
    this.isBgmEnabled = true;

    if (this.bgmGain) {
      this.bgmGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.bgmGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    }

    // Melodi pentatonik marimba anak-anak (lembut & ceria)
    const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63];
    let step = 0;

    const playNextNote = () => {
      if (!this.isBgmActive || !this.isBgmEnabled || !this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      const freq = notes[step % notes.length];
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.18, now);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 0.3);

      step++;
    };

    this.bgmInterval = setInterval(playNextNote, 380);
  }

  stopBGM() {
    this.isBgmActive = false;
    this.isBgmEnabled = false;

    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }

    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  toggleBGM() {
    if (this.isBgmActive) {
      this.stopBGM();
      return false; // Sekarang MATI
    } else {
      this.startBGM();
      return true; // Sekarang NYALA
    }
  }

  // -------------------------------------------------------------------------
  // KONTROL SFX
  // -------------------------------------------------------------------------

  toggleSFX() {
    this.isSfxEnabled = !this.isSfxEnabled;
    if (this.isSfxEnabled) {
      this.playPop();
    }
    return this.isSfxEnabled;
  }

  playPop() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCorrect() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.36);
    });
  }

  playWrong() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.28);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  playStageWin() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.4 }
    ];

    let t = this.ctx.currentTime;
    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + note.d + 0.05);

      t += note.d * 0.85;
    });
  }

  playGrandFanfare() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.28 },
      { f: 783.99, d: 0.28 },
      { f: 1046.50, d: 0.7 }
    ];

    let t = this.ctx.currentTime;
    melody.forEach(n => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + n.d + 0.05);

      t += n.d;
    });
  }

  // -------------------------------------------------------------------------
  // SUARA MANUSIA ASLI BAHASA INDONESIA (STUDIO MP3 AUDIO ENGINE)
  // -------------------------------------------------------------------------

  toggleVoice() {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    if (!this.isVoiceEnabled) {
      this.stopVoice();
    }
    return this.isVoiceEnabled;
  }

  stopVoice() {
    this.isSpeaking = false;

    if (this.karaokeInterval) {
      clearInterval(this.karaokeInterval);
      this.karaokeInterval = null;
    }

    if (this.currentVoiceAudio) {
      try {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      } catch (e) {}
      this.currentVoiceAudio = null;
    }
  }

  /**
   * Memutar berkas audio MP3 suara manusia asli berbahasa Indonesia
   * untuk soal yang sedang aktif (misal: audio/s1_q1.mp3)
   */
  playQuestionAudio(questionId, wordsCount = 0, onWordCallback = null, onEndCallback = null) {
    if (!this.isVoiceEnabled) return;
    this.stopVoice();

    const audioPath = `audio/${questionId}.mp3`;
    const audio = new Audio(audioPath);
    this.currentVoiceAudio = audio;
    this.isSpeaking = true;

    let wordIndex = 0;

    audio.onloadedmetadata = () => {
      if (onWordCallback && wordsCount > 0) {
        // Hitung estimasi durasi per kata berdasarkan durasi audio asli
        const durationSec = audio.duration || 3.5;
        const intervalMs = (durationSec * 1000) / (wordsCount + 1);

        this.karaokeInterval = setInterval(() => {
          if (wordIndex < wordsCount) {
            onWordCallback(wordIndex);
            wordIndex++;
          } else {
            if (this.karaokeInterval) {
              clearInterval(this.karaokeInterval);
              this.karaokeInterval = null;
            }
          }
        }, Math.max(220, intervalMs));
      }
    };

    audio.onended = () => {
      this.isSpeaking = false;
      this.currentVoiceAudio = null;
      if (this.karaokeInterval) {
        clearInterval(this.karaokeInterval);
        this.karaokeInterval = null;
      }
      if (onEndCallback) onEndCallback();
    };

    audio.onerror = (e) => {
      console.warn("Could not load audio file:", audioPath, e);
      this.isSpeaking = false;
      this.currentVoiceAudio = null;
      if (onEndCallback) onEndCallback();
    };

    audio.play().catch(err => {
      console.warn("Voice playback prevented by browser:", err);
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    });
  }

  /**
   * Memutar umpan balik suara narasi (Benar, Coba Lagi, Stage Selesai, Juara)
   */
  playFeedbackVoice(type) {
    if (!this.isVoiceEnabled) return;

    const fileMap = {
      correct: 'audio/praise_correct.mp3',
      wrong: 'audio/try_again.mp3',
      stage_win: 'audio/stage_complete.mp3',
      grand_win: 'audio/grand_complete.mp3'
    };

    const filePath = fileMap[type];
    if (!filePath) return;

    // Tunggu sejenak setelah nada SFX ding/boing selesai
    setTimeout(() => {
      if (!this.isVoiceEnabled) return;
      this.stopVoice();
      const audio = new Audio(filePath);
      this.currentVoiceAudio = audio;
      this.isSpeaking = true;

      audio.onended = () => {
        this.isSpeaking = false;
        this.currentVoiceAudio = null;
      };

      audio.play().catch(() => {});
    }, 450);
  }
}

// Global instance
window.dinoAudio = new DinoAudioEngine();
