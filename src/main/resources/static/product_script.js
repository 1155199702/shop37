// const products = [
//     {
//       id: 1,
//       category: 'category1',
//       name: 'Product 1',
//       price: 5,
//       image: 'apple.jpg',
//       description: 'The id of this product is 1.'
//     },
//     {
//       id: 2,
//       category: 'category1',
//       name: 'Product 2',
//       price: 10,
//       image: 'apple.jpg',
//       description: 'The id of this product is 2.'
//     },
//     {
//       id: 3,
//       category: 'category2',
//       name: 'Product 3',
//       price: 15,
//       image: 'apple.jpg',
//       description: 'The id of this product is 3.'
//     },
//   ];
let url='http://54.251.177.52:8080'
let productDetail=document.getElementById("product-detail")
let searchParams = new URLSearchParams(window.location.search);
// get the requiry parameter and parse it to int 
let pid = parseInt(searchParams.get('pid'));
console.log(pid);

let product=undefined;
let productURL=url+'/product/getById/'+pid;
console.log(productURL);
//get the product from backend
fetch(productURL)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在category变量中
        product = data;
        product.image="imgs/"+product.imgname;
        //在类别列表中显示类别名称
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
    })
    .catch(error => {
        // 处理发生的错误
        console.error('Error:', error);
    });




