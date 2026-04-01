Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    ui.editor.addListener('fileLoaded', function() {
        // URLの ?target=〇〇 を取得（認証エラー回避のためsearchParamsを使用）
        var urlParams = new URLSearchParams(window.location.search);
        var targetName = urlParams.get('target');

        if (targetName) {
            var decodedTarget = decodeURIComponent(targetName);
            var model = graph.getModel();
            var foundCell = null;

            // 140個のセルから「授乳室2」を検索
            for (var id in model.cells) {
                var cell = model.cells[id];
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").trim();
                
                if (label === decodedTarget) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // 背景がロックされていても強制的に選択・ズームする
                var oldIgnore = graph.isSelectionIgnored;
                graph.isSelectionIgnored = function() { return false; };

                graph.setSelectionCell(foundCell);
                graph.scrollCellToVisible(foundCell, true);
                graph.view.setScale(1.5); // 少し大きくズーム

                graph.isSelectionIgnored = oldIgnore;
            }
        }
    });
});
