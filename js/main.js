let productNameInput = document.getElementById("productName");
let productCategoryInput = document.getElementById("productCategory");
let productPriceInput = document.getElementById("productPrice");
let productDescriptionInput = document.getElementById("productDescription");
let productImgInput = document.getElementById("productImg")

let products = []
if (localStorage.getItem('products')) {
  products=JSON.parse(localStorage.getItem('products'))
  displayProduct() 
}

function addProduct() {
  let product = {
    name: productNameInput.value,
    category: productCategoryInput.value,
    price: productPriceInput.value,
    description: productDescriptionInput.value,
    img: productImgInput.files[0]?.name
  }
  products.push(product)
  localStorage.setItem('products',JSON.stringify(products))
  displayProduct()
  clearInput()
}
function displayProduct() {
  let box = ""
  for (let i = 0; i < products.length; i++) {
    box += `
      <div class="col-md-3">
      <div class="prod-img">
          <img src="imgs/${products[i].img}" class="w-100" height="200" alt="prod-img">
      </div>
      <div class="content">
          <h6>${products[i].category}</h6>
          <h5>${products[i].name}</h5>
          <span>Price : ${products[i].price} EGP</span>
          <p>${products[i].description}</p>
          <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 my-2">Delete</button>
          <button onclick="setValues(${i})" class="btn btn-outline-success w-100 my-2">Update</button>
      </div>
    </div>
    `
    document.getElementById('demo').innerHTML=box
    
  }
}
function clearInput() {
  productNameInput.value = ""
  productCategoryInput.value = ""
  productPriceInput.value = ""
  productDescriptionInput.value = ""
  productImgInput.value=""
}
function deleteProduct(index) {
  products.splice(index,1)
  localStorage.setItem('products',JSON.stringify(products))
  displayProduct()
  document.getElementById('updateBtn').style.display='none'
  document.getElementById('addBtn').style.display = 'block'
  clearInput()
}
let superIndex;
function setValues(index) {
  superIndex=index
  document.getElementById('updateBtn').style.display='block'
  document.getElementById('addBtn').style.display = 'none'
  
   productNameInput.value=products[index].name
   productCategoryInput.value=products[index].category
   productPriceInput.value=products[index].price
  productDescriptionInput.value = products[index].description

}
function updateProduct() {
   products[superIndex].name=productNameInput.value
   products[superIndex].category=productCategoryInput.value
   products[superIndex].price=productPriceInput.value
  products[superIndex].description = productDescriptionInput.value
  
  displayProduct()
  localStorage.setItem('products',JSON.stringify(products))
  clearInput()
  document.getElementById('updateBtn').style.display='none'
  document.getElementById('addBtn').style.display = 'block'
}
function search(inputValue) {  
  
  let box = ""
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(inputValue.toLowerCase())) {
      box +=`
      <div class="col-md-3">
      <div class="prod-img">
      <img src="imgs/${products[i].img}" class="w-100" height="200" alt="prod-img">
      </div>
      <div class="content">
          <h6>${products[i].category}</h6>
          <h5>${products[i].name}</h5>
          <span>Price : ${products[i].price} EGP</span>
          <p>${products[i].description}</p>
          <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 my-2">Delete</button>
          <button onclick="setValues(${i})" class="btn btn-outline-success w-100 my-2">Update</button>
      </div>
    </div>`
    }
  }
  document.getElementById('demo').innerHTML = box
}


