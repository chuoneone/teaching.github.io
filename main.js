// 📱 導覽列手機版切換功能
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 🧩 切換內容區塊顯示 + 高亮當前按鈕
function showSection(id, clickedBtn = null) {
    // 隱藏所有 section
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active-section');
    });

    // 顯示目標 section
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active-section');
    }

    // 處理按鈕 active 樣式
    if (clickedBtn) {
        document.querySelectorAll('.section-button').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
    }
}

// 🕒 倒數計時功能（目標日：2025-07-01）
function countdown() {
    const countDate = new Date("2026-01-24T00:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value.toString().padStart(2, '0');
    };

    setText("days", textDay);
    setText("hours", textHour);
    setText("minutes", textMinute);
    setText("seconds", textSecond);
}

// 🚀 頁面載入後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 預設不顯示任何 section（可改成顯示 section1）
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active-section');
    });

    // 自動高亮當前頁的導覽列
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        if (link.getAttribute("href").endsWith(currentPage)) {
            link.classList.add("active");
        }
    });

    // 啟動倒數計時
    countdown();
    setInterval(countdown, 1000);
});
