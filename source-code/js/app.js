/**
 * DinoLearn: Petualangan Huruf & Angka
 * Game State & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    playerName: '',
    playerAvatar: {
      id: 'rexy',
      name: 'Rexy si Hijau',
      icon: '🦖'
    },
    unlockedStage: 1,
    currentStageId: 1,
    currentQuestionIdx: 0,
    totalStars: 0,
    stageProgress: {
      1: { stars: 0, completed: false, time: 0 },
      2: { stars: 0, completed: false, time: 0 },
      3: { stars: 0, completed: false, time: 0 },
      4: { stars: 0, completed: false, time: 0 },
      5: { stars: 0, completed: false, time: 0 }
    },
    timerSeconds: 0,
    timerInterval: null,
    isTimerRunning: false,
    answeredCorrectCount: 0,
    activeScreen: 'welcomeScreen'
  };

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================
  const dom = {
    // Header
    btnHome: document.getElementById('btnHome'),
    btnMapNav: document.getElementById('btnMapNav'),
    btnOpenLeaderboard: document.getElementById('btnOpenLeaderboard'),
    playerHudPill: document.getElementById('playerHudPill'),
    hudAvatarIcon: document.getElementById('hudAvatarIcon'),
    hudPlayerName: document.getElementById('hudPlayerName'),
    headerStarCount: document.getElementById('headerStarCount'),
    starBadge: document.getElementById('starBadge'),
    btnBgmToggle: document.getElementById('btnBgmToggle'),
    btnSfxToggle: document.getElementById('btnSfxToggle'),
    btnVoiceToggle: document.getElementById('btnVoiceToggle'),
    bgmIcon: document.getElementById('bgmIcon'),
    sfxIcon: document.getElementById('sfxIcon'),
    voiceIcon: document.getElementById('voiceIcon'),
    bgmLabel: document.getElementById('bgmLabel'),
    sfxLabel: document.getElementById('sfxLabel'),
    voiceLabel: document.getElementById('voiceLabel'),

    // Screens
    welcomeScreen: document.getElementById('welcomeScreen'),
    mapScreen: document.getElementById('mapScreen'),
    playScreen: document.getElementById('playScreen'),
    leaderboardScreen: document.getElementById('leaderboardScreen'),

    // Welcome Form
    playerRegForm: document.getElementById('playerRegForm'),
    playerNameInput: document.getElementById('playerNameInput'),
    btnClearName: document.getElementById('btnClearName'),
    avatarCards: document.querySelectorAll('.avatar-card'),
    btnStartGame: document.getElementById('btnStartGame'),
    btnWelcomeLeaderboard: document.getElementById('btnWelcomeLeaderboard'),
    btnHowToPlay: document.getElementById('btnHowToPlay'),

    // Map Screen
    mapTotalStars: document.getElementById('mapTotalStars'),
    mapStagesCompleted: document.getElementById('mapStagesCompleted'),
    stageCards: document.querySelectorAll('.stage-node-card'),

    // Play Screen HUD
    currentStageTag: document.getElementById('currentStageTag'),
    hudTimer: document.getElementById('hudTimer'),
    questionDots: document.getElementById('questionDots'),
    hudLiveStars: document.getElementById('hudLiveStars'),
    btnReadQuestion: document.getElementById('btnReadQuestion'),
    questionText: document.getElementById('questionText'),
    questionVisualArea: document.getElementById('questionVisualArea'),
    answerOptionsGrid: document.getElementById('answerOptionsGrid'),
    feedbackBanner: document.getElementById('feedbackBanner'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackTitle: document.getElementById('feedbackTitle'),
    feedbackDesc: document.getElementById('feedbackDesc'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),

    // Stage Win Modal
    stageWinModal: document.getElementById('stageWinModal'),
    stageWinDino: document.getElementById('stageWinDino'),
    stageWinTitle: document.getElementById('stageWinTitle'),
    stageWinDesc: document.getElementById('stageWinDesc'),
    stageStarsEarnedText: document.getElementById('stageStarsEarnedText'),
    stageTimeText: document.getElementById('stageTimeText'),
    btnStageWinToMap: document.getElementById('btnStageWinToMap'),
    btnNextStage: document.getElementById('btnNextStage'),

    // Grand Victory Modal & Certificate
    grandVictoryModal: document.getElementById('grandVictoryModal'),
    certPlayerName: document.getElementById('certPlayerName'),
    certDinoName: document.getElementById('certDinoName'),
    certStars: document.getElementById('certStars'),
    certTime: document.getElementById('certTime'),
    certDate: document.getElementById('certDate'),
    btnPrintCert: document.getElementById('btnPrintCert'),
    btnGrandToLeaderboard: document.getElementById('btnGrandToLeaderboard'),
    btnPlayAgain: document.getElementById('btnPlayAgain'),

    // How to Play Modal
    howToPlayModal: document.getElementById('howToPlayModal'),
    btnCloseHowTo: document.getElementById('btnCloseHowTo'),

    // Leaderboard
    btnLeaderboardBack: document.getElementById('btnLeaderboardBack'),
    btnResetLeaderboard: document.getElementById('btnResetLeaderboard'),
    leaderboardTableBody: document.getElementById('leaderboardTableBody'),
    topPlayer1: document.getElementById('topPlayer1'),
    topStarsCount: document.getElementById('topStarsCount'),
    topBestTime: document.getElementById('topBestTime')
  };

  // =========================================================================
  // CONFETTI SYSTEM (PURE HTML5 CANVAS)
  // =========================================================================
  const confettiCanvas = document.getElementById('confetti-canvas');
  const ctx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnimFrame = null;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function triggerConfetti(durationMs = 3000) {
    confettiParticles = [];
    const colors = ['#FF6B6B', '#FFD166', '#6BCB77', '#4D96FF', '#9B5DE5', '#FFA07A'];
    const count = 120;

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: -10 - Math.random() * 80,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    const startTime = Date.now();

    function render() {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      const elapsed = Date.now() - startTime;

      confettiParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      if (elapsed < durationMs || confettiParticles.some(p => p.y < confettiCanvas.height)) {
        confettiAnimFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        cancelAnimationFrame(confettiAnimFrame);
      }
    }

    if (confettiAnimFrame) cancelAnimationFrame(confettiAnimFrame);
    render();
  }

  // =========================================================================
  // STORAGE & LEADERBOARD DATA
  // =========================================================================
  const STORAGE_KEY = 'dinolearn_leaderboard_v1';

  const DEFAULT_LEADERBOARD = [
    {
      name: 'Alvaro Pintar',
      avatarIcon: '🦖',
      avatarName: 'Rexy si Hijau',
      stars: 15,
      timeSeconds: 165, // 02:45
      stageProgress: 'Tahap 5 (Lengkap)',
      date: '06/10/2026'
    },
    {
      name: 'Alya Ceria',
      avatarIcon: '🦕',
      avatarName: 'Tricey si Biru',
      stars: 15,
      timeSeconds: 190, // 03:10
      stageProgress: 'Tahap 5 (Lengkap)',
      date: '06/10/2026'
    },
    {
      name: 'Kenzo Penjelajah',
      avatarIcon: '🐊',
      avatarName: 'Stego si Kuning',
      stars: 14,
      timeSeconds: 210, // 03:30
      stageProgress: 'Tahap 5 (Lengkap)',
      date: '05/10/2026'
    },
    {
      name: 'Naura Cilik',
      avatarIcon: '🦅',
      avatarName: 'Ptero si Oranye',
      stars: 12,
      timeSeconds: 255, // 04:15
      stageProgress: 'Tahap 4 Selesai',
      date: '05/10/2026'
    }
  ];

  function getLeaderboard() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("Could not read localStorage:", e);
    }
    return [...DEFAULT_LEADERBOARD];
  }

  function saveLeaderboard(entries) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Could not write localStorage:", e);
    }
  }

  function addLeaderboardEntry(record) {
    const list = getLeaderboard();
    list.push(record);
    // Urutkan: Bintang terbanyak, lalu waktu tersingkat
    list.sort((a, b) => {
      if (b.stars !== a.stars) {
        return b.stars - a.stars;
      }
      return a.timeSeconds - b.timeSeconds;
    });
    saveLeaderboard(list);
    renderLeaderboardTable();
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function renderLeaderboardTable() {
    const list = getLeaderboard();
    dom.leaderboardTableBody.innerHTML = '';

    if (list.length === 0) {
      dom.leaderboardTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">
            Belum ada data petualang. Ayo jadilah juara pertama! 🦕✨
          </td>
        </tr>
      `;
      dom.topPlayer1.textContent = '-';
      dom.topStarsCount.textContent = '0 Bintang';
      dom.topBestTime.textContent = '00:00';
      return;
    }

    // Update Highlights
    const topEntry = list[0];
    dom.topPlayer1.textContent = `${topEntry.avatarIcon} ${topEntry.name}`;
    dom.topStarsCount.textContent = `${topEntry.stars} ⭐`;
    dom.topBestTime.textContent = formatTime(topEntry.timeSeconds);

    list.slice(0, 10).forEach((entry, index) => {
      const tr = document.createElement('tr');

      // Rank Badge
      let rankBadgeHtml = `<span class="rank-badge rank-other">${index + 1}</span>`;
      if (index === 0) rankBadgeHtml = `<span class="rank-badge rank-1">🥇 1</span>`;
      else if (index === 1) rankBadgeHtml = `<span class="rank-badge rank-2">🥈 2</span>`;
      else if (index === 2) rankBadgeHtml = `<span class="rank-badge rank-3">🥉 3</span>`;

      tr.innerHTML = `
        <td>${rankBadgeHtml}</td>
        <td>
          <div class="player-info-cell">
            <div class="player-avatar-mini">${entry.avatarIcon || '🦖'}</div>
            <div>
              <div class="player-name-text">${escapeHtml(entry.name)}</div>
              <span class="player-dino-title">${escapeHtml(entry.avatarName || 'Dino')}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="stars-badge-cell">⭐ ${entry.stars}</span>
        </td>
        <td><strong>⏱️ ${formatTime(entry.timeSeconds)}</strong></td>
        <td><span style="font-size:0.9rem; color:var(--mint-dark); font-weight:700;">✅ ${entry.stageProgress}</span></td>
        <td style="color:var(--text-muted); font-size:0.88rem;">${entry.date || 'Hari ini'}</td>
      `;
      dom.leaderboardTableBody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // SCREEN NAVIGATION
  // =========================================================================
  function showScreen(screenId) {
    const screens = [
      dom.welcomeScreen,
      dom.mapScreen,
      dom.playScreen,
      dom.leaderboardScreen
    ];

    screens.forEach(s => {
      if (s) {
        s.classList.remove('active');
      }
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      state.activeScreen = screenId;
    }

    // Atur visibilitas tombol header
    if (screenId === 'welcomeScreen') {
      dom.btnHome.style.display = 'none';
      dom.btnMapNav.style.display = 'none';
      dom.playerHudPill.style.display = 'none';
    } else {
      dom.btnHome.style.display = 'inline-flex';
      dom.btnMapNav.style.display = (screenId === 'playScreen') ? 'inline-flex' : 'none';
      dom.playerHudPill.style.display = 'inline-flex';
    }

    // Scroll ke atas halaman dengan halus
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // TIMER SYSTEM
  // =========================================================================
  function startTimer() {
    if (state.isTimerRunning) return;
    state.isTimerRunning = true;
    state.timerInterval = setInterval(() => {
      state.timerSeconds++;
      dom.hudTimer.textContent = `⏱️ ${formatTime(state.timerSeconds)}`;
    }, 1000);
  }

  function stopTimer() {
    state.isTimerRunning = false;
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  // =========================================================================
  // AVATAR SELECTION & REGISTRASI FORM
  // =========================================================================
  dom.avatarCards.forEach(card => {
    card.addEventListener('click', () => {
      window.dinoAudio.playPop();
      dom.avatarCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      state.playerAvatar = {
        id: card.dataset.avatar,
        name: card.dataset.name,
        icon: card.dataset.icon
      };
    });
  });

  dom.playerNameInput.addEventListener('input', (e) => {
    if (e.target.value.trim().length > 0) {
      dom.btnClearName.style.display = 'flex';
    } else {
      dom.btnClearName.style.display = 'none';
    }
  });

  dom.btnClearName.addEventListener('click', () => {
    dom.playerNameInput.value = '';
    dom.btnClearName.style.display = 'none';
    dom.playerNameInput.focus();
    window.dinoAudio.playPop();
  });

  dom.playerRegForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = dom.playerNameInput.value.trim();

    if (!nameVal) {
      alert('Halo Petualang Cilik! Silakan masukkan namamu terlebih dahulu ya! 😊');
      dom.playerNameInput.focus();
      return;
    }

    state.playerName = nameVal;
    dom.hudPlayerName.textContent = state.playerName;
    dom.hudAvatarIcon.textContent = state.playerAvatar.icon;

    // Start audio jika diizinkan pemain & update UI tombol audio
    window.dinoAudio.playCorrect();
    if (window.dinoAudio.isBgmEnabled) {
      window.dinoAudio.startBGM();
    }
    updateAudioButtonsUI();

    updateMapStatus();
    showScreen('mapScreen');
  });

  // =========================================================================
  // MAP SCREEN LOGIC
  // =========================================================================
  function updateMapStatus() {
    // Hitung total bintang
    let total = 0;
    let completedCount = 0;
    Object.values(state.stageProgress).forEach(p => {
      total += p.stars;
      if (p.completed) completedCount++;
    });

    state.totalStars = total;
    dom.headerStarCount.textContent = total;
    dom.mapTotalStars.textContent = `⭐ ${total}/15`;
    dom.mapStagesCompleted.textContent = `${completedCount} dari 5`;

    // Update setiap card stage
    dom.stageCards.forEach(card => {
      const sId = Number(card.dataset.stage);
      const isUnlocked = sId <= state.unlockedStage;
      const isCurrent = sId === state.unlockedStage;
      const isCompleted = state.stageProgress[sId].completed;
      const starsEarned = state.stageProgress[sId].stars;

      const btn = card.querySelector('.btn-node-action');
      const starsContainer = card.querySelector('.node-stars');

      card.classList.remove('unlocked', 'locked', 'current');

      if (isUnlocked) {
        card.classList.add('unlocked');
        if (isCurrent && !isCompleted) card.classList.add('current');
        btn.disabled = false;
        btn.textContent = isCompleted ? 'Main Lagi ↻' : 'Mulai ➔';
      } else {
        card.classList.add('locked');
        btn.disabled = true;
        btn.textContent = 'Terkunci 🔒';
      }

      // Render stars
      starsContainer.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const starSpan = document.createElement('span');
        starSpan.className = `star-dot ${i <= starsEarned ? 'earned' : ''}`;
        starSpan.textContent = i <= starsEarned ? '⭐' : '☆';
        starsContainer.appendChild(starSpan);
      }
    });
  }

  // Klik tombol node panggung di Peta
  dom.stageCards.forEach(card => {
    const btn = card.querySelector('.btn-node-action');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sId = Number(card.dataset.stage);
      if (sId <= state.unlockedStage) {
        window.dinoAudio.playPop();
        startStage(sId);
      }
    });

    card.addEventListener('click', () => {
      const sId = Number(card.dataset.stage);
      if (sId <= state.unlockedStage) {
        window.dinoAudio.playPop();
        startStage(sId);
      }
    });
  });

  // =========================================================================
  // ARENA PLAY ZONE (QUIZ & PUZZLE)
  // =========================================================================
  function startStage(stageId) {
    state.currentStageId = stageId;
    state.currentQuestionIdx = 0;
    state.answeredCorrectCount = 0;

    const currentStageData = getStageById(stageId);
    dom.currentStageTag.textContent = `${currentStageData.themeIcon} ${currentStageData.tagline}`;
    dom.hudLiveStars.textContent = `⭐ +${state.stageProgress[stageId].stars}`;

    startTimer();
    showScreen('playScreen');
    loadCurrentQuestion();
  }

  function loadCurrentQuestion() {
    const stage = getStageById(state.currentStageId);
    const qData = stage.questions[state.currentQuestionIdx];

    // Sembunyikan feedback banner
    dom.feedbackBanner.style.display = 'none';

    // Update Progress Step Dots (1 to 5)
    updateProgressDots();

    // Render Question Text dengan span per kata untuk Karaoke Baca Ramah Anak
    renderQuestionTextWithSpans(qData.prompt);

    // Render Visual Area
    renderVisualArea(qData.visual);

    // Render Answer Buttons
    renderAnswerOptions(qData);

    // Bacakan soal dalam Bahasa Indonesia yang jelas & ramah anak dengan suara manusia asli
    if (window.dinoAudio.isVoiceEnabled) {
      playQuestionVoiceWithKaraoke(qData);
    }
  }

  function renderQuestionTextWithSpans(text) {
    const words = text.split(/\s+/);
    dom.questionText.innerHTML = '';
    words.forEach((w, idx) => {
      const span = document.createElement('span');
      span.className = 'karaoke-word';
      span.dataset.wordIdx = idx;
      span.textContent = w + ' ';
      dom.questionText.appendChild(span);
    });
  }

  function playQuestionVoiceWithKaraoke(qData) {
    // Reset status kata sebelumnya
    dom.questionText.querySelectorAll('.karaoke-word').forEach(sp => {
      sp.classList.remove('highlight-reading');
    });

    dom.btnReadQuestion.classList.add('speaking-pulse');
    const labelEl = dom.btnReadQuestion.querySelector('.voice-label');
    if (labelEl) labelEl.textContent = 'Membaca...';

    const words = dom.questionText.querySelectorAll('.karaoke-word');
    const wordsCount = words.length;

    window.dinoAudio.playQuestionAudio(
      qData.id,
      wordsCount,
      (wordIdx) => {
        // Callback setiap kata yang sedang diucapkan
        words.forEach((sp, i) => {
          if (i === wordIdx) {
            sp.classList.add('highlight-reading');
          } else {
            sp.classList.remove('highlight-reading');
          }
        });
      },
      () => {
        // Callback selesai membaca
        words.forEach(sp => {
          sp.classList.remove('highlight-reading');
        });
        dom.btnReadQuestion.classList.remove('speaking-pulse');
        if (labelEl) labelEl.textContent = 'Dengarkan';
      }
    );
  }

  function updateProgressDots() {
    dom.questionDots.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.textContent = i + 1;

      if (i < state.currentQuestionIdx) {
        dot.classList.add('completed');
        dot.textContent = '✔';
      } else if (i === state.currentQuestionIdx) {
        dot.classList.add('active');
      }

      dom.questionDots.appendChild(dot);
    }
  }

  function renderVisualArea(visual) {
    dom.questionVisualArea.innerHTML = '';

    if (!visual) return;

    if (visual.type === 'big-icon') {
      const wrap = document.createElement('div');
      wrap.className = 'visual-item-display';
      wrap.innerHTML = `
        <span class="visual-big-icon">${visual.icon}</span>
        ${visual.word ? `<span class="visual-hint-word">${visual.word}</span>` : ''}
      `;
      dom.questionVisualArea.appendChild(wrap);
    } else if (visual.type === 'count-objects') {
      const box = document.createElement('div');
      box.className = 'count-object-box';

      visual.items.forEach(emoji => {
        const item = document.createElement('span');
        item.className = 'count-item';
        item.textContent = emoji;
        box.appendChild(item);
      });

      dom.questionVisualArea.appendChild(box);

      if (visual.hint) {
        const hintP = document.createElement('p');
        hintP.style.cssText = 'color: var(--text-secondary); font-weight:700; font-size:0.95rem; margin-top:8px;';
        hintP.textContent = `💡 Petunjuk: ${visual.hint}`;
        dom.questionVisualArea.appendChild(hintP);
      }
    } else if (visual.type === 'pattern') {
      const row = document.createElement('div');
      row.className = 'pattern-sequence-row';

      visual.sequence.forEach((val, i) => {
        const pItem = document.createElement('div');
        pItem.className = `pattern-item ${val === '❓' ? 'question-mark' : ''}`;
        pItem.textContent = val;
        row.appendChild(pItem);

        if (i < visual.sequence.length - 1) {
          const arrow = document.createElement('span');
          arrow.style.cssText = 'color:#CBD5E1; font-size:1.4rem; font-weight:900;';
          arrow.textContent = '➔';
          row.appendChild(arrow);
        }
      });

      dom.questionVisualArea.appendChild(row);
    }
  }

  // Pengacak urutan array pilihan jawaban (Fisher-Yates Shuffle)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderAnswerOptions(qData) {
    dom.answerOptionsGrid.innerHTML = '';

    // ACAK URUTAN PILIHAN JAWABAN agar posisi jawaban benar TIDAK selalu di A/posisi pertama!
    const shuffledOptions = shuffleArray(qData.options);

    shuffledOptions.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'answer-card-btn';

      btn.innerHTML = `
        <div class="answer-card-badge">${opt.icon || (idx + 1)}</div>
        <div class="answer-card-content">
          <span class="answer-card-label">${opt.label}</span>
          ${opt.sub ? `<span class="answer-card-sub">${opt.sub}</span>` : ''}
        </div>
      `;

      btn.addEventListener('click', () => handleAnswerSelect(opt, btn, qData));
      dom.answerOptionsGrid.appendChild(btn);
    });
  }

  function handleAnswerSelect(selectedOpt, btnElement, qData) {
    if (selectedOpt.isCorrect) {
      // Benar!
      window.dinoAudio.playCorrect();
      window.dinoAudio.playFeedbackVoice('correct');
      btnElement.classList.add('correct');

      // Nonaktifkan semua pilihan kartu
      const allBtns = dom.answerOptionsGrid.querySelectorAll('.answer-card-btn');
      allBtns.forEach(b => b.disabled = true);

      // Tampilkan feedback banner gembira
      dom.feedbackIcon.textContent = '🎉';
      dom.feedbackTitle.textContent = 'Horeee! Jawabanmu Benar!';
      dom.feedbackDesc.textContent = qData.explanation;
      dom.feedbackBanner.style.display = 'flex';

      // Update skor sementara
      state.answeredCorrectCount++;
    } else {
      // Salah / Belum tepat
      window.dinoAudio.playWrong();
      window.dinoAudio.playFeedbackVoice('wrong');
      btnElement.classList.add('wrong');
      btnElement.disabled = true; // Disable kartu yang salah saja agar bisa coba yang lain

      // Feedback hangat yang memotivasi
      dom.feedbackIcon.textContent = '🦖';
      dom.feedbackTitle.textContent = 'Ayo Coba Lagi!';
      dom.feedbackDesc.textContent = 'Jangan menyerah sahabat dino, kamu pasti bisa!';
      dom.feedbackBanner.style.display = 'flex';
    }
  }

  // Tombol Next Question
  dom.btnNextQuestion.addEventListener('click', () => {
    window.dinoAudio.playPop();

    if (state.currentQuestionIdx < 4) {
      // Lanjut ke soal berikutnya di stage yang sama
      state.currentQuestionIdx++;
      loadCurrentQuestion();
    } else {
      // Stage telah selesai (5 dari 5 terjawab)!
      completeCurrentStage();
    }
  });

  // Tombol Dengarkan Soal (Voice Readout & Replay)
  dom.btnReadQuestion.addEventListener('click', () => {
    window.dinoAudio.playPop();
    const stage = getStageById(state.currentStageId);
    const qData = stage.questions[state.currentQuestionIdx];

    if (window.dinoAudio.isSpeaking) {
      window.dinoAudio.stopVoice();
      dom.questionText.querySelectorAll('.karaoke-word').forEach(sp => sp.classList.remove('highlight-reading'));
      dom.btnReadQuestion.classList.remove('speaking-pulse');
      const labelEl = dom.btnReadQuestion.querySelector('.voice-label');
      if (labelEl) labelEl.textContent = 'Dengarkan';
    } else {
      playQuestionVoiceWithKaraoke(qData);
    }
  });

  // =========================================================================
  // STAGE VICTORY & GRAND VICTORY MODAL
  // =========================================================================
  function completeCurrentStage() {
    const sId = state.currentStageId;
    const stage = getStageById(sId);

    // Tentukan bintang (3 bintang penuh)
    const earnedStars = 3;
    state.stageProgress[sId].stars = earnedStars;
    state.stageProgress[sId].completed = true;
    state.stageProgress[sId].time = state.timerSeconds;

    // Buka stage berikutnya jika belum terbuka
    if (sId < 5 && state.unlockedStage <= sId) {
      state.unlockedStage = sId + 1;
    }

    updateMapStatus();

    // Cek apakah ini tahap pamungkas (Stage 5)
    if (sId === 5) {
      showGrandVictoryModal();
    } else {
      showStageWinModal(stage, earnedStars);
    }
  }

  function showStageWinModal(stage, earnedStars) {
    window.dinoAudio.playStageWin();
    window.dinoAudio.playFeedbackVoice('stage_win');
    triggerConfetti(3500);

    dom.stageWinDino.textContent = state.playerAvatar.icon;
    dom.stageWinTitle.textContent = `Hebat Sekali, ${state.playerName}! 🎉`;
    dom.stageWinDesc.textContent = `Kamu berhasil menyelesaikan seluruh tantangan di ${stage.title} dengan sangat gemilang!`;

    dom.stageStarsEarnedText.textContent = `+${earnedStars} Bintang Emas ⭐`;
    dom.stageTimeText.textContent = formatTime(state.timerSeconds);

    dom.stageWinModal.style.display = 'flex';
  }

  dom.btnStageWinToMap.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.stageWinModal.style.display = 'none';
    showScreen('mapScreen');
  });

  dom.btnNextStage.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.stageWinModal.style.display = 'none';

    if (state.currentStageId < 5) {
      startStage(state.currentStageId + 1);
    } else {
      showGrandVictoryModal();
    }
  });

  // GRAND VICTORY MODAL
  function showGrandVictoryModal() {
    stopTimer();
    window.dinoAudio.playGrandFanfare();
    window.dinoAudio.playFeedbackVoice('grand_win');
    triggerConfetti(6000);

    // Simpan ke Leaderboard
    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newRecord = {
      name: state.playerName,
      avatarIcon: state.playerAvatar.icon,
      avatarName: state.playerAvatar.name,
      stars: state.totalStars,
      timeSeconds: state.timerSeconds,
      stageProgress: 'Tahap 5 (Juara Sejati)',
      date: dateFormatted
    };
    addLeaderboardEntry(newRecord);

    // Isi Konten Sertifikat
    dom.certPlayerName.textContent = `${state.playerName} 🌟`;
    dom.certDinoName.textContent = `${state.playerAvatar.name} ${state.playerAvatar.icon}`;
    dom.certStars.textContent = `⭐⭐⭐⭐⭐ (${state.totalStars}/15 Bintang)`;
    dom.certTime.textContent = `⏱️ ${formatTime(state.timerSeconds)}`;
    dom.certDate.textContent = `Tanggal: ${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;

    dom.grandVictoryModal.style.display = 'flex';
  }

  dom.btnPrintCert.addEventListener('click', () => {
    window.dinoAudio.playPop();
    window.print();
  });

  dom.btnGrandToLeaderboard.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.grandVictoryModal.style.display = 'none';
    renderLeaderboardTable();
    showScreen('leaderboardScreen');
  });

  dom.btnPlayAgain.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.grandVictoryModal.style.display = 'none';

    // Reset progress
    state.unlockedStage = 1;
    state.currentStageId = 1;
    state.timerSeconds = 0;
    Object.keys(state.stageProgress).forEach(k => {
      state.stageProgress[k] = { stars: 0, completed: false, time: 0 };
    });

    updateMapStatus();
    startStage(1);
  });

  // =========================================================================
  // LEADERBOARD SCREEN & BUTTONS
  // =========================================================================
  dom.btnOpenLeaderboard.addEventListener('click', () => {
    window.dinoAudio.playPop();
    renderLeaderboardTable();
    showScreen('leaderboardScreen');
  });

  dom.btnWelcomeLeaderboard.addEventListener('click', () => {
    window.dinoAudio.playPop();
    renderLeaderboardTable();
    showScreen('leaderboardScreen');
  });

  dom.btnLeaderboardBack.addEventListener('click', () => {
    window.dinoAudio.playPop();
    if (state.playerName) {
      showScreen('mapScreen');
    } else {
      showScreen('welcomeScreen');
    }
  });

  dom.btnResetLeaderboard.addEventListener('click', () => {
    if (confirm('Apakah kamu yakin ingin mereset papan juara ke daftar awal?')) {
      window.dinoAudio.playPop();
      saveLeaderboard([...DEFAULT_LEADERBOARD]);
      renderLeaderboardTable();
    }
  });

  // =========================================================================
  // PETUNJUK & CARA BERMAIN MODAL
  // =========================================================================
  dom.btnHowToPlay.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.howToPlayModal.style.display = 'flex';
  });

  dom.btnCloseHowTo.addEventListener('click', () => {
    window.dinoAudio.playPop();
    dom.howToPlayModal.style.display = 'none';
  });

  // =========================================================================
  // HEADER BUTTONS: HOME & AUDIO CONTROLS
  // =========================================================================
  dom.btnHome.addEventListener('click', () => {
    window.dinoAudio.playPop();
    if (state.activeScreen === 'playScreen') {
      if (confirm('Apakah kamu ingin kembali ke Peta Petualangan?')) {
        showScreen('mapScreen');
      }
    } else {
      showScreen('welcomeScreen');
    }
  });

  dom.btnMapNav.addEventListener('click', () => {
    window.dinoAudio.playPop();
    showScreen('mapScreen');
  });

  // Fungsi Pembantu Update Tampilan Tombol Audio
  function updateAudioButtonsUI() {
    const bgmOn = window.dinoAudio.isBgmActive;
    const voiceOn = window.dinoAudio.isVoiceEnabled;
    const sfxOn = window.dinoAudio.isSfxEnabled;

    // Tombol Musik (BGM)
    if (dom.bgmIcon) dom.bgmIcon.textContent = bgmOn ? '🎵' : '🔇';
    if (dom.bgmLabel) dom.bgmLabel.textContent = bgmOn ? 'Musik: ON' : 'Musik: OFF';
    dom.btnBgmToggle.classList.toggle('active-audio', bgmOn);
    dom.btnBgmToggle.classList.toggle('muted-audio', !bgmOn);
    dom.btnBgmToggle.title = bgmOn ? 'Musik Latar: Aktif (Klik untuk Mematikan)' : 'Musik Latar: Mati (Klik untuk Menyalakan)';

    // Tombol Suara Narasi (Voice)
    if (dom.voiceIcon) dom.voiceIcon.textContent = voiceOn ? '🗣️' : '🤫';
    if (dom.voiceLabel) dom.voiceLabel.textContent = voiceOn ? 'Suara: ON' : 'Suara: OFF';
    dom.btnVoiceToggle.classList.toggle('active-audio', voiceOn);
    dom.btnVoiceToggle.classList.toggle('muted-audio', !voiceOn);
    dom.btnVoiceToggle.title = voiceOn ? 'Suara Narasi: Aktif (Klik untuk Mematikan)' : 'Suara Narasi: Mati (Klik untuk Menyalakan)';

    // Tombol Efek Suara (SFX)
    if (dom.sfxIcon) dom.sfxIcon.textContent = sfxOn ? '🔊' : '🔈';
    if (dom.sfxLabel) dom.sfxLabel.textContent = sfxOn ? 'SFX: ON' : 'SFX: OFF';
    dom.btnSfxToggle.classList.toggle('active-audio', sfxOn);
    dom.btnSfxToggle.classList.toggle('muted-audio', !sfxOn);
    dom.btnSfxToggle.title = sfxOn ? 'Efek Suara: Aktif (Klik untuk Mematikan)' : 'Efek Suara: Mati (Klik untuk Menyalakan)';
  }

  // Toggle BGM (Nyalakan / Matikan Musik Seketika)
  dom.btnBgmToggle.addEventListener('click', () => {
    window.dinoAudio.toggleBGM();
    updateAudioButtonsUI();
  });

  // Toggle SFX
  dom.btnSfxToggle.addEventListener('click', () => {
    window.dinoAudio.toggleSFX();
    updateAudioButtonsUI();
  });

  // Toggle Voice Narration
  dom.btnVoiceToggle.addEventListener('click', () => {
    window.dinoAudio.toggleVoice();
    updateAudioButtonsUI();
  });

  // Close modals on clicking overlay backdrop
  [dom.stageWinModal, dom.grandVictoryModal, dom.howToPlayModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  renderLeaderboardTable();
  updateMapStatus();
  updateAudioButtonsUI();
  showScreen('welcomeScreen');
});
