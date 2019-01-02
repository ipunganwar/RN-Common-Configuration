export default function(text) {
  let returnedText = []
  for(let i = 0;i < text.length; i++) {
    returnedText.push(text[i])
    if (i != text.length - 1)
      returnedText.push(' ')
  }
  return returnedText.join('')
}
