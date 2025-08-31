const HALF = 2
const AROUND_INDEX = 1
const NO_OCCURRENCES = 0

export const average = mean

export function mean(...numbers) {
  return numbers.reduce((acc, num) => acc + num) / numbers.length
}

export function median(...numbers) {
  const sortedNumbers = numbers.toSorted()
  const middleIndex = numbers.length / HALF

  if (Number.isInteger(middleIndex)) {
    return mean(
      ...sortedNumbers.slice(
        middleIndex - AROUND_INDEX,
        middleIndex + AROUND_INDEX,
      ),
    )
  }

  return sortedNumbers[Math.floor(middleIndex)]
}

export function mode(...values) {
  const occurrences = values.reduce((acc, value) => {
    acc[value] = acc[value] ?? NO_OCCURRENCES
    acc[value]++
    return acc
  }, {})

  return Object.entries(occurrences).reduce(
    (acc, [value, occurrences]) => {
      if (occurrences > acc.occurrences) {
        acc = { value, occurrences }
      }
      return acc
    },
    { occurrences: 0 },
  ).value
}
