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
const btnDelete = document.getElementsByClassName("btn-danger");

const tbodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");

// Chỉnh hiển thị ngày
let today = new Date();
let d = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
today = `${d}/${mm}/${yyyy}`;

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
// Bắt sự kiện 'Click' vào nút Submit
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ các Input form
  const data = {
    ID: idEl.value,
    name: nameEl.value,
    age: parseInt(ageEl.value),
    type: typeEl.value,
    weight: parseInt(weightEl.value),
    length: parseInt(lengthEl.value),
    color: colorEl.value,
    breed: breedEl.value,
    vaccinated: vaccinatedEl.checked,
    dewormed: dewormedEl.checked,
    sterilized: sterilizedEl.checked,
    date: today,
  };
  // Hiển thị danh sách thú cưng
  let addPet = function () {
    const petArr = JSON.parse(localStorage.getItem("petArr"));
    petArr.push(data);
    //save to localStorage
    savePetToStorage(petArr);
    renderTableData(petArr);
  };

  // Validate dữ liệu hợp lệ
  // Kiểm tra ID không được trùng với các thú cưng còn lại
  let chk = false;
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    if (idEl.value === tbodyEl.rows[i].cells[0].textContent) {
      chk = true;
      break;
    }
  }
  // Kiểm tra các trường có bị nhập thiếu hay không
  if (chk) {
    alert("ID must unique!");
    return;
  } else if (idEl.value.trim().length === 0) {
    alert("Please add ID!");
    return;
  } else if (nameEl.value.trim().length === 0) {
    alert("Please add name of a pet!");
    return;
  } else if (ageEl.value.trim().length === 0) {
    alert("Please add age!");
    return;
  } else if (weightEl.value.trim().length === 0) {
    alert("Please add weight!");
    return;
  } else if (lengthEl.value.trim().length === 0) {
    alert("Please add length!");
    return;
  } else if (typeEl.selectedIndex === 0) {
    alert("Please select type!");
    return;
  } else if (breedEl.selectedIndex === 0) {
    alert("Please select breed!");
    return;
  }
  // Kiểm tra các thông tin nằm trong khoảng cho phép và in thông tin pet ra bảng
  else if (ageEl.value < 1 || ageEl.value > 15) {
    alert("Age must be between 1 and 15");
    return;
  } else if (weightEl.value < 1 || weightEl.value > 15) {
    alert("Weight must be between 1 and 15");
    return;
  } else if (lengthEl.value < 1 || lengthEl.value > 100) {
    alert("Length must be between 1 and 100");
    return;
  } else {
    addPet();
  }
});

// Xóa 1 thú cưng
tbodyEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    e.target.parentElement.parentElement.remove();
  }
  //Xóa một thú cưng trong storage
  localStorage.removeItem("petArr");
  let petArr = [];
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    petArr.push({
      ID: tbodyEl.rows[i].cells[0].textContent,
      name: tbodyEl.rows[i].cells[1].textContent,
      age: parseInt(tbodyEl.rows[i].cells[2].textContent),
      type: tbodyEl.rows[i].cells[3].textContent,
      weight: parseInt(tbodyEl.rows[i].cells[4].textContent),
      length: parseInt(tbodyEl.rows[i].cells[5].textContent),
      color: tbodyEl.rows[i].cells[6].textContent,
      breed: tbodyEl.rows[i].cells[7].textContent,
      vaccinated: tbodyEl.rows[i].cells[8].textContent === "Yes" ? true : false,
      dewormed: tbodyEl.rows[i].cells[9].textContent === "Yes" ? true : false,
      sterilized: tbodyEl.rows[i].cells[10].textContent === "Yes" ? true : false,
      date: tbodyEl.rows[i].cells[11].textContent,
    });
  }

  savePetToStorage(petArr);
  renderTableData(petArr);
  
});

  


//Thêm animation cho sidebar mỗi khi click vào sidebar 
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
  sidebarEl.classList.toggle("animated");
  sidebarEl.classList.toggle("slideInLeft");
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
  <button type="button" class="btn btn-danger">Delete</button>
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
