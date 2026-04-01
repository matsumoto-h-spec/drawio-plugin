Draw.loadPlugin(function(ui) {
    var graph = ui.editor.graph;

    ui.editor.addListener('fileLoaded', function() {
        // URLの末尾にある target=〇〇 を抜き出す
        var hash = window.location.hash;
        var match = hash.match(/target=([^&]+)/);
        
        if (match) {
            var targetName = decodeURIComponent(match[1]);
            var cells = graph.getModel().cells;
            
            for (var id in cells) {
                var cell = cells[id];
                var label = (graph.getLabel(cell) || '').replace(/<[^>]*>/g, "").trim();
                
                if (label === targetName) {
                    // ロックを無視して選択・ズーム
                    var oldIgnore = graph.isSelectionIgnored;
                    graph.isSelectionIgnored = function() { return false; };
                    
                    graph.setSelectionCell(cell);
                    graph.scrollCellToVisible(cell, true);
                    graph.view.setScale(1.5); 
                    
                    graph.isSelectionIgnored = oldIgnore;
                    break;
                }
            }
        }
    });
});
