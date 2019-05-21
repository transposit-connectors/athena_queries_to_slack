(params) => {
	
  // get stored executionId from dynamodb
  const executionId =  api.run('aws_dynamodb.get_item', {Key:{'event_type': {"S": "sample-event-type"}}, TableName: params.tableName})[0].Item.execution_id.S;

  // get query results from executionId
  const results = api.run('aws_athena.get_query_results', {QueryExecutionId: executionId});
	
  // first item of returned results is always column names
  const cols = results[0].Data;
  let data = results.slice(1, results.length).map(d => {return d.Data});
  
  // zip the arrays together
  let processed_data = data.map((e) => {
    return cols.reduce((obj, k, i) => ({...obj, [k]: e[i] }), {});
  });
  

  // Note: you can optionally clean up this data more before posting. 
  let postText = 'Events receieved = ' + JSON.stringify(processed_data);

  // post to slack
  const body = {channel: params.channelName, 
   			   text: postText,
      		   as_user: "false", 
  			   username:"transposit_bot"};
  return api.run("slack.post_chat_message", 
                 {$body: JSON.stringify(body)});


}

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */