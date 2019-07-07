/* eslint-disable no-continue, no-loop-func, no-cond-assign */
import { propGetters } from './propGetters'

const PROP_REGEXP = /(\s*)([^&{}:;\n]+):\s*([^&{}:;\n]+)\s*(!important)?\s*;/g

export function transform(rawValue) {
  if (typeof rawValue !== 'string') return rawValue
  let matches
  let lastIndex = 0
  const values = []
  while ((matches = PROP_REGEXP.exec(rawValue))) {
    const start = matches[1]
    const prop = matches[2]
    const propValue = matches[3]
    const important = matches[4] || ''
    const getter = propGetters[prop]
    if (getter) {
      values.push(rawValue.slice(lastIndex, matches.index))
      values.push(p => `${start}${prop}: ${getter(propValue)(p)}${important};`)
      lastIndex = matches.index + matches[0].length
    }
  }
  values.push(rawValue.slice(lastIndex, rawValue.length))
  return values
}
