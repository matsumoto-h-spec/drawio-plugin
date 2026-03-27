Draw.loadPlugin(function(ui) {
  ui.editor.addListener('fileLoaded', function() {
    var params = new URLSearchParams(window.location.hash.substring(1));
    var targetId = params.get('cellId');
    
    if (!targetId) return;
    
    var graph = ui.editor.graph;
    var model = graph.getModel();
    var cell = model.getCell(targetId);
    
    if (cell) {
      setTimeout(function() {
        // ロックを無視して選択
        var oldLocked = cell.geometry ? cell.geometry.locked : false;
        
        graph.setSelectionCell(cell);
        graph.scrollCellToVisible(cell, true);
        graph.zoomTo(1.5);
        
        console.log('Selected cell: ' + targetId);
      }, 300);
    } else {
      console.log('Cell not found: ' + targetId);
    }
  });
});
