// ==========================================================================
// 2026년 8월 기도편지 JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initImageFallbacks();
    initThemeToggle();
    initScrollProgress();
    initScrollAnimations();
    initMobileNav();
    initLightbox();
    initPrayerButtons();
    initMessageForm();
    initBackToTop();
});

/* -------------------------------------------------------------------------- */
/* Theme Toggle                                                              */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        icon.className = 'fa-solid fa-sun';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(isDark ? '다크 모드로 변경되었습니다.' : '라이트 모드로 변경되었습니다.');
    });
}

/* -------------------------------------------------------------------------- */
/* Scroll Progress Bar                                                       */
/* -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* -------------------------------------------------------------------------- */
/* Scroll Reveal Animations (IntersectionObserver)                            */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* -------------------------------------------------------------------------- */
/* Mobile Navigation                                                         */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/* -------------------------------------------------------------------------- */
/* Lightbox Image Modal                                                      */
/* -------------------------------------------------------------------------- */
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('close-lightbox');

    document.querySelectorAll('.clickable-img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            captionText.innerText = img.getAttribute('data-caption') || img.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/* -------------------------------------------------------------------------- */
/* Interactive Prayer Buttons & Counter                                      */
/* -------------------------------------------------------------------------- */
function initPrayerButtons() {
    const prayerBtns = document.querySelectorAll('.pray-action-btn');
    const totalCounterEl = document.getElementById('total-prayers-count');

    // Load stored prayer states
    let storedCounts = JSON.parse(localStorage.getItem('prayer_counts') || '{}');
    let totalPrayers = parseInt(localStorage.getItem('total_prayers') || '0', 10);

    // Initial sync
    prayerBtns.forEach(btn => {
        const id = btn.getAttribute('data-id');
        const countSpan = btn.querySelector('.pray-count');
        const count = storedCounts[id] || 0;
        countSpan.innerText = count;

        if (count > 0) {
            btn.classList.add('active');
            btn.querySelector('i').className = 'fa-solid fa-heart';
        }

        btn.addEventListener('click', (e) => {
            storedCounts[id] = (storedCounts[id] || 0) + 1;
            totalPrayers += 1;
            
            countSpan.innerText = storedCounts[id];
            btn.classList.add('active');
            btn.querySelector('i').className = 'fa-solid fa-heart';

            localStorage.setItem('prayer_counts', JSON.stringify(storedCounts));
            localStorage.setItem('total_prayers', totalPrayers.toString());

            totalCounterEl.innerText = totalPrayers;

            // Trigger Heart Particle Effect
            createHeartParticle(e);
            showToast('기도의 마음이 전달되었습니다. 함께해 주셔서 감사합니다! 🙏');
        });
    });

    totalCounterEl.innerText = totalPrayers;
}

function createHeartParticle(e) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '3000';
    heart.style.transition = 'all 1s ease-out';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = 'translateY(-60px) scale(1.4)';
        heart.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        heart.remove();
    }, 1050);
}

/* -------------------------------------------------------------------------- */
/* Copy Account to Clipboard                                                 */
/* -------------------------------------------------------------------------- */
function copyToClipboard(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} (${text})가 클립보드에 복사되었습니다!`);
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} (${text})가 클립보드에 복사되었습니다!`);
    });
}

/* -------------------------------------------------------------------------- */
/* Encouragement Message Form                                                */
/* -------------------------------------------------------------------------- */
function initMessageForm() {
    const form = document.getElementById('message-form');
    const msgList = document.getElementById('msg-list');

    // Load saved messages
    let savedMsgs = JSON.parse(localStorage.getItem('user_messages') || '[]');
    savedMsgs.forEach(msg => {
        appendMessageBubble(msg.name, msg.text);
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('sender-name');
            const msgInput = document.getElementById('sender-msg');

            const name = nameInput.value.trim();
            const text = msgInput.value.trim();

            if (name && text) {
                appendMessageBubble(name, text);
                savedMsgs.push({ name, text });
                localStorage.setItem('user_messages', JSON.stringify(savedMsgs));

                nameInput.value = '';
                msgInput.value = '';
                showToast('응원 메시지가 성공적으로 등록되었습니다. 감사합니다!');
            }
        });
    }
}

function appendMessageBubble(name, text) {
    const msgList = document.getElementById('msg-list');
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = `<strong>${escapeHtml(name)}님</strong>: ${escapeHtml(text)}`;
    msgList.prepend(bubble);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

/* -------------------------------------------------------------------------- */
/* Share Website                                                             */
/* -------------------------------------------------------------------------- */
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: '2026년 8월 기도편지 | 노대영 · 신영화 선교사 가정',
            text: '얼음의 도시에도 꽃피는 봄날은 온다 - 2026년 8월 노대영·신영화 선교사 가정 기도편지',
            url: window.location.href
        }).catch(() => {});
    } else {
        copyToClipboard(window.location.href, '기도편지 웹사이트 주소');
    }
}

/* -------------------------------------------------------------------------- */
/* Back to Top Button                                                        */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* -------------------------------------------------------------------------- */
/* Toast Notification Utility                                                */
/* -------------------------------------------------------------------------- */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* -------------------------------------------------------------------------- */
/* Mobile & Cross-platform Image Path Fallback Handler                       */
/* -------------------------------------------------------------------------- */
function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const currentSrc = this.src;
            if (currentSrc.includes('/images/')) {
                const filename = currentSrc.split('/images/').pop();
                console.log('Retrying image fallback from root folder:', filename);
                this.src = './' + filename;
            } else if (!currentSrc.includes('images/')) {
                const filename = currentSrc.split('/').pop();
                console.log('Retrying image fallback from images subfolder:', filename);
                this.src = './images/' + filename;
            }
        });
    });
}
