---
layout: post
title:  "Most Beautiful Question of Computer Science (+Math)"
date:   2021-02-02 00:00:00 +0530
author: Priyansh
tags: data-structures algorithms computer-science
usemathjax: true
---
{% include math.html %}

Most beautiful question? Is that a click bait? Well, of course it is — beauty is present in the mind of the perceiver and not in the outside world. (*Damn it! That's some life changing philosophy!*)

So, coming to the question again, today I am going to introduce you to one of my favourite and as I said most beautiful beginner friendly questions that you will encounter in Computer Science (and also Mathematics). You guys, ready? Here it goes:

![Most Beautiful CS Question](https://cdn.hashnode.com/res/hashnode/image/upload/v1611320141330/KdnW8eve7.png)

Now I really like this question because it sounds so absurd in the beginning, right? Its almost as if I am saying that I have 4 mangoes and I give 2 of them to John. Now calculate the mass of the sun! Anyways, you can stop reading here and try to solve it, but let go through the explanation of the solution for this question. 

So, the basic idea is to randomly draw points in a 1:1 square (a square with a side of unit length) or a 1:1 grid. Then, you can call the `random()` function twice, so you get two numbers and you can use one for the x-axis and one for the y-axis (*example: x = 0.2 and y = 0.6*) and you can generate a whole lot of these.

![Clip1-2.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1611321431022/UqsrECETD.gif)

So now, I am going to give you a hint. I am gonna draw something and you'll probably know how to do this. 
![Screenshot 2021-01-22 at 6.39.16 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1611321029637/mlunFD74o.png)

Got it? No? Let's elaborate a little more then! 

As you can see, the goal here is count all the points in the circle and count all the points in the square. The ratio between these numbers would be pretty close to the ratio between the total area of the circle and the area of the square. 

![Clip2-2.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1611321502293/0gf-_JlpD.gif)

So, how do you know if a point is in the circle or not? Well, it is very simple. You just take the distance between point and the origin and if it is smaller than 1, it is inside the circle. So, what would be the distance of a point at co-ordinates `(x, y)` from the origin? The distance is:

$$ distance = \sqrt{x^2 + y^2} $$

If the above distance is < 1 than it is inside the circle and if it is > 1 than it is outside the circle but still inside the square. So, now it's basic algebra from here. As we all know that the area of a circle is \\( \pi r^2 \\) (considering the radius of the circle is *r*) — oh, you didn't knew? Hmph, fucking idiot! And then, in this case, the area of the square will be \\( (2 \cdot r)^2 \\). And this ratio would be equal to the ratio of number to points in the circle and the total number of points.

$$ \frac{\pi r^2}{(2\cdot r)^2} = \frac{\mathrm{number\:of\:points\:in\:the\:circle}}{\mathrm{total\:number\:of\:points}} $$

Now we need value of \\( \pi \\), so that would be pretty easy as we know, \\( r = 1 \\) here. Therefore: 

$$ \pi = \frac{4 \cdot \mathrm{number\:of\:points\:in\:the\:circle}}{\mathrm{total\:number\:of\:points}} $$

So, yeah! That's pretty much it. Coding it should be pretty easy, so I am not going to go over that.

Wait! I changed my mind. I think I am going to show the code as it can explain things a *little* bit better. So, I am going to define a function called `estimate_pi` and it takes an input of `n` — n being how many points you want to put in — the more points the more accurate the result is. And then I will initialise the number of points in the circle and total number of points - both to zero. Mind that the code shown here is in python but you can easily translate it to any other language of your choice. 


```python
def estimate_pi(n):
  num_point_circle = 0
  num_point_total = 0
``` 

So, now we just want to keep looping and keep adding these points. So we loop over n times and on every iteration, we generate two random numbers x and y — and then we will calculate the \\( distance = \sqrt{x^2 + y^2} \\) but we can actually drop the square root because what we care about is if the distance is smaller than 1, and if you square root something smaller than 1, it would be smaller than 1 and if you square root something bigger than 1, it is going to be bigger than 1. So if the distance is smaller than 1, then it is inside the circle and we will increase `num_point_circle` by 1 and we would also increase `num_point_total` by 1, no matter what.

```python
def estimate_pi(n):
  num_point_circle = 0
  num_point_total = 0

for _ in range(n):
    x = random.uniform(0,1)
    y = random.uniform(0,1)
    distance = x**2 + y**2
    if distance <= 1:
      num_point_circle += 1
    num_point_total += 1
```

Finally you can return `return 4*num_point_circle/num_point_total` as your result and don't forget to import the `random` library. So the whole code looks like:

```python
import random

def estimate_pi(n):
  num_point_circle = 0
  num_point_total = 0
  for _ in range(n):
    x = random.uniform(0,1)
    y = random.uniform(0,1)
    distance = x**2 + y**2
    if distance <= 1:
      num_point_circle += 1
    num_point_total += 1

  return 4*num_point_circle/num_point_total
```

Here, you can see that I have run the `estimate_pi` function a few times with different sizes of n and as we use more and more data points, we get a value closer to actual pi. Although, it would be very hard to determine the exact value of pi. If you want to try the code for yourself, you can view my repl here:  [https://repl.it/@luciferreeves/SpottedTechnicalReality](https://repl.it/@luciferreeves/SpottedTechnicalReality) .
![Screenshot 2021-01-22 at 7.57.19 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1611329186302/_ceSUuJWt.png)

Well, that's it for this article guys! If you found this information helpful, share it with your friends on different social media platforms. It really motivates me to write more. And If you REALLY liked the article, consider [buying me a coffee](https://ko-fi.com/luciferreeves) 😊
