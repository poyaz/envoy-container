/**
 * Created by pooya on 2/13/19.
 */

/**
 * @property post
 */
const router = require('express').Router();

router.get('/discovery:type', (req, res) => {
  res.send(`discovery:${req.params.type}`);
});

router.post('/discovery:type', (req, res) => {
  let resp = {};
  switch (req.params.type) {
    case ':listeners':
      resp = {
        'version_info': '0',
        'resources': [
          {
            '@type': 'type.googleapis.com/envoy.api.v2.Listener',
            'name': 'redis_listener',
            'address': {
              'socket_address': {
                'address': '0.0.0.0',
                'port_value': 6000,
              },
            },
            'filter_chains': [
              {
                'filters': [
                  {
                    'name': 'envoy.redis_proxy',
                    'config': {
                      'stat_prefix': 'egress_redis',
                      'cluster': 'redis_cluster',
                      'settings': {
                        'op_timeout': '5s',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      };
      break;
    case ':clusters':
      resp = {
        'version_info': '0',
        'resources': [
          {
            '@type': 'type.googleapis.com/envoy.api.v2.Cluster',
            'name': 'redis_cluster',
            'connect_timeout': '1s',
            'type': 'strict_dns',
            'lb_policy': 'MAGLEV',
            'load_assignment': {
              'cluster_name': 'redis_cluster',
              'endpoints': {
                'lb_endpoints': {
                  'endpoint': {
                    'address': {
                      'socket_address': {
                        'address': 'proxy-redis1',
                        'port_value': 6379,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      };
      break;
  }

  res.json(resp);
});

module.exports = router;