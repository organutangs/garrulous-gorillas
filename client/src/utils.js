exports.sortArgsByHot = function(data) {

}

exports.sortArgsByNew = function(data) {
  let results = [];
  var sorted = data.sort((a,b)=>{
    return b-a;
  }).map((obj)=> {obj.body});
  return sorted;
}


exports.sortArgsByVote = function(data) {
  let results = [];
  // sort array of argument objects
  console.log("thisis data HELP", data);
  var sorted = data.sort((a, b)=> {
    return b.votes - a.votes;
  });
  return  sorted;
};


