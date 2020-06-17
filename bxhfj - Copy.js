1. Write a JavaScript program to display the current day and time in the following format.
Today is : Tuesday.
Current time is : 10 PM : 30 : 38

2. Write a JavaScript program where the program takes a random integer between 1 to 10, the user is then prompted to input a guess number. If the user input matches with guess number, the program will display a message "Good Work" otherwise display a message "Not matched".

3. Write a function printN that takes a number n as argument and prints n rows as below

1
1 2 
1 2 3
1 2 3 4 
...
...
1 2 3 4 ... n

For example 
printN(5) should return

1
1 2 
1 2 3
1 2 3 4 
1 2 3 4 5

1.current date:

var date = new Date();
var options = { weekday: 'long' };

var hours = date.getHours();
 hours = hours % 12;
 hours = hours ? hours : 12;
 var ampm = hours >= 12 ? 'am' : 'pm';
var minutes = date.getMinutes();
var secs = date.getSeconds();
console.log("Today is:" + date.toLocaleDateString('en-US', options));
console.log("Current time is:" +hours+ampm +':'+minutes+ ':' +secs);

2:generating random string:
var num=prompt("Please provide a number");
     var r = Math.floor((Math.random() * 10) + 1);
        console.log(r)
  if (r == num) {
     console.log("good work");
  } else {
    console.log("not matched");
  }
  
3:printn
function printN(no) {
for(var m=1;m<=no;m++)
{
for(var n=1;n<=m;n++)
{
document.write(n+" ");
}
document.write("<br />");
}
}

printN(5);
