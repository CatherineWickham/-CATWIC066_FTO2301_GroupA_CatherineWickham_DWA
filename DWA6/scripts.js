// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { books, authors, genres } from './data.js'
import { THEMES } from './config.js'
import { html, createPreviewsList, createDropdownList, updateShowMoreButton } from './view.js'

// App setup ----------------------------------------------------------------------------------

/**
 * @typedef {Object} StateObject
 * @property {number} page - current page number of results being displayed in the app,
 * default value is 1
 * @property {Array} matches - an array containing current books that match most recent
 * search results, default value is entire {@link books} object
 */

/**
 * An object literal containing the current state of variables used to determine what is
 * shown on the app's interface
 *
 * @type {StateObject}
 */
const state = {
    page: 1,
    matches: books,
}

// Handles default theme setting preferences
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.settings.theme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', THEMES.night.dark);
    document.documentElement.style.setProperty('--color-light', THEMES.night.light);
} else {
    html.settings.theme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', THEMES.day.dark);
    document.documentElement.style.setProperty('--color-light', THEMES.day.light);
}

// Creates html elements needed for starting view of app
createDropdownList(genres, "Genres", html.search.genres)
createDropdownList(authors, "Authors", html.search.authors)
createPreviewsList(state.matches, state.page)
updateShowMoreButton(state.matches, state.page)

// Settings menu operations  ------------------------------------------------------------------
/**
 * Event handler that opens Settings overlay on click of the Settings button
 */
const handleSettingsOpen = () => {
    html.settings.overlay.open = true 
}

/**
 * Event handler that closes Settings overlay on click of the Cancel button
 */
const handleSettingsCancel = () => {
    html.settings.overlay.open = false
}

/**
 * Event handler that fires when the Save button in the Settings overlay is clicked. The
 * theme that the user has selected is applied using the colors saved in the
 * {@link THEMES} object.
*/
const handleSettingsSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    // @ts-ignore
    document.documentElement.style.setProperty('--color-dark', THEMES[theme].dark)
    // @ts-ignore
    document.documentElement.style.setProperty('--color-light', THEMES[theme].light)
    
    html.settings.overlay.open = false
}

html.headerButtons.settings.addEventListener('click', handleSettingsOpen)
html.settings.cancel.addEventListener('click', handleSettingsCancel)
html.settings.form.addEventListener('submit', handleSettingsSubmit)


// Search menu operations ---------------------------------------------------------------------
/** 
 * Event handler that opens Search overlay on click of the Search button. Focus is set to
 * the title section of the menu so that the user can immediately start typing in the
 * form.
 */
const handleSearchOpen = () => {
    html.search.overlay.open = true 
    html.search.title.focus()
}

/**
 * Event handler that closes Search overlay on click of the Cancel button. The form is
 * reset so any user input not subitted is cleared when the overlay is next opened.
 */
const handleSearchCancel = () => {
    html.search.overlay.open = false
    html.search.form.reset()
}

/**
 * Function that compares a set of filters to the entire {@link books} object and returns
 * only books that match the defined filter terms
 * @param {Object} filters - Object containing search terms for for the title, genre, and
 * author categories, each stored in their own properties
 * @returns {Array} An array containing all books that match the search filters
 */
const applySearchFilters = (filters) => {
    const result = []
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }
    return result
}

/** 
 * Event handler that fires when data in the Search Menu form is submitted. Form data is
 * extracted and {@link applySearchFilters} is used to update the matches array in the
 * {@link state} object accordingly. New list previews are then generated and added to the
 * main list area using {@link createPreviewsList}. The value in the Show More button is
 * also updated using the {@link updateShowMoreButton} function and the search form is
 * reset so user input is cleared when the Search Menu is next opened.
*/
const handleSearchSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    state.matches = applySearchFilters(filters)
    state.page = 1;

    if (state.matches.length < 1) {
        html.list.message.classList.add('list__message_show')
    } else {
        html.list.message.classList.remove('list__message_show')
    }

    html.list.button.disabled = false
    html.list.items.innerHTML = ''
    createPreviewsList(state.matches, state.page)

    updateShowMoreButton(state.matches, state.page)
    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
    html.search.form.reset()
}

html.headerButtons.search.addEventListener('click', handleSearchOpen)
html.search.cancel.addEventListener('click', handleSearchCancel)
html.search.form.addEventListener('submit', handleSearchSubmit)


// Active previews ----------------------------------------------------------------------------
/** 
 * Event handler that fires when one of the list preview items in the main list area is
 * clicked and opens an active preview that displays a larger version of the cover and
 * gives additional details about the selected book.
*/
const handleOpenActivePreview = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
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
 * Event handler that closes the current active preview on click of the Close button
 */
const handleCloseActivePreview = () => {
    html.list.active.preview.open = false
}

html.list.items.addEventListener('click', handleOpenActivePreview)
html.list.close.addEventListener('click', handleCloseActivePreview)


// Show more button  --------------------------------------------------------------------------

/** Event handler fired by clicking Show More button. Increments the page count by 1, and
 *  then runs the {@link createPreviewsList} function to generate the previews for this
 *  page. The value in the Show More button is updated using the
 *  {@link updateShowMoreButton} function.
 */
const handleShowMore = () => {
    state.page += 1
    createPreviewsList(state.matches, state.page)
    updateShowMoreButton(state.matches, state.page)
}
html.list.button.addEventListener('click', handleShowMore)