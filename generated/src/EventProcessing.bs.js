// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var IO = require("./IO.bs.js");
var Env = require("./Env.bs.js");
var Curry = require("rescript/lib/js/curry.js");
var Types = require("./Types.bs.js");
var Utils = require("./Utils.bs.js");
var Hrtime = require("./bindings/Hrtime.bs.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Context = require("./Context.bs.js");
var Logging = require("./Logging.bs.js");
var Handlers = require("./Handlers.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var EventUtils = require("./EventUtils.bs.js");
var Prometheus = require("./Prometheus.bs.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var DbFunctions = require("./DbFunctions.bs.js");
var ChainFetcher = require("./eventFetching/ChainFetcher.bs.js");
var ChainManager = require("./eventFetching/ChainManager.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function addEventToRawEvents($$event, inMemoryStore, chainId, jsonSerializedParams, eventName) {
  var logIndex = $$event.logIndex;
  var blockNumber = $$event.blockNumber;
  var eventId = EventUtils.packEventIndex(blockNumber, logIndex);
  var rawEvent_event_id = eventId.toString();
  var rawEvent_transaction_index = $$event.transactionIndex;
  var rawEvent_transaction_hash = $$event.transactionHash;
  var rawEvent_src_address = $$event.srcAddress;
  var rawEvent_block_hash = $$event.blockHash;
  var rawEvent_block_timestamp = $$event.blockTimestamp;
  var rawEvent_event_type = Types.eventName_encode(eventName);
  var rawEvent_params = JSON.stringify(jsonSerializedParams);
  var rawEvent = {
    chain_id: chainId,
    event_id: rawEvent_event_id,
    block_number: blockNumber,
    log_index: logIndex,
    transaction_index: rawEvent_transaction_index,
    transaction_hash: rawEvent_transaction_hash,
    src_address: rawEvent_src_address,
    block_hash: rawEvent_block_hash,
    block_timestamp: rawEvent_block_timestamp,
    event_type: rawEvent_event_type,
    params: rawEvent_params
  };
  var eventIdStr = eventId.toString();
  Curry._4(IO.InMemoryStore.RawEvents.set, inMemoryStore.rawEvents, {
        chainId: chainId,
        eventId: eventIdStr
      }, /* Set */1, rawEvent);
}

function updateEventSyncState($$event, chainId, inMemoryStore) {
  Curry._4(IO.InMemoryStore.EventSyncState.set, inMemoryStore.eventSyncState, chainId, /* Set */1, {
        chain_id: chainId,
        block_number: $$event.blockNumber,
        log_index: $$event.logIndex,
        transaction_index: $$event.transactionIndex,
        block_timestamp: $$event.blockTimestamp
      });
}

function getEventExnObj(exn, $$event, chainId, eventName) {
  var eventInfoObj = {
    eventName: eventName,
    txHash: $$event.transactionHash,
    blockNumber: String($$event.blockNumber),
    logIndex: String($$event.logIndex),
    transactionIndex: String($$event.transactionIndex),
    networkId: chainId
  };
  var tmp;
  if (exn.RE_EXN_ID === Js_exn.$$Error) {
    var message = exn._1.message;
    tmp = message !== undefined ? ({
          msg: "Caught a JS exception in your ${eventName}.handler, please fix the error to keep the indexer running smoothly",
          error: message,
          "event-details": eventInfoObj
        }) : undefined;
  } else {
    tmp = undefined;
  }
  return Belt_Option.getWithDefault(tmp, {
              msg: "Unknown error in your " + eventName + ".handler, please review your code carefully and use the stack trace to help you find the issue.",
              error: "Unknown",
              "event-details": eventInfoObj
            });
}

function eventRouter(item, inMemoryStore) {
  var $$event = item.event;
  var chainId = item.chainId;
  switch ($$event.TAG | 0) {
    case /* RewardFxdxVaultContract_AddRewardWithContext */0 :
        var $$event$1 = $$event._0;
        updateEventSyncState($$event$1, chainId, inMemoryStore);
        var jsonSerializedParams = Curry._1(Types.RewardFxdxVaultContract.AddRewardEvent.eventArgs_encode, $$event$1.params);
        addEventToRawEvents($$event$1, inMemoryStore, chainId, jsonSerializedParams, /* RewardFxdxVault_AddReward */0);
        var handler = Curry._1(Handlers.RewardFxdxVaultContract.AddReward.getHandler, undefined);
        var context = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler, $$event$1, context);
        }
        catch (raw_userCodeException){
          var userCodeException = Caml_js_exceptions.internalToOCamlException(raw_userCodeException);
          var errorObj = getEventExnObj(userCodeException, $$event$1, chainId, "RewardFxdxVault.AddReward");
          return Curry._2(context.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException), errorObj);
        }
    case /* RewardFxdxVaultContract_SendRewardWithContext */1 :
        var $$event$2 = $$event._0;
        updateEventSyncState($$event$2, chainId, inMemoryStore);
        var jsonSerializedParams$1 = Curry._1(Types.RewardFxdxVaultContract.SendRewardEvent.eventArgs_encode, $$event$2.params);
        addEventToRawEvents($$event$2, inMemoryStore, chainId, jsonSerializedParams$1, /* RewardFxdxVault_SendReward */1);
        var handler$1 = Curry._1(Handlers.RewardFxdxVaultContract.SendReward.getHandler, undefined);
        var context$1 = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler$1, $$event$2, context$1);
        }
        catch (raw_userCodeException$1){
          var userCodeException$1 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$1);
          var errorObj$1 = getEventExnObj(userCodeException$1, $$event$2, chainId, "RewardFxdxVault.SendReward");
          return Curry._2(context$1.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException$1), errorObj$1);
        }
    case /* RewardFxdxVaultContract_TotalReservesWithContext */2 :
        var $$event$3 = $$event._0;
        updateEventSyncState($$event$3, chainId, inMemoryStore);
        var jsonSerializedParams$2 = Curry._1(Types.RewardFxdxVaultContract.TotalReservesEvent.eventArgs_encode, $$event$3.params);
        addEventToRawEvents($$event$3, inMemoryStore, chainId, jsonSerializedParams$2, /* RewardFxdxVault_TotalReserves */2);
        var handler$2 = Curry._1(Handlers.RewardFxdxVaultContract.TotalReserves.getHandler, undefined);
        var context$2 = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler$2, $$event$3, context$2);
        }
        catch (raw_userCodeException$2){
          var userCodeException$2 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$2);
          var errorObj$2 = getEventExnObj(userCodeException$2, $$event$3, chainId, "RewardFxdxVault.TotalReserves");
          return Curry._2(context$2.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException$2), errorObj$2);
        }
    case /* StakedFxdxVaultContract_StakeWithContext */3 :
        var $$event$4 = $$event._0;
        updateEventSyncState($$event$4, chainId, inMemoryStore);
        var jsonSerializedParams$3 = Curry._1(Types.StakedFxdxVaultContract.StakeEvent.eventArgs_encode, $$event$4.params);
        addEventToRawEvents($$event$4, inMemoryStore, chainId, jsonSerializedParams$3, /* StakedFxdxVault_Stake */3);
        var handler$3 = Curry._1(Handlers.StakedFxdxVaultContract.Stake.getHandler, undefined);
        var context$3 = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler$3, $$event$4, context$3);
        }
        catch (raw_userCodeException$3){
          var userCodeException$3 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$3);
          var errorObj$3 = getEventExnObj(userCodeException$3, $$event$4, chainId, "StakedFxdxVault.Stake");
          return Curry._2(context$3.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException$3), errorObj$3);
        }
    case /* StakedFxdxVaultContract_TotalReservesWithContext */4 :
        var $$event$5 = $$event._0;
        updateEventSyncState($$event$5, chainId, inMemoryStore);
        var jsonSerializedParams$4 = Curry._1(Types.StakedFxdxVaultContract.TotalReservesEvent.eventArgs_encode, $$event$5.params);
        addEventToRawEvents($$event$5, inMemoryStore, chainId, jsonSerializedParams$4, /* StakedFxdxVault_TotalReserves */4);
        var handler$4 = Curry._1(Handlers.StakedFxdxVaultContract.TotalReserves.getHandler, undefined);
        var context$4 = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler$4, $$event$5, context$4);
        }
        catch (raw_userCodeException$4){
          var userCodeException$4 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$4);
          var errorObj$4 = getEventExnObj(userCodeException$4, $$event$5, chainId, "StakedFxdxVault.TotalReserves");
          return Curry._2(context$4.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException$4), errorObj$4);
        }
    case /* StakedFxdxVaultContract_UnstakeWithContext */5 :
        var $$event$6 = $$event._0;
        updateEventSyncState($$event$6, chainId, inMemoryStore);
        var jsonSerializedParams$5 = Curry._1(Types.StakedFxdxVaultContract.UnstakeEvent.eventArgs_encode, $$event$6.params);
        addEventToRawEvents($$event$6, inMemoryStore, chainId, jsonSerializedParams$5, /* StakedFxdxVault_Unstake */5);
        var handler$5 = Curry._1(Handlers.StakedFxdxVaultContract.Unstake.getHandler, undefined);
        var context$5 = Curry._1($$event._1, undefined);
        try {
          return Curry._2(handler$5, $$event$6, context$5);
        }
        catch (raw_userCodeException$5){
          var userCodeException$5 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$5);
          var errorObj$5 = getEventExnObj(userCodeException$5, $$event$6, chainId, "StakedFxdxVault.Unstake");
          return Curry._2(context$5.log.errorWithExn, Caml_js_exceptions.as_js_exn(userCodeException$5), errorObj$5);
        }
    
  }
}

async function loadReadEntitiesInner(inMemoryStore, eventBatch, logger, chainManager) {
  var loadNestedReadEntities = async function (logIndex, dynamicContracts, fromBlock, currentBatchLastEventIndex, chainId) {
    var chainFetcher = ChainManager.getChainFetcher(chainManager, chainId);
    var eventBatchPromises = await ChainFetcher.addDynamicContractAndFetchMissingEvents(chainFetcher, dynamicContracts, fromBlock, logIndex + 1 | 0);
    var eventsForCurrentBatch = [];
    for(var i = 0 ,i_finish = eventBatchPromises.length; i < i_finish; ++i){
      var item = Caml_array.get(eventBatchPromises, i);
      var eventIndex_timestamp = item.timestamp;
      var eventIndex_chainId = item.chainId;
      var eventIndex_blockNumber = item.blockNumber;
      var eventIndex_logIndex = item.logIndex;
      var eventIndex = {
        timestamp: eventIndex_timestamp,
        chainId: eventIndex_chainId,
        blockNumber: eventIndex_blockNumber,
        logIndex: eventIndex_logIndex
      };
      if (EventUtils.isEarlierEvent(eventIndex, currentBatchLastEventIndex)) {
        eventsForCurrentBatch.push(item);
      } else {
        ChainManager.addItemToArbitraryEvents(chainManager, item);
      }
    }
    if (eventsForCurrentBatch.length !== 0) {
      return await loadReadEntitiesInner(inMemoryStore, eventsForCurrentBatch, logger, chainManager);
    } else {
      return [];
    }
  };
  var baseResults = [];
  var optLastItemInBatch = Belt_Array.get(eventBatch, eventBatch.length - 1 | 0);
  if (optLastItemInBatch === undefined) {
    return [];
  }
  var currentBatchLastEventIndex_timestamp = optLastItemInBatch.timestamp;
  var currentBatchLastEventIndex_chainId = optLastItemInBatch.chainId;
  var currentBatchLastEventIndex_blockNumber = optLastItemInBatch.blockNumber;
  var currentBatchLastEventIndex_logIndex = optLastItemInBatch.logIndex;
  var currentBatchLastEventIndex = {
    timestamp: currentBatchLastEventIndex_timestamp,
    chainId: currentBatchLastEventIndex_chainId,
    blockNumber: currentBatchLastEventIndex_blockNumber,
    logIndex: currentBatchLastEventIndex_logIndex
  };
  for(var i = 0 ,i_finish = eventBatch.length; i < i_finish; ++i){
    var match = Caml_array.get(eventBatch, i);
    var $$event = match.event;
    var chainId = match.chainId;
    var tmp;
    switch ($$event.TAG | 0) {
      case /* RewardFxdxVaultContract_AddReward */0 :
          var $$event$1 = $$event._0;
          var contextHelper = Curry._4(Context.RewardFxdxVaultContract.AddRewardEvent.contextCreator, inMemoryStore, chainId, $$event$1, logger);
          var context = Curry._1(contextHelper.getLoaderContext, undefined);
          var loader = Curry._1(Handlers.RewardFxdxVaultContract.AddReward.getLoader, undefined);
          try {
            Curry._2(loader, $$event$1, context);
          }
          catch (raw_userCodeException){
            var userCodeException = Caml_js_exceptions.internalToOCamlException(raw_userCodeException);
            var errorObj = getEventExnObj(userCodeException, $$event$1, chainId, "RewardFxdxVault.AddReward");
            Logging.childErrorWithExn(logger, userCodeException, errorObj);
          }
          var contextGetter = contextHelper.getHandlerContext;
          var dynamicContracts = Curry._1(contextHelper.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper.getEntitiesToLoad, undefined),
            {
              TAG: /* RewardFxdxVaultContract_AddRewardWithContext */0,
              _0: $$event$1,
              _1: contextGetter
            },
            dynamicContracts.length !== 0 ? await loadNestedReadEntities($$event$1.logIndex, dynamicContracts, $$event$1.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      case /* RewardFxdxVaultContract_SendReward */1 :
          var $$event$2 = $$event._0;
          var contextHelper$1 = Curry._4(Context.RewardFxdxVaultContract.SendRewardEvent.contextCreator, inMemoryStore, chainId, $$event$2, logger);
          var context$1 = Curry._1(contextHelper$1.getLoaderContext, undefined);
          var loader$1 = Curry._1(Handlers.RewardFxdxVaultContract.SendReward.getLoader, undefined);
          try {
            Curry._2(loader$1, $$event$2, context$1);
          }
          catch (raw_userCodeException$1){
            var userCodeException$1 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$1);
            var errorObj$1 = getEventExnObj(userCodeException$1, $$event$2, chainId, "RewardFxdxVault.SendReward");
            Logging.childErrorWithExn(logger, userCodeException$1, errorObj$1);
          }
          var contextGetter$1 = contextHelper$1.getHandlerContext;
          var dynamicContracts$1 = Curry._1(contextHelper$1.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper$1.getEntitiesToLoad, undefined),
            {
              TAG: /* RewardFxdxVaultContract_SendRewardWithContext */1,
              _0: $$event$2,
              _1: contextGetter$1
            },
            dynamicContracts$1.length !== 0 ? await loadNestedReadEntities($$event$2.logIndex, dynamicContracts$1, $$event$2.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      case /* RewardFxdxVaultContract_TotalReserves */2 :
          var $$event$3 = $$event._0;
          var contextHelper$2 = Curry._4(Context.RewardFxdxVaultContract.TotalReservesEvent.contextCreator, inMemoryStore, chainId, $$event$3, logger);
          var context$2 = Curry._1(contextHelper$2.getLoaderContext, undefined);
          var loader$2 = Curry._1(Handlers.RewardFxdxVaultContract.TotalReserves.getLoader, undefined);
          try {
            Curry._2(loader$2, $$event$3, context$2);
          }
          catch (raw_userCodeException$2){
            var userCodeException$2 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$2);
            var errorObj$2 = getEventExnObj(userCodeException$2, $$event$3, chainId, "RewardFxdxVault.TotalReserves");
            Logging.childErrorWithExn(logger, userCodeException$2, errorObj$2);
          }
          var contextGetter$2 = contextHelper$2.getHandlerContext;
          var dynamicContracts$2 = Curry._1(contextHelper$2.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper$2.getEntitiesToLoad, undefined),
            {
              TAG: /* RewardFxdxVaultContract_TotalReservesWithContext */2,
              _0: $$event$3,
              _1: contextGetter$2
            },
            dynamicContracts$2.length !== 0 ? await loadNestedReadEntities($$event$3.logIndex, dynamicContracts$2, $$event$3.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      case /* StakedFxdxVaultContract_Stake */3 :
          var $$event$4 = $$event._0;
          var contextHelper$3 = Curry._4(Context.StakedFxdxVaultContract.StakeEvent.contextCreator, inMemoryStore, chainId, $$event$4, logger);
          var context$3 = Curry._1(contextHelper$3.getLoaderContext, undefined);
          var loader$3 = Curry._1(Handlers.StakedFxdxVaultContract.Stake.getLoader, undefined);
          try {
            Curry._2(loader$3, $$event$4, context$3);
          }
          catch (raw_userCodeException$3){
            var userCodeException$3 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$3);
            var errorObj$3 = getEventExnObj(userCodeException$3, $$event$4, chainId, "StakedFxdxVault.Stake");
            Logging.childErrorWithExn(logger, userCodeException$3, errorObj$3);
          }
          var contextGetter$3 = contextHelper$3.getHandlerContext;
          var dynamicContracts$3 = Curry._1(contextHelper$3.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper$3.getEntitiesToLoad, undefined),
            {
              TAG: /* StakedFxdxVaultContract_StakeWithContext */3,
              _0: $$event$4,
              _1: contextGetter$3
            },
            dynamicContracts$3.length !== 0 ? await loadNestedReadEntities($$event$4.logIndex, dynamicContracts$3, $$event$4.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      case /* StakedFxdxVaultContract_TotalReserves */4 :
          var $$event$5 = $$event._0;
          var contextHelper$4 = Curry._4(Context.StakedFxdxVaultContract.TotalReservesEvent.contextCreator, inMemoryStore, chainId, $$event$5, logger);
          var context$4 = Curry._1(contextHelper$4.getLoaderContext, undefined);
          var loader$4 = Curry._1(Handlers.StakedFxdxVaultContract.TotalReserves.getLoader, undefined);
          try {
            Curry._2(loader$4, $$event$5, context$4);
          }
          catch (raw_userCodeException$4){
            var userCodeException$4 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$4);
            var errorObj$4 = getEventExnObj(userCodeException$4, $$event$5, chainId, "StakedFxdxVault.TotalReserves");
            Logging.childErrorWithExn(logger, userCodeException$4, errorObj$4);
          }
          var contextGetter$4 = contextHelper$4.getHandlerContext;
          var dynamicContracts$4 = Curry._1(contextHelper$4.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper$4.getEntitiesToLoad, undefined),
            {
              TAG: /* StakedFxdxVaultContract_TotalReservesWithContext */4,
              _0: $$event$5,
              _1: contextGetter$4
            },
            dynamicContracts$4.length !== 0 ? await loadNestedReadEntities($$event$5.logIndex, dynamicContracts$4, $$event$5.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      case /* StakedFxdxVaultContract_Unstake */5 :
          var $$event$6 = $$event._0;
          var contextHelper$5 = Curry._4(Context.StakedFxdxVaultContract.UnstakeEvent.contextCreator, inMemoryStore, chainId, $$event$6, logger);
          var context$5 = Curry._1(contextHelper$5.getLoaderContext, undefined);
          var loader$5 = Curry._1(Handlers.StakedFxdxVaultContract.Unstake.getLoader, undefined);
          try {
            Curry._2(loader$5, $$event$6, context$5);
          }
          catch (raw_userCodeException$5){
            var userCodeException$5 = Caml_js_exceptions.internalToOCamlException(raw_userCodeException$5);
            var errorObj$5 = getEventExnObj(userCodeException$5, $$event$6, chainId, "StakedFxdxVault.Unstake");
            Logging.childErrorWithExn(logger, userCodeException$5, errorObj$5);
          }
          var contextGetter$5 = contextHelper$5.getHandlerContext;
          var dynamicContracts$5 = Curry._1(contextHelper$5.getAddedDynamicContractRegistrations, undefined);
          tmp = [
            Curry._1(contextHelper$5.getEntitiesToLoad, undefined),
            {
              TAG: /* StakedFxdxVaultContract_UnstakeWithContext */5,
              _0: $$event$6,
              _1: contextGetter$5
            },
            dynamicContracts$5.length !== 0 ? await loadNestedReadEntities($$event$6.logIndex, dynamicContracts$5, $$event$6.blockNumber, currentBatchLastEventIndex, chainId) : undefined
          ];
          break;
      
    }
    baseResults.push({
          timestamp: match.timestamp,
          chainId: chainId,
          blockNumber: match.blockNumber,
          logIndex: match.logIndex,
          data: tmp
        });
  }
  return baseResults;
}

function unwrap(p) {
  var match = p.data;
  return {
          timestamp: p.timestamp,
          chainId: p.chainId,
          blockNumber: p.blockNumber,
          logIndex: p.logIndex,
          entityReads: match[0],
          eventAndContext: match[1]
        };
}

async function recurseEntityPromises(p) {
  var match = p.data;
  var nested = match[2];
  return {
          result: unwrap(p),
          nested: nested !== undefined ? await Promise.all(Belt_Array.map(nested, recurseEntityPromises)) : undefined
        };
}

function resultPosition(param) {
  return EventUtils.getEventComparator({
              timestamp: param.timestamp,
              chainId: param.chainId,
              blockNumber: param.blockNumber,
              logIndex: param.logIndex
            });
}

function flattenNested(xs) {
  var baseResults = Belt_Array.map(xs, (function (param) {
          return param.result;
        }));
  var nestedNestedResults = Belt_Array.keepMap(xs, (function (param) {
          return param.nested;
        }));
  var nestedResults = Belt_Array.map(nestedNestedResults, flattenNested);
  return Belt_Array.reduce(nestedResults, baseResults, (function (acc, additionalResults) {
                return Utils.mergeSorted(resultPosition, acc, additionalResults);
              }));
}

async function loadReadEntities(inMemoryStore, eventBatch, chainManager, logger) {
  var batch = await loadReadEntitiesInner(inMemoryStore, eventBatch, logger, chainManager);
  var nestedResults = await Promise.all(Belt_Array.map(batch, recurseEntityPromises));
  var mergedResults = flattenNested(nestedResults);
  var resultToPair = function (param) {
    return [
            param.entityReads,
            {
              chainId: param.chainId,
              event: param.eventAndContext
            }
          ];
  };
  var match = Belt_Array.unzip(Belt_Array.map(mergedResults, resultToPair));
  var readEntities = Belt_Array.concatMany(match[0]);
  await IO.loadEntitiesToInMemStore(readEntities, inMemoryStore);
  return match[1];
}

function registerProcessEventBatchMetrics(logger, batchSize, loadDuration, handlerDuration, dbWriteDuration) {
  Logging.childTrace(logger, {
        message: "Finished processing batch",
        batch_size: batchSize,
        loader_time_elapsed: loadDuration,
        handlers_time_elapsed: handlerDuration,
        write_time_elapsed: dbWriteDuration
      });
  Prometheus.incrementLoadEntityDurationCounter(loadDuration);
  Prometheus.incrementEventRouterDurationCounter(handlerDuration);
  Prometheus.incrementExecuteBatchDurationCounter(dbWriteDuration);
  Prometheus.incrementEventsProcessedCounter(batchSize);
}

async function processEventBatch(eventBatch, chainManager, inMemoryStore) {
  var logger = Logging.createChild({
        context: "batch",
        from_block_index: Belt_Option.map(Belt_Array.get(eventBatch, 0), (function (param) {
                return "" + String(param.blockNumber) + "-" + String(param.logIndex) + "";
              }))
      });
  var timeRef = Hrtime.makeTimer(undefined);
  var eventBatchAndContext = await loadReadEntities(inMemoryStore, eventBatch, chainManager, logger);
  var elapsedAfterLoad = Hrtime.intFromMillis(Hrtime.toMillis(Hrtime.timeSince(timeRef)));
  Belt_Array.forEach(eventBatchAndContext, (function ($$event) {
          eventRouter($$event, inMemoryStore);
        }));
  var elapsedTimeAfterProcess = Hrtime.intFromMillis(Hrtime.toMillis(Hrtime.timeSince(timeRef)));
  await IO.executeBatch(DbFunctions.sql, inMemoryStore);
  var elapsedTimeAfterDbWrite = Hrtime.intFromMillis(Hrtime.toMillis(Hrtime.timeSince(timeRef)));
  return registerProcessEventBatchMetrics(logger, eventBatch.length, elapsedAfterLoad, elapsedTimeAfterProcess - elapsedAfterLoad | 0, elapsedTimeAfterDbWrite - elapsedTimeAfterProcess | 0);
}

async function startProcessingEventsOnQueue(chainManager) {
  while(true) {
    var nextBatch = await ChainManager.createBatch(chainManager, 1, Env.maxProcessBatchSize);
    var inMemoryStore = IO.InMemoryStore.make(undefined);
    await processEventBatch(nextBatch, chainManager, inMemoryStore);
  };
}

exports.addEventToRawEvents = addEventToRawEvents;
exports.updateEventSyncState = updateEventSyncState;
exports.getEventExnObj = getEventExnObj;
exports.eventRouter = eventRouter;
exports.loadReadEntitiesInner = loadReadEntitiesInner;
exports.unwrap = unwrap;
exports.recurseEntityPromises = recurseEntityPromises;
exports.resultPosition = resultPosition;
exports.flattenNested = flattenNested;
exports.loadReadEntities = loadReadEntities;
exports.registerProcessEventBatchMetrics = registerProcessEventBatchMetrics;
exports.processEventBatch = processEventBatch;
exports.startProcessingEventsOnQueue = startProcessingEventsOnQueue;
/* IO Not a pure module */
