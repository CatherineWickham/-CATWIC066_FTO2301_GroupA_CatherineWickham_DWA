/**
 * @typedef {'min' | 'normal' | 'max'} Phase
 */

/**
 * @typedef {object} Data
 */

/**
 * @typedef {object} State
 * @prop {Phase} phase
 * @prop {Data} data
 */

/**
 * @callback EmptyFn
 */

/**
 * @typedef {} Actions
 * @prop {EmptyFn} back
 * @prop {EmptyFn} proceed
 * @prop {EmptyFn} toggleAdd
 * @prop {EmptyFn} toggleSutract
 */

/**
 * @type {State}
 */
export const state = {
  phase: "normal",
  data: {
    value: 0,
    addDisabled: false,
    subtractDisabled: false,
  },
};

/**
 * @type {EmptyFn}
 */
const toggleAdd = () => {
  state.data.addDisabled = !state.data.addDisabled;
};

/**
 * @type {EmptyFn}
 */
const toggleSubtract = () => {
  state.data.subtractDisabled = !state.data.subtractDisabled;
};

/**
 * @param {Phase} phase
 */
const transition = (phase) => () => {
  state.phase = phase;
};

const invalid = (action, phase) => () => {
  throw new Error(
    `Cannot perform ${action} in current phase. Phase is required to be ${phase} `
  );
};

export const actions = {
  min: {
    back: invalid("back", "normal"),
    proceed: transition("normal"),
    toggleAdd: invalid("toggleAdd", "normal"),
    toggleSubtract,
  },
  normal: {
    back: transition("min"),
    proceed: transition("max"),
    toggleAdd,
    toggleSubtract,
  },
  max: {
    back: transition("normal"),
    proceed: invalid("proceed", "normal"),
    toggleAdd,
    toggleSubtract: invalid("toggleSubtract", "normal"),
  },
};
