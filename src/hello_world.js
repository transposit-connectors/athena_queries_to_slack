params => {
  const query = params.query;

    let executionId = api.run("aws_athena.start_query_execution", {
      QueryString: query,
      ClientRequestToken: api.run("this.makeId")[0],
      WorkGroup: params.workGroup,
      ResultConfiguration: {
        OutputLocation: params.resultLocation
      }
    })[0]["QueryExecutionId"];

    console.log(executionId);

    // Note: Please update this section of code based on your dynamodb's schema
    return api.run("aws_dynamodb.put_item", {
      Item: {
        event_type: { S: "sample-event-type" },
        execution_id: { S: executionId }
      },
      TableName: params.dynamoTableName
    });
}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */
