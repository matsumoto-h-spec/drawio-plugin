Draw.loadPlugin(function(ui) {
  // ロードイベント待たずに即座に実行
  var tryGetCells = function() {
    try {
      var model = ui.editor.graph.getModel();
      var cellIds = [];
      
      // 全セルを列挙（ロック状態を無視）
      for (var key in model.cells) {
        var cell = model.cells[key];
        if (cell && cell.id) {
          cellIds.push(cell.id);
        }
      }
      
      if (cellIds.length > 0) {
        console.log('✅ プラグイン読み込み成功');
        console.log('全セルID (' + cellIds.length + '個): ' + cellIds.join(', '));
        
        // URLからセルIDを取得
        var hash = window.location.hash;
        var match = hash.match(/cellId=([^&]+)/);
        var targetId = match ? match[1] : null;
        
        if (targetId) {
          var cell = model.getCell(targetId);
          if (cell) {
            ui.editor.graph.setSelectionCell(cell);
            ui.editor.graph.scrollCellToVisible(cell, true);
            console.log('✅ セル ' + targetId + ' を選択しました');
          }
        }
      } else {
        setTimeout(tryGetCells, 100);
      }
    } catch(e) {
      console.log('Error: ' + e.message);
      setTimeout(tryGetCells, 100);
    }
  };
  
  setTimeout(tryGetCells, 500);
});
