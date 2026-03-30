Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // 図面が読み込まれたら実行
    ui.editor.addListener('fileLoaded', function() {
        // 1. URLから「target」というパラメータを探してIDを読み取る
        var urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
        var id = urlParams.get('target'); 

        if (id) {
            // 2. graph.getModel().getCell(id) でセルを取得
            var cell = graph.getModel().getCell(id);

            if (cell) {
                // 3. graph.setSelectionCell(cell) で選択
                graph.setSelectionCell(cell);
                // 4. graph.scrollCellToVisible(cell, true) でズーム
                graph.scrollCellToVisible(cell, true);
            }
        }
    });

    // 【おまけ機能】140個のIDを調べるのが大変なので、
    // 図形を「Ctrl + クリック」したらそのIDを表示するようにします
    graph.addListener(mxEvent.CLICK, function(sender, evt) {
        var cell = evt.getProperty('cell');
        if (cell != null && evt.getEvent().ctrlKey) {
            alert('この図形のIDは: ' + cell.id);
        }
    });
});
