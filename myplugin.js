Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    ui.editor.addListener('fileLoaded', function() {
        // URLからターゲット名を取得
        var fullUrl = window.location.href;
        var match = fullUrl.match(/target=([^&?#]+)/);
        if (!match) return;

        var targetName = decodeURIComponent(match[1]).trim();
        console.log("◆検索開始ターゲット: [" + targetName + "]");

        var cells = graph.getModel().cells;
        var foundCell = null;

        for (var id in cells) {
            var cell = cells[id];
            // HTMLタグを除去し、前後スペースを消して純粋なテキストにする
            var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
            
            if (label !== "") {
                // コンソールに読み取った名前を流す（デバッグ用）
                // console.log("チェック中: [" + label + "]"); 
                
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }
        }

        if (foundCell) {
            console.log("✅発見しました！ズームを実行します。");
            var oldIgnore = graph.isSelectionIgnored;
            graph.isSelectionIgnored = function() { return false; };
            graph.setSelectionCell(foundCell);
            graph.scrollCellToVisible(foundCell, true);
            graph.view.setScale(1.5);
            graph.isSelectionIgnored = oldIgnore;
        } else {
            console.error("❌図形が見つかりません。図面内の名前とURLの文字が完全一致しているか確認してください。");
        }
    });
});
