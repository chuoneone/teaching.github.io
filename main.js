/**
 * main.js
 * 負責介面互動邏輯：頁籤切換、倒數計時、手機版選單
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarHighlight();
    initCountdown();
    initTabs();
});

// 1. 手機版漢堡選單邏輯
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // 點擊漢堡切換開關
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // 點擊外部關閉選單
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// 2. 導覽列自動高亮 (Active State)
function initNavbarHighlight() {
    const currentPath = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 簡單比對：如果當前檔名包含在 href 裡 (例如 7eng.html)
        if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// 3. 頁籤切換邏輯 (Tabs)
function initTabs() {
    // A. 預設行為：如果有按鈕但沒有 active 的，預設點擊第一個
    const buttons = document.querySelectorAll('.section-button');
    const contents = document.querySelectorAll('.section-content');

    if (buttons.length > 0 && contents.length > 0) {
        // 檢查網址是否有指定錨點 (例如 #unit3)
        const hash = window.location.hash.replace('#', '');
        let targetBtn = null;

        if (hash) {
            // 嘗試找到對應此 ID 的按鈕 (假設按鈕 onclick 裡有寫 id)
            // 這裡使用一個技巧：去比對 onclick 字串內容 (因為原始 HTML 結構限制)
            // 更理想的做法是給按鈕加 data-target="unit1"
            targetBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(hash));
        }

        // 如果沒有指定錨點，或找不到對應按鈕，就選第一個
        if (!targetBtn && !document.querySelector('.section-button.active')) {
            targetBtn = buttons[0];
        }

        if (targetBtn) {
            // 模擬點擊來觸發切換
            // 注意：這裡我們手動觸發 click 可能會導致 GA 重複送出 (因為 tracking.js 也在監聽 click)
            // 所以我們直接呼叫 showSection 比較保險，但為了簡單，我們先用 showSection 函式
            const onClickAttr = targetBtn.getAttribute('onclick');
            if(onClickAttr) {
                 // 提取 ID: showSection('unit1', this) -> unit1
                 const match = onClickAttr.match(/showSection\('([^']+)'/);
                 if(match && match[1]) {
                     showSection(match[1], targetBtn);
                 }
            }
        }
    }
}

// 切換顯示函式 (供 HTML onclick 呼叫)
function showSection(id, clickedBtn) {
    // 隱藏所有內容
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active-section'));
    // 取消所有按鈕 active
    document.querySelectorAll('.section-button').forEach(btn => btn.classList.remove('active'));

    // 顯示目標
    const target = document.getElementById(id);
    if (target) target.classList.add('active-section');
    
    // 激活按鈕
    if (clickedBtn) clickedBtn.classList.add('active');

    // 更新網址 hash (選擇性，方便分享連結)
    // history.replaceState(null, null, `#${id}`); 
}

// 4. 倒數計時器
function initCountdown() {
    const timerEl = document.getElementById('countdown'); // 確保頁面上有計時器才執行
    if (!timerEl) return;

    const countDate = new Date("2026-01-24T00:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const gap = countDate - now;

        if (gap < 0) {
            // 時間到的處理
            document.getElementById("days").innerText = "00";
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        const setText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val.toString().padStart(2, '0');
        };

        setText("days", textDay);
        setText("hours", textHour);
        setText("minutes", textMinute);
        setText("seconds", textSecond);
    };

    setInterval(updateTimer, 1000);
    updateTimer(); // 立即執行一次
}