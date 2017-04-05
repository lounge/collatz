window.onload = function() {
  var canvas = document.getElementById('canvas');
  paper.setup(canvas);

  var branches = reverseCollatz(27);
  console.log(branches);

  visualize(branches);
}


function visualize(branches) {

  var canvasHeight = document.getElementById('canvas').height;

  var path = new paper.Path();
  path.strokeColor = 'green';
  path.add(new paper.Point(400, canvasHeight));
  path.add(new paper.Point(400, canvasHeight - 50));
  path.smooth();

  var xPos = 400;
  var yPos = canvasHeight - 50;

  for (var i = 0; i < branches.length; i++) {
    var path = new paper.Path();
    path.strokeColor = 'red';
    path.add(new paper.Point(xPos, yPos));
    path.add(new paper.Point(xPos, yPos - 50));
    path.smooth();
    console.log('branch', xPos, yPos);

     var subBranch = branches[i];
     var branchXPos = xPos;
    for(var y = 0; y < subBranch.length; y++) {
      branch = subBranch[y];
      if (branch % 2 === 0) {
        branchXPos += 20;
      } else {
        branchXPos -= 20;
      }

      var path = new paper.Path();
      path.strokeColor = 'blue';
      path.add(new paper.Point(xPos, yPos));
      path.add(new paper.Point(branchXPos, yPos - 50));
      path.smooth();
      console.log('sub', branchXPos, yPos);
    }

    yPos -= 50;

  }

  paper.view.draw();
}

function reverseCollatz(max) {
    let levels = [[1]]
    while (levels.length < max) {
        let level = [];
        levels[levels.length-1].forEach(function(num){
            const mod6 = ((num-4)%6);
            const odd = (num-1)/3;
            if (!mod6 && odd != 1) {
                level.push(odd)
            }
            level.push(num*2);
        })
        levels.push(level);
    }
    return levels;

}

function collatz() {
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
