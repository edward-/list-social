import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    Todo: a
      .model({
        name: a.string(),
        list: a.json(),
        isDone: a.boolean().default(false),
        deadLine: a.timestamp(),
        comments: a.hasMany('Comment', 'todoId')!,
        tags: a.hasMany('Tag', 'todoId')!,
      })
      .authorization((allow) => [allow.owner(), allow.authenticated().to(['read'])]),
    Comment: a.model({
      todoId: a.id(),
      todo: a.belongsTo('Todo', 'todoId'),
      message: a.string(),
      replies: a.hasMany('Reply', 'commentId'),
    }),
    Reply: a.model({
      commentId: a.id(),
      comment: a.belongsTo('Comment', 'commentId'),
      comments: a.id().array(),
    }),
    Tag: a.model({
      name: a.string(),
      todoId: a.id(),
      todo: a.belongsTo('Todo', 'todoId'),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
