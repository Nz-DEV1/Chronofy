document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const countdownsContainer = document.getElementById('countdowns-container');
    const form = document.getElementById('cd-form');
    const modeRadios = document.querySelectorAll('input[name="cd-mode"]');
    const durationInputs = document.getElementById('duration-inputs');
    const datetimeInputs = document.getElementById('datetime-inputs');
    const themeToggle = document.getElementById('theme-toggle');
    const langSelect = document.getElementById('lang-select');
    const viewHome = document.getElementById('view-home');
    const viewDetail = document.getElementById('view-detail');
    const btnBack = document.getElementById('btn-back');
    const detNotes = document.getElementById('det-notes');
    const detDeleteBtn = document.getElementById('det-delete-btn');
    const detPinBtn = document.getElementById('det-pin-btn');

    // New UI Elements
    const colorPicker = document.getElementById('color-picker');
    const colorInput = document.getElementById('cd-color');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const statsBar = document.getElementById('stats-bar');

    const translations = {
        ar: {
            "tagline": "إدارة الوقت",
            "create-title": "إنشاء عد تنازلي",
            "event-title-label": "عنوان الحدث",
            "event-title-placeholder": "مثلاً: إجازة في هاواي",
            "desc-label": "الوصف (اختياري)",
            "desc-placeholder": "تفاصيل موجزة عن الحدث...",
            "mode-duration": "المدة",
            "mode-datetime": "التاريخ والوقت",
            "label-days": "أيام",
            "label-hours": "ساعات",
            "label-mins": "دقائق",
            "label-secs": "ثواني",
            "label-target": "اختر الهدف",
            "btn-start": "ابدأ المؤقت",
            "active-timers": "المؤقتات النشطة",
            "btn-dashboard": "لوحة القيادة",
            "times-up": "انتهى الوقت!",
            "label-started": "بدأ في",
            "label-target-end": "نهاية الهدف",
            "label-notes": "ملاحظات شخصية",
            "notes-placeholder": "أضف ملاحظات...",
            "btn-delete": "حذف هذا العد التنازلي",
            "footer-designed": "صمم لـ",
            "no-timers": "لا توجد مؤقتات.",
            "create-one": "ابدأ بإنشاء واحد أعلاه.",
            "alert-duration": "يرجى إدخال مدة صالحة.",
            "alert-datetime": "يرجى اختيار تاريخ ووقت.",
            "alert-future": "يرجى اختيار وقت في المستقبل.",
            "confirm-delete": "هل أنت متأكد من الحذف؟",
            "untitled": "حدث بدون عنوان",
            "short-days": "يوم",
            "short-hours": "ساعة",
            "short-mins": "دقيقة",
            "short-secs": "ثانية",
            "label-color": "اللون",
            "search-placeholder": "بحث...",
            "stat-total": "الكل",
            "stat-active": "نشط",
            "stat-done": "منتهي",
            "sort-newest": "الأحدث",
            "sort-soonest": "الأقرب",
            "sort-name": "الاسم"
        },
        en: {
            "tagline": "Time Managed",
            "create-title": "Create Countdown",
            "event-title-label": "Event Title",
            "event-title-placeholder": "e.g., Vacation to Hawaii",
            "desc-label": "Description (Optional)",
            "desc-placeholder": "Brief details about the event...",
            "mode-duration": "Duration",
            "mode-datetime": "Date & Time",
            "label-days": "Days",
            "label-hours": "Hours",
            "label-mins": "Mins",
            "label-secs": "Secs",
            "label-target": "Select Target",
            "btn-start": "Start Timer",
            "active-timers": "Active Timers",
            "btn-dashboard": "Dashboard",
            "times-up": "Time's Up!",
            "label-started": "Started",
            "label-target-end": "Target End",
            "label-notes": "Personal Notes",
            "notes-placeholder": "Add some notes...",
            "btn-delete": "Delete this Countdown",
            "footer-designed": "Designed for",
            "no-timers": "No timers yet.",
            "create-one": "Create one above.",
            "alert-duration": "Please enter a valid duration.",
            "alert-datetime": "Please select a date and time.",
            "alert-future": "Please select a time in the future.",
            "confirm-delete": "Are you sure you want to delete this?",
            "untitled": "Untitled Event",
            "short-days": "Days",
            "short-hours": "Hrs",
            "short-mins": "Min",
            "short-secs": "Sec",
            "label-color": "Color",
            "search-placeholder": "Search...",
            "stat-total": "Total",
            "stat-active": "Active",
            "stat-done": "Done",
            "sort-newest": "Newest",
            "sort-soonest": "Soonest",
            "sort-name": "Name"
        },
        fr: {
            "tagline": "Temps Géré",
            "create-title": "Créer un compte à rebours",
            "event-title-label": "Titre de l'événement",
            "event-title-placeholder": "ex: Vacances à Hawaï",
            "desc-label": "Description (Optionnel)",
            "desc-placeholder": "Brefs détails...",
            "mode-duration": "Durée",
            "mode-datetime": "Date et heure",
            "label-days": "Jours",
            "label-hours": "Heures",
            "label-mins": "Min",
            "label-secs": "Sec",
            "label-target": "Choisir la cible",
            "btn-start": "Lancer le minuteur",
            "active-timers": "Minuteurs actifs",
            "btn-dashboard": "Tableau de bord",
            "times-up": "C'est fini !",
            "label-started": "Commencé",
            "label-target-end": "Fin prévue",
            "label-notes": "Notes personnelles",
            "notes-placeholder": "Ajoutez des notes...",
            "btn-delete": "Supprimer ce compte à rebours",
            "footer-designed": "Conçu pour",
            "no-timers": "Aucun minuteur.",
            "create-one": "Créez-en un ci-dessus.",
            "alert-duration": "Veuillez entrer une durée valide.",
            "alert-datetime": "Veuillez sélectionner une date.",
            "alert-future": "Veuillez choisir le futur.",
            "confirm-delete": "Confirmer la suppression ?",
            "untitled": "Sans titre",
            "short-days": "Jours",
            "short-hours": "Hrs",
            "short-mins": "Min",
            "short-secs": "Sec",
            "label-color": "Couleur",
            "search-placeholder": "Chercher...",
            "stat-total": "Total",
            "stat-active": "Actifs",
            "stat-done": "Finis",
            "sort-newest": "Récent",
            "sort-soonest": "Bientôt",
            "sort-name": "Nom"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ar';
    let countdowns = JSON.parse(localStorage.getItem('chrono_countdowns')) || [];
    let currentDetailId = null;

    // --- Language Logic ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langSelect.value = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.innerText = translations[lang][key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });

        document.querySelectorAll('[data-i18n-val]').forEach(el => {
            const key = el.getAttribute('data-i18n-val');
            if (translations[lang][key]) el.innerText = translations[lang][key];
        });

        renderCountdowns();
        updateStats();
    }

    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    setLanguage(currentLang);

    // --- Theme Logic ---
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    colorPicker.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-swatch')) {
            colorPicker.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
            colorInput.value = e.target.dataset.color;
        }
    });

    // --- Search & Sort ---
    searchInput.addEventListener('input', renderCountdowns);
    sortSelect.addEventListener('change', renderCountdowns);

    // --- Mode Toggle ---
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'duration') {
                durationInputs.classList.remove('hidden');
                datetimeInputs.classList.add('hidden');
            } else {
                durationInputs.classList.add('hidden');
                datetimeInputs.classList.remove('hidden');
            }
        });
    });

    // --- Creation ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('cd-name').value.trim();
        const descInput = document.getElementById('cd-desc').value.trim();
        const name = nameInput || translations[currentLang]['untitled'];
        const color = colorInput.value;
        const mode = document.querySelector('input[name="cd-mode"]:checked').value;
        const now = Date.now();
        let targetTimestamp = 0;

        if (mode === 'duration') {
            const days = parseInt(document.getElementById('cd-days').value) || 0;
            const hours = parseInt(document.getElementById('cd-hours').value) || 0;
            const minutes = parseInt(document.getElementById('cd-minutes').value) || 0;
            if (days === 0 && hours === 0 && minutes === 0) return alert(translations[currentLang]['alert-duration']);
            targetTimestamp = now + (days * 86400000) + (hours * 3600000) + (minutes * 60000);
        } else {
            const datetimeVal = document.getElementById('cd-datetime').value;
            if (!datetimeVal) return alert(translations[currentLang]['alert-datetime']);
            targetTimestamp = new Date(datetimeVal).getTime();
        }

        if (targetTimestamp <= now) return alert(translations[currentLang]['alert-future']);

        const newCd = {
            id: now.toString(),
            name,
            description: descInput,
            notes: '',
            color,
            targetTimestamp,
            createdAt: now,
            pinned: false
        };

        countdowns.unshift(newCd);
        saveCountdowns();
        renderCountdowns();
        updateStats();
        form.reset();
        const cyanSwatch = colorPicker.querySelector('[data-color="cyan"]');
        if(cyanSwatch) cyanSwatch.click();
        durationInputs.classList.remove('hidden');
        datetimeInputs.classList.add('hidden');
    });

    function saveCountdowns() {
        localStorage.setItem('chrono_countdowns', JSON.stringify(countdowns));
    }

    // --- Pin Logic ---
    window.togglePin = function(id, e) {
        if(e) e.stopPropagation();
        const cd = countdowns.find(c => c.id === id);
        if(cd) {
            cd.pinned = !cd.pinned;
            saveCountdowns();
            renderCountdowns();
            if (currentDetailId === id) updatePinBtn(cd.pinned);
        }
    };

    function updatePinBtn(isPinned) {
        if (isPinned) detPinBtn.classList.add('pinned');
        else detPinBtn.classList.remove('pinned');
    }

    detPinBtn.addEventListener('click', () => {
        if(currentDetailId) togglePin(currentDetailId);
    });

    // --- Deletion ---
    window.deleteCountdown = function(id, e) {
        if(e) e.stopPropagation();
        if(!confirm(translations[currentLang]['confirm-delete'])) return;
        
        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9) translateY(20px)';
            setTimeout(() => executeDeletion(id), 300);
        } else {
            executeDeletion(id);
        }
    };

    function executeDeletion(id) {
        countdowns = countdowns.filter(c => c.id !== id);
        saveCountdowns();
        if (currentDetailId === id) btnBack.click();
        else renderCountdowns();
        updateStats();
    }

    // --- Rendering ---
    function renderCountdowns() {
        let filtered = countdowns.filter(c => 
            c.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            (c.description && c.description.toLowerCase().includes(searchInput.value.toLowerCase()))
        );

        const sortBy = sortSelect.value;
        filtered.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            if (sortBy === 'newest') return b.createdAt - a.createdAt;
            if (sortBy === 'soonest') return a.targetTimestamp - b.targetTimestamp;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

        if (filtered.length === 0) {
            countdownsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⌛</div>
                    <p class="text-slate-600 dark:text-slate-400 font-bold">${translations[currentLang]['no-timers']}</p>
                    <p class="text-slate-500 text-sm mt-1">${translations[currentLang]['create-one']}</p>
                </div>
            `;
            return;
        }

        countdownsContainer.innerHTML = filtered.map(cd => `
            <div id="card-${cd.id}" onclick="openDetail('${cd.id}')" class="cd-card accent-${cd.color} ${cd.pinned ? 'pinned' : ''}">
                <div class="card-band"></div>
                ${cd.pinned ? `<span class="pin-badge">📌</span>` : ''}
                <div class="p-5 flex flex-col h-full">
                    <div class="flex items-start gap-3 mb-4">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-lg text-slate-800 dark:text-white truncate">${cd.name}</h3>
                            <div class="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <span id="label-state-${cd.id}">${cd.targetTimestamp > Date.now() ? 'Active' : 'Finished'}</span>
                            </div>
                        </div>
                        <button onclick="togglePin('${cd.id}', event)" class="icon-btn ${cd.pinned ? 'pinned' : ''} scale-75 -mt-1 -me-1">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                        </button>
                    </div>

                    <div id="display-${cd.id}" class="grid grid-cols-4 gap-2 text-center mt-auto">
                        <div class="time-box p-2 flex flex-col justify-center">
                            <span id="d-${cd.id}" class="text-xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[8px] uppercase font-bold text-slate-400">${translations[currentLang]['short-days']}</span>
                        </div>
                        <div class="time-box p-2 flex flex-col justify-center">
                            <span id="h-${cd.id}" class="text-xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[8px] uppercase font-bold text-slate-400">${translations[currentLang]['short-hours']}</span>
                        </div>
                        <div class="time-box p-2 flex flex-col justify-center">
                            <span id="m-${cd.id}" class="text-xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[8px] uppercase font-bold text-slate-400">${translations[currentLang]['short-mins']}</span>
                        </div>
                        <div class="time-box p-2 flex flex-col justify-center">
                            <span id="s-${cd.id}" class="text-xl font-black font-mono card-sec">00</span>
                            <span class="text-[8px] uppercase font-bold text-slate-400">${translations[currentLang]['short-secs']}</span>
                        </div>
                    </div>
                </div>
                <div class="card-progress-bar">
                    <div id="progress-${cd.id}" class="card-progress-fill accent-${cd.color}" style="width: 100%; background: currentColor"></div>
                </div>
            </div>
        `).join('');
    }

    // --- Detail View Logic ---
    window.openDetail = function(id) {
        currentDetailId = id;
        viewHome.classList.add('hidden');
        viewDetail.classList.remove('hidden');
        const cd = countdowns.find(c => c.id === id);
        if (!cd) return btnBack.click();

        document.getElementById('det-title').innerText = cd.name;
        document.getElementById('det-band').style.background = getGradient(cd.color);
        updatePinBtn(cd.pinned);

        const descEl = document.getElementById('det-desc');
        if (cd.description) {
            descEl.innerText = cd.description;
            descEl.classList.remove('hidden');
        } else {
            descEl.classList.add('hidden');
        }

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('det-start').innerText = new Date(cd.createdAt).toLocaleDateString(currentLang, options);
        document.getElementById('det-end').innerText = new Date(cd.targetTimestamp).toLocaleDateString(currentLang, options);
        detNotes.value = cd.notes || '';
        detDeleteBtn.onclick = (e) => deleteCountdown(id, e);
        
        updateAll();
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    btnBack.addEventListener('click', () => {
        currentDetailId = null;
        viewDetail.classList.add('hidden');
        viewHome.classList.remove('hidden');
        renderCountdowns();
    });

    detNotes.addEventListener('input', (e) => {
        if(currentDetailId) {
            const cd = countdowns.find(c => c.id === currentDetailId);
            if(cd) { cd.notes = e.target.value; saveCountdowns(); }
        }
    });

    // --- Tick Engine ---
    function updateAll() {
        const now = Date.now();
        countdowns.forEach(cd => {
            const remaining = cd.targetTimestamp - now;
            const totalDuration = cd.targetTimestamp - cd.createdAt;
            let percent = totalDuration > 0 ? (remaining / totalDuration) * 100 : 0;
            percent = Math.max(0, Math.min(100, percent));

            const progressEl = document.getElementById(`progress-${cd.id}`);
            if (progressEl) progressEl.style.width = percent + '%';

            const stateLabel = document.getElementById(`label-state-${cd.id}`);
            if (stateLabel) stateLabel.innerText = remaining > 0 ? 'Active' : 'Finished';

            if (remaining > 0) {
                const d = Math.floor(remaining / 86400000);
                const h = Math.floor((remaining % 86400000) / 3600000);
                const m = Math.floor((remaining % 3600000) / 60000);
                const s = Math.floor((remaining % 60000) / 1000);
                updateValue(`d-${cd.id}`, d);
                updateValue(`h-${cd.id}`, h);
                updateValue(`m-${cd.id}`, m);
                updateValue(`s-${cd.id}`, s, true);
            } else {
                ['d','h','m','s'].forEach(p => {
                    const el = document.getElementById(`${p}-${cd.id}`);
                    if (el) el.innerText = '00';
                });
            }

            if (currentDetailId === cd.id) {
                const detProg = document.getElementById('det-progress');
                const detRing = document.getElementById('det-ring');
                const detPerc = document.getElementById('det-percent');
                const detDisplay = document.getElementById('det-display');
                const detTimesup = document.getElementById('det-timesup');

                if (detProg) detProg.style.width = percent + '%';
                if (detRing) {
                    const offset = 326.7 - (326.7 * (percent / 100));
                    detRing.style.strokeDashoffset = offset;
                }
                if (detPerc) detPerc.innerText = Math.round(percent) + '%';

                if (remaining > 0) {
                    detDisplay.classList.remove('hidden');
                    detTimesup.classList.add('hidden');
                    const d = Math.floor(remaining / 86400000);
                    const h = Math.floor((remaining % 86400000) / 3600000);
                    const m = Math.floor((remaining % 3600000) / 60000);
                    const s = Math.floor((remaining % 60000) / 1000);
                    updateValue('det-d', d);
                    updateValue('det-h', h);
                    updateValue('det-m', m);
                    updateValue('det-s', s, true);
                } else {
                    detDisplay.classList.add('hidden');
                    detTimesup.classList.remove('hidden');
                }
            }
            
            if (remaining <= 0 && remaining > -2000 && !cd._notified) {
                cd._notified = true;
                triggerConfetti();
            }
        });
    }

    function updateValue(id, val, animate) {
        const el = document.getElementById(id);
        if (!el) return;
        const newVal = val.toString().padStart(2, '0');
        if (el.innerText !== newVal) {
            el.innerText = newVal;
            if (animate) {
                el.classList.remove('tick-anim');
                void el.offsetWidth;
                el.classList.add('tick-anim');
            }
        }
    }

    function updateStats() {
        const now = Date.now();
        const total = countdowns.length;
        const active = countdowns.filter(c => c.targetTimestamp > now).length;
        const done = total - active;
        if (total > 0) statsBar.classList.remove('hidden');
        else statsBar.classList.add('hidden');
        document.getElementById('stat-total').innerText = total;
        document.getElementById('stat-active').innerText = active;
        document.getElementById('stat-done').innerText = done;
    }

    function getGradient(color) {
        const maps = {
            cyan: 'linear-gradient(90deg, #06B6D4, #0284C7)',
            purple: 'linear-gradient(90deg, #8B5CF6, #6D28D9)',
            rose: 'linear-gradient(90deg, #F43F5E, #E11D48)',
            amber: 'linear-gradient(90deg, #F59E0B, #D97706)',
            emerald: 'linear-gradient(90deg, #10B981, #059669)',
            pink: 'linear-gradient(90deg, #EC4899, #DB2777)'
        };
        return maps[color] || maps.cyan;
    }

    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function triggerConfetti() {
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 8 + 4,
                color: ['#06B6D4', '#8B5CF6', '#F43F5E', '#10B981'][Math.floor(Math.random() * 4)],
                speedX: Math.random() * 4 - 2,
                speedY: Math.random() * 5 + 3,
                rotation: Math.random() * 360
            });
        }
        if (particles.length === 100) requestAnimationFrame(updateConfetti);
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.y += p.speedY; p.x += p.speedX; p.rotation += 2;
            ctx.fillStyle = p.color;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size); ctx.restore();
            if (p.y > canvas.height) particles.splice(i, 1);
        });
        if (particles.length > 0) requestAnimationFrame(updateConfetti);
        else canvas.style.display = 'none';
    }

    setInterval(updateAll, 1000);
    renderCountdowns();
    updateStats();
});
