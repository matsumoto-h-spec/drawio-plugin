Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // ファイルとページの読み込み完了を待って実行
    ui.editor.addListener('fileLoaded', function() {
        // URL全体から target=〇〇 を探す
        var urlStr = window.location.href;
        var match = urlStr.match(/target=([^&?#]+)/);
        var targetName = match ? decodeURIComponent(match[1]) : null;

        if (targetName) {
            // ロックされていても検索できるように設定を一時無視
            var model = graph.getModel();
            var cells = model.cells;
            var foundCell = null;

            for (var id in cells) {
                var cell = cells[id];
                var label = graph.getLabel(cell).replace(/<[^>]*>/g, "").trim();
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // ロックされていても「選択」と「ズーム」を実行
                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                
                // 少しズームアップして見やすくする（お好みで）
                graph.view.setScale(1.5); 
            }
        }
    });
});
