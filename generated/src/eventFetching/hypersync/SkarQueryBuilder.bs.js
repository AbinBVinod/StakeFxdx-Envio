// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Skar = require("./Skar.bs.js");
var Time = require("../../Time.bs.js");
var Utils = require("../../Utils.bs.js");
var Ethers = require("../../bindings/Ethers.bs.js");
var Ethers$1 = require("ethers");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Logging = require("../../Logging.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var SkarClient = require("../../bindings/SkarClient.bs.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Belt_Result = require("rescript/lib/js/belt_Result.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var HyperSyncTypes = require("./HyperSyncTypes.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var EthArchiveQueryBuilder = require("./EthArchiveQueryBuilder.bs.js");

var cache = {};

function getClient(url) {
  var client = Js_dict.get(cache, url);
  if (client !== undefined) {
    return Caml_option.valFromOption(client);
  }
  var newClient = SkarClient.make({
        url: url
      });
  cache[url] = newClient;
  return newClient;
}

var CachedClients = {
  cache: cache,
  getClient: getClient
};

function makeRequestBody(fromBlock, toBlockInclusive, addressesWithTopics) {
  return {
          fromBlock: fromBlock,
          toBlockExclusive: toBlockInclusive + 1 | 0,
          logs: addressesWithTopics,
          fieldSelection: {
            block: [
              /* Number */0,
              /* Timestamp */16
            ],
            log: [
              /* Address */6,
              /* BlockHash */4,
              /* BlockNumber */5,
              /* Data */7,
              /* LogIndex */1,
              /* TransactionHash */3,
              /* TransactionIndex */2,
              /* Topic0 */8,
              /* Topic1 */9,
              /* Topic2 */10,
              /* Topic3 */11,
              /* Removed */0
            ]
          }
        };
}

async function queryLogsPage(serverUrl, fromBlock, toBlock, contractAddressesAndtopics) {
  var body = makeRequestBody(fromBlock, toBlock, contractAddressesAndtopics);
  var skarClient = getClient(serverUrl);
  var logger = Logging.createChild({
        type: "hypersync query",
        fromBlock: fromBlock,
        serverUrl: serverUrl
      });
  var executeQuery = function (param) {
    return SkarClient.sendReq(skarClient, body);
  };
  var res = await Time.retryAsyncWithExponentialBackOff(undefined, undefined, undefined, undefined, Caml_option.some(logger), executeQuery);
  try {
    var items = Belt_Array.map(res.events, (function ($$event) {
            var log = $$event.log;
            var blockTimestamp = Belt_Option.flatMap($$event.block, (function (b) {
                    return b.timestamp;
                  }));
            var match = log.address;
            var match$1 = log.blockHash;
            var match$2 = log.blockNumber;
            var match$3 = log.data;
            var match$4 = log.logIndex;
            var match$5 = log.transactionHash;
            var match$6 = log.transactionIndex;
            var match$7 = log.removed;
            var match$8 = log.topics;
            if (blockTimestamp !== undefined && match !== undefined && match$1 !== undefined && match$2 !== undefined && match$3 !== undefined && match$4 !== undefined && match$5 !== undefined && match$6 !== undefined && match$7 !== undefined && match$8 !== undefined) {
              var topics = Belt_Array.keepMap(match$8, (function (prim) {
                      if (prim == null) {
                        return ;
                      } else {
                        return Caml_option.some(prim);
                      }
                    }));
              var log_address = Ethers$1.ethers.getAddress(match);
              var log$1 = {
                blockNumber: match$2,
                blockHash: match$1,
                removed: match$7,
                address: log_address,
                data: match$3,
                topics: topics,
                transactionHash: match$5,
                transactionIndex: match$6,
                index: match$4
              };
              return {
                      log: log$1,
                      blockTimestamp: blockTimestamp
                    };
            }
            var missingParams = Belt_Array.keepMap([
                  Utils.optionMapNone(blockTimestamp, "log.timestamp"),
                  Utils.optionMapNone(log.address, "log.address"),
                  Utils.optionMapNone(log.blockHash, "log.blockHash-"),
                  Utils.optionMapNone(log.blockNumber, "log.blockNumber"),
                  Utils.optionMapNone(log.data, "log.data"),
                  Utils.optionMapNone(log.logIndex, "log.index"),
                  Utils.optionMapNone(log.transactionHash, "log.transactionHash"),
                  Utils.optionMapNone(log.transactionIndex, "log.transactionIndex"),
                  Utils.optionMapNone(log.removed, "log.removed")
                ], (function (v) {
                    return v;
                  }));
            throw {
                  RE_EXN_ID: HyperSyncTypes.UnexpectedMissingParamsExn,
                  _1: {
                    queryName: "queryLogsPage Skar",
                    missingParams: missingParams
                  },
                  Error: new Error()
                };
          }));
    var page_nextBlock = res.nextBlock;
    var page_archiveHeight = res.archiveHeight;
    var page = {
      items: items,
      nextBlock: page_nextBlock,
      archiveHeight: page_archiveHeight
    };
    return {
            TAG: /* Ok */0,
            _0: page
          };
  }
  catch (raw_err){
    var err = Caml_js_exceptions.internalToOCamlException(raw_err);
    if (err.RE_EXN_ID === HyperSyncTypes.UnexpectedMissingParamsExn) {
      return {
              TAG: /* Error */1,
              _0: {
                TAG: /* UnexpectedMissingParams */0,
                _0: err._1
              }
            };
    }
    throw err;
  }
}

var LogsQuery = {
  queryLogsPage: queryLogsPage
};

function makeRequestBody$1(fromBlock, toBlockInclusive) {
  return {
          fromBlock: fromBlock,
          toBlockExclusive: toBlockInclusive + 1 | 0,
          transactions: [{}],
          fieldSelection: {
            block: [
              /* Timestamp */16,
              /* Number */0
            ]
          }
        };
}

async function queryBlockTimestampsPage(serverUrl, fromBlock, toBlock) {
  var body = makeRequestBody$1(fromBlock, toBlock);
  var res = await Skar.executeSkarQuery(serverUrl, body);
  if (res.TAG !== /* Ok */0) {
    return {
            TAG: /* Error */1,
            _0: {
              TAG: /* QueryError */1,
              _0: res._0
            }
          };
  }
  var successRes = res._0;
  var nextBlock = successRes.nextBlock;
  var archiveHeight = successRes.archiveHeight;
  return Belt_Result.map(Utils.mapArrayOfResults(Belt_Array.flatMap(successRes.data, (function (item) {
                        return Belt_Option.mapWithDefault(item.blocks, [], (function (blocks) {
                                      return Belt_Array.map(blocks, (function (block) {
                                                    var match = block.number;
                                                    var match$1 = block.timestamp;
                                                    if (match !== undefined && match$1 !== undefined) {
                                                      var timestamp = Belt_Option.getExn(Ethers.$$BigInt.toInt(Caml_option.valFromOption(match$1)));
                                                      return {
                                                              TAG: /* Ok */0,
                                                              _0: {
                                                                timestamp: timestamp,
                                                                blockNumber: match
                                                              }
                                                            };
                                                    }
                                                    var missingParams = Belt_Array.keepMap([
                                                          Utils.optionMapNone(block.number, "block.number"),
                                                          Utils.optionMapNone(block.timestamp, "block.timestamp")
                                                        ], (function (p) {
                                                            return p;
                                                          }));
                                                    return {
                                                            TAG: /* Error */1,
                                                            _0: {
                                                              TAG: /* UnexpectedMissingParams */0,
                                                              _0: {
                                                                queryName: "queryBlockTimestampsPage Skar",
                                                                missingParams: missingParams
                                                              }
                                                            }
                                                          };
                                                  }));
                                    }));
                      }))), (function (items) {
                return {
                        items: items,
                        nextBlock: nextBlock,
                        archiveHeight: archiveHeight
                      };
              }));
}

var BlockTimestampQuery = {
  queryBlockTimestampsPage: queryBlockTimestampsPage
};

var getHeightWithRetry = EthArchiveQueryBuilder.HeightQuery.getHeightWithRetry;

var pollForHeightGtOrEq = EthArchiveQueryBuilder.HeightQuery.pollForHeightGtOrEq;

var HeightQuery = {
  getHeightWithRetry: getHeightWithRetry,
  pollForHeightGtOrEq: pollForHeightGtOrEq
};

exports.CachedClients = CachedClients;
exports.LogsQuery = LogsQuery;
exports.BlockTimestampQuery = BlockTimestampQuery;
exports.HeightQuery = HeightQuery;
/* Skar Not a pure module */