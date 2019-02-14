/**
 * Created by pooya on 2/13/19.
 */

/**
 * @property get
 */
const router = require('express').Router();

router.get('/listener', (request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.body);
  response.send('listener');
});

module.exports = router;