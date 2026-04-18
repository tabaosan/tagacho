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
            content: "5月17日（日）午前10時より、多賀町親交自治会総会を花園町コミュニティセンター３階第会議室にて行います。出席で回答くださった方はご参加ください。"
        },
        
        /* ↓↓↓ ここから下はアプリに表示されません（下書き用・予備） ↓↓↓
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
    
    // 🗳️ アンケートデータ
    poll: {
        isActive: true, // アンケートを実施中の場合は true、実施していない場合は false に書き換えてください
        title: "多賀町親交自治会総会への参加確認", // アンケートのタイトル
        description: "5月17日(日)の多賀町親交自治会総会（花園町コミュニティセンターにて開催）にご参加いただけますか？以下のボタンから回答をお願いします。", // アンケートの説明文
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdih3bWp_ZJIxeBLDtXZ8F8pMvnG4bUHn5Vl03axha20-PRPQ/viewform?usp=publish-editor" // ここに作成したアンケート用GoogleフォームのURLを貼り付けます（例: "https://forms.gle/..."）
    },

    // ✉️ 役員連絡先データ
    contact: {
        phoneTitle: "📞 090-1320-6471 (磯田)", // 電話ボタンの表示文字
        phoneUrl: "tel:09013206471",          // 実際に電話をかける先の番号（ハイフンなし等）
        formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeCtikpWe5Wraxv2xx8SWhUPc93_6SJPmj3_Co6-46ku8E0XA/viewform?usp=preview" // ここに作成した連絡用GoogleフォームのURLを貼り付けます
    }
};
