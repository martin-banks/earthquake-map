import balanceText from 'balance-text'

// * https://www.npmjs.com/package/balance-text

// Simple directive to easily use the balance-text module
// to visually balance lines of text
export default {
  inserted (el) {
    balanceText(el, { watch: true })
  },
}
