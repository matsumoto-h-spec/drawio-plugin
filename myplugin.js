Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    ui.editor.addListener('fileLoaded', function() {
        // URLの ?target=〇〇 を取得（認証エラーにならない場所から読み取る）
        var urlParams = new URLSearchParams(window.location.search);
        var targetName = urlParams.get('target');

        if (targetName) {
            var decodedTarget = decodeURIComponent(targetName).trim();
            var model = graph.getModel();
            var foundCell = null;

            // 140個のセルをスキャン
            for (var id in model.cells) {
                var cell = model.cells[id];
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").trim();
                
                if (label === decodedTarget) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // ロックを無視して選択・ズーム
                var oldIgnore = graph.isSelectionIgnored;
                graph.isSelectionIgnored = function() { return false; };

                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                graph.view.setScale(1.2); 

                graph.isSelectionIgnored = oldIgnore;
            }
        }
    });
});
