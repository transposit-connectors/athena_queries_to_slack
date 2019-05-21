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
  //return api.run("this.create_execution_record", {id: executionId, tableName: 'new_signup_executionIds'});
  console.log(executionId);
  return api.run("aws_dynamodb.put_item", {
    Item: {
      event_type: { S: "yesterday_signup_execution_id" },
      execution_id: { S: executionId },
      daysAgo: { N: params.daysAgo.toString() }
    },
    TableName: "events"
  });
};

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */
