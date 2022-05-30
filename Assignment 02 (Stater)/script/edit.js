"use strict";
//Chọn các phần tử
const idEl = document.getElementById("input-id");
const nameEl = document.getElementById("input-name");
const ageEl = document.getElementById("input-age");
const typeEl = document.getElementById("input-type");
const weightEl = document.getElementById("input-weight");
const lengthEl = document.getElementById("input-length");
const colorEl = document.getElementById("input-color-1");
const breedEl = document.getElementById("input-breed");
const vaccinatedEl = document.getElementById("input-vaccinated");
const dewormedEl = document.getElementById("input-dewormed");
const sterilizedEl = document.getElementById("input-sterilized");

const btnSubmit = document.getElementById("submit-btn");
const btnHealthy = document.getElementById("healthy-btn");
const btnEdit = document.getElementsByClassName("btn-warning");

const tbodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");
const formEl = document.getElementById("container-form");

// Chỉnh hiển thị ngày
let today = new Date();
let d = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
today = `${d}/${mm}/${yyyy}`;

//Thêm animation cho sidebar mỗi khi click vào sidebar 
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
  sidebarEl.classList.toggle("animated");
  sidebarEl.classList.toggle("slideInLeft");
});


// tạo hiển thị ban đầu
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

renderTableData(petArr);
//Thêm animation cho sidebar
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.remove("active");
});

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
<td>${x[i].date}</td>
<td>
  <button type="button" class="btn btn-warning">Edit</button>
</td>`;
    tbodyEl.appendChild(row);
  }
}


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
//Lọc breed
typeEl.addEventListener("change", function () {
  const optionValue = petBreed.filter(function (item) {
    if(typeEl.value === "Dog") return item.typeBreed === "Dog";
    if(typeEl.value === "Cat") return item.typeBreed === "Cat";
    if(typeEl.value === "Select Type") return item.typeBreed === "";
  });
  renderBreed(optionValue);
  });


//Nhấn vào nút edit
tbodyEl.addEventListener("click", function (e) {
    const petArr = getFromStorage("petArr") || [];
    //Xóa class hide cho form
    formEl.classList.remove("hide");
    //các giá trị của input sẽ là giá trị hiện tại của thú cưng đó:
    idEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].ID;
    nameEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].name;
    ageEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].age;
    typeEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].type;
    weightEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].weight;
    lengthEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].length;
    breedEl.value = petArr[e.target.parentElement.parentElement.rowIndex - 1].breed;
    vaccinatedEl.checked = petArr[e.target.parentElement.parentElement.rowIndex - 1].vaccinated;
    dewormedEl.checked = petArr[e.target.parentElement.parentElement.rowIndex - 1].dewormed;
    sterilizedEl.checked = petArr[e.target.parentElement.parentElement.rowIndex - 1].sterilized;
}
);

//Submitt
btnSubmit.addEventListener("click", function (e) {
  //tìm pet cần sửa trong petArr dựa vào id
  const petArr = getFromStorage("petArr") || [];
  const pet = petArr.find(function (item) {
    return item.ID === idEl.value;
  }
  );
  //sau khi Cập nhập lại thong tin của pet tìm thấy trong petarr, lưu lại vào localstorage
  pet.name = nameEl.value;
  pet.age = ageEl.value;
  pet.type = typeEl.value;
  pet.weight = weightEl.value;
  pet.length = lengthEl.value;
  pet.color = colorEl.value;
  pet.breed = breedEl.value;
  pet.vaccinated = vaccinatedEl.checked;
  pet.dewormed = dewormedEl.checked;
  pet.sterilized = sterilizedEl.checked;
  //Hiển thị ngày/tháng/năm
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  pet.date = `${date}/${month}/${year}`;
  //lưu lại
  savePetToStorage(petArr);
  //render lại table
  renderTableData(petArr);
  //ẩn form
  formEl.classList.add("hide");
});

