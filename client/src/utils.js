//add timestamp for vote
exports.sortArgsByHot = function(data) {
  //set time to today's date minus 30 days.
  //we want to use only votes from the last 30 days.
  var time = new Date();
  time.setDate(time.getDate()-30);
  //console.log("check if time is 30days ago", time);

  //helper function sums up votes
  var voteTotal = (data)=> {
    return data.reduce((acc, item)=> {
      return acc + item.vote;
    });
  };

  //recentVotes is an array of all arguments that have been voted on in the last 30days
  let recentVotes = data.voteData.filter((item)=> {
    return new Date(item.date) > new Date(time);
  });

  //total votes this argument has received in 30 days
  var sorted = recentVotes.sort((a,b)=> {
    return b.voteTotal(b.voteDate) - a.voteTotal(a.voteDate);
  });

  return sorted;
  //tomorrow i will add 10x logarithm weights for votes within a few days vs weeks vs months

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


