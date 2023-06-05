// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { books, authors } from './data.js'
import { html } from './view.js'

/**
 * Function that determines which book the user has clicked on in order to diplay an
 * active preview of that book
 * @param {Array} pathArray - path from event listener triggered by user clicking a list
 * preview for a particular book
 * @returns book in {@link books} array corresponding to the book the user clicked on
 */
const findActiveBook = (pathArray) => {
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    return active
}

/**
 * Function that updates the components of the HTML overlay for an active preview with the
 * information of the active book, clicked on by the user
 * @param {*} active  - information of book that user has clicked on, as stored in {@link books} array 
 */
const updateActivePreviewHtml = (active) => {
    if (active) {
        html.list.active.preview.open = true
        html.list.active.blur.src = active.image
        html.list.active.image.src = active.image
        html.list.active.title.innerText = active.title
        html.list.active.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.list.active.description.innerText = active.description
    }
}

/** 
 * Event handler that fires when one of the list preview items in the main list area is
 * clicked and opens an active preview that displays a larger version of the cover and
 * gives additional details about the selected book.
*/
export const handleOpenActivePreview = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    updateActivePreviewHtml(findActiveBook(pathArray))
}

/**
 * Event handler that closes the current active preview on click of the Close button
 */
export const handleCloseActivePreview = () => {
    html.list.active.preview.open = false
}