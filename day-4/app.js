// Arrow function
// const add = (a, b) => a+b;
// const minus=(a,b)=>a-b;
// const multply=(a,b)=>a*b;
// const divide=(a,b)=>a/b;
// const opt=(a,b,operation)=>operation(a,b);
// const result=opt(5,3,add);
// const result1=opt(5,3,minus);
// const result2=opt(5,3,multply);
// const result3=opt(5,3,divide);
// console.log(result);
// console.log(result1);
// console.log(result2);
// console.log(result3);

// const res=prompt("Enter the age:");
// console.log(typeof res);
// console.log(typeof Number(res));
// console.log(parseInt(res));

// Array methods -- String poll
// const number1=new Array(1,2,3,4,5);
// const number1=[1,2,3,4,5];
// const number2=[1,2,3,4,5];
// console.log(number1===number2);

// let number1=[];
// number1.push(1);
// number1.push(2);
// number1.push(3);
// number1.push(4);
// number1.push(5);


// number1.unshift(3);
// number1.shift();

// console.log(number1);

// slice method
let myarr=[1,2,3,4,5,6,7,8,9,10];
let myarr2=myarr.slice(2,5);
console.log(myarr2); // [3,4,5]
console.log(myarr); // [1,2,3,4,5,6,7,8,9,10]

// splice method
let myarr3=[1,2,3,4,5,6,7,8,9,10];
let myarr4=myarr3.splice(2,5); // 5 is number of element to be removed
console.log(myarr3); // [1,2,8,9,10] -- 3,4,5,6,7 are removed
console.log(myarr4); // [3,4,5,6,7]

console.log(myarr3); // [1,2,8,9,10]
