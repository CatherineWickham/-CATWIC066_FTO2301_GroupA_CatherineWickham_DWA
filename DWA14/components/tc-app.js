/* eslint-disable import/extensions */

import { LitElement, html, css } from "../libs/lit.js";

class App extends LitElement {
  static styles = css`
    header {
      text-align: center;
    }

    h1 {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-light-grey);
    }
  `;

  render() {
    return html`
      <header>
        <h1>Tally Count</h1>
      </header>

      <main>
        <tc-counter></tc-counter>
      </main>
    `;
  }
}

customElements.define("tc-app", App);
