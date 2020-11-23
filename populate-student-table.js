// Imports
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-west-2' })

// Declare local variables
const client = new AWS.DynamoDB.DocumentClient()

//fetch the data from json file
const studentData = JSON.parse(fs.readFileSync('app/studentData.json', 'utf8'));

function populateData(){
  

studentData.forEach(function(studentDataEach) {
  var params = {
      TableName: "student-marks",
      Item: studentDataEach
  };

  client.put(params, function(err, data) {
     if (err) {
         console.error("Unable to add data");
     } else {
         console.log("PutItem succeeded:", studentDataEach.StudentID );
     }
  });
});
}

// copy-paste the code below
// It should look like:
// populateData();