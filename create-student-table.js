// Import AWS SDK
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

// Declare local variables
const dynamo = new AWS.DynamoDB()

// Name of the table to create
// Enter tablename as:
// const tableName = 'student-marks';
const tableName = '';

createTable( tableName || 'student-marks')
.then(data => console.log(data))

function createTable (tableName) {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'StudentID',
        AttributeType: 'N'
      },
      {
        AttributeName: 'CourseName',
        AttributeType: 'S'   
      }
    ],
    KeySchema: [
      {
        AttributeName: 'StudentID',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'CourseName',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  }

  return new Promise((resolve, reject) => {
    dynamo.createTable(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
