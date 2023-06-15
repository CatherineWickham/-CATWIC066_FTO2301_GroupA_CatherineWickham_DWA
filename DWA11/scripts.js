/* eslint-disable import/extensions */
/* eslint-disable no-console */

import { getState, dispatch, subscribe } from "./redux/store.js";
import { add, subtract, reset } from "./redux/actions.js";

const displayCounter = (next) => {
  console.log(next);
};

subscribe((_, next) => displayCounter(next));

// User story 1
console.log(getState());

// User story 2
dispatch(add());
dispatch(add());

// User story 3
dispatch(subtract());

// User story 4
dispatch(reset());
