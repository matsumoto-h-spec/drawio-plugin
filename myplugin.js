Draw.loadPlugin(function(ui) {
  // プラグイン読み込み時に即座に実行
  setTimeout(function() {
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
    var hash = window.location.hash;
    var match = hash.match(/cellId=([^&]+)/);
    var targetId = match ? match[1] : null;
    
    if (targetId) {
      var cell = model.getCell(targetId);
      if (cell) {
        try {
          // ロックを一時的に無視
          ui.editor.graph.setSelectionCell(cell);
          ui.editor.graph.scrollCellToVisible(cell, true);
          ui.editor.graph.zoomTo(1.5);
          console.log('✅ セル ' + targetId + ' を選択しました');
        } catch(e) {
          console.log('❌ セル ' + targetId + ' の選択に失敗: ' + e.message);
        }
      }
    }
  }, 1000);
});
