const greeting = name => {
  return `Hello, ${name}. How are you today?`;
};

console.log(greeting("Sunshine"));

// const arr = [1,2,3,4,5];

// const [first, second] = arr;

// console.log(first);

// const map = [1,2,3].map((x) => {
//   const y = x + 1;
//   return x * y;
// });

// console.log(map);

// const arrLike = {0: "aaa", 1: "bbb", 2: "ccc"};

// arrLike.length = Object.keys(arrLike).length;
// console.log(arrLike);

// const arr = Array.from(arrLike);

// console.log(arr);


// const a = [1,2];
// const b = a;

// console.log(a);
// console.log(b);

// { let c = 1;
//   const d = 2;
//   var e = 3;
// }

// console.log(c);
// console.log(d);
// console.log(e);

// const items = [1,2,3,4,5];

// const itemsCopy1 = [];

// for (let i = 0; i < items.length; i += 1) {
//   itemsCopy1[i] = items[i];
// }

// const itemsCopy2 = [...items];
