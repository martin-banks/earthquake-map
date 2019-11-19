/*eslint-disable*/
// Importing text from spreadsheet strips out formatting.
// add support for use of underscores to denote italic areas
// Also replace all quote and apostrophes with typographer variants

export default function (text) {
  if (!text) return
  return text
    .trim()
    .replace(/^_/, '<i>')
    .replace(/_$/, '</i>')
    .replace(/ _/g, ' <i>')            // markdown: space + underscore -> start italic
    .replace(/_ /g, '</i> ')           // markdown: underscore + space -> end italic
    .replace(/_\./g, '</i>.')          // markdown exception: underscore + fullpoint -> end itliac
    .replace(/_, /g, '</i>, ')         // markdown exception: underscore + comma -> end itliac
    .replace(/_'|_‘|_’/g, '</i>’')     // markdown exception: underscore + singlequote -> end itliac
    .replace(/_"|_“|_”/g, '</i>"')     // markdown exception: underscore + doublequote -> end itliac
    .replace(/\(_/g, '(<i>')           // open bracket + underscore -> start italic inside brackets
    .replace(/_\)/g, '</i>)')          // underscore + close bracket -> end italic inside brackets

    .replace(/ '/g, ' ‘')              // replace: space + singlequote -> space + single-typographers-quote

    .replace(/"'/g, '“‘')              // replace: doublequote + singlequote -> double-typographers + single-typographers-quote
    .replace(/ "/g, ' “')              // replace: space + doublequote -> space + double-typographers
    .replace(/"\./g, '”. ')            // replace: doublequote + fullpoint -> double-typographers + fullpoint
    .replace(/", /g, '”, ')            // replace: doublequote + comma -> double-typographers + comma
    .replace(/"$/g, '”')               // replace: doublequote + end of text -> double-typographers
    .replace(/" /g, '” ')              // replace: doublequote + space -> double-typographers + space
    
    .replace(/\("/g, '\(“')            // replace: doublequote + open-bracket -> double-typographers + open-bracket
    .replace(/"\)/g, '”\)')            // replace: doublequote + close-bracket -> double-typographers + close-bracket

    .replace(/^'/g, '‘')               // replace: start of text + open-singlequote -> open-single-typographers-quote
    .replace(/'/g, '’')                // replace: any singlequote -> typographers-singlequote

    // .replace(/ \*\*/g, ' <b>')      // possible future pattern for bold text ??
    // .replace(/\*\* /g, '</b> ')
}
