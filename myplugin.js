Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // 図面が読み込まれたら実行
    ui.editor.addListener('fileLoaded', function() {
        // URLの最後にある &target=図形名 を取得
        var hash = window.location.hash;
        var match = hash.match(/target=([^&]+)/);
        
        if (match) {
            var targetName = decodeURIComponent(match[1]);
            var cells = graph.getModel().cells;
            var foundCell = null;

            // 140個のセルを「テキスト（名前）」で検索
            for (var id in cells) {
                var cell = cells[id];
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").trim();
                
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // ロックを無視して選択・ズームを実行
                var oldIgnore = graph.isSelectionIgnored;
                graph.isSelectionIgnored = function() { return false; };

                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                graph.view.setScale(1.2); // ズーム倍率

                graph.isSelectionIgnored = oldIgnore; // 設定を戻す
            }
        }
    });
});
