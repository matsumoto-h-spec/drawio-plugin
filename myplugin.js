Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    ui.editor.addListener('fileLoaded', function() {
        // URLから &target=図形名 を探す
        var hash = window.location.hash;
        var match = hash.match(/target=([^&]+)/);
        
        if (match) {
            var targetName = decodeURIComponent(match[1]);
            var cells = graph.getModel().cells;
            var foundCell = null;

            // 全セルをスキャンして名前が一致するものを探す
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

                graph.isSelectionIgnored = oldIgnore;
            }
        }
    });
});
