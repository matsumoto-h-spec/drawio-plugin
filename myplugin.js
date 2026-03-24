1  Draw.loadPlugin(function(ui) {
2    ui.editor.addListener('fileLoaded', function() {
3      var params = new URLSearchParams(window.location.hash.substring(1));
4      var targetId = params.get('cellId');
5
6      if (!targetId) return;
7
8      var graph = ui.editor.graph;
9      var model = graph.getModel();
10     var cell = model.getCell(targetId);
11
12     if (cell) {
13       setTimeout(function() {
14         graph.setSelectionCell(cell);
15         graph.scrollCellToVisible(cell, true);
16         graph.zoomTo(1.5);
17       }, 300);
18     }
19   });
20 });
