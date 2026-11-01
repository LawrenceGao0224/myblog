---
title: Red Hat Certified System Administrator (RHCSA8)
description: My first hands-on certification exam
published: '2022-05-06T21:04:33+08:00'
slug: rhcsa
cover: ./Red-Hat-logo.png
tags:
- Work
category: Work
toc: true
---
> I can accept failure, but cannot accept giving up
> It took me two tries to pass


# About RHCSA
The RHCSA certification was launched by Red Hat in March 2011. RHCSA is one of the requirements for earning the RHCE certification. The two can be taken in any order, and you need to pass both to get the full RHCE certificate. RHCSA holders can take on all kinds of roles in a company, such as database administrator, developer, and technical support. They can rebuild and deploy an enterprise's core Linux environment, and the certification shows you have solid admin skills and command of the system. To earn the RHCSA you need to pass the certification exam, and passing it makes you a Linux expert with both the theory and the hands-on skills.
[(Source: UCOM)](https://www.uuu.com.tw/Course/Partner/RedHat%E7%B4%85%E5%B8%BD/section=rhcsa/title=RHCSA%E8%AA%8D%E8%AD%89%E8%88%87%E8%80%83%E8%A9%A6%E4%BB%8B%E7%B4%B9)

# Skills Tested
Check the official site: [Red Hat Certified System Administrator (RHCSA) exam](https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam?section=Objectives)

# Practice Questions

Practice questions collected online: [https://github.com/chlebik/rhcsa-practice-questions/tree/master/questions](https://github.com/chlebik/rhcsa-practice-questions/tree/master/questions)

Starting with Red Hat 8, the exam includes a lot of container questions, for example: [https://tekneed.com/rhcsa-8-exam-practice-question-9-managing-containers/](https://tekneed.com/rhcsa-8-exam-practice-question-9-managing-containers/)

# The Exam Environment
You get two virtual machines, node1 and node2. (I recommend opening terminals and connecting to both VMs, so it's easier to copy the URLs and names you need during the exam.)

# Takeaways

1. You really have to practice hands-on over and over. Just reading isn't enough, because problems you never imagined can come up.
2. During my exam, I created a user as root, but the user's home directory never got created. It turned out the system hadn't been set up properly, but I didn't report it and ended up wasting almost an hour
3. The container questions were honestly kind of hard. I have no idea why I didn't get any points on them, since I did them all
4. After partitioning a disk, always reboot to check that the system still boots and that everything mounts automatically
5. If something seems off, speak up. It might really be a problem with the system
