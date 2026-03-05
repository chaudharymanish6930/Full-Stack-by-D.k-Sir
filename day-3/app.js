// console.log("Hello World");
// console.log(11+"110");

// // console.log(age);

// name="Rohit";
// console.log(name);

// let age=22; // not goes on window object
// console.log(age);

// var city="Delhi"; // goes on window object
// console.log(city);

// let a=10;
// function sum(){
//     let b=20;
//     console.log(a+b);
// }
// sum();

const age = prompt("Enter your age");

if(age>=18){
    console.log("You are eligible to vote");
}else if(age<18 && age>=0){
    console.log("You are not eligible to vote");
}else{
    console.log("Invalid age");
}

let aiml=prompt("Enter your aim in life");
if(aiml.toLowerCase()==="ai"){
    console.log("You are interested in Artificial Intelligence");
}
else if(aiml.toLowerCase()==="ml"){
    console.log("You are interested in Machine Learning");
}

arr=[1,2,3,"mansih",5,67]
console.log(arr[3]);