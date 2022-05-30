"use strict";
//Chức năng tìm kiếm
const findBtn = document.getElementById("find-btn");
//Chọn các phần tử
const idEl = document.getElementById("input-id");
const nameEl = document.getElementById("input-name");
const ageEl = document.getElementById("input-age");
const typeEl = document.getElementById("input-type");
const weightEl = document.getElementById("input-weight");
const lengthEl = document.getElementById("input-length");
const breedEl = document.getElementById("input-breed");
const vaccinatedEl = document.getElementById("input-vaccinated");
const dewormedEl = document.getElementById("input-dewormed");
const sterilizedEl = document.getElementById("input-sterilized");
const tbodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");


//Thêm animation cho sidebar mỗi khi click vào sidebar 
sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
    sidebarEl.classList.toggle("animated");
    sidebarEl.classList.toggle("slideInLeft");
  });
  

//Tạo hiển thị ban đầu
const init = function () {
    idEl.value = "";
    nameEl.value = "";
    ageEl.value = "";
    typeEl.value = "";
    weightEl.value = "";
    lengthEl.value = "";
    colorEl.value = "";
    breedEl.value = "";
    vaccinatedEl.checked = false;
    dewormedEl.checked = false;
    sterilizedEl.checked = false;
  };

//Lấy breed từ storage
const petBreed = getFromStorage("breedArr") || [];
//Hiển thị breed ra select
const renderBreed = function(petBreed) {
  breedEl.innerHTML = `<option value="">Select breed</option>`;
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedEl.appendChild(option);
  }
};
renderBreed(petBreed);
let searchArr = [];
function searchPet(){
    let petArr = getFromStorage("petArr");
   //Tìm kiếm thú cưng có chữ cái trong id giống nhau
    if(idEl.value.length > 0){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].ID.toLowerCase().includes(idEl.value.toLowerCase())){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng có chữ cái trong name giống nhau
    if(nameEl.value.length > 0){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].name.toLowerCase().includes(nameEl.value.toLowerCase())){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng có type giống nhau
    if(typeEl.value.length > 0){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].type.toLowerCase().includes(typeEl.value.toLowerCase())){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng có breed giống nhau
    if(breedEl.value.length > 0){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].breed.toLowerCase().includes(breedEl.value.toLowerCase())){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng đã được tiêm phòng
    if(vaccinatedEl.checked){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].vaccinated == true){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng đã được động vật
    if(dewormedEl.checked){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].dewormed == true){
                searchArr.push(petArr[i]);
            }
        }
    }
    //Tìm kiếm thú cưng đã được động vật
    if(sterilizedEl.checked){
        for(let i = 0; i < petArr.length; i++){
            if(petArr[i].sterilized == true){
                searchArr.push(petArr[i]);
            }
        }
    }
}

function renderTableData(x) {
    tbodyEl.innerHTML = "";
    for (let i = 0; i < x.length; i++) {
      let vaccinatedText = x[i].vaccinated
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";
      let dewormedText = x[i].dewormed
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";
      let sterilizedText = x[i].sterilized
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";
      const row = document.createElement("tr");
      row.innerHTML = `<th scope = "row"> ${x[i].ID}</th>
        <td>${x[i].name}</td>
        <td>${x[i].age}</td>
        <td>${x[i].type}</td>
        <td>${x[i].weight} kg</td>
        <td>${x[i].length} cm</td>
        <td>${x[i].breed}</td>
        <td>
        <i class="bi bi-square-fill" style="color: ${x[i].color}"></i>
        </td>
        <td><i class="${vaccinatedText}"></i></td>
        <td><i class="${dewormedText}"></i></td>
        <td><i class="${sterilizedText}"></i></td>
        <td>${x[i].date}</td>`;
      tbodyEl.appendChild(row);
    }
  }
    findBtn.addEventListener("click", function(){
        tbodyEl.innerHTML = "";
        searchPet();
        renderTableData(searchArr);
        //tìm kiếm mới thì xóa kết quả tìm kiếm cũ
        searchArr = [];
        //xóa input
        idEl.value = "";
        nameEl.value = "";
        typeEl.value = "";
        breedEl.value = "";
        vaccinatedEl.checked = false;
        dewormedEl.checked = false;
        sterilizedEl.checked = false;
        
    });
    