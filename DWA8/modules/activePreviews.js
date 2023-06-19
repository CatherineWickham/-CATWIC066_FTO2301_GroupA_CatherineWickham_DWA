// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { books, authors } from "./data.js";
import { html } from "./view.js";

const createActivePreview = (pathArray) => {
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  const activePreview = {
    active,
    add: () => {
      const node = html.list.active.preview;
      node.innerHTML = `
            <div class="overlay__preview"><img class="overlay__blur" data-list-blur src="${
              active.image
            }"/><img class="overlay__image" data-list-image src="${
        active.image
      }"/></div>
            <div class="overlay__content">
            <h3 class="overlay__title" data-list-title>${active.title}</h3>
            <div class="overlay__data" data-list-subtitle>${
              authors[active.author]
            } (${new Date(active.published).getFullYear()}</div>
            <p class="overlay__data overlay__data_secondary" data-list-description>${
              active.description
            }</p>
            </div>
            
            <div class="overlay__row">
            <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
            </div>
            `;
      node.style.display = "block";
      node.addEventListener("click", () => {
        node.style.display = "none";
      });
    },

    get image() {
      return active.image;
    },

    set image(newImageURL) {
      active.image = newImageURL;
    },
  };

  return activePreview;
};

/**
 * Event handler that fires when one of the list preview items in the main list area is
 * clicked and opens an active preview that displays a larger version of the cover and
 * gives additional details about the selected book.
 */
export const handleOpenActivePreview = (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  const activePreview = createActivePreview(pathArray);
  console.log(activePreview.image); // check getter
  activePreview.image =
    "https://www.catherinewickham.co.za/images/profilePicLarge.jpg"; // check setter
  activePreview.add();
};

export default handleOpenActivePreview;
