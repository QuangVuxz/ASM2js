"use strict";

const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");

function savePetToStorage(petArr) {
  localStorage.setItem("petArr", JSON.stringify(petArr));
}
savePetToStorage(petArr);

function saveBreedToStorage(breedArr) {
  localStorage.setItem("breedArr", JSON.stringify(breedArr));
}
saveBreedToStorage(breedArr);


function getFromStorage(key) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

let deleteFromStorage = function (key) {
  localStorage.removeItem(key);
  };