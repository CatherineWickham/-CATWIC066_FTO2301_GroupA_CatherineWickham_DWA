/* eslint-disable no-console */
/* eslint-disable arrow-body-style */

// PART 1

const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

// Exercise 1.1
// Use forEach to console log each name to the console. You are allowed to call
// console.log seven times.

names.forEach((singleName) => {
  console.log(singleName);
});

// Exercise 1.2
// Use forEach to console log each name with a matching province (for example Ashwin
// (Western Cape). Note that you are only allowed to call console.log seven times.

names.forEach((singleName, index) => {
  console.log(`${singleName} (${provinces[index]})`);
});

// Exercise 1.3
// Using map loop over all province names and turn the string to all uppercase. Log the
// new array to the console.

const uppercaseProvinces = provinces.map((singleProvince) =>
  singleProvince.toUpperCase()
);
console.log(uppercaseProvinces);

// Exercise 1.4
// Create a new array with map that has the amount of characters in each name. The result
// should be: [6, 9, 11, 5, 8, 7, 7]

const numberCharacters = names.map((singleName) => singleName.length);
console.log(numberCharacters);

// Exercise 1.5
// Using toSorted to sort all provinces alphabetically.

const sortedProvinces = provinces.toSorted();
console.log(sortedProvinces);

// Exercise 1.6
// Use filter to remove all provinces that have the word Cape in them. After filtering the
// array, return the amount of provinces left. The final value should be 3

const filteredProvinces = provinces.filter(
  (singleProvince) => !singleProvince.includes("Cape")
);
console.log(filteredProvinces);
console.log(filteredProvinces.length);

// Exercise 1.7
// Create a boolean array by using map and some to determine whether a name contains an S
// character. The result should be [true, true, false, true, false, true, false]

const containsLetterS = names.map((singleName) => {
  const nameAsLettersArray = singleName.split("");
  return nameAsLettersArray.some((letter) => letter.toLowerCase() === "s");
});
console.log(containsLetterS);

// Exercise 1.8
// Using only reduce, turn the above into an object that indicates the province of an
// individual.

const reduceCallback = (accumulator, current, index) => {
  const obj = {
    ...accumulator,
    [current]: provinces[index],
  };
  return obj;
};

const result = names.reduce(reduceCallback, {});
console.log(result);

// PART 2

const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// Exercise 2.1
// Use forEach to console.log each product name to the console.

console.log(
  products.forEach((item) => {
    console.log(item.product);
  })
);

// Exercise 2.2
// Use filter to filter out products that have a name longer than 5 characters

console.log(products.filter((item) => item.product.length <= 5));

// Exercise 2.3
// Using both filter and map. Convert all prices that are strings to numbers, and remove
// all products from the array that do not have prices. After this has been done then use
// reduce to calculate the combined price of all remaining products.

console.log(
  products
    .map((item) => {
      return {
        ...item,
        price: Number(item.price),
      };
    })
    .filter((item) => item.price > 0)
    .reduce((acc, current) => {
      return acc + current.price;
    }, 0)
);

// Exercise 2.4
// Use reduce to concatenate all product names to create the following string: banana,
// mango, potato, avocado, coffee and tea.

console.log(
  products.reduce((acc, current, index, array) => {
    if (index === 0) {
      return `${current.product}`;
    }
    if (index === array.length - 1) {
      return `${acc} and ${current.product}`;
    }
    return `${acc}, ${current.product}`;
  }, "")
);

// Exercise 2.5
// Use reduce to calculate both the highest and lowest-priced items. The names should be
// returned as the following string: Highest: coffee. Lowest: banana.

console.log(
  products.reduce(
    (acc, current, index, array) => {
      const resultObj = acc;

      if (index === array.length - 1) {
        return `Highest: ${resultObj.highest.product}. Lowest: ${resultObj.lowest.product}`;
      }

      if (Number(current.price) === 0) {
        return resultObj;
      }

      if (Number(acc.highest.price) < Number(current.price)) {
        resultObj.highest.product = current.product;
        resultObj.highest.price = current.price;
      }
      if (Number(acc.lowest.price) > Number(current.price)) {
        resultObj.lowest.product = current.product;
        resultObj.lowest.price = current.price;
      }
      return resultObj;
    },
    {
      highest: {
        product: products[0].product,
        price: products[0].price,
      },
      lowest: {
        product: products[0].product,
        price: products[0].price,
      },
    }
  )
);

// Exercise 2.6
// Using only Object.entries and reduce recreate the object with the exact same values.
// However, the following object keys should be changed in the new array:
// - product should be changed to name
// - price should be changed to cost

console.log(
  products.reduce((acc, current) => {
    const newObj = {
      name: Object.entries(current)[0][1],
      cost: Object.entries(current)[1][1],
    };

    const newArray = [...acc, newObj];

    return newArray;
  }, [])
);
