Draw.loadPlugin(function(ui) {
  ui.editor.addListener('fileLoaded', function() {
    var model = ui.editor.graph.getModel();
    var cellIds = [];
    
    // 全セルを列挙
    for (var key in model.cells) {
      var cell = model.cells[key];
      if (cell && cell.id) {
        cellIds.push(cell.id);
      }
    }
    
    console.log('✅ プラグイン読み込み成功');
    console.log('全セルID: ' + cellIds.join(', '));
    
    // URLからcellIdを取得
    var params = new URLSearchParams(window.location.hash.substring(1));
    var targetId = params.get('cellId');
    
    if (targetId) {
      var cell = model.getCell(targetId);
      if (cell) {
        setTimeout(function() {
          ui.editor.graph.setSelectionCell(cell);
          ui.editor.graph.scrollCellToVisible(cell, true);
          console.log('✅ セル ' + targetId + ' を選択しました');
        }, 500);
      } else {
        console.log('❌ セル ' + targetId + ' が見つかりません');
      }
    }
  });
});
