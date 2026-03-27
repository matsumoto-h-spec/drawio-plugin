Draw.loadPlugin(function(ui) {
  ui.editor.addListener('fileLoaded', function() {
    // 全セルのIDを取得して出力
    var model = ui.editor.graph.getModel();
    var cells = model.cells;
    var cellList = [];
    
    for (var key in cells) {
      if (cells[key].id) {
        cellList.push({
          id: cells[key].id,
          value: cells[key].value || '(no label)'
        });
      }
    }
    
    console.log('=== All Cell IDs ===');
    console.table(cellList);
    
    // URLハッシュからセルIDを読み取る
    var params = new URLSearchParams(window.location.hash.substring(1));
    var targetId = params.get('cellId');
    
    if (!targetId) return;
    
    var cell = model.getCell(targetId);
    
    if (cell) {
      setTimeout(function() {
        ui.editor.graph.setSelectionCell(cell);
        ui.editor.graph.scrollCellToVisible(cell, true);
        ui.editor.graph.zoomTo(1.5);
      }, 300);
    }
  });
});
