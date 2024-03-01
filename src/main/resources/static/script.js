
//加载product类别列表
let categories=undefined;
let products =undefined;
var categoryURL='http://127.0.0.1:80/category/get';
var productURL = 'http://127.0.0.1:80/product/get';
//展示在页面上
let productList = document.getElementById('product-list');
let productPage = document.getElementById("productPage")
//set product list visible
productList.style.display='grid'
//set product detail invisible
productPage.style.display='none'
//get all categories
fetch(categoryURL)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在category变量中
        categories = data;
        //在类别列表中显示类别名称
        let catList=document.getElementById("categoryList");
        catList.innerHTML="";
        categories.forEach(function(category_item) {
            let list_item = document.createElement('li');
            let list_id = document.createElement('span');
            let list_name=document.createElement('span');
            list_id.innerText=category_item.catid;
            list_id.style.display="none";
            list_name.innerText=category_item.name; //record the category id
            list_item.appendChild(list_id);
            list_item.appendChild(list_name);
            list_item.setAttribute("class","category");
            (function (list_item) {
                list_item.addEventListener("click", function () {
                    showProductList(list_item);
                });
            })(list_item);
            catList.appendChild(list_item);
            console.log(list_item);


        });
    })
    .catch(error => {
        // 处理发生的错误
        console.error('Error:', error);
    });
 

function showProductList(category) {

    //get the selected category id
    let list_id = category.querySelector('span:first-child').innerText;
    let list_name=category.querySelector('span:last-child').innerText;
    console.log(list_id);

    //从后端获取产品信息
    fetch('http://127.0.0.1:80/product/getByCatId/'+list_id)
        .then(response => response.json()) // 将响应解析为JSON格式
        .then(data => {
            // 将获取到的数据存储在product变量中
            products = data;
            console.log(products);
            //展示在页面上
            let productList = document.getElementById('product-list');
            let productPage = document.getElementById("productPage")
            //set product list visible
            productList.style.display='grid'
            //set product detail invisible
            productPage.style.display='none'

            productList.innerHTML = '';
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product';
                productItem.innerHTML = `
      <img src="apple.jpg" alt="apple.jpg" class="product-img" onclick="jumpToProductDetail(${product.pid},${product.name})">
      <div class="product-name " id="product${product.name}" onclick="jumpToProductDetail(${product.pid},'${product.name}')"><a href="#">${product.name}</a></div>
      <div class="product-price">$${product.price}</div>
      <button type="button" class="btn btn-primary" onclick="productDetail(${product.pid})">Add to Cart</button>
    `;
                productList.appendChild(productItem);
            });


            //change the hierarchical navigation menu
            let thirdNav=document.getElementById("third-nav");
            let secondNav=document.getElementById("second-nav");
            let secondNavLink=secondNav.querySelector('a');

            secondNavLink.innerText=list_name;
            secondNav.style.display='inline';
            thirdNav.style.display='none';
        })
        .catch(error => {
            // 处理发生的错误
            console.error('Error:', error);
        });



  }


// // 创建 URLSearchParams 对象，传入 URL 中的查询参数部分
// let searchParams = new URLSearchParams(window.location.search);
  
// // get the current category
// let category = searchParams.get('categpry');


// Show product details page
function jumpToProductDetail(productId,productName) {

    //get product id
    let productList=document.getElementById('product-list');
    let productPage = document.getElementById("productPage");


     // construct the url
     var url = 'http://127.0.0.1:80/ProductDetail.html?pid=' + encodeURIComponent(productId);
    console.log(url);
     // reload product detail page
     productPage.src = url;

     //set product detail visible
     productPage.style.display='block'
     //set product list invisible
     productList.style.display='none'

     //change the hierarchical navigation menu 
    let thirdNav=document.getElementById("third-nav");
    let secondNav=document.getElementById("second-nav");
    
    let thirdNavLink=thirdNav.querySelector('a');
    thirdNavLink.innerText=productName;
    thirdNav.style.display='inline'

  }

  
function backToCategory(){
  let productList=document.getElementById('product-list');
  let productPage = document.getElementById("productPage");
  productList.style.display='grid'
  productPage.style.display='none'

  //change the hierarchical navigation menu 
  let thirdNav=document.getElementById("third-nav");
  let secondNav=document.getElementById("second-nav");
  secondNav.style.display='inline'

  thirdNav.style.display='none'
}

function showDropdown() {
  document.getElementById("dropdown").style.display = "block";
}

function hideDropdown() {
  document.getElementById("dropdown").style.display = "none";
}

