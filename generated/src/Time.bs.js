// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Logging = require("./Logging.bs.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function resolvePromiseAfterDelay(delayMilliseconds) {
  return new Promise((function (resolve, param) {
                setTimeout((function (param) {
                        resolve(undefined);
                      }), delayMilliseconds);
              }));
}

async function retryAsyncWithExponentialBackOff(backOffMillisOpt, multiplicativeOpt, retryCountOpt, maxRetriesOpt, loggerOpt, f) {
  var backOffMillis = backOffMillisOpt !== undefined ? backOffMillisOpt : 1000;
  var multiplicative = multiplicativeOpt !== undefined ? multiplicativeOpt : 2;
  var retryCount = retryCountOpt !== undefined ? retryCountOpt : 0;
  var maxRetries = maxRetriesOpt !== undefined ? maxRetriesOpt : 5;
  var logger = loggerOpt !== undefined ? Caml_option.valFromOption(loggerOpt) : undefined;
  try {
    return await Curry._1(f, undefined);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (retryCount < maxRetries) {
      var nextRetryCount = retryCount + 1 | 0;
      Belt_Option.map(logger, (function (l) {
              Logging.childErrorWithExn(l, exn, "Failure. Retrying " + String(nextRetryCount) + "/" + String(maxRetries) + " in " + String(backOffMillis) + "ms");
            }));
      await resolvePromiseAfterDelay(backOffMillis);
      return await retryAsyncWithExponentialBackOff(Math.imul(backOffMillis, multiplicative), multiplicative, nextRetryCount, maxRetries, undefined, f);
    }
    Belt_Option.map(logger, (function (l) {
            Logging.childErrorWithExn(l, exn, "Failure. Max retries " + String(retryCount) + "/" + String(maxRetries) + " exceeded");
          }));
    return await Promise.reject(exn);
  }
}

exports.resolvePromiseAfterDelay = resolvePromiseAfterDelay;
exports.retryAsyncWithExponentialBackOff = retryAsyncWithExponentialBackOff;
/* Logging Not a pure module */
