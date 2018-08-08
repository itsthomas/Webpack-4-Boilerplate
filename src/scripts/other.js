const addFn = (a, b) => console.log(a + b);

const nameFn = (x) => console.log(x);

export { addFn, nameFn };

// Just a test
const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
iAmJavascriptES6();

// Testing if spread operator is workig
const user = {
  id: 1,
  name: 'John from other.js',
};

const advancedUser = {
  ...user, // Adding all user properties to advancedUser object
  age: 26,
};

console.log(advancedUser);
