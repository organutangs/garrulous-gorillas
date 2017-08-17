//everytime a vote is triggered add username to vote
//add timeStamp to vote
//if already voted, dont let them vote from the already made boolean
//

exports.sortArgsByHot = function(data) {
return data;
}

exports.sortArgsByNew = function(data) {
  console.log("this is the timestamp ", data);
  var sorted = data.sort((a, b)=> {
    return new Date(b.updated) - new Date(a.updated);
  });
  console.log('sort by new', sorted);
  return sorted;
}
//2017-08-04T16:03:38.480Z

exports.sortArgsByVote = function(data) {
  let results = [];
  // sort array of argument objects
  //console.log("thisis data HELP", data);
  var sorted = data.sort((a, b)=> {
    return b.votes - a.votes;
  });
  return  sorted;
};


