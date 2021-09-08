function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
// }*/
// String.prototype.format = function() {
//   var arr = this.replace(/,/g, '');
//   var array = arr.split('');
//   var start;
//   if (array.includes('.')){
//   start = arr.split('.')[0];
//   } else {
//     start = arr;
//   }
// //     array = array.filter(i => (array.indexOf(i) < array.length - 4) || (array.indexOf(i) > array.length -5 && i != ' '));
//     var howMany = (start.length) % 3 === 0 ? parseInt((start.length) / 3) - 1 : parseInt((start.length) / 3);
//     console.log(howMany)
//     for (var times = 1; times < howMany + 1; times++) {
//       var special = array.indexOf('.') - (times*3);
//       array[special] = (array[special] + '').includes(' ') ? array[special] : (' ').concat((array[special] + ''));
//     }
//    return (array + '').replace(/,/g, '').replace(/ /g, ',');
// }
Number.prototype.format = function (spacing = ',') {
  var arr = String(this);
  arr = arr.replace(/,/g, '');
  var array = arr.split('');
  var start;
  var fill = spacing;
  if (arr.includes('.')) {
    start = arr.split('.')[0];
  } else {
    start = arr;
  }
  var howMany =
    start.length % 3 === 0
      ? parseInt(start.length / 3) - 1
      : parseInt(start.length / 3);
  for (var times = 1; times < howMany + 1; times++) {
    var special = start.length - times * 3;
    array[special] = ','.concat(String(array[special]));
  }
  return array.join('');
};

String.prototype.format = function (spacing) {
  var arr = this;
  arr = arr.replace(/,/g, '');
  var array = arr.split('');
  var start;
  var fill;
  if (!spacing) {
    fill = ',';
  } else {
    fill = spacing;
  }
  if (arr.includes('.')) {
    start = arr.split('.')[0];
  } else {
    start = arr;
  }
  var howMany =
    start.length % 3 === 0
      ? parseInt(start.length / 3) - 1
      : parseInt(start.length / 3);
  for (var times = 1; times < howMany + 1; times++) {
    var special = start.length - times * 3;
    array[special] = ','.concat(String(array[special]));
  }
  return array.join('');
};

String.prototype.splice = function (start, delCount, newSubStr) {
  return (
    this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount))
  );
};
