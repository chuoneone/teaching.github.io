/**
 * @file tracking.js
 * @description 整合 Google Analytics 初始化與全域事件委派追蹤。
 */

// --- 1. Google Analytics 初始化 ---
// 只要引用此檔案，就會自動載入 GA，不需要在每個 HTML head 重複貼 code
(function() {
    const gaId = 'G-5BBHYN77N9'; // 你的主要 GA ID

    // 插入 script 標籤
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // 初始化 gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag; // 確保全域可用
    gtag('js', new Date());
    gtag('config', gaId);
    
    console.log(`GA Initialized with ID: ${gaId}`);
})();

/**
 * 手動發送事件的函式 (相容舊有寫法，但建議轉用 data 屬性)
 */
function trackEvent(eventName, eventCategory, eventLabel) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, {
            'event_category': eventCategory,
            'event_label': eventLabel
        });
        // 開發測試用 (上線後可註解掉)
        // console.log(`[Tracked] Cat: ${eventCategory} | Label: ${eventLabel}`);
    }
}

// --- 2. 全域點擊事件監聽 (Event Delegation) ---
// 這段程式碼會監聽所有點擊，如果被點擊的元素(或其父層)有 data-track-cat 屬性，就自動追蹤
document.addEventListener('click', function(e) {
    // 尋找被點擊元素或其父元素中，是否帶有 data-track-cat 屬性的標籤
    const target = e.target.closest('[data-track-cat]');

    if (target) {
        const category = target.getAttribute('data-track-cat');
        const label = target.getAttribute('data-track-lbl') || 'generic_click'; // 如果沒寫 label 給個預設值
        
        // 呼叫追蹤函式
        trackEvent('button_click', category, label);
    }
});