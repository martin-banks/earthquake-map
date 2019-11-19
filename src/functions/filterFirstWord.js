// Removes first word from a string as preparation for ordering
// If it in the blacklist array will be filtered out
// before returning a new string

const blacklist = [
  'the',
  'a',
  'an',
]

export default function (title) {
  if (typeof title !== 'string') return title
  let words = title.split(' ')
  if (blacklist.includes(words[0].toLowerCase())) {
    return words.slice(1).join(' ')
  }
  return words.join(' ')
}
