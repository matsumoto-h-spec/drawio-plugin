Draw.loadPlugin(function(ui) {
  var model = ui.editor.graph.getModel();
  var cellIds = [];
  
  // 全セルのIDを取得
  for (var key in model.cells) {
    var cell = model.cells[key];
    if (cell && cell.id) {
      cellIds.push(cell.id);
    }
  }
  
  // アラートで全セルIDを表示
  alert('合計 ' + cellIds.length + ' 個のセル\n\nセルID:\n' + cellIds.join('\n'));
});
