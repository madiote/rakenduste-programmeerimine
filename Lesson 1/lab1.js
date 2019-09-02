/**
 * Task 1
 *
 * Sums an array
 */
export const simpleArraySum = xs => {
  let sum = 0;
  xs.forEach(element => {
    sum += element;
  });
  return sum;
};

/**
 * Task 2
 *
 * Reverses a string
 */
export const reverseString = word => {
  // https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/
  let splitString = word.split("");
  let reverseArray = splitString.reverse();
  let joinArray = reverseArray.join("");
  return joinArray;
};

export const Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

/**
 * Task 3
 *
 * Generates a random item list
 *
 * @method
 * @param {number} n - Number of items generated
 * @return {Array.<{name: string, cost: number, size: "small" | "medium" | "large" }>} items
 */
export const generateRandomItemList = n =>{
  let randomList = [];
  for (let i = 0; i < n; i++) {
    const name = Math.random().toString(36).substring(7);
    const cost = Math.floor(Math.random() * 101);
    const size = Object.keys(Size)[Math.floor(Math.random() * (3 - 0)) + 0];
    randomList.push({name, cost, size});
  }
  return randomList;
};

/**
 * Task 4
 */
export  const findMostExpensiveItem = items => {
  items.sort(function (a, b) {
      return b.cost - a.cost;
  });
  return items[0];
};

/**
 * Task 5
 */
export const findCheapestItem = items => {
  items.sort(function (a, b) {
    return a.cost - b.cost;
});
return items[0];
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

