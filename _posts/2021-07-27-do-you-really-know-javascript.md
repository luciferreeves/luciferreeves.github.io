---
layout: post
title:  "Do You Really Know JavaScript?"
date:   2021-07-27 00:00:00 +0530
author: Priyansh
tags: programming javascript computer-science
usemathjax: false
---

A lot has changed in the world of JavaScript – whether you are a newbie or an expert in JavaScript, you might not be able to get a hold on all the things that are possible in JavaScript. JavaScript is a lot more than you think and having some nifty ES6 tricks on your fingers could really save you both time and code complexity. 

I'm going to cover a few things you should be absolutely be using on a daily basis while you are programming in JavaScript and if you are serious about a future in JavaScript development, you will find these a really good add-on to your current knowledge. So, in order to explain things a lot better, we are going to cover this lesson through two versions of examples – one, the way people regularly write code – which is correct but inefficient and the second, the awesome way.

So, let's start!

## 1. The Spread Operator

Okay, here's the task we wan't to accomplish - There are two arrays called 'array1' and 'array2' (Not so good names but I wasn't able to come up with something really good. So, I guess that's a drat!) We want to push all the elements of array1 to array2. So, how do we achieve it?

### The Amatuer Way -

```js
let array1 = ["one", "two"];
let array2 = ["three", "four"];

for(var i=0; i<array1.length; i++) {
  array2.push(array1[i]);
}
```

Hmm, the above code does it, doesn't it? Yeah but wait till you look at the awesome way!

### The Awesome Way -

```js
let array1 = [ 'one', 'two'];
let array2 = ['three', 'four', ...array1];
```

Woah, that was really awesome. It made things really simple. So, now that you're thinking what's that three dots? Those three dots is called a **spread operator** and is represented by `...` before an object or an array and it turns something from being a structure into a comma-separated list!

So, now that we tackled arrays, we can use the same syntax for targeting objects.

```js
const hero = {
  name: 'Naruto',
  jutsu: 'Shadow Clone Jutsu'
}

const heroWithAdditionalJutsu = {
  ...hero,
  additionalJutsu: 'Rasengan'
}
```

## 2. String Interpolation

Have you ever tried to **concatenate** multiple strings in JavaScript which has a lot of different variables? Take a look at the `getDescription()` method below – it's a long, multiline, hard-to-read statement. This is a reality in most programming languages.

### The Amatuer Way -

```js
class Product {
 constructor(name, description) {
   this.name = name;
   this.description = description;
 }

 getDescription() {
   return " Full description \n" + 
   " name: " + this.name + 
   " description: " + this.description
 }
}
```

With a little nifty trick, We can turn our `getDescription()` method into the following:

### The Awesome Way -

```js
getDescription() {
  return `Full description \n: 
  name: ${this.name}
  description ${this.description}
  `;
}
```
So double backticks (`` ` ``) is what we use to define a multi-line string. We are also able to use `${}` to **interpolate**. There it is! Hopefully, your world is a little better now :)

## 3. Shorthand Properties

If you ever wanted to return a JSON object in your code, you're probably doing this:

### The Amatuer Way -

```js
function returnCoordinates(x, y) {
  return {
    x: x,
    y: y
  }
}
```

But, did you know if your property names and the variable names are the same, you can completly omit the `:` and you would end up in this:

### The Awesome Way -

```js
function returnCoordinates(x, y) {
  return { x, y }
}
```

You can use the similar approach while you are defining **method properties**. So, something like this: 

```js
const mathFunctions = {
  add: function(a,b) { return a + b; },
  sub: function(a,b) { return a - b; }, 
  multiply: function(a,b) { return a * b; }
}
```

Would become this:

```js
const mathFunctions = {
  add(a,b) { return a + b; },
  sub(a,b) { return a - b; },
  multiply(a,b) { return a * b; }
}
```

Awesome, isn't it? ;)

## 4. Destructuring

Have you ever encountered a case where we want to dig out data from an object at different levels and you probably end up doing something like this?

### The Amatuer Way -

```js
const name = req.body.name;
const description = req.body.description;
const url = req.url;
```

Just think of the situation where you might have 20 or even worse case scenario, 50 objects like this. You won't go up writing 50 lines of code, right? Fortunately **Destructuring** is here to save you. All of the above operation could be performed in a single line of code.

### The Awesome Way -

```js
const { body: { name, description }, url }, = req;
```

Yeah! That's it boy!

## 5. Promises & Async/Await

If you have been around the block a while you might remember a time when callbacks were all we had, like this:

### The Amatuer Way -

```js
function doSomething(cb) {
  setTimeout(() =>  {
    cb('done')
  }, 3000)
}

doSomething((arg) => {
 console.log('done here', arg);
})
```

We used this to handle the fact that some operations were asynchronous and simply took time to finish. Then we got promise libraries that people started using and eventually, we got native support in the language. So now we can do things like:

### A Little Better But Still Amatuer Way -

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() =>  {
      resolve('done')
    }, 3000)
  })
}

doSomething().then(arg => {
 console.log('done here', arg);
})
```

We can even chain the whole experience so we can do calls like this:

```js
getUser()
  .then(getOrderByUser)
  .then(getOrderItemsByOrder)
  .then(orderItems => {
    // do something with order items
  })
```

Then we got **async/await** and life became even more glorious. Consider the above example with **Promises** now becoming this:

### The Awesome Way -

```js
async function getItems() {
  try {
    const user = await getUser();
    const order = await getOrderByUser(user);
    const items = await getOrderItemsByOrder(order);
    return items;
  } catch(err) {
    // handle error here, the suggestion to return something or rethrow
  }
}

getItems().then(items => {
  // do something with order items
})
```

And we get a synchronous-looking asynchronous code. Heck, yeah! :)

## Summary

There are more things I could mention about **ES6** and forward but I just wanted to show you a few of my favorites. I hope you have learnt something great today that I think you should adopt and bring these into practice. I also hope you continue to expand your knowledge of JavaScript and create something great someday!

Well, that's it for this article guys! If you found this information helpful, share it with your friends on different social media platforms. It really motivates me to write more. And If you REALLY liked the article, consider [buying me a coffee](https://ko-fi.com/luciferreeves) 😊
