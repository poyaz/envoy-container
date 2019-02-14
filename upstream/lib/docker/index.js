/**
 * Created by pooya on 2/13/19.
 */

const config = require('config');
const redis = require('redis');
const Promise = require('bluebird');
const Docker = require('dockerode');

const redisKey = require('../default/redis');

Promise.promisifyAll(require('redis'));

const docker = new Docker({
  socketPath: config.get('custom.docker.socket'),
});

docker.getEvents()
  .then((event) => {
    event.on('data', (data) => readDockerEvent(JSON.parse(data)));

    return true;
  })
  .catch((error) => console.error(error));
// docker.getEvents({}, function(error, data) {
//   if (error)
//     return console.log(error);
//
//   data.on('data', (data) => console.log(data.toString()));
//   // data.on('data', (data) => readDockerEvent(JSON.parse(data)));
// });

/**
 *
 * @param {Object} event
 * @param {String} event.Type
 * @param {String} event.Action
 * @param {Object} event.Actor
 * @param {String} event.Actor.ID
 * @return {Promise<void>}
 */
async function readDockerEvent(event) {
  console.log(event);
  const id = event.Actor.ID;
  const shortId = event.Actor.ID.substr(0, 12);

  try {
    switch (`${event.Type}:${event.Action}`) {
      case 'container:start': {
        const inspect = await getContainerInspect(id);
        // const data = [
        //   {
        //     source: { type: string, address: string, port: number },
        //     destination: { IPAddress: string, port: {}, NetworkID: string },
        //   }
        // ];
        //

        break;
      }
      case 'container:stop':
        // await
        break;
    }

    console.log(inspect);
  } catch (error) {
    console.error(error);
  }

}

async function getContainerInspect(id) {
  const container = docker.getContainer(id);
  const inspect = await container.inspect();
}

// const container = docker.getContainer('ae19a5b23e48');
//
// // query API for container info
// container.inspect(function (err, data) {
//   console.log(err);
//   console.log(data);
// });