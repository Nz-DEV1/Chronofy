document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const countdownsContainer = document.getElementById('countdowns-container');
    const form = document.getElementById('cd-form');
    const modeRadios = document.querySelectorAll('input[name="cd-mode"]');
    const durationInputs = document.getElementById('duration-inputs');
    const datetimeInputs = document.getElementById('datetime-inputs');
    
    const themeToggle = document.getElementById('theme-toggle');
    const viewHome = document.getElementById('view-home');
    const viewDetail = document.getElementById('view-detail');
    const btnBack = document.getElementById('btn-back');
    const detNotes = document.getElementById('det-notes');
    const detDeleteBtn = document.getElementById('det-delete-btn');

    let countdowns = JSON.parse(localStorage.getItem('chrono_countdowns')) || [];
    let intervalId;
    let currentDetailId = null;

    // --- Theme Logic ---
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Input Mode Toggle ---
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

    // --- Handle Creation ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('cd-name').value.trim();
        const descInput = document.getElementById('cd-desc').value.trim();
        
        const name = nameInput || 'Untitled Event';
        const description = descInput; // optional
        const mode = document.querySelector('input[name="cd-mode"]:checked').value;
        const now = Date.now();
        let targetTimestamp = 0;

        if (mode === 'duration') {
            const days = parseInt(document.getElementById('cd-days').value) || 0;
            const hours = parseInt(document.getElementById('cd-hours').value) || 0;
            const minutes = parseInt(document.getElementById('cd-minutes').value) || 0;
            
            if (days === 0 && hours === 0 && minutes === 0) {
                alert('Please enter a duration greater than 0.');
                return;
            }
            targetTimestamp = now + (days * 86400000) + (hours * 3600000) + (minutes * 60000);
        } else {
            const datetimeVal = document.getElementById('cd-datetime').value;
            if (!datetimeVal) {
                alert('Please select a valid date and time.');
                return;
            }
            targetTimestamp = new Date(datetimeVal).getTime();
        }

        if (targetTimestamp <= now) {
            alert('Please select a time in the future.');
            return;
        }

        const newCd = {
            id: now.toString(),
            name,
            description,
            notes: '',
            targetTimestamp,
            createdAt: now
        };

        countdowns.unshift(newCd);
        saveCountdowns();
        renderCountdowns();
        
        // Reset Form correctly
        form.reset();
        document.querySelector('input[name="cd-mode"][value="duration"]').checked = true;
        durationInputs.classList.remove('hidden');
        datetimeInputs.classList.add('hidden');

        if(window.innerWidth < 768) {
            countdownsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    function saveCountdowns() {
        localStorage.setItem('chrono_countdowns', JSON.stringify(countdowns));
    }

    // --- Deletion ---
    window.deleteCountdown = function(id) {
        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                executeDeletion(id);
            }, 300);
        } else {
            executeDeletion(id);
        }
    };

    function executeDeletion(id) {
        countdowns = countdowns.filter(c => c.id !== id);
        saveCountdowns();
        
        // If we are looking at this detail view right now, close it
        if (currentDetailId === id) {
            btnBack.click();
        } else {
            renderCountdowns();
        }
    }

    // --- Detail View Logic ---
    window.openDetail = function(id) {
        currentDetailId = id;
        viewHome.classList.add('hidden');
        viewHome.classList.remove('flex');
        viewDetail.classList.remove('hidden');
        viewDetail.classList.add('flex');
        
        const cd = countdowns.find(c => c.id === id);
        if (!cd) return btnBack.click();

        document.getElementById('det-title').innerText = cd.name;
        
        const descEl = document.getElementById('det-desc');
        if (cd.description) {
            descEl.innerText = cd.description;
            descEl.classList.remove('hidden');
        } else {
            descEl.classList.add('hidden');
        }
        
        // Format dates beautifully
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('det-start').innerText = new Date(cd.createdAt).toLocaleDateString(undefined, options);
        document.getElementById('det-end').innerText = new Date(cd.targetTimestamp).toLocaleDateString(undefined, options);
        
        detNotes.value = cd.notes || '';
        
        // Setup delete button inside detail view
        detDeleteBtn.onclick = function() {
            if(confirm("Are you sure you want to delete this countdown?")) {
                deleteCountdown(id);
            }
        };
        
        updateAllCountdowns();
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    btnBack.addEventListener('click', () => {
        currentDetailId = null;
        viewDetail.classList.add('hidden');
        viewDetail.classList.remove('flex');
        viewHome.classList.remove('hidden');
        viewHome.classList.add('flex');
        renderCountdowns(); // Re-render in case updates occurred (like deletion)
    });

    detNotes.addEventListener('input', (e) => {
        if(currentDetailId) {
            const cd = countdowns.find(c => c.id === currentDetailId);
            if(cd) {
                cd.notes = e.target.value;
                saveCountdowns();
            }
        }
    });

    // --- Rendering ---
    function renderCountdowns() {
        if (countdowns.length === 0) {
            countdownsContainer.innerHTML = `
                <div class="col-span-full border-2 border-dashed border-slate-300 dark:border-slate-700/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center opacity-80 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-slate-600 dark:text-slate-400 font-bold">No active timers.</p>
                    <p class="text-slate-500 text-sm mt-1">Create one using the form above.</p>
                </div>
            `;
            return;
        }

        countdownsContainer.innerHTML = countdowns.map(cd => `
            <div id="card-${cd.id}" onclick="openDetail('${cd.id}')" role="button" tabindex="0" class="cd-card cursor-pointer glass-panel rounded-3xl overflow-hidden relative flex flex-col w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan">
                <!-- Progress bar container -->
                <div class="absolute top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-800 shadow-inner">
                    <div id="progress-${cd.id}" class="h-full bg-gradient-to-r from-brand-cyan to-brand-purple shadow-[0_0_10px_rgba(6,182,212,0.6)]" style="width: 100%;"></div>
                </div>
                
                <div class="p-6 sm:p-7 pt-8 flex flex-col flex-1 z-10 w-full">
                    <div class="flex justify-between items-start mb-6 w-full gap-3">
                        <h3 class="font-bold text-xl sm:text-2xl text-slate-800 dark:text-white truncate drop-shadow-sm w-[85%]">${cd.name}</h3>
                        <button onclick="event.stopPropagation(); deleteCountdown('${cd.id}')" 
                                class="text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 p-2 -mr-2 -mt-2 rounded-xl transition-all flex-shrink-0" 
                                aria-label="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    
                    <div id="display-${cd.id}" class="grid grid-cols-4 gap-2 sm:gap-3 text-center mt-auto w-full">
                        <div class="time-box rounded-2xl p-2 sm:p-3 flex flex-col justify-center w-full">
                            <span id="d-${cd.id}" class="text-2xl sm:text-3xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[10px] uppercase font-bold text-slate-500 mt-1">Days</span>
                        </div>
                        <div class="time-box rounded-2xl p-2 sm:p-3 flex flex-col justify-center w-full">
                            <span id="h-${cd.id}" class="text-2xl sm:text-3xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[10px] uppercase font-bold text-slate-500 mt-1">Hrs</span>
                        </div>
                        <div class="time-box rounded-2xl p-2 sm:p-3 flex flex-col justify-center w-full">
                            <span id="m-${cd.id}" class="text-2xl sm:text-3xl font-black font-mono text-slate-800 dark:text-white">00</span>
                            <span class="text-[10px] uppercase font-bold text-slate-500 mt-1">Min</span>
                        </div>
                        <div class="time-box rounded-2xl p-2 sm:p-3 flex flex-col justify-center w-full">
                            <span id="s-${cd.id}" class="text-2xl sm:text-3xl font-black font-mono text-brand-cyan">00</span>
                            <span class="text-[10px] uppercase font-bold text-slate-500 mt-1">Sec</span>
                        </div>
                    </div>
                    
                    <div id="timesup-${cd.id}" class="hidden py-6 mt-auto flex flex-col items-center justify-center w-full">
                        <span class="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 tracking-wider uppercase mb-1">Time's Up!</span>
                    </div>
                </div>
            </div>
        `).join('');

        updateAllCountdowns();
    }

    // --- Tick Engine ---
    function updateAllCountdowns() {
        const now = Date.now();
        countdowns.forEach(cd => {
            const remaining = cd.targetTimestamp - now;
            
            // Standard Card updates
            const progressEl = document.getElementById(`progress-${cd.id}`);
            const displayEl = document.getElementById(`display-${cd.id}`);
            const timesupEl = document.getElementById(`timesup-${cd.id}`);
            const cardEl = document.getElementById(`card-${cd.id}`);

            // Calc percentages
            const totalDuration = cd.targetTimestamp - cd.createdAt;
            let percent = 0;
            if (totalDuration > 0) percent = (remaining / totalDuration) * 100;

            if (remaining <= 0) {
                if (progressEl) progressEl.style.width = '0%';
                if (displayEl && !displayEl.classList.contains('hidden')) {
                    displayEl.classList.add('hidden');
                    timesupEl.classList.remove('hidden');
                    timesupEl.classList.add('animate-pulse');
                    if (cardEl) {
                        cardEl.style.borderColor = 'rgba(236, 72, 153, 0.4)';
                        cardEl.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.2)';
                    }
                }
            } else {
                const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
                const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
                const m = Math.floor((remaining / 1000 / 60) % 60);
                const s = Math.floor((remaining / 1000) % 60);

                const dEl = document.getElementById(`d-${cd.id}`);
                if (dEl) {
                    dEl.innerText = d.toString().padStart(2, '0');
                    document.getElementById(`h-${cd.id}`).innerText = h.toString().padStart(2, '0');
                    document.getElementById(`m-${cd.id}`).innerText = m.toString().padStart(2, '0');
                    document.getElementById(`s-${cd.id}`).innerText = s.toString().padStart(2, '0');
                }
                if (progressEl) progressEl.style.width = Math.max(0, percent) + '%';
            }

            // --- Detail View Updates ---
            if (currentDetailId === cd.id) {
                const progDet = document.getElementById('det-progress');
                if (remaining <= 0) {
                    if (progDet) progDet.style.width = '0%';
                    document.getElementById('det-display').classList.add('hidden');
                    document.getElementById('det-timesup').classList.remove('hidden');
                } else {
                    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
                    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
                    const m = Math.floor((remaining / 1000 / 60) % 60);
                    const s = Math.floor((remaining / 1000) % 60);

                    document.getElementById('det-display').classList.remove('hidden');
                    document.getElementById('det-timesup').classList.add('hidden');

                    const dd = document.getElementById('det-d');
                    if (dd) {
                        dd.innerText = d.toString().padStart(2, '0');
                        document.getElementById('det-h').innerText = h.toString().padStart(2, '0');
                        document.getElementById('det-m').innerText = m.toString().padStart(2, '0');
                        document.getElementById('det-s').innerText = s.toString().padStart(2, '0');
                    }
                    if (progDet) progDet.style.width = Math.max(0, percent) + '%';
                }
            }
        });
    }

    renderCountdowns();
    intervalId = setInterval(updateAllCountdowns, 1000);
});
