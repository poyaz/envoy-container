/**
 * Created by pooya on 2/5/19.
 */

const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello World (node2)!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
