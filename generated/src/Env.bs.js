// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Config = require("./Config.bs.js");
var EnvSafe = require("rescript-envsafe/src/EnvSafe.bs.js");
var EnvUtils = require("./EnvUtils.bs.js");
var Caml_int32 = require("rescript/lib/js/caml_int32.js");

var envSafe = EnvSafe.make(undefined, undefined);

var maxEventFetchedQueueSize = EnvUtils.getIntEnvVar(100000, envSafe, "MAX_QUEUE_SIZE");

var maxProcessBatchSize = EnvUtils.getIntEnvVar(5000, envSafe, "MAX_BATCH_SIZE");

var hasuraResponseLimit = EnvUtils.getOptIntEnvVar(undefined, envSafe, "HASURA_RESPONSE_LIMIT");

var numChains = Object.keys(Config.config).length;

var maxPerChainQueueSize = Caml_int32.div(maxEventFetchedQueueSize, numChains);

exports.maxEventFetchedQueueSize = maxEventFetchedQueueSize;
exports.maxProcessBatchSize = maxProcessBatchSize;
exports.hasuraResponseLimit = hasuraResponseLimit;
exports.numChains = numChains;
exports.maxPerChainQueueSize = maxPerChainQueueSize;
/* envSafe Not a pure module */
