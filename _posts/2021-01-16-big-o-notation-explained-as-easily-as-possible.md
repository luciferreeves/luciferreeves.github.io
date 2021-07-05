---
layout: post
title:  "Big O Notation - explained as easily as possible"
date:   2021-01-16 00:00:00 +0530
author: Priyansh
tags: data-structures algorithms computer-science
usemathjax: true
---
{% include math.html %}

Data Structures and Algorithms is about solving problems efficiently. A bad programmer solves their problems inefficiently and a really bad programmer doesn't even know why their solution is inefficient. So, the question is, *How do you rank an algorithm's efficiency?*

> If you want to learn the math involved with the Big O, read  [Analysing Algorithms: Worst Case Running Time](../analysing-algorithms-worst-case-running-time).

The simple answer to that question is the **Big O Notation**. How does that work? Let me explain!

Say you wrote a function which goes through every number in a list and adds it to a *total_sum* variable.

![Screenshot 2021-01-16 at 2.02.19 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1610785957976/1d53AER34.png)

If you consider "addition" to be 1 operation then running this function on a list of 10 numbers will cost 10 operations, running it on a list of 20 numbers costs 20 operations  and similarly running it on a list of n numbers costs the *length of list* (n) operations.

![Screen Recording 2021-01-16 at 2.01.09 PM.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1610786373466/WWOOmyjH9.gif)

Now let's assume you wrote another function that would return the first number in a list.

![Screenshot 2021-01-16 at 2.09.39 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1610786595803/WcObNzV40.png)

Now, no matter how large this list is, this function will never cost more than one operation. Fairly, these two algorithms have different **time complexity** or *relationship between growth of input size and growth of operations executed*. We communicate these time complexities using ***Big O Notation***.

> Big O Notation is a mathematical notation used to classify algorithms according to how their run time or space requirements grow as the input size grows.

Referring to the complexities as *'**n**'*, common complexities (ranked from good to bad) are:

- Constant - **O(1)**
- Logarithmic **O(log n)**
- Linear - **O(n)**
- n log n - **O(n log n)**
- Quadratic - **O(n²)**
- Exponential - **O(2ⁿ)**
- Factorial - **O(n!)**

![Screenshot 2021-01-16 at 2.23.08 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1610787546688/SufUcCJVY.png)

Our first algorithm runs in *O(n)*, meaning its operations grew in a linear relationship with the input size - in this case, the amount of numbers in the list. Our second algorithm is not dependent on the input size at all  - so it runs in constant time. 
Let's take a look at how many operations a program has to execute in function with an input size of *n = 5 vs n = 50*.

|                | n = 5 | n = 50           |
|----------------|-------|------------------|
| **O(1)**       | 1     | 1                |
| **O(log n)**   | 4     | 6                |
| **O(n)**       | 5     | 50               |
| **O(n log n)** | 20    | 300              |
| **O(n²)**      | 25    | 2500             |
| **O(2ⁿ)**      | 32    | 1125899906842624 |
| **O(n!)**      | 120   | 3.0414093e+64    |

It might not matter when the input is small, but this gap gets very dramatic as the input size increases. 

![Screen Recording 2021-01-16 at 2.33.46 PM.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1610788579877/ejJP5RkiF.gif)

If n were 10000, a function that runs in *log(n)* would only take 14 operations and a function that runs in *n!* would set your computer on fire!

For Big O Notation, we *drop constants* so *O(10.n)* and *O(n/10)* are both equivalent to *O(n)* because the graph is still linear. 

![Screenshot 2021-01-16 at 2.47.52 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1610788828910/JYXeRjI-G.png)

Big O Notation is also used for **space complexity**, which works the same way - *how much space an algorithm uses as n grows* or *relationship between growth of input size and growth of space needed*.

So, yeah! This has been the simplest possible explanation of the Big O Notation from my side and I hope you enjoyed reading this. If you found this information helpful, share it with your friends on different social media platforms. It really motivates me to write more. And If you REALLY liked the article, consider [buying me a coffee](https://ko-fi.com/luciferreeves) 😊

***Happy Programming!***
