

exports.sortArgsByVote = function(data) {
  let results = [];
  // sort array of argument objects

  var sorted = data.sort((a, b)=> {
    return b.votes - a.votes
  }).map(obj => obj.body)
  console.log('sorted args', sorted);
  return sorted;
};


