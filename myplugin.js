Draw.loadPlugin(function(ui) {
  // URLからセルIDを取得
  var hash = window.location.hash;
  var match = hash.match(/cellId=([^&]+)/);
  var targetId = match ? match[1] : null;
  
  if (targetId) {
    var cell = ui.editor.graph.getModel().getCell(targetId);
    if (cell) {
      ui.editor.graph.setSelectionCell(cell);
      ui.editor.graph.scrollCellToVisible(cell, true);
      ui.editor.graph.zoomTo(1.5);
      alert('✅ セル ' + targetId + ' を選択しました');
    } else {
      alert('❌ セル ' + targetId + ' が見つかりません');
    }
  }
});
