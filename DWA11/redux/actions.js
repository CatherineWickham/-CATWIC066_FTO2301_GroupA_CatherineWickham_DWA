/* eslint-disable import/extensions */

import {} from "./store.js";

/**
 * Increments the counter by 1
 *
 * @typedef {object} Add
 * @prop {'ADD'} type
 */

/**
 * Decrements the counter by 1
 *
 * @typedef {object} Subtract
 * @prop {'SUBTRACT'} type
 */

/**
 * Resets the counter to 0
 *
 * @typedef {object} Reset
 * @prop {'RESET'} type
 */

/**
 * @typedef {Add | Subtract | Reset} Action
 */

export const Action = {};

/**
 * Action creator for Increase action
 *
 * @returns {Add}
 */
export const add = () => ({ type: "ADD" });

/**
 * Action creator for Decrease action
 *
 * @returns {Subtract}
 */
export const subtract = () => ({ type: "SUBTRACT" });

/**
 * Action creator for Reset action
 *
 * @returns {Reset}
 */
export const reset = () => ({ type: "RESET" });
