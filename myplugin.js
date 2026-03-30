Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    // --- 画像のステップを自動化する関数 ---
    function jumpToCell(targetName) {
        var model = graph.getModel();
        var cells = model.cells;
        var foundCell = null;

        // 1 & 2. 140個の中から対象のセルを特定 (getCellの代わり)
        for (var id in cells) {
            var label = graph.getLabel(cells[id]).replace(/<[^>]*>/g, "").trim();
            if (label === targetName) {
                foundCell = cells[id];
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

    // --- 画面上に検索ボックスを作る ---
    var container = document.createElement('div');
    container.style = 'position:fixed; top:50px; right:20px; z-index:999; background:white; padding:10px; border:2px solid #000; border-radius:5px; box-shadow:5px 5px 10px rgba(0,0,0,0.2);';
    container.innerHTML = '<div style="font-weight:bold; font-size:12px; margin-bottom:5px;">図形名でジャンプ (140個対応)</div>' +
                          '<input type="text" id="cellSearch" placeholder="図形名を入力..." style="width:150px;">';
    
    document.body.appendChild(container);

    // 入力してEnterを押したらジャンプ実行
    var input = document.getElementById('cellSearch');
    input.onkeypress = function(e) {
        if (e.keyCode == 13) { // Enterキー
            jumpToCell(this.value);
        }
    };

    // --- 画像の通り、URLハッシュ（#以降）からの自動ジャンプもサポート ---
    ui.editor.addListener('fileLoaded', function() {
        var hash = decodeURIComponent(window.location.hash.slice(1));
        if (hash) { jumpToCell(hash); }
    });
});
