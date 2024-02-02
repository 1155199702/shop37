const products = [
    {
      id: 1,
      category: 'category1',
      name: 'Product 1',
      price: 5,
      image: 'apple.jpg',
      description: 'The id of this product is 1.'
    },
    {
      id: 2,
      category: 'category1',
      name: 'Product 2',
      price: 10,
      image: 'apple.jpg',
      description: 'The id of this product is 2.'
    },
    {
      id: 3,
      category: 'category2',
      name: 'Product 3',
      price: 15,
      image: 'apple.jpg',
      description: 'The id of this product is 3.'
    },
  ];



 

function showProductList(category) {
  let productList = document.getElementById('product-list');
  let productPage = document.getElementById("productPage")
  //set product list visible
  productList.style.display='grid'
  //set product detail invisible
  productPage.style.display='none'

  productList.innerHTML = '';
  const filteredProducts = products.filter(product => product.category === category);
  filteredProducts.forEach(product => {
    const productItem = document.createElement('div'); 
    productItem.className = 'product';
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.image}" class="product-img" onclick="jumpToProductDetail(${product.id})">
      <div class="product-name " id="product${product.id}" onclick="jumpToProductDetail(${product.id})"><a href="#">${product.name}</a></div>
      <div class="product-price">$${product.price}</div>
      <button type="button" class="btn btn-primary" onclick="productDetail(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });


  //change the hierarchical navigation menu 
  let thirdNav=document.getElementById("third-nav");
  let secondNav=document.getElementById("second-nav");
  let secondNavLink=secondNav.querySelector('a');
  
  secondNavLink.innerText=category;
  secondNav.style.display='inline'
  thirdNav.style.display='none'
  }


// // 创建 URLSearchParams 对象，传入 URL 中的查询参数部分
// let searchParams = new URLSearchParams(window.location.search);
  
// // get the current category
// let category = searchParams.get('categpry');


// Show product details page
function jumpToProductDetail(productId) {
   
    let product = products.find(product => product.id === productId);
    let productList=document.getElementById('product-list');
    let productPage = document.getElementById("productPage")

    let id=productId
     // construct the url
     var url = 'productDetail.html?id=' + encodeURIComponent(id);

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
    thirdNavLink.innerText="product"+productId;
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

