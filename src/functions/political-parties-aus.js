import alp from '@/icons/alp.png'
import ind from '@/icons/ind.png'
import libdem from '@/icons/libdem.png'
import green from '@/icons/green.png'
import lib from '@/icons/lib.png'
import con from '@/icons/conservatives.png'
import ca from '@/icons/ca.png'

export function parties (short) {
  const defs = {
    ALP: 'Australian Labor Party',
    GSA: 'Greens SA',
    GRE: 'Greens',
    IND: 'Independent',
    LIB: 'Liberal Party',
    SAB: 'SA-Best',
    CA: 'Center Alliance',
    ACP: 'Conservative',
    CON: 'Conservative',
    NXT: 'Nick Xenophon Team',
  }
  const found = defs[short.toUpperCase()]
  if (found) return found
  console.error('Missing definiteion for that party')
  return null
}

export function colors (short) {
  const defs = {
    ALP: '#d31',
    GSA: '#6c0',
    GRE: '#6c0',
    IND: '#ca0',
    LIB: '#04a',
    SAB: '#f80',
    CA: '#c60',
    ACP: '#08d',
    CON: '#08d',
    NXT: '#f80',
  }
  const found = defs[short]
  if (found) return found
  console.error('That party was not found', short)
  return '#333'
}

export const logos = {
  alp,
  ind,
  libdem,
  green,
  gre: green,
  lib,
  con,
  ca,
}
