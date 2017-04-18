window.onload = function() {
  var canvas = document.getElementById('canvas');
  paper.setup(canvas);

  var branches = reverseCollatz(27);
  console.log(branches);

  visualize(branches);
}


function visualize(branches) {

  var canvasHeight = document.getElementById('canvas').height;
  var canvasWidth = document.getElementById('canvas').width;
  var xPosStart = canvasWidth / 6;
console.log(canvasWidth);
console.log(xPosStart);


  var path = new paper.Path();
  path.strokeColor = '#3C896D';
  path.add(new paper.Point(xPosStart, canvasHeight));
  path.add(new paper.Point(xPosStart, canvasHeight - 800));
  path.smooth();

  var yPosTickHeight = 20;
  var xPos = xPosStart;
  var yPos = canvasHeight - 800;

  for (var i = 0; i < branches.length; i++) {
    var path = new paper.Path();
    path.strokeColor = '#3C896D';
    path.add(new paper.Point(xPos, yPos));
    path.add(new paper.Point(xPos, yPos - yPosTickHeight));
    path.smooth();
    // console.log('branch', xPos, yPos);




     var subBranch = branches[i];
     var branchXPositionNeg = xPos;
     var branchXPositionPos = xPos;
    for(var y = 0; y < subBranch.length; y++) {
      var path = new paper.Path();
      path.add(new paper.Point(xPos, yPos));

      branch = subBranch[y];
      if (branch % 2 === 0) {
        branchXPositionPos += 3;
        path.add(new paper.Point(branchXPositionPos, yPos - yPosTickHeight));
        // console.log('pos');
        path.strokeColor = '#4FB286';
      } else {
        branchXPositionNeg -= 3;
        path.add(new paper.Point(branchXPositionNeg, yPos - yPosTickHeight));
        // console.log('neg');
        path.strokeColor = '#50FFB1';
      }



      path.smooth();
      // console.log('sub', branchXPos, yPos);
    }

    yPos -= yPosTickHeight;

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
