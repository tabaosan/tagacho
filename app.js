// UI構築用の関数群

// 1. お知らせ画面の生成
function renderHome() {
    let html = `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">📢 最新のお知らせ</h2>
        </div>
    `;

    AppData.announcements.forEach(item => {
        const badgeClass = item.type === 'important' ? 'important' : 'normal';
        const badgeText = item.type === 'important' ? '重要' : '日常';
        
        html += `
        <div class="card">
            <span class="badge ${badgeClass}">${badgeText}</span>
            <div class="card-date">${item.date}</div>
            <div class="card-title">${item.title}</div>
            <p style="font-size: var(--text-base);">${item.content}</p>
        </div>
        `;
    });
    return html;
}

// 2. カレンダー（ゴミ出し）画面の生成
function renderCalendar() {
    // 今日の曜日を取得
    const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const today = new Date();
    // 明日の曜日
    const tomorrowDay = days[(today.getDay() + 1) % 7];
    const tomorrowGarbage = AppData.garbageSchedule[tomorrowDay];

    let html = `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">🗑️ ゴミ出しカレンダー</h2>
        </div>
        <div class="card" style="text-align: center; border: 2px solid var(--primary-color);">
            <div class="card-title" style="font-size: var(--text-xl);">明日のゴミ出し (${tomorrowDay})</div>
            <div style="font-size: 3rem; margin: 1rem 0;">${tomorrowGarbage.type}</div>
            ${tomorrowGarbage.note ? `<p style="font-size: var(--text-base); color: var(--danger-color); font-weight: bold;">※${tomorrowGarbage.note}</p>` : ''}
        </div>
        <div class="card">
            <div class="card-title">一週間の予定</div>
            <ul style="list-style: none; font-size: var(--text-base);">
    `;

    // 月曜から日曜までのリストを表示
    ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'].forEach(day => {
        const g = AppData.garbageSchedule[day];
        if(g.type !== "なし") {
            html += `<li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">${day}：${g.type}</li>`;
        }
    });

    html += `
            </ul>
        </div>
    `;
    return html;
}

// 3. アンケート画面の生成
function renderPolls() {
    return `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">🗳️ アンケート</h2>
        </div>
        <div class="card" style="text-align: center;">
            <p style="font-size: var(--text-base); margin-bottom: 1rem;">現在実施中のアンケートがあります。</p>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: 1.5rem;">※Googleフォームが開きます</p>
            <a href="#" class="btn-large" style="text-decoration: none; display: inline-block;">敬老会への参加確認に回答する</a>
        </div>
    `;
}

// 4. 役員へ連絡画面の生成
function renderContact() {
    return `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">✉️ 役員へ連絡</h2>
        </div>
        <div class="card">
            <div class="card-title">みんなにお知らせしたい事</div>
            <p style="font-size: var(--text-base); margin-bottom: 1rem;">
                町内のみんなに共有したい情報（お裾分け、迷子のお知らせ、イベント告知など）がある場合は、こちらから役員へご連絡ください。確認後、お知らせ一覧に掲載いたします。
            </p>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: 1.5rem;">※専用の連絡フォーム（Googleフォーム）が開きます</p>
            <a href="#" class="btn-large" style="text-decoration: none; display: inline-block; text-align: center;">連絡フォームを開く</a>
        </div>
        <div class="card">
            <div class="card-title">お電話でのご連絡</div>
            <p style="font-size: var(--text-base); margin-bottom: 1rem;">
                お急ぎの場合は、以下の連絡先（自治会長）までお電話ください。
            </p>
            <a href="tel:0000000000" class="btn-large" style="text-decoration: none; display: inline-block; text-align: center; background: #666;">📞 090-XXXX-XXXX (会長)</a>
        </div>
    `;
}

// ナビゲーションの制御
const navButtons = document.querySelectorAll('.nav-btn');
const appContent = document.getElementById('app-content');

// 画面を切り替える関数
function switchScreen(targetId) {
    appContent.style.animation = 'none';
    appContent.offsetHeight; /* trigger reflow */
    appContent.style.animation = 'fadeIn 0.4s ease-out';
    
    // データに基づいてHTMLを生成
    if (targetId === 'home') appContent.innerHTML = renderHome();
    else if (targetId === 'calendar') appContent.innerHTML = renderCalendar();
    else if (targetId === 'polls') appContent.innerHTML = renderPolls();
    else if (targetId === 'contact') appContent.innerHTML = renderContact();

    // ボタンのアクティブ状態の切り替え
    navButtons.forEach(btn => {
        if (btn.dataset.target === targetId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ボタンにクリックイベントを追加
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchScreen(btn.dataset.target);
    });
});

// 初期画面（ホーム）の読み込み
document.addEventListener('DOMContentLoaded', () => {
    switchScreen('home');
});
