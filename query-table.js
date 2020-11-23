const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

const client = new AWS.DynamoDB.DocumentClient()

function get (tableName, id) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'StudentID = :id',
    ExpressionAttributeValues: {
      ':id': +id,
    }
  }

  return new Promise((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

function getByCourseID (tableName, id, courseName) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'StudentID = :id AND CourseName = :cn',
      ExpressionAttributeValues: {
        ':id': +id,
        ':cn': courseName
      }
    }
  
    return new Promise((resolve, reject) => {
      client.query(params, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
}

// copy-paste code below here
// it should look like this
// get("student-marks", 1 ).then( data => console.log(data) );
