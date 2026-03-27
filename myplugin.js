Draw.loadPlugin(function(ui) {
  try {
    var model = ui.editor.graph.getModel();
    var cellIds = [];
    
    for (var key in model.cells) {
      var cell = model.cells[key];
      if (cell && cell.id) {
        cellIds.push(cell.id);
      }
    }
    
    alert('全セル数: ' + cellIds.length + '個\nセルID: ' + cellIds.slice(0, 10).join(', '));
  } catch(e) {
    alert('エラー: ' + e.message);
  }
});
