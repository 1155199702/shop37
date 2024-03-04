let url='http://54.251.177.52:8080'
let deletePID=null;
//get all products

var categoryURL=url+'/category/get';
var productURL = url+'/product/get';
var product;
var category;
fetch(productURL)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在product变量中
        product = data;
        console.log(product);
        // 在这里可以对product变量进行进一步处理或展示
        var tableBody=document.getElementById("productTableBody");
        // 遍历product数组
        for (var i = 0; i < product.length; i++) {
            // create a table row
            var row = document.createElement("tr");

            // id
            var idCell = document.createElement("td");
            idCell.textContent = product[i].pid;
            row.appendChild(idCell);

            //catid
            var catIdCell = document.createElement("td");
            catIdCell.textContent = product[i].catid;
            row.appendChild(catIdCell);
            //name
            var nameCell = document.createElement("td");
            nameCell.textContent = product[i].name;
            row.appendChild(nameCell);
            //price
            var priceCell = document.createElement("td");
            priceCell.textContent = product[i].price;
            row.appendChild(priceCell);

            //description
            var descriptionCell = document.createElement("td");
            descriptionCell.textContent = product[i].description;
            row.appendChild(descriptionCell);

            //image
            var imgCell = document.createElement("td");
            var thumbnailImg = document.createElement('img');
            //解决图片不更新的问题，加一个随机数
            thumbnailImg.src = 'imgs/'+product[i].imgname;// Path to your thumbnail image

            thumbnailImg.classList.add('img-thumbnail'); // Apply Bootstrap thumbnail styling
            thumbnailImg.style.maxWidth="100px";
            imgCell.appendChild(thumbnailImg);

            // // Add a click event listener to the thumbnail image
            // thumbnailImg.addEventListener('click', function() {
            //     // Create an overlay div for the large image
            //     var overlay = document.createElement('div');
            //     overlay.classList.add('overlay');
            //     overlay.style.background = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black background
            //     overlay.style.position = 'fixed';
            //     overlay.style.top = '0';
            //     overlay.style.left = '0';
            //     overlay.style.width = '100%';
            //     overlay.style.height = '100%';
            //     overlay.style.zIndex = '9999';
            //
            //     // Create the large image
            //     var largeImg = document.createElement('img');
            //     largeImg.src = 'imgs/'+product[i].imgname; // Same path as the thumbnail image
            //     largeImg.style.maxWidth = '60%'; // Adjust the size as needed
            //     largeImg.style.position = 'absolute';
            //     largeImg.style.top = '50%';
            //     largeImg.style.left = '50%';
            //     largeImg.style.transform = 'translate(-50%, -50%)';
            //
            //     // Append the large image to the overlay
            //     overlay.appendChild(largeImg);
            //
            //     // Add a click event listener to the overlay (to close it)
            //     overlay.addEventListener('click', function() {
            //         document.body.removeChild(overlay); // Remove the overlay
            //     });
            //
            //     // Append the overlay to the body
            //     document.body.appendChild(overlay);
            // });

// Append the imgCell to your table row
            row.appendChild(imgCell);


            //action column
            var actionsCell = document.createElement("td");
            // edit button
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-info";
            editButton.setAttribute("data-toggle", "modal");
            editButton.setAttribute("data-target", "#editProductModal");
            // (function (button) {
            //     fillEditForm(button)
            // })(editButton);
            (function (button) {
                editButton.addEventListener("click", function () {
                    fillEditForm(button);
                });
            })(editButton);
            // editButton.addEventListener("click", function () {
            //     fillEditForm(editButton);
            // });
            editButton.textContent = "Edit";
            actionsCell.appendChild(editButton);

            // deletebutton
            var deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-danger";
            deleteButton.setAttribute("data-toggle", "modal");
            deleteButton.setAttribute("data-target", "#deleteProductModal");
            deleteButton.textContent = "Delete";
            // 使用闭包创建一个作用域，保存每个按钮的引用
            (function (button) {
                deleteButton.addEventListener("click", function () {
                    var tableRow = button.parentNode.parentNode;
                    deletePID = tableRow.cells[0].innerHTML; //令deleteCatId变量=要删除的产品的id
                    console.log(deletePID)
                });
            })(deleteButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            // 将新的表格行添加到<tbody>标签中
            tableBody.appendChild(row);
        }
        // 例如，将数据填充到表格中或进行其他操作
    })
    .catch(error => {
        // 处理发生的错误
        console.error('Error:', error);
    });

// function showLargeImage(img) {
//     // Assuming the large image path is also "imgs/apple.jpg"
//     var largeImagePath = "imgs/apple.jpg";
//     img.src = largeImagePath;
//     img.classList.add("large-image");
// }
//
// // Function to hide large image on mouseout
// function hideLargeImage(img) {
//     // Restore the thumbnail image path
//     img.src = "imgs/apple.jpg";
//     img.classList.remove("large-image");
// }


//get all categories
fetch(categoryURL)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在category变量中
        category = data;
        //显示在表单的选项框中
        let catIdSelect=document.getElementById("catId");
        let editCatIdSelect=document.getElementById("editCatId");
        catIdSelect.innerHTML="";
        editCatIdSelect.innerText="";
        category.forEach(function(category_item) {
            let option1 = document.createElement('option');
            option1.value = category_item.catid;
            option1.text = category_item.name;
            catIdSelect.appendChild(option1);

            let option2 = document.createElement('option');
            option2.value = category_item.catid;
            option2.text = category_item.name;
            editCatIdSelect.appendChild(option2);

        });
    })
    .catch(error => {
        // 处理发生的错误
        console.error('Error:', error);
    });

//add new product button
var addProductButton=document.getElementById("addProductButton");
addProductButton.addEventListener("click", function(){
    //获取所有的类别信息,and store it in category


});

//add a product
var confirmBtn = document.getElementById("confirmAdd");
//product image
var fileInput = document.getElementById('productImage');
let imgFile=undefined;
let fileExtension = undefined;
// 添加change事件监听器
fileInput.addEventListener('change', (event) => {
    imgFile = event.target.files[0];
    let fileName= imgFile.name;
    fileExtension=fileName.split('.').pop();
    console.log('File:', imgFile);
    console.log(imgFile.name);
});

confirmBtn.addEventListener("click", function() {
    // get the value of form
    var pid = document.getElementById("pid").value
    var catId = document.getElementById("catId").value;
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").value;
    var productDescription = document.getElementById("productDescription").value;
    let now= new Date().getTime();
    let imgFileName= productName+now+"."+fileExtension;

    var allowedExtensions = /(\.jpg|\.gif|\.png)$/i; // 合法的文件后缀正则表达式
    var maxSize = 10 * 1024 * 1024; // 最大文件大小限制，10MB

    if (!allowedExtensions.test(imgFile.name)) {
        // 文件后缀不符合要求
        alert('只允许上传jpg、gif和png格式的文件');
        fileInput.value = ''; // 清空文件输入框
        return;
    }

    if (fileExtension.size > maxSize) {
        // 文件大小超过限制
        alert('文件大小不能超过10MB');
        fileInput.value = ''; // 清空文件输入框
        return;
    }

    // construct form data
    var formData = {
        pid: pid,
        catid: catId,
        name: productName,
        price: productPrice,
        description:productDescription,
        imgname:imgFileName,
    };

    const productForm = new FormData();
    productForm.append('product',JSON.stringify(formData));
    productForm.append('imgFile',imgFile);
    console.log(productForm)
    // send post request to add product
    fetch(url+"/product/add", {
        method: "POST",
        headers: {
           // "Content-Type": "application/json"
        },
        body: productForm
    })
        .then(function(response) {
            if (response.ok) {
                // 请求成功，可以在这里处理返回的数据
                console.log(response);
                location.reload();
            } else {
                throw new Error("请求失败");
            }
        })
        .catch(function(error) {
            console.log("发生错误:", error);
        });
});


function fillEditForm(button) {
    var pidElement=document.getElementById("editPID");
    var catIdElement = document.getElementById("editCatId");
    var productNameElement = document.getElementById("editProductName");
    var productPriceElement = document.getElementById("editProductPrice");
    var productDescriptionElement = document.getElementById("editProductDescription");

    // Get the table row containing the product information

    var tableRow = button.parentNode.parentNode;
    console.log(tableRow.cells);
    var PID=tableRow.cells[0].innerHTML;
    var catId = tableRow.cells[1].innerHTML;
    var productName = tableRow.cells[2].innerHTML;
    var productPrice = tableRow.cells[3].innerHTML;
    var productDescription = tableRow.cells[4].innerHTML;
    var productImage= tableRow.cells[5].innerHTML;

    // Set the values in the edit modal form
    pidElement.value=PID;
    catIdElement.value = catId;
    for (let i = 0; i < editCatId.options.length; i++) {
        if (editCatId.options[i].value === catId) {
            editCatId.selectedIndex = i;
            break;
        }
    }
    productNameElement.value = productName;
    productPriceElement.value = productPrice;
    productDescriptionElement.value = productDescription;
}


//edit product
let editButton=document.getElementById("confirmEdit");
editButton.addEventListener("click", function() {
    // get the value of form
    var pid = document.getElementById("editPID").value
    var catId = document.getElementById("editCatId").value;
    var productName = document.getElementById("editProductName").value;
    var productPrice = document.getElementById("editProductPrice").value;
    var productDescription = document.getElementById("editProductDescription").value;
    // construct form data
    var formData = {
        pid: pid,
        catid: catId,
        name: productName,
        price: productPrice,
        description:productDescription,

    };
    console.log(formData);

    // send post request to add product
    fetch(url+"/product/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(function(response) {
            if (response.ok) {
                // 请求成功，可以在这里处理返回的数据
                console.log(response);
                location.reload();
            } else {
                throw new Error("请求失败");
            }
        })
        .catch(function(error) {
            console.log("发生错误:", error);
        });
});
//category of the t
//delete product
//调用后端接口提交删


var deleteConfirmButton=document.getElementById('confirmDelete');
deleteConfirmButton.addEventListener('click', function() {

    // 发送HTTP DELETE请求到后端接口
    fetch(url+'/product/delete/' + deletePID, {
        method: 'DELETE'
    })
        .then(function(response) {
            if (response.ok) {
                console.log('记录删除成功');
                location.reload(); //刷新页面
            } else {
                console.log('记录删除失败');
            }
        })
        .catch(function(error) {
            console.log('发生错误:', error);
        });
});
