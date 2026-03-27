Draw.loadPlugin(function(ui) {
  console.log('✅ プラグイン読み込み成功');
  
  var model = ui.editor.graph.getModel();
  var cellIds = [];
  
  for (var key in model.cells) {
    var cell = model.cells[key];
    if (cell && cell.id) {
      cellIds.push(cell.id);
    }
  }
  
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
});
