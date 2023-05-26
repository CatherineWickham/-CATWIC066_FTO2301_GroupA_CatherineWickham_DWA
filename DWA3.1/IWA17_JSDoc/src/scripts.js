// @ts-check

/**
 * Global constant that stores the names of the months of the year in order.
 * 
 * @type {Array<string>}
 */
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

/**
 * Function that determines the number of days that are in the month of the input date. 
 *
 * @type {Function}
 * @param {Date} date - Input date
 * @returns {number} - Number of days in the month of the input date 
 */
const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()


/**
 * Function that generates an array of a specified length which has only placeholder null
 * elements at each position in the array. This is used as a template to loop over and
 * fill in values.
 *
 * @type {Function}
 * @param {number} length - Target length of the array to be created
 * @returns {Array<null>} - Resulting array of target length filled with null elements
 */
const createArray = (length) => {
    let result = []
    for ( let i = 0; i < length; i++) {
        result.push(null)
    }
    return result
}

/** 
 * An element of an array containing data for a single day of the week, nested within an
 * array containing data for a single week of the current month 
 * @typedef {Object} DaysElement
 * @property {number} dayOfWeek - the number of this day within the current week
 * @property {number} value - contains the value of the day of the month assigned to this
 * day
 */

/** 
 * An array containing data for each day within a particular week of the current month
 * @typedef {Array<DaysElement>} Days
 */

/** 
 * An element of an array containing data for a single week of the current month
 * @typedef {Object} WeeksElement
 * @property {number} week - number of this week within the current month
 * @property {Days} days - an array containing data for each day of this week
 */

/** 
 * An array containing data for each week of the current month
 * @typedef {Array<WeeksElement>} Weeks
 */

/**
 * Function that generates data arranged in nested arrays of objects that will be used to
 * populate the calendar table with day number values.
 *
 * The current date at the time of running the app is determined (`current`) and the day
 * of the week on which the first day of the current month occurred (`startDay`) is
 * calculated from it. The number of days in the current month (`daysInMonth`) is also
 * calculated using {@link getDaysInMonth}. 
 *
 * The `daysArray` variable is then created to store the values of the day numbers that
 * will be added for each day of the month. Empty strings are used where whitespace is
 * required instead of a day number (i.e. for days in the calendar that fall outside the
 * current month). The placement of the values/whitespace within the array is based on the
 * `startDay` and `daysInMonth` values.
 *
 * An outer array called `weeks` is created based on a template generated by
 * {@link createArray}. Each element contains an object corresponding to each week of the
 * month which contains the week number and an array called `days`. The template for
 * `days` is also generated using {@link createArray}. Each element of the `days` array is
 * also an object, containing the number of that day within the current week (`dayOfWeek`)
 * and the `value` of that day number (i.e. the `dayOfMonth`) which is assigned for that
 * day from `daysArray` according to the `daysArrayIndex` number.
 *
 * @type {Function}
 * @returns {Weeks} -  An array of objects containing week numbers and arrays of day data
 * for each week of the current month. The day arrays contain objects for each day, with
 * day numbers and values for which day of the month the day corresponds to.
 */
const createData = () => {
    const current = new Date
    current.setDate(1)
    const startDay = current.getDay()
    const daysInMonth = getDaysInMonth(current)


   let daysArray = []
    for ( let i = 1; i <= 42; i++) {
        if (i <= startDay || i > daysInMonth + startDay) {
            daysArray.push("")
        } else {
            daysArray.push(i - startDay)
        }
    }

    let weeks = createArray(6)
    let dayOfMonth = null
    let daysArrayIndex = 0

    for (let weekIndex in weeks) {
        
        let days = createArray(7)

        weeks[weekIndex] = {
            week: parseInt(weekIndex) + 1,
            days: days
        }

        for (let dayIndex in days) {
            
            dayOfMonth = daysArray[daysArrayIndex]
            daysArrayIndex++

            weeks[weekIndex].days[dayIndex] = {
                dayOfWeek: parseInt(dayIndex) + 1,
                value: dayOfMonth
            }
        }
    }
    return weeks
    
}

/**
 * Generates a template string containing HTML for a single new cell of the table in which
 * the calendar is displayed. Appropriate CSS classes are included to format the cell
 * correctly. The new cell is appended to the existing contents of the table as a td
 * element.
 *
 * @type {Function}
 * @param {string | HTMLElement} existing - contains the current state of the HTML
 * template string
 * @param {string} classString - specifies the CSS classes to be applied to the new cell
 * @param {number} value - the number corresponding to the day of the month to be entered
 * into the new cell
 * @returns {string} - template string containing the HTML of the new cell
 */
const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            ${value}
        </td>
    `
    return result
} 

/**
 * Generates a template string containing HTML for the entire calendar table, using the
 * data provided. This will later be applied to the DOM by setting the innerHTML of the
 * content section of the app to the value of the final template string.
 *
 * For each week of the weeks array, the cells of the sidebar containing the week numbers
 * are added using {@link addCell}.
 *
 * For each day within that week, checks are performed to see if the day meets any special
 * conditions that requre specific formatting (is the current day, or is a weekend day, or
 * falls within an alternate week) and the classString is updated accordingly.
 *
 * The value of the day is set according to the corresponding value in the supplied data
 *
 * The HTML cell for that day is then created using {@link addCell} and added inside a
 * <tr> element in the `result` template string
 *
 * At the end of each week, the results for that week contained in the `result` template
 * string as a single tr element are added to the `combinedResults` template string,
 * resulting in a sequence of tr elements - one for each week
 *
 * @type {Function}
 * @param {Weeks} data - An array containing data for each week of the current month
 * @returns {string} - template string containing the HTML of the entire calendar table as
 * a sequence of tr elements from each week
 */
const createHtml = (data) => {
    let result = ''
    let combinedResults = ''

    for (let weekIndex in data) {
        let inner = ''

        inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${data[weekIndex].week}`) 

    
        for (let dayIndex in data[weekIndex].days) { 

            let isToday = (new Date).getDate() === data[weekIndex].days[dayIndex].value
            let isWeekend = data[weekIndex].days[dayIndex].dayOfWeek === 1 || data[weekIndex].days[dayIndex].dayOfWeek === 7
            let isAlternate = data[weekIndex].week % 2 === 0
            
            let classString = "table__cell"
			if (isToday === true) {classString = `${classString} table__cell_today`}
            if (isWeekend === true) {classString = `${classString} table__cell_weekend`}
            if (isAlternate === true) {classString = `${classString} table__cell_alternate`}

            let value = data[weekIndex].days[dayIndex].value

            inner = addCell(inner, classString, value)

            result = `<tr>${inner}</tr>`
        }

       combinedResults = `${combinedResults}${result}` 
    }
    return combinedResults
}

/**
 * The current date at the time of running the app, used to set the month name and year
 * diplayed above the calendar table
 *
 * @type {Date}
 */
const currentDay = new Date()
// @ts-ignore
document.querySelector('[data-title]').innerText = `${MONTHS[currentDay.getMonth()]} ${currentDay.getFullYear()}`
// should be stored as variable to document properly


/**
 * Contains data generated for the current month using {@link createData}, which is then
 * used to create the calendar table using {@link createHtml}
 *
 * @type {Weeks}
 */
const data = createData()
// @ts-ignore
document.querySelector('[data-content]').innerHTML = createHtml(data)
// should be stored as variable to document properly