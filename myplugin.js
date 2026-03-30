Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // 図面が読み込まれたタイミングで実行
    ui.editor.addListener('fileLoaded', function() {
        // URLの末尾（#以降）から &target=図形名 を抽出
        var hash = window.location.hash;
        var match = hash.match(/target=([^&]+)/);
        
        if (match) {
            var targetName = decodeURIComponent(match[1]);
            var model = graph.getModel();
            var cells = model.cells;
            var foundCell = null;

            // 全セルから名前が一致するものを検索
            for (var id in cells) {
                var cell = cells[id];
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").trim();
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // ロックを無視して選択を許可する一時設定
                var oldIgnore = graph.isSelectionIgnored;
                graph.isSelectionIgnored = function() { return false; };

                // 図形を選択し、中央へズーム
                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                graph.view.setScale(1.2); // ズーム倍率（お好みで調整）

                graph.isSelectionIgnored = oldIgnore; // 設定を戻す
            }
        }
    });
});
