window.onload = function() {
  		var canvas = document.getElementById('canvas');
  		paper.setup(canvas);

      for (var i = 0; i < 10; i++) {
        var path = new paper.Path();

    		path.strokeColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        path.strokeWidth = Math.round(Math.random() * 4) + 1;
        path.add(new paper.Point(0, 350));
        path.add(new paper.Point(50, 350));

        var xPos = 100;
        var yPos = 350;
        var startNr = Math.round(Math.random() * 10000) + 1;

        while (startNr !== 1) {
          var isEven = startNr % 2 === 0;
          if (isEven) {
            console.log(startNr + ' even');
            startNr = startNr / 2;
            yPos += Math.round(Math.random() * 50) + 1;

            path.add(new paper.Point(xPos, yPos));

          } else {
            console.log(startNr + ' odd');
            startNr = (startNr * 3) + 1;
            yPos -= Math.round(Math.random() * 50) + 1;

            path.add(new paper.Point(xPos, yPos));
          }

          xPos += 50;
        }

        path.smooth();
      }


  		paper.view.draw();
}
