let addEventToRawEvents = (
  event: Types.eventLog<'a>,
  ~inMemoryStore: IO.InMemoryStore.t,
  ~chainId,
  ~jsonSerializedParams: Js.Json.t,
  ~eventName: Types.eventName,
) => {
  let {
    blockNumber,
    logIndex,
    transactionIndex,
    transactionHash,
    srcAddress,
    blockHash,
    blockTimestamp,
  } = event

  let eventId = EventUtils.packEventIndex(~logIndex, ~blockNumber)
  let rawEvent: Types.rawEventsEntity = {
    chainId,
    eventId: eventId->Ethers.BigInt.toString,
    blockNumber,
    logIndex,
    transactionIndex,
    transactionHash,
    srcAddress,
    blockHash,
    blockTimestamp,
    eventType: eventName->Types.eventName_encode,
    params: jsonSerializedParams->Js.Json.stringify,
  }

  let eventIdStr = eventId->Ethers.BigInt.toString

  inMemoryStore.rawEvents->IO.InMemoryStore.RawEvents.set(
    ~key={chainId, eventId: eventIdStr},
    ~entity=rawEvent,
    ~dbOp=Set,
  )
}

let updateEventSyncState = (
  event: Types.eventLog<'a>,
  ~chainId,
  ~inMemoryStore: IO.InMemoryStore.t,
) => {
  let {blockNumber, logIndex, transactionIndex, blockTimestamp} = event
  let _ = inMemoryStore.eventSyncState->IO.InMemoryStore.EventSyncState.set(
    ~key=chainId,
    ~entity={
      chainId,
      blockTimestamp,
      blockNumber,
      logIndex,
      transactionIndex,
    },
    ~dbOp=Set,
  )
}

let getEventExnObj = (exn, ~event: Types.eventLog<'a>, ~chainId, ~eventName) => {
  let eventInfoObj = {
    "eventName": eventName,
    "txHash": event.transactionHash,
    "blockNumber": event.blockNumber->Belt.Int.toString,
    "logIndex": event.logIndex->Belt.Int.toString,
    "transactionIndex": event.transactionIndex->Belt.Int.toString,
    "networkId": chainId,
  }

  switch exn {
  | Js.Exn.Error(obj) =>
    switch Js.Exn.message(obj) {
    | Some(message) =>
      Some({
        "msg": "Caught a JS exception in your ${eventName}.handler, please fix the error to keep the indexer running smoothly",
        "error": message,
        "event-details": eventInfoObj,
      })
    | None => None
    }
  | _ => None
  }->Belt.Option.getWithDefault({
    "msg": `Unknown error in your ${eventName}.handler, please review your code carefully and use the stack trace to help you find the issue.`,
    "error": "Unknown",
    "event-details": eventInfoObj,
  })
}

let eventRouter = (item: Types.eventRouterEventAndContext, ~inMemoryStore) => {
  let {event, chainId} = item
  switch event {
  | RewardFxdxVaultContract_AddRewardWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.RewardFxdxVaultContract.AddRewardEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=RewardFxdxVault_AddReward,
      )

      let handler = Handlers.RewardFxdxVaultContract.AddReward.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(
            ~event,
            ~chainId,
            ~eventName="RewardFxdxVault.AddReward",
          )
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  | RewardFxdxVaultContract_SendRewardWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.RewardFxdxVaultContract.SendRewardEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=RewardFxdxVault_SendReward,
      )

      let handler = Handlers.RewardFxdxVaultContract.SendReward.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(
            ~event,
            ~chainId,
            ~eventName="RewardFxdxVault.SendReward",
          )
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  | RewardFxdxVaultContract_TotalReservesWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.RewardFxdxVaultContract.TotalReservesEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=RewardFxdxVault_TotalReserves,
      )

      let handler = Handlers.RewardFxdxVaultContract.TotalReserves.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(
            ~event,
            ~chainId,
            ~eventName="RewardFxdxVault.TotalReserves",
          )
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  | StakedFxdxVaultContract_StakeWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.StakedFxdxVaultContract.StakeEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=StakedFxdxVault_Stake,
      )

      let handler = Handlers.StakedFxdxVaultContract.Stake.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(~event, ~chainId, ~eventName="StakedFxdxVault.Stake")
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  | StakedFxdxVaultContract_TotalReservesWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.StakedFxdxVaultContract.TotalReservesEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=StakedFxdxVault_TotalReserves,
      )

      let handler = Handlers.StakedFxdxVaultContract.TotalReserves.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(
            ~event,
            ~chainId,
            ~eventName="StakedFxdxVault.TotalReserves",
          )
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  | StakedFxdxVaultContract_UnstakeWithContext(event, contextGetter) => {
      event->updateEventSyncState(~chainId, ~inMemoryStore)

      let jsonSerializedParams =
        event.params->Types.StakedFxdxVaultContract.UnstakeEvent.eventArgs_encode

      event->addEventToRawEvents(
        ~inMemoryStore,
        ~chainId,
        ~jsonSerializedParams,
        ~eventName=StakedFxdxVault_Unstake,
      )

      let handler = Handlers.StakedFxdxVaultContract.Unstake.getHandler()

      //Call the context getter here, ensures no stale values in the context
      //Since loaders and previous handlers have already run
      let context = contextGetter()

      try {
        handler(~event, ~context)
      } catch {
      // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
      | userCodeException =>
        let errorObj =
          userCodeException->getEventExnObj(~event, ~chainId, ~eventName="StakedFxdxVault.Unstake")
        //Logger takes any type just currently bound to string
        let errorMessage = errorObj->Obj.magic
        context.log.errorWithExn(Js.Exn.asJsExn(userCodeException), errorMessage)
      }
    }
  }
}

type readEntitiesResult = {
  timestamp: int,
  chainId: int,
  blockNumber: int,
  logIndex: int,
  entityReads: array<Types.entityRead>,
  eventAndContext: Types.eventAndContext,
}

type rec readEntitiesResultPromise = {
  timestamp: int,
  chainId: int,
  blockNumber: int,
  logIndex: int,
  data: (array<Types.entityRead>, Types.eventAndContext, option<array<readEntitiesResultPromise>>),
}

let rec loadReadEntitiesInner = async (
  ~inMemoryStore,
  ~eventBatch: array<Types.eventBatchQueueItem>,
  ~logger,
  ~chainManager: ChainManager.t,
): array<readEntitiesResultPromise> => {
  // Recursively load entities
  let loadNestedReadEntities = async (
    ~logIndex,
    ~dynamicContracts: array<Types.dynamicContractRegistryEntity>,
    ~fromBlock,
    ~currentBatchLastEventIndex: EventUtils.multiChainEventIndex,
    ~chainId: int,
  ): array<readEntitiesResultPromise> => {
    let chainFetcher = chainManager->ChainManager.getChainFetcher(~chainId)
    let eventBatchPromises =
      await chainFetcher->ChainFetcher.addDynamicContractAndFetchMissingEvents(
        ~fromBlock,
        ~dynamicContracts,
        ~fromLogIndex=logIndex + 1,
      )

    let eventsForCurrentBatch = []
    for i in 0 to eventBatchPromises->Belt.Array.length - 1 {
      let item = eventBatchPromises[i]
      let {timestamp, chainId, blockNumber, logIndex} = item

      let eventIndex: EventUtils.multiChainEventIndex = {
        timestamp,
        chainId,
        blockNumber,
        logIndex,
      }

      // If the event is earlier than the last event of the current batch, then add it to the current batch
      if EventUtils.isEarlierEvent(eventIndex, currentBatchLastEventIndex) {
        eventsForCurrentBatch->Js.Array2.push(item)->ignore
      } else {
        // Otherwise, add it to the arbitrary events queue for later batches
        chainManager->ChainManager.addItemToArbitraryEvents(item)
      }
    }

    //Only load inner batch if there are any events for the current batch
    if eventsForCurrentBatch->Belt.Array.length > 0 {
      await loadReadEntitiesInner(
        ~inMemoryStore,
        ~eventBatch=eventsForCurrentBatch,
        ~logger,
        ~chainManager,
      )
    } else {
      //Else return an empty array since nothing will load
      []
    }
  }

  let baseResults: array<readEntitiesResultPromise> = []

  let optLastItemInBatch = eventBatch->Belt.Array.get(eventBatch->Belt.Array.length - 1)

  switch optLastItemInBatch {
  | None => [] //there is no last item because the array is empty and we should return early
  | Some(lastItemInBatch) =>
    let currentBatchLastEventIndex: EventUtils.multiChainEventIndex = {
      timestamp: lastItemInBatch.timestamp,
      chainId: lastItemInBatch.chainId,
      blockNumber: lastItemInBatch.blockNumber,
      logIndex: lastItemInBatch.logIndex,
    }

    for i in 0 to eventBatch->Belt.Array.length - 1 {
      let {timestamp, chainId, blockNumber, logIndex, event} = eventBatch[i]

      baseResults
      ->Js.Array2.push({
        timestamp,
        chainId,
        blockNumber,
        logIndex,
        data: switch event {
        | RewardFxdxVaultContract_AddReward(event) => {
            let contextHelper = Context.RewardFxdxVaultContract.AddRewardEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.RewardFxdxVaultContract.AddReward.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="RewardFxdxVault.AddReward",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.RewardFxdxVaultContract_AddRewardWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        | RewardFxdxVaultContract_SendReward(event) => {
            let contextHelper = Context.RewardFxdxVaultContract.SendRewardEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.RewardFxdxVaultContract.SendReward.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="RewardFxdxVault.SendReward",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.RewardFxdxVaultContract_SendRewardWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        | RewardFxdxVaultContract_TotalReserves(event) => {
            let contextHelper = Context.RewardFxdxVaultContract.TotalReservesEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.RewardFxdxVaultContract.TotalReserves.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="RewardFxdxVault.TotalReserves",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.RewardFxdxVaultContract_TotalReservesWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        | StakedFxdxVaultContract_Stake(event) => {
            let contextHelper = Context.StakedFxdxVaultContract.StakeEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.StakedFxdxVaultContract.Stake.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="StakedFxdxVault.Stake",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.StakedFxdxVaultContract_StakeWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        | StakedFxdxVaultContract_TotalReserves(event) => {
            let contextHelper = Context.StakedFxdxVaultContract.TotalReservesEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.StakedFxdxVaultContract.TotalReserves.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="StakedFxdxVault.TotalReserves",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.StakedFxdxVaultContract_TotalReservesWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        | StakedFxdxVaultContract_Unstake(event) => {
            let contextHelper = Context.StakedFxdxVaultContract.UnstakeEvent.contextCreator(
              ~inMemoryStore,
              ~chainId,
              ~event,
              ~logger,
            )

            let context = contextHelper.getLoaderContext()

            let loader = Handlers.StakedFxdxVaultContract.Unstake.getLoader()

            try {
              loader(~event, ~context)
            } catch {
            // NOTE: we are only catching javascript errors here - please see docs on how to catch rescript errors too: https://rescript-lang.org/docs/manual/latest/exception
            | userCodeException =>
              let errorObj =
                userCodeException->getEventExnObj(
                  ~event,
                  ~chainId,
                  ~eventName="StakedFxdxVault.Unstake",
                )
              // NOTE: we could use the user `uerror` function instead rather than using a system error. This is debatable.
              logger->Logging.childErrorWithExn(userCodeException, errorObj)
            }

            let {logIndex, blockNumber} = event
            let contextGetter = contextHelper.getHandlerContext

            let dynamicContracts = contextHelper.getAddedDynamicContractRegistrations()

            (
              contextHelper.getEntitiesToLoad(),
              Types.StakedFxdxVaultContract_UnstakeWithContext(event, contextGetter),
              if Belt.Array.length(dynamicContracts) > 0 {
                Some(
                  await loadNestedReadEntities(
                    ~logIndex,
                    ~dynamicContracts,
                    ~fromBlock=blockNumber,
                    ~chainId,
                    ~currentBatchLastEventIndex,
                  ),
                )
              } else {
                None
              },
            )
          }
        },
      })
      ->ignore
    }

    baseResults
  }
}

type rec nestedResult = {
  result: readEntitiesResult,
  nested: option<array<nestedResult>>,
}
// Given a read entities promise, unwrap just the top level result
let unwrap = (p: readEntitiesResultPromise): readEntitiesResult => {
  let (er, ec, _) = p.data
  {
    timestamp: p.timestamp,
    chainId: p.chainId,
    blockNumber: p.blockNumber,
    logIndex: p.logIndex,
    entityReads: er,
    eventAndContext: ec,
  }
}

// Recursively await the promises to get their results
let rec recurseEntityPromises = async (p: readEntitiesResultPromise): nestedResult => {
  let (_, _, nested) = p.data

  {
    result: unwrap(p),
    nested: switch nested {
    | None => None
    | Some(xs) => Some(await xs->Belt.Array.map(recurseEntityPromises)->Promise.all)
    },
  }
}

// This function is used to sort results according to their order in the chain
let resultPosition = ({timestamp, chainId, blockNumber, logIndex}: readEntitiesResult) =>
  EventUtils.getEventComparator({
    timestamp,
    chainId,
    blockNumber,
    logIndex,
  })

// Given the recursively awaited results, flatten them down into a single list using chain order
let rec flattenNested = (xs: array<nestedResult>): array<readEntitiesResult> => {
  let baseResults = xs->Belt.Array.map(({result}) => result)
  let nestedNestedResults = xs->Belt.Array.keepMap(({nested}) => nested)
  let nestedResults = nestedNestedResults->Belt.Array.map(flattenNested)
  Belt.Array.reduce(nestedResults, baseResults, (acc, additionalResults) =>
    Utils.mergeSorted(resultPosition, acc, additionalResults)
  )
}

let loadReadEntities = async (
  ~inMemoryStore,
  ~eventBatch: array<Types.eventBatchQueueItem>,
  ~chainManager: ChainManager.t,
  ~logger: Pino.t,
): array<Types.eventRouterEventAndContext> => {
  let batch = await loadReadEntitiesInner(
    ~inMemoryStore,
    ~eventBatch,
    ~logger,
    ~chainManager: ChainManager.t,
  )

  let nestedResults = await batch->Belt.Array.map(recurseEntityPromises)->Promise.all
  let mergedResults = flattenNested(nestedResults)

  // Project the result record into a tuple, so that we can unzip the two payloads.
  let resultToPair = ({entityReads, eventAndContext, chainId}): (
    array<Types.entityRead>,
    Types.eventRouterEventAndContext,
  ) => (entityReads, {chainId, event: eventAndContext})

  let (readEntitiesGrouped, contexts): (
    array<array<Types.entityRead>>,
    array<Types.eventRouterEventAndContext>,
  ) =
    mergedResults->Belt.Array.map(resultToPair)->Belt.Array.unzip

  let readEntities = readEntitiesGrouped->Belt.Array.concatMany

  await IO.loadEntitiesToInMemStore(~inMemoryStore, ~entityBatch=readEntities)

  contexts
}

let registerProcessEventBatchMetrics = (
  ~logger,
  ~batchSize,
  ~loadDuration,
  ~handlerDuration,
  ~dbWriteDuration,
) => {
  logger->Logging.childTrace({
    "message": "Finished processing batch",
    "batch_size": batchSize,
    "loader_time_elapsed": loadDuration,
    "handlers_time_elapsed": handlerDuration,
    "write_time_elapsed": dbWriteDuration,
  })

  Prometheus.incrementLoadEntityDurationCounter(~duration=loadDuration)

  Prometheus.incrementEventRouterDurationCounter(~duration=handlerDuration)

  Prometheus.incrementExecuteBatchDurationCounter(~duration=dbWriteDuration)

  Prometheus.incrementEventsProcessedCounter(~number=batchSize)
}

let processEventBatch = async (
  ~eventBatch: array<Types.eventBatchQueueItem>,
  ~chainManager: ChainManager.t,
  ~inMemoryStore: IO.InMemoryStore.t,
) => {
  let logger = Logging.createChild(
    ~params={
      "context": "batch",
      // Used to uniquely identify each batch.
      "from_block_index": eventBatch
      ->Belt.Array.get(0)
      ->Belt.Option.map(({blockNumber, logIndex}) =>
        `${blockNumber->Belt.Int.toString}-${logIndex->Belt.Int.toString}`
      ),
    },
  )

  let timeRef = Hrtime.makeTimer()

  let eventBatchAndContext = await loadReadEntities(
    ~inMemoryStore,
    ~eventBatch,
    ~chainManager,
    ~logger,
  )

  let elapsedAfterLoad = timeRef->Hrtime.timeSince->Hrtime.toMillis->Hrtime.intFromMillis

  eventBatchAndContext->Belt.Array.forEach(event => event->eventRouter(~inMemoryStore))

  let elapsedTimeAfterProcess = timeRef->Hrtime.timeSince->Hrtime.toMillis->Hrtime.intFromMillis
  await DbFunctions.sql->IO.executeBatch(~inMemoryStore)

  let elapsedTimeAfterDbWrite = timeRef->Hrtime.timeSince->Hrtime.toMillis->Hrtime.intFromMillis

  registerProcessEventBatchMetrics(
    ~logger,
    ~batchSize=eventBatch->Array.length,
    ~loadDuration=elapsedAfterLoad,
    ~handlerDuration=elapsedTimeAfterProcess - elapsedAfterLoad,
    ~dbWriteDuration=elapsedTimeAfterDbWrite - elapsedTimeAfterProcess,
  )
}

let startProcessingEventsOnQueue = async (~chainManager: ChainManager.t): unit => {
  while true {
    let nextBatch =
      await chainManager->ChainManager.createBatch(
        ~minBatchSize=1,
        ~maxBatchSize=Env.maxProcessBatchSize,
      )

    let inMemoryStore = IO.InMemoryStore.make()
    await processEventBatch(~eventBatch=nextBatch, ~inMemoryStore, ~chainManager)
  }
}
