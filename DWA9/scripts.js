// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { state } from './modules/state.js'
import { books, authors, genres } from './modules/data.js'
import { THEMES } from './modules/config.js'
import { html, createPreviewsList, createDropdownList, updateShowMoreButton } from './modules/view.js'
import { handleSettingsCancel, handleSettingsOpen, handleSettingsSubmit } from './modules/settings.js'
import { handleSearchCancel, handleSearchOpen, handleSearchSubmit } from './modules/search.js'
import './components/active-preview.js'
import { handleShowMore } from './modules/showMore.js'

// App setup ----------------------------------------------------------------------------------

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
html.headerButtons.settings.addEventListener('click', handleSettingsOpen)
html.settings.cancel.addEventListener('click', handleSettingsCancel)
html.settings.form.addEventListener('submit', handleSettingsSubmit)

// Search menu operations ---------------------------------------------------------------------
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

    const activePreview = document.createElement('active-preview')

    document.querySelector('body').appendChild(activePreview)
    activePreview.active = active
}
html.list.items.addEventListener('click', handleOpenActivePreview)

// Show more button  --------------------------------------------------------------------------
html.list.button.addEventListener('click', handleShowMore)