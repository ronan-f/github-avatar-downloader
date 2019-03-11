let secrets = require('./secrets');
let request = require('request');
let fs = require('fs');
let input1 = process.argv[2]; //user input
let input2 = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) { //convert JSON string into javascript and invoke callback function
    let contributors = JSON.parse(body);
    cb(err, contributors);
  });
}

function loopContributors(error, data){ //loop through each contributor and call download function using the URL for their avatar and login name
  data.forEach(function(collaborator) {
    downloadImageByURL(collaborator.avatar_url, './avatars/' + collaborator.login + '.jpg');
  });
};

function downloadImageByURL(url, filePath) { //send a request to download a file based on given URL. Saves to given filepath

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

if(input1 === undefined || input2 === undefined){
  console.log('Please provide input');
} else {

getRepoContributors(input1, input2, loopContributors);
}