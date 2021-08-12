# gql-now

> A simple nodejs/browser client to hit graphql apis 


## Install

```sh
npm install --save github:fasih/gql-now
```

## Usage

```javascript
import {GQLNow} from "gql-now";

let obj = new GQLNow("https://some.graphql.api/api/path",{'http_header1':'header_value1'});

// Query operation
let respnse = await obj.query("operation_name",{ field1:"value1" , field2:"value2", field3:4},"response_field response_field_neseted{ nested_field1 nested_field2 }");

// Mutation operation
let response_mutation = await obj.mutation("operation_name",{ field1:"value1" , field2:"value2", field3:4},"response_field response_field_neseted{ nested_field1 nested_field2 }");
```
