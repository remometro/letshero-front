const plural = (words, count) => {
  words = words.split('|').map(x => x.trim())
  return count > 1 ? words[2].replace('{n}', count) : words[count]
}
export const validationMessageCreators = {
  required: () => 'Required',
  email: () => 'Invalid email',
  txtMinLen: ({ $params }) => {
    const min = plural(
      'no characters | one character | {n} characters',
      $params.txtMinLen.min
    )
    return `Must be at least ${min}`
  }
}
