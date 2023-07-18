import { simulationRouterInstance } from "./dependancies";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  // for parsing application/json
app.use('/', simulationRouterInstance);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})