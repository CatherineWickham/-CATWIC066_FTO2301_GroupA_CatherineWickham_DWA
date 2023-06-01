// @ts-check

/**
 * Global constant containing the set number of books to be displayed on a single page of
 * the app
 * 
 * @type {number}
 */
export const BOOKS_PER_PAGE = 36

/**
 * @typedef {Object} ThemeColorsObject
 * @property {string} dark - contains RGB value for the CSS --color-dark variable
 * @property {string} light - contains RGB value for the CSS --color-light variable
 */

/**
 * @typedef {Object} ThemesObject
 * @property {ThemeColorsObject} day - contains color settings for the day theme
 * @property {ThemeColorsObject} night - contains color settings for the night theme
 */

/**
 * Global constant containing RGB color codes to be applied using CSS color variables for
 * each of the available themes (day/night)
 *
 * @type {ThemesObject}
 */
export const THEMES = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}