"use strict";
//chọn các phần tử
const btnSubmit = document.getElementById("submit-btn");
const breed = document.getElementById("input-breed");
const typeBreed = document.getElementById("input-type");
const tbodyEl = document.getElementById("tbody");
const sidebarEl = document.getElementById("sidebar");
const btnDelete = document.getElementById("delete-btn");
const init = function () {
  breed.value = "";
  typeBreed.value = "";
};

//Thêm animation cho sidebar mỗi khi click vào sidebar 
sidebarEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
  sidebarEl.classList.toggle("animated");
  sidebarEl.classList.toggle("slideInLeft");
});


// Bắt sự kiện 'Click' vào nút Submit
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ các Input form
  const data = {
    breed: breed.value,
    typeBreed: typeBreed.value,
  };

  // Hiển thị danh sách breed
  let addBreed = function () {
    const breedArr = JSON.parse(localStorage.getItem("breedArr"));
    breedArr.push(data);
    saveBreedToStorage(breedArr);
    renderBreed(breedArr);

    // Xóa thông tin từ input form
    init();
  };
  addBreed();
});

// Xóa 1 Breed
tbodyEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    e.target.parentElement.parentElement.remove();
   //Xóa trong storage 
   localStorage.removeItem("breedArr");
   let breedArr = [];
   for (let i = 0; i < tbodyEl.rows.length; i++) {
     breedArr.push({
        breed: tbodyEl.rows[i].cells[1].innerHTML,
        typeBreed: tbodyEl.rows[i].cells[2].innerHTML,
     });
   }
 
   saveBreedToStorage(breedArr);
   renderBreed(breedArr); 
  }
});

function renderBreed(x) {
  tbody.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope = "row">${i+1}</th>
          <td>${x[i].breed}</td>
          <td>${x[i].typeBreed}</td>
      <td>
        <button type="button" class="btn btn-danger">Delete</button>
      </td>`;
    tbody.appendChild(row);
  }
}

renderBreed(breedArr);
