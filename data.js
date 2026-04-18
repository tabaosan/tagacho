// データの管理用ファイル
// （将来的にシステム化するまでは、このファイルの内容を書き換えることでアプリが更新されます）

const AppData = {
    // 📢 お知らせ・回覧板データ
    announcements: [
        {
            id: 1,
            type: "important",
            date: "2026年4月18日",
            title: "多賀町親交自治会総会について",
            content: "5月17日（日）午前10時より、多賀町親交自治会総会を花園コミュニティセンター３階大会議室で行います。参加予定でお返事くださった方はご参加ください。"
        },
       /* ↓↓↓ ここから下はアプリに表示されません（下書き用） ↓↓↓
        {
            id: 2,
            type: "normal",
            date: "2026年5月○日",
            title: "（準備中のお知らせ）",
            content: "ここに次の回覧板の内容を書いておくことができます。"
        },
        {
            id: 3,
            type: "normal",
            date: "2026年6月○日",
            title: "（準備中のお知らせ２）",
            content: "ここにさらに次のお知らせを書いておけます。"
        }
        ↑↑↑ ここまで隠す ↑↑↑ */
    ],

// 2. カレンダー（ゴミ出し）画面の生成
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

    let html = `
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
    return html;
}


    }

    // （連絡用・アンケート用のURL等は今後必要に応じてここに追加できます）
};
