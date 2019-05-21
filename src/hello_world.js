params => {
  const query = params.query;
  let executionId = api.run("aws_athena.start_query_execution", {
    QueryString: query,
    ClientRequestToken: makeid(35),
    WorkGroup: params.workGroup,
    ResultConfiguration: {
      OutputLocation: params.resultLocation
    }
  })[0]["QueryExecutionId"];

  console.log(executionId);
  
  // Note: Please update this section of code based on your dynamodb's primary key
  return api.run("aws_dynamodb.put_item", {
    Item: {
      event_type: { S: "yesterday_signup_execution_id" },
      execution_id: { S: executionId },
    },
    TableName: params.dynamoTableName
  });
};

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */
