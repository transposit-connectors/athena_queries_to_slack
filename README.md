# Athena Quries to Slack

This app shows how you could run Athena queries, store the result in dynamo db, and post the results to slack.

## Try it

Step 0: We assume you have set up Athena and Dynamodb in your infrastructure

Step 1: Run `run_query`, which runs a query against Athena, and returns an executionId, which is then stored in Dynamodb. The reason we store this executionId instead of using it right away is that your query may take a long time for Athena to finish.

Parameters

> `query`: the query you want to run on Athena. Example: `select * from tabalenName limit 10`

> `workGroup`: Athena workgroup for running this query

> `resultLocation`: query result output location. Usually people use an S3 bucket. Example `s3://your.bucket.address.com/query-results`

> `dynamoTableName`: the Dynamo table you want to temporarily store query executionId in

Step 2: Once you have finished running an Athena query, you could run `post_to_slack` to send query results to yourself or a channel

Parameters  
> `dynamoTableName`: the Dynamo table same as above  

> `channelName`: Slack channel name you want to post the data in. Use `@yourUserName` to send to yourself

## What else can you do?

Once you fork this app, you can expand and customize its functionalities. Some ideas:

- Run Athena queries against your live data on Athena every hour, and post results to a slack channel
- Grab user-related data from Athena and import to an analytics services like Amplitude or Mixpanel
