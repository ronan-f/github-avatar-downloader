var secrets = require('./secrets');
var request = require('request');
var fs = require('fs');
let input1 = process.argv[2];
let input2 = process.argv[3];

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
    downloadImageByURL(collaborator.avatar_url, './avatars/' + collaborator.login + '.jpg');
  });
};

function downloadImageByURL(url, filePath) {

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(input1, input2, loopContributors);



