var stemPath;
var branchPaths = [];
var canvasHeight;
var canvasWidth;
var xPosStart;

window.onload = function() {
  var canvas = document.getElementById('canvas');
  paper.setup(canvas);

  canvasHeight = document.getElementById('canvas').height;
  canvasWidth = document.getElementById('canvas').width;
  xPosStart = canvasWidth / 6;

  var branches = reverseCollatz(27);
  visualize(branches);

  paper.view.onFrame = function(event) {
  	for (var i = 0; i < stemPath.segments.length; i++) {
  		var segment = stemPath.segments[i];
  		var sinus = Math.sin(event.time * 3 + i);
  		segment.point.x = xPosStart + (sinus * 60);
  	}
  	stemPath.smooth();

    for (var i = 0; i < branchPaths.length; i++) {
  		var branch = branchPaths[i];
  		var sinus = Math.sin(event.time * 3 + i);
  		branch.segments[1].point.x = branch.segments[1].point.x + (sinus * 60);
  	}
    branch.smooth();
  }
}


function visualize(branches) {
  var path = new paper.Path();
  path.strokeColor = '#3C896D';
  path.add(new paper.Point(xPosStart, canvasHeight));
  path.add(new paper.Point(xPosStart, canvasHeight - 800));
  path.smooth();

  var yPosTickHeight = 20;
  var xPos = xPosStart;
  var yPos = canvasHeight - 800;

  stemPath = new paper.Path();
  stemPath.strokeColor = 'red';//'#3C896D';
  for (var i = 0; i < branches.length; i++) {


    stemPath.add(new paper.Point(xPos, yPos));
    stemPath.add(new paper.Point(xPos, yPos - yPosTickHeight));
    stemPath.smooth();

     var subBranch = branches[i];
     var branchXPositionNeg = xPos;
     var branchXPositionPos = xPos;
    for(var y = 0; y < subBranch.length; y++) {
      var branchPath = new paper.Path();
      branchPath.add(new paper.Point(xPos, yPos));

      branch = subBranch[y];
      if (branch % 2 === 0) {
        branchXPositionPos += 3;
        branchPath.add(new paper.Point(branchXPositionPos, yPos - yPosTickHeight));
        branchPath.strokeColor = '#4FB286';
      } else {
        branchXPositionNeg -= 3;
        branchPath.add(new paper.Point(branchXPositionNeg, yPos - yPosTickHeight));
        branchPath.strokeColor = '#50FFB1';
      }

      branchPath.smooth();
      branchPaths.push(branchPath);
    }
    yPos -= yPosTickHeight;
  }

  paper.view.draw();
  console.log('stem length: ' + stemPath.segments.length);
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
