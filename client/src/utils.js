//add timestamp for vote
exports.sortArgsByHot = function(data) {
  //set time to today's date minus 30 days.
  //we want to use only votes from the last 30 days.
  var timeMonth = new Date();
  var timeWeek = new Date();
  var timeThreeDays = new Date();

  timeThreeDays.setDate(timeMonth.getDate() - 3); //the date range from today to 3 days ago
  timeWeek.setDate(timeThreeDays.getDate() - 7); //the date range from 3 days ago to 7 days ago
  timeMonth.setDate(timeWeek.getDate() - 23); //the date range from 7 days ago to 30 days ago

  var sorted = data.sort((a, b)=> {
    //helper function sums up votes
    const voteTotal = (data1)=> {
      return data1.reduce((acc, item)=> {
        return acc + item.vote;
      }, 0);
    };

    //pass in a time to filter out votes that were older than that time
    const filterByTime = (data1, time) => {
      return data1.voteDate.filter((item)=> {
        return new Date(item.date) > time;
      });
    };

    //total votes by time period
    let votesFromThreeDaysAgoA = voteTotal(filterByTime(a, timeThreeDays));
    let votesFromWeekAgoA = voteTotal(filterByTime(a, timeWeek));
    let votesFromMonthAgoA = voteTotal(filterByTime(a, timeMonth));

    let votesFromThreeDaysAgoB = voteTotal(filterByTime(b, timeThreeDays));
    let votesFromWeekAgoB = voteTotal(filterByTime(b, timeWeek));
    let votesFromMonthAgoB = voteTotal(filterByTime(b, timeMonth));

    //10x logarithm weights for votes within a few days vs weeks vs months
    let logTotalVotesA = Math.log10(votesFromThreeDaysAgoA) + Math.log10(Math.log10(votesFromWeekAgoA)) + Math.log10(Math.log10(Math.log10(votesFromMonthAgoA)));
    let logTotalVotesB = Math.log10(votesFromThreeDaysAgoB) + Math.log10(Math.log10(votesFromWeekAgoB)) + Math.log10(Math.log10(Math.log10(votesFromMonthAgoB)));

    //append weights
    a["logVotes"] = logTotalVotesA;
    b["logVotes"] = logTotalVotesB;

    return b.logVotes - a.logVotes;
  });
  return sorted;


}

exports.sortArgsByNew = function(data) {
  console.log("this is the timestamp ", data);
  var sorted = data.sort((a, b)=> {
    return new Date(b.updated) - new Date(a.updated);
  });
  console.log('sort by new', sorted);
  return sorted;
}
//example of UTC date
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


