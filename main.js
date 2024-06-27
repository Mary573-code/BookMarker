let siteName = document.getElementById('siteName');
let siteURL = document.getElementById('siteURL');
let submitBtn = document.querySelector('#Submit');
let bookMark_Container;
let ccurrentIndex = 0;

if (localStorage.getItem('BOOKMARK') != null) {
     bookMark_Container = JSON.parse(localStorage.getItem('BOOKMARK'));
     Display(bookMark_Container);
}
else {
     bookMark_Container = [];
}

function Add_BookMark() {

     if ((siteNameVal() == true) && ( siteURLVal() == true)) {

          let bookMark = {
               Name: siteName.value,
               URL: siteURL.value
          }
          bookMark_Container.push(bookMark);
          localStorage.setItem('BOOKMARK', JSON.stringify(bookMark_Container));
          CLEAR();
          Display(bookMark_Container);
     }
}

submitBtn.addEventListener('click', function () { Add_BookMark() }) //SUBMIT Button Event 


function CLEAR() {
     siteName.value = "";
     siteURL.value = "";
}
function Display(list) {
     let cartona = ``;
     for (let i = 0; i < list.length; i++) {
          cartona += `<tr>
               <td>${i + 1}</td>
                <td>${list[i].Name}</td>
                <td><button onclick="VISIT(${i})" class="btn btn-outline-primary" ><a class="text-decoration-none" href="https://${list[i].URL}" id="goURL" target="_blank">VISIT</a></button></td>
                <td><button onclick="UPDATE(${i})"  class="btn btn-outline-success" >UPDATE</button></td>
                <td><button  onclick="DELETE(${i})" class="btn btn-outline-danger" >DELETE</button></td>
                </tr>
            `
     }
     document.getElementById('cartona').innerHTML = cartona;
}

function DELETE(DELindex) {
     bookMark_Container.splice(DELindex, 1);
     localStorage.setItem('BOOKMARK', JSON.stringify(bookMark_Container));
     Display(bookMark_Container);
}

function UPDATE(UPindex) {
     ccurrentIndex = UPindex;
     siteName.value = bookMark_Container[UPindex].Name;
     siteURL.value = bookMark_Container[UPindex].URL;
     document.getElementById('UPbtn').classList.replace('d-none', 'd-inline-block');
     document.getElementById('Submit').classList.add('d-none');
}

function UpdateIndex() {
     let bookMark = {
          Name: siteName.value,
          URL: siteURL.value
     }
     bookMark_Container[ccurrentIndex] = bookMark;
     localStorage.setItem('BOOKMARK', JSON.stringify(bookMark_Container));
     CLEAR();
     Display(bookMark_Container);
     document.getElementById('Submit').classList.replace('d-none', 'd-inline-block');
     document.getElementById('UPbtn').classList.add('d-none');
}

function Search(searchTerm) {
     let searchResult = [];
     for (let i = 0; i < bookMark_Container.length; i++) {
          if (bookMark_Container[i].Name.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
               searchResult.push(bookMark_Container[i]);
          }
     }
     Display(searchResult);
}

function siteNameVal() {
     let RegExp = /^[A-Z]/;
     if (RegExp.test(siteName.value) == true) {
          siteName.classList.remove('is-invalid');
          siteName.classList.add('is-valid');
          return true;
     }
     else {
          siteName.classList.remove('is-valid');
          siteName.classList.add('is-invalid');
          return false;
     }
}

function siteURLVal() {
     let RegExp = /^(www\.)\w{0,9}(\.com)$/i;
     if (RegExp.test(siteURL.value) == true) {
          siteURL.classList.remove('is-invalid');
          siteURL.classList.add('is-valid');
          return true;
     }
     else {
          siteURL.classList.remove('is-valid');
          siteURL.classList.add('is-invalid');
          return false;
     }
}