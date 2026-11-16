---
title: "When the Whole Contradicts Its Parts: Simpson's Paradox"
date: 2026-11-15
categories:
  - Essays
tags:
  - statistics
  - probability
header:
  image: /assets/images/essays/simpsons-paradox-hospital-balance-scale.png
  teaser: /assets/images/essays/simpsons-paradox-hospital-balance-scale.png
---
As LLMs become increasingly capable, it progressively becomes tempting to delegate not just our work, but our thinking to them as well. Because of that, every now and then I enjoy revisiting fundamental ideas, challenging my intuition, and making sure I actually understand foundational concepts rather than simply accepting a convincing explanation.

One concept that came to my mind recently is **Simpson's paradox**. It's fairly simple once you understand it, but surprisingly deceptive before you do. It might sound like some obscure mathematical concept, but believe me when I say that it's worth knowing about even if you're not a data scientist. Why? Because we encounter averages, comparisons, and conclusions drawn from data all the time.

Let’s start with a simple example: Imagine, heavens forbid, that you need to go through a medical procedure. You need to choose a hospital for that, and naturally, you'd want to know which hospital has the better track record. So you google it, find published statistics, and you find that:

1. Hospital A has a success rate of 82%
2. Hospital B has a success rate of just 43%.

At first glance, it’s a no-brainer, Hospital A looks like the obvious choice, right? But suppose we now take a closer look at the data. Not all patients are alike, of course. Some arrive with relatively mild conditions, while others have much more severe cases. So, to make a fairer comparison, we examine the hospitals' success rates separately for each group.

Here's what we find:

| Patient severity | Hospital A | Hospital B |
| :---- | ----: | ----: |
| Mild cases | 81/90 (90%) | 19/20 (95%) |
| Severe cases | 1/10 (10%) | 24/80 (30%) |
| **All patients** | **82/100 (82%)** | **43/100 (43%)** |

But look at what happens when we separate the patients by severity. **Hospital B has a higher success rate for mild cases, and for severe cases**. Yet when we combine the two groups, Hospital A somehow comes out dramatically ahead. What the heck is going on? How can Hospital B do better in both groups, but so much worse overall?

This is a classic example of **Simpson's paradox**, a statistical phenomenon in which a trend observed within separate groups disappears, or even reverses, when those groups are combined. Let’s make this clear right now \- there's **no mathematical contradiction** here. Instead, the explanation lies in the proportions behind the averages.

Let’s take this slow: look again at the number of patients treated by each hospital:

- Hospital A: treated **90 mild** cases, and **only 10 severe** ones.
- Hospital B: treated **only 20 mild** cases, and **80 severe** ones.

So, Hospital A treated mostly patients with better prospects, while Hospital B treated mostly severe cases. That doesn’t feel like a fair comparison, does it? This boils down to what we define as “success”. If we look at what we did above, the overall success rate is a *weighted average*. Each group's success rate **contributes according to its proportion** of the hospital's patients. For Hospital A, 90% of its patients were mild cases, with a 90% success rate, while the remaining 10% were severe cases, with a 10% success rate. The combined result is:

$$
0.90 \times 0.90 + 0.10 \times 0.10 = 0.82
$$

For Hospital B, only 20% of patients were mild cases, with a 95% success rate, while 80% were severe cases, with a 30% success rate:

$$
0.20 \times 0.95 + 0.80 \times 0.30 = 0.43
$$

Let me emphasize again \- there’s no contradiction here. Both calculations are correct. They're just **summarizing very different populations**.

{% include simpsons-paradox-mixes.html %}

We can make Hospital A's apparent advantage disappear without changing either hospital's success rate within either group. We only need to change the proportion of mild and severe patients. Try it for yourself and see\!

This raises an important question: **which hospital is actually better?** The answer depends on what we mean by *better*.

If we're simply asking what proportion of each hospital's patients were treated successfully, the original figures are perfectly valid. Hospital A really did achieve an 82% success rate, compared with Hospital B's 43%.

But if we're trying to evaluate which hospital provides better care, those figures are potentially misleading. They reflect not only the hospitals' performance, but also the characteristics of the patients they treat.

## **How would a scientist deal with this?**

One way statisticians address this problem is through a technique called *standardization*. Instead of comparing hospitals treating different populations, we calculate what their success rates would look like if both treated the same hypothetical mix of patients.

Suppose each hospital treated a population consisting of 50% mild cases and 50% severe cases.

Hospital A's standardized success rate would be:

$$
0.50 \times 0.90 + 0.50 \times 0.10 = 0.50
$$

Hospital B's would be:

$$
0.50 \times 0.95 + 0.50 \times 0.30 = 0.625
$$

So under the same patient mix, Hospital A's standardized rate is 50%, while Hospital B's is 62.5%.

Now Hospital B comes out ahead, just as it does in each severity group.

{% include simpsons-paradox-standardized.html %}

We haven’t changed the underlying success rates. We've simply changed the question from “What happened to the patients each hospital treated?” to “What would we expect if both hospitals treated the same distribution of patients?” It's a different comparison, and it gives us a different answer.

Of course, this doesn't automatically prove that Hospital B provides better medical care. These are observed success rates, estimated from samples of different sizes, and other patient characteristics might explain some of the differences. Establishing that one hospital's treatment *causes* better outcomes would require a more careful analysis.

Still, the example shows how easy it is to draw the wrong conclusion from perfectly accurate numbers.

This isn't limited to medicine, of course. Imagine comparing two schools by their students' average test scores, without considering differences in their student populations. Or evaluating a company's sales growth without noticing that its product mix has changed. Or comparing treatment outcomes, employment statistics, or investment performance across groups with very different characteristics.

In each case, the overall figure might hide something important about the groups being combined.

## **How would a non-scientist deal with this?**

For statisticians, there are established techniques: stratification, standardization, regression, and other methods designed to account for differences between populations. But these methods require judgment: choosing which variables to account for is itself a scientific question, and adjusting for the wrong variables can sometimes make an analysis even more misleading.

For the rest of us regular folks, I think a useful starting point is to develop the habit of **asking a few simple questions** whenever we're presented with a statistical comparison:

1. Are the **populations** being compared actually comparable?
2. Could the result be driven by **differences in the composition** of those populations?
3. Does the statistic really answer **the question** we're trying to ask?

Until we all get a Neuralink fitted on our prefrontal cortex, we can't really run a statistical analysis every time we read a headline, but even asking those questions can help us notice when a comparison deserves a closer look.

What I like about Simpson's paradox is that none of the numbers has to be wrong. The mistake can be in the conclusion we draw from them. It’s easy to delegate thinking and accept digested conclusions when you’re bombarded with numbers. So let this be a reminder to take a moment and begin with a couple of simple questions \- what it is that we’re asking here, and do the numbers answer it?
