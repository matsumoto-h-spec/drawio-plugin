Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // ファイル読み込み完了時に実行
    ui.editor.addListener('fileLoaded', function() {
        // 1. URLの「target」という文字の後ろを読み取る
        var urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
        var targetName = urlParams.get('target'); 

        if (targetName) {
            var model = graph.getModel();
            var foundCell = null;

            // 2. 140個の中から「名前」が一致するセルを探して取得
            for (var id in model.cells) {
                var cell = model.cells[id];
                var label = graph.getLabel(cell).replace(/<[^>]*>/g, "").trim();
                if (label === targetName) {
                    foundCell = cell;
                    break;
                }
            }

            if (foundCell) {
                // 3. graph.setSelectionCell(cell) で選択
                graph.setSelectionCell(foundCell);
                // 4. graph.scrollCellToVisible(cell, true) でズーム
                graph.scrollCellToVisible(foundCell, true);
            }
        }
    });
});
