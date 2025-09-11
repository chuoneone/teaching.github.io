// 📱 導覽列手機版切換功能
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 🧩 (8下數學) 切換內容區塊顯示 + 高亮當前按鈕
function showSection(id, clickedBtn = null) {
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active-section');
    });
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active-section');
    }
    if (clickedBtn) {
        document.querySelectorAll('.section-button').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
    }
}

// 🕒 倒數計時功能
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

// 🚀 頁面載入後初始化 (整合後的版本)
document.addEventListener('DOMContentLoaded', () => {
    // 1. 自動高亮當前頁的導覽列
    const currentPage = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        if (link.getAttribute("href").endsWith(currentPage)) {
            link.classList.add("active");
        }
    });

    // 2. 啟動倒數計時
    // 檢查頁面上是否有倒數計時器元素，有的話才啟動
    if (document.getElementById('days')) {
        countdown();
        setInterval(countdown, 1000);
    }
    
    
    // 4. 設定 8下數學預設顯示第一個區塊 (解題區)
    const firstSectionButton = document.querySelector('.section-button:first-of-type');
    if(firstSectionButton) {

        const firstSectionContent = document.getElementById('section5');
        if (firstSectionContent) {
            firstSectionContent.classList.add('active-section');
        }
        firstSectionButton.classList.add('active');
    }
});