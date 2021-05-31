/*******************************************************************************
 * Author: Tyler Swindell
 * Date: May 30, 2021
 * Updates: 
 *    May 30: Built out List object, constructor, addItem, resetHTMLElements,
 *            removeItem, getItems and updateItems methods.
 *    May 31: Now adds 'click' eventListener to each item as it is updated.
 *            Added listItemTags to contructor 
 *            for easy access to tags used for li elems
 *******************************************************************************/
(function(){

   'use strict';

   /* Constants */
   const TEST = console.log;

   /* List Object Definition */
   class List {
      constructor(name, listElem, listInputElem, listItemTags) {
         this.name = name;
         this.items = [];
         this.listElem = listElem;
         this.listInputElem = listInputElem;
         this.listItemTags = listItemTags;
      }

      addItem(content) { 
         this.items.push(content); 
         this.updateList(this.listItemTags);
      }

      resetHTMLElements() {
         this.listInputElem.value = '';
         this.listElem.innerHTML = '';
      }

      removeItem(e) {
         const eTargetText = e.target.innerText;
         const listIndex = eTargetText.split(":")[0] - 1;
         this.items.splice(listIndex, 1);
         this.updateList(this.listItemTags);
      }

      getItems() { return this.items; }

      updateList() { 
         this.resetHTMLElements();
         this.items.forEach((item, index) => {
            this.listElem.innerHTML += `<li id="item${index+1}">
               <span class="list-number">${index+1}:</span>${item}</li>`;
            this.addRemoveOption(this.listItemTags);      
         });
      };

      addRemoveOption() { 
         const listItems = document.querySelectorAll(this.listItemTags); 
         listItems.forEach( item => item.addEventListener('click', e => this.removeItem(e) ));
      }
   }
   
   // Initializes script after DOM loads
   document.addEventListener('DOMContentLoaded', init);

   // Main driver function
   function init() {
      /* HTML Elements */
      const listElem = document.getElementById("list");
      const inputElem = document.getElementById("input-list-item");
      const addButton = document.getElementById("add-to-list");
      const blankInputElem = document.getElementById("blank");
      const LIST_ITEM_TAGS = '#list>li';

      // Main list object
      const toDoList = new List("To Do List", listElem, inputElem, LIST_ITEM_TAGS);

      /* Event Listeners */

      // "Add" button click
      addButton.addEventListener('click', (e) => { 
         if(!isBlankInput(inputElem, blankInputElem)) toDoList.addItem(inputElem.value);
      });

      // Keypress "Enter" on text input area
      inputElem.addEventListener('keydown', (e) => { 
         if (checkIfEnter(e, inputElem, blankInputElem)) { toDoList.addItem(inputElem.value); }
      });
   }

   /* Returns true if event the keydown code is "enter" and isBlankInput returns false*/
   const checkIfEnter = (e, inputElem, blankInputElem) => { 
      return e.code.toLowerCase() === "enter" && !isBlankInput(inputElem, blankInputElem); 
   }

   /* Returns true is text input area is blank, false if contains content */
   const isBlankInput = (inputElem, errorElem) => {
      let isBlank = true;
      if (!inputElem.value) errorElem.className = "visible";       
      else {
         errorElem.className = "hidden";
         isBlank = false;
      }
      return isBlank;
   }

})();