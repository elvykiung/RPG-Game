# RPG Game- Star War Theme

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Deployment](#Deployment)
- [Code Overview](#Code-Overview)

## General info

This is an apps allow user to play simple RPG game of with the theme of Star War. User can choose their favorite character and the game will be dynamically update HTML pages by using jQuery library.

![screenshot](assets/images/final.gif)

## Technologies

Project is built with:

- JavaScript
- JQuery
- Bootstrap
- HTML 5 & CSS 3

## Deployment

- Live link: https://elvykiung.github.io/RPG-Game/
- Portfolio link: https://elvykiung.github.io/

## Code Overview

### Summary

1. Creating an array object for available characters.
2. On click of user choose character, using `.this` to determine the user chose character and append it to the html element
3. Find out available attack characters with if statement and append it to its html element
4. If defender not equal to undefined i.e defender have chosen, do nothing for on click function, otherwise using `.this` to find out which characters user choose as defender and append to html element
5. Create calculation for attack point and hp point and render the result when user click attack on html element

### JavaScript Function explain

```
  //make a function to find whats the characters that been clicked

  function charFinder(name) {
    for (var i = 0; i < avilableChar.length; i++) {
      if (name === avilableChar[i].name) {
        return avilableChar[i];
      }
    }
  }
```
