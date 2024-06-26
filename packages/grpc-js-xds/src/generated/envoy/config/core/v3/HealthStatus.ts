// Original file: deps/envoy-api/envoy/config/core/v3/health_check.proto

/**
 * Endpoint health status.
 */
export const HealthStatus = {
  /**
   * The health status is not known. This is interpreted by Envoy as ``HEALTHY``.
   */
  UNKNOWN: 'UNKNOWN',
  /**
   * Healthy.
   */
  HEALTHY: 'HEALTHY',
  /**
   * Unhealthy.
   */
  UNHEALTHY: 'UNHEALTHY',
  /**
   * Connection draining in progress. E.g.,
   * `<https://aws.amazon.com/blogs/aws/elb-connection-draining-remove-instances-from-service-with-care/>`_
   * or
   * `<https://cloud.google.com/compute/docs/load-balancing/enabling-connection-draining>`_.
   * This is interpreted by Envoy as ``UNHEALTHY``.
   */
  DRAINING: 'DRAINING',
  /**
   * Health check timed out. This is part of HDS and is interpreted by Envoy as
   * ``UNHEALTHY``.
   */
  TIMEOUT: 'TIMEOUT',
  /**
   * Degraded.
   */
  DEGRADED: 'DEGRADED',
} as const;

/**
 * Endpoint health status.
 */
export type HealthStatus =
  /**
   * The health status is not known. This is interpreted by Envoy as ``HEALTHY``.
   */
  | 'UNKNOWN'
  | 0
  /**
   * Healthy.
   */
  | 'HEALTHY'
  | 1
  /**
   * Unhealthy.
   */
  | 'UNHEALTHY'
  | 2
  /**
   * Connection draining in progress. E.g.,
   * `<https://aws.amazon.com/blogs/aws/elb-connection-draining-remove-instances-from-service-with-care/>`_
   * or
   * `<https://cloud.google.com/compute/docs/load-balancing/enabling-connection-draining>`_.
   * This is interpreted by Envoy as ``UNHEALTHY``.
   */
  | 'DRAINING'
  | 3
  /**
   * Health check timed out. This is part of HDS and is interpreted by Envoy as
   * ``UNHEALTHY``.
   */
  | 'TIMEOUT'
  | 4
  /**
   * Degraded.
   */
  | 'DEGRADED'
  | 5

/**
 * Endpoint health status.
 */
export type HealthStatus__Output = typeof HealthStatus[keyof typeof HealthStatus]
