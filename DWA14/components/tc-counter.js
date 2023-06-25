/* eslint-disable import/extensions */

import { LitElement, html, css } from "../libs/lit.js";
import { state, actions } from "../state.js";

const MAX_NUMBER = 10;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 1;

class Counter extends LitElement {
  static properties = {
    value: { type: "string" },
  };

  static styles = css`
    .counter {
      background: var(--color-dark-grey);
    }

    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      color: var(--color-white);
      background: none;
      border-width: 0;
      border-bottom: 1px solid var(--color-light-grey);
    }

    .counter__button {
      background: none;
      width: 50%;
      border-width: 0;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light-grey);
      transition: transform 0.1s;
      transform: translateY(0);
    }

    .counter__button:disabled {
      opacity: 0.2;
    }

    .counter__button:active {
      background: var(--color-medium-grey);
      transform: translateY(-2%);
    }

    .counter__actions {
      display: flex;
    }

    .counter__button_first {
      border-right: 1px solid var(--color-light-grey);
    }
  `;

  constructor() {
    super();
    this.value = state.data.value;
  }

  subtractHandler() {
    const newValue = Number(this.value) - STEP_AMOUNT;
    state.data.value = newValue;
    this.value = state.data.value;

    if (state.phase === "max") {
      actions[state.phase].back();
      actions[state.phase].toggleAdd();
    }

    if (newValue <= MIN_NUMBER) {
      actions[state.phase].back();
      actions[state.phase].toggleSubtract();
    }
    console.log(state.phase);
  }

  addHandler() {
    const newValue = Number(this.value) + STEP_AMOUNT;
    state.data.value = newValue;
    this.value = state.data.value;

    if (state.phase === "min") {
      actions[state.phase].proceed();
      actions[state.phase].toggleSubtract();
    }

    if (newValue >= MAX_NUMBER) {
      actions[state.phase].proceed();
      actions[state.phase].toggleAdd();
    }
    console.log(state.phase);
  }

  render() {
    return html`
      <div class="counter">
        <input
          class="counter__value"
          data-key="number"
          readonly
          .value=${this.value.toString()}
        />

        <div class="counter__actions">
          <button
            ?disabled=${state.data.subtractDisabled}
            class="counter__button counter__button_first"
            data-key="subtract"
            @click=${() => this.subtractHandler()}
          >
            -
          </button>
          <button
            ?disabled=${state.data.addDisabled}
            class="counter__button"
            data-key="add"
            @click=${() => this.addHandler()}
          >
            +
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("tc-counter", Counter);
