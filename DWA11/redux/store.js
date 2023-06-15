/* eslint-disable import/extensions */

import { reducer } from "./reducers.js";
import { Action } from "./actions.js";

/**
 * @typedef {object} State
 * @prop {number} value
 */

export const State = {};

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback EmptyFn
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

/**
 * @type {Array<Subscription>}
 */
let subscribers = [];

/**
 * @type {Array<State>}
 * Need to define starting state
 */
const states = [{ value: 0 }];

/**
 * @returns {State}
 */
export const getState = () => {
  const currentState = Object.freeze({ ...states[0] });
  return currentState;
};

/**
 * @param {Action} action
 */
export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);
  subscribers.forEach((item) => item(prev, next));
  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 * @returns {EmptyFn}
 */
export const subscribe = (subscription) => {
  subscribers.push(subscription);
  console.log(subscribers);

  const filterHandler = (item) => item !== subscription;

  const unsubscribe = () => {
    const newSubscibers = subscribers.filter(filterHandler);
    subscribers = newSubscibers;
    console.log("unsubbed");
  };

  return unsubscribe;
};
