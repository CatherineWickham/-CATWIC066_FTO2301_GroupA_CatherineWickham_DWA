/* eslint-disable import/extensions */

import { State } from "./store.js";
import { Action } from "./actions.js";

/**
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        value: state.value + 1,
      };
    }

    case "SUBTRACT": {
      return {
        ...state,
        value: state.value - 1,
      };
    }

    case "RESET": {
      return {
        ...state,
        value: 0,
      };
    }

    default:
      return state;
  }
};

export default reducer;
