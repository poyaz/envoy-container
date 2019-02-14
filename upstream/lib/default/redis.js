/**
 * Created by pooya on 2/13/19.
 */

/**
 * @name ENVOY_CONTAINER_OPTIONS
 * @type {{source: {type: string, address: string, port: number}, destination: {address: string, port: {}, NetworkID: string}}[]}
 */

/**
 *
 * @type {{ENVOY_CLUSTER_VERSION: string, ENVOY_LISTENER_VERSION: string, ENVOY_CONTAINER_OPTIONS: string, ENVOY_LISTENER_DATA: string, ENVOY_CLUSTER_DATA: string}}
 */
module.exports = {
  ENVOY_CONTAINER_OPTIONS: 'envoy_container_%s_options',
  ENVOY_LISTENER_VERSION: 'envoy_listener_version',
  ENVOY_CLUSTER_VERSION: 'envoy_cluster_version',
  ENVOY_LISTENER_DATA: 'envoy_listener_data',
  ENVOY_CLUSTER_DATA: 'envoy_cluster_data',
};