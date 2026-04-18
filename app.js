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

// 2. カレンダー（ゴミ出し）画面の生成（全自動計算）
function getGarbageType(date) {
    const day = date.getDay(); // 0:日, 1:月... 6:土
    const dateNum = date.getDate(); // 日付
    const nthWeek = Math.floor((dateNum - 1) / 7) + 1; // 第何週目か
    
    // 年末年始など特別な休みの設定（例として12月31日〜1月3日）
    if ((date.getMonth() === 11 && dateNum === 31) || (date.getMonth() === 0 && dateNum <= 3)) {
        return { type: "なし", note: "年末年始はお休みです" };
    }

    switch(day) {
        case 1: // 月曜日
            if (nthWeek === 2 || nthWeek === 4) return { type: "🔨 破砕ごみ", note: "指定収集袋に入れて出してください" };
            return { type: "なし", note: "" };
        case 2: // 火曜日
            return { type: "🔥 燃やせるごみ", note: "朝8時までに出してください" };
        case 3: // 水曜日
            return { type: "♻️ プラ容器包装", note: "透明・半透明の袋で出してください" };
        case 4: // 木曜日
            if (nthWeek === 1 || nthWeek === 3) return { type: "🥫 缶･びん･ペット", note: "かご・ネットに出してください" };
            if (nthWeek === 2 || nthWeek === 4) return { type: "📦 紙・布", note: "ひもで十字に縛って出してください" };
            return { type: "なし", note: "" };
        case 5: // 金曜日
            return { type: "🔥 燃やせるごみ", note: "朝8時までに出してください" };
        default: // 土日
            return { type: "なし", note: "" };
    }
}

function renderCalendar() {
    const today = new Date();
    // 明日の日付を計算
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // 明日の曜日を日本語で取得
    const daysStr = ['日', '月', '火', '水', '木', '金', '土'];
    const tomorrowDayStr = daysStr[tomorrow.getDay()] + '曜日';
    
    // ゴミの種類を取得
    const tomorrowGarbage = getGarbageType(tomorrow);

    return `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">🗑️ ゴミ出しカレンダー</h2>
        </div>
        <div class="card" style="text-align: center; border: 2px solid var(--primary-color);">
            <div class="card-title" style="font-size: var(--text-xl);">明日のゴミ出し (${tomorrowDayStr})</div>
            <div style="font-size: 3rem; margin: 1rem 0;">${tomorrowGarbage.type}</div>
            ${tomorrowGarbage.note ? `<p style="font-size: var(--text-base); color: var(--danger-color); font-weight: bold;">※${tomorrowGarbage.note}</p>` : ''}
        </div>
        <div class="card">
            <div class="card-title">基本の収集ルール</div>
            <ul style="list-style: none; font-size: var(--text-base);">
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">【火・金】🔥 燃やせるごみ</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">【水曜】♻️ プラスチック容器包装</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">【第1・3木曜】🥫 缶・びん・ペットボトル</li>
                <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">【第2・4木曜】📦 紙・布</li>
                <li style="padding: 0.5rem 0;">【第2・4月曜】🔨 破砕ごみ（有害ごみ）</li>
            </ul>
        </div>
    `;
}

// 3. アンケート画面の生成
function renderPolls() {
    // アンケートを実施していない場合
    if (!AppData.poll.isActive) {
        return `
            <div class="page-title" style="margin-bottom:1rem;">
                <h2 style="font-size: var(--text-xl);">🗳️ アンケート</h2>
            </div>
            <div class="card" style="text-align: center;">
                <p style="font-size: var(--text-base); margin-bottom: 1rem;">現在実施中のアンケートはありません。</p>
            </div>
        `;
    }

    // アンケートを実施中の場合
    return `
        <div class="page-title" style="margin-bottom:1rem;">
            <h2 style="font-size: var(--text-xl);">🗳️ アンケート</h2>
        </div>
        <div class="card" style="text-align: center;">
            <div class="card-title">${AppData.poll.title}</div>
            <p style="font-size: var(--text-base); margin-bottom: 1rem;">${AppData.poll.description}</p>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: 1.5rem;">※Googleフォームが開きます</p>
            <a href="${AppData.poll.url}" class="btn-large" style="text-decoration: none; display: inline-block;">アンケートに回答する</a>
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
            <a href="${AppData.contact.formUrl}" class="btn-large" style="text-decoration: none; display: inline-block; text-align: center;">連絡フォームを開く</a>
        </div>
        <div class="card">
            <div class="card-title">お電話でのご連絡</div>
            <p style="font-size: var(--text-base); margin-bottom: 1rem;">
                お急ぎの場合は、以下の連絡先（自治会長）までお電話ください。
            </p>
            <a href="${AppData.contact.phoneUrl}" class="btn-large" style="text-decoration: none; display: inline-block; text-align: center; background: #666;">${AppData.contact.phoneTitle}</a>
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
