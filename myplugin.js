Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    function jumpToTarget() {
        // URLの ? の後でも # の後でも「target=〇〇」を執念深く探す
        var urlStr = window.location.href;
        var match = urlStr.match(/target=([^&?#\s]+)/);
        
        if (match) {
            var targetName = decodeURIComponent(match[1]).trim();
            var model = graph.getModel();
            var cells = model.cells;
            var foundCell = null;

            // 140個のセルをスキャン
            for (var id in cells) {
                var cell = cells[id];
                // ラベルからHTMLタグや余計な空白を除去
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // ロックを強制無視して選択・中央ズーム
                var oldIgnore = graph.isSelectionIgnored;
                graph.isSelectionIgnored = function() { return false; };

                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                graph.view.setScale(1.5); // ズーム倍率

                graph.isSelectionIgnored = oldIgnore;
                console.log("✅ ジャンプ成功: " + targetName);
            } else {
                console.warn("❌ 図形が見つかりません: " + targetName);
            }
        }
    }

    // Googleドライブの読み込み待ちを考慮して、1秒後に実行
    ui.editor.addListener('fileLoaded', function() {
        setTimeout(jumpToTarget, 1000);
    });
});
