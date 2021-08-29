//input file into array
let fs = require('fs');
let array = fs.readFileSync(__dirname+'/'+process.argv[2]).toString().split("\n");


//filter out blank lines
array = array.filter(Boolean);

//parse array into variables
let gridSize = arrayToInt(array[0].split(' '));
let location = arrayToInt(array[1].split(' '));
let direction = array[array.length - 1];

//dirt patches array of arrays
let tmpDirt = array.slice(2,array.length - 1);
let uniqDirt = [...new Set(tmpDirt)];
let dirtPatch = [];
for (let i = 0; i < uniqDirt.length; i++) {
  dirtPatch.push(arrayToInt(uniqDirt[i].split(' ')));
}

//dirt counter
let dirtCount = 0;

//loop through directions and find dirt
for (let i = 0; i < direction.length; i++) {
  location = updateLocation(location,direction[i],gridSize);
  let dirtTF = dirtCheck(location, dirtPatch);
  if (dirtTF[0] == 1) {
    dirtCount+=1;
    dirtPatch.splice(dirtTF[1],1);
  }
}
console.log(location[0],location[1]);
console.log(dirtCount);

//convert array of chars to num
function arrayToInt(arr) {
  let numArr = [];
  for (let i = 0; i < arr.length; i++) {
     numArr.push(Number(arr[i]))
  }
  return numArr;
}

//update hoover location
function updateLocation(loc, dir, roomDim) {
  let newLoc = [];
  switch (dir) {
    case 'N':
      newLoc = newLocCheck([loc[0],loc[1] + 1],loc,roomDim);
      break;
    case 'S':
      newLoc = newLocCheck([loc[0],loc[1] - 1],loc,roomDim);
      break;
    case 'E':
      newLoc = newLocCheck([loc[0] + 1,loc[1]],loc,roomDim);
      break;
    case 'W':
      newLoc = newLocCheck([loc[0] - 1,loc[1]],loc,roomDim);
      break;
    default:
      console.log('Not a valid direction. Skipping');
      newLoc = loc;
  }
  return newLoc;
}

//check if hoover still in room dimensions
function newLocCheck(newLoc, origLoc, roomDim) {
  if (newLoc[0] <= roomDim[0] && newLoc[0] >= 0 && newLoc[1] <= roomDim[1] && newLoc[1] >= 0){
    return newLoc;
  } else {
    console.log('Hoover hit the wall');
    return origLoc
  }

}

//check of location is a dirt patch
function dirtCheck(loc, dirtPatches) {
  for (let i = 0; i < dirtPatches.length; i++) {
    if (arrayEquals(dirtPatches[i],loc)) {
      return [1,i];
    }
  }
  return [0,0]
}

//check if arrays are equal
function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
