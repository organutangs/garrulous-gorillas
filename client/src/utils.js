exports.sortArgsByHot = function(data) {
//console.log("sortbyHOT returns data ", data);
return data;

}

exports.sortArgsByNew = function(data) {
  let results = [];
  var sorted = data.sort((a, b)=> {
    return a.updated-b.updated;
  });
 // console.log('sort by new', sorted);
  return sorted;
}


exports.sortArgsByVote = function(data) {
  let results = [];
  // sort array of argument objects
  //console.log("thisis data HELP", data);
  var sorted = data.sort((a, b)=> {
    return b.votes - a.votes;
  });
  return  sorted;
};


