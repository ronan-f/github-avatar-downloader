var secrets = require('./secrets');
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    let contributors = JSON.parse(body);
    cb(err, contributors);
  });
}


function loopContributors(error, data){
  data.forEach(function(collaborator) {
    console.log(collaborator.avatar_url);
  });
};

getRepoContributors('jquery', 'jquery', loopContributors);



