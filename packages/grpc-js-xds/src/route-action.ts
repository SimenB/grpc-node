/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { experimental } from '@grpc/grpc-js';
import Duration = experimental.Duration;

export interface RouteAction {
  toString(): string;
  getCluster(): string;
  getTimeout(): Duration | undefined;
}

function durationToLogString(duration: Duration) {
  const millis = Math.floor(duration.nanos / 1_000_000);
  if (millis > 0) {
    return duration.seconds + '.' + millis;
  } else {
    return '' + duration.seconds;
  }
}

export class SingleClusterRouteAction implements RouteAction {
  constructor(private cluster: string, private timeout: Duration | undefined) {}

  getCluster() {
    return this.cluster;
  }

  toString() {
    if (this.timeout) {
      return 'SingleCluster(' + this.cluster + ', ' + 'timeout=' + durationToLogString(this.timeout) + 's)';
    } else {
      return 'SingleCluster(' + this.cluster + ')';
    }
  }

  getTimeout() {
    return this.timeout;
  }
}

export interface WeightedCluster {
  name: string;
  weight: number;
}

interface ClusterChoice {
  name: string;
  numerator: number;
}

export class WeightedClusterRouteAction implements RouteAction {
  /**
   * The weighted cluster choices represented as a CDF
   */
  private clusterChoices: ClusterChoice[];
  constructor(private clusters: WeightedCluster[], private totalWeight: number, private timeout: Duration | undefined) {
    this.clusterChoices = [];
    let lastNumerator = 0;
    for (const clusterWeight of clusters) {
      lastNumerator += clusterWeight.weight;
      this.clusterChoices.push({name: clusterWeight.name, numerator: lastNumerator});
    }
  }

  getCluster() {
    const randomNumber = Math.random() * this.totalWeight;
    for (const choice of this.clusterChoices) {
      if (randomNumber < choice.numerator) {
        return choice.name;
      }
    }
    // This should be prevented by the validation rules
    return '';
  }

  toString() {
    const clusterListString = this.clusters.map(({name, weight}) => '(' + name + ':' + weight + ')').join(', ')
    if (this.timeout) {
      return 'WeightedCluster(' + clusterListString + ', ' + 'timeout=' + durationToLogString(this.timeout) + 's)';
    } else {
      return 'WeightedCluster(' + clusterListString + ')';
    }
  }

  getTimeout() {
    return this.timeout;
  }
}