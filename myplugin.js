Draw.loadPlugin(function(ui) {
  console.log('🔧 プラグイン開始');
  console.log('ui:', ui);
  console.log('ui.editor:', ui.editor);
  console.log('ui.editor.graph:', ui.editor.graph);
  
  var tryGetCells = function() {
    try {
      console.log('🔍 セル取得を試行...');
      var graph = ui.editor.graph;
      var model = graph.getModel();
      console.log('model:', model);
      console.log('model.cells:', model.cells);
      
      var cellIds = [];
      for (var key in model.cells) {
        var cell = model.cells[key];
        if (cell && cell.id) {
          cellIds.push(cell.id);
        }
      }
      
      console.log('✅ セルID取得成功: ' + cellIds.length + '個');
      console.log('セルID: ' + cellIds.join(', '));
    } catch(e) {
      console.log('❌ エラー: ' + e.message);
    }
  };
  
  setTimeout(tryGetCells, 1000);
});
