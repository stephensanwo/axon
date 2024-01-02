/*
 Regular expression to match a URL
 Test the input string against the pattern
*/
export function isValidURL(url: string) {
  var pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  return pattern.test(url);
}
