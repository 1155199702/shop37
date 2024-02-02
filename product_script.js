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

let productDetail=document.getElementById("product-detail")
let searchParams = new URLSearchParams(window.location.search);
// get the requiry parameter and parse it to int 
let id = parseInt(searchParams.get('id'));
//find the product and display it
let product = products.find(item => item.id === id);
productDetail.innerHTML = `
<div class="container">
<div class="product-container">
  <div class="product-image">
    <img src="${product.image}" class="img-fluid" alt="Product Image">
    
  </div>
  <div class="product-details">
    <h2>${product.name}</h2>
    <p>Price: $ ${product.price}</p>
    <button class="btn btn-primary">Add to Cart</button>
  </div>
</div>

<hr>

<div class="product-description">
  <h2>Product Description</h1>
  <p>${product.description}</p>
</div>
</div>  
    `;

