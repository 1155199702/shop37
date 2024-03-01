let deletePID=null;
//get all products
var productURL = 'http://127.0.0.1:80/product/get';
var categoryURL='http://127.0.0.1:80/category/get';
var product;
var category;
fetch(productURL)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在product变量中
        product = data;
        console.log(product);
        console.log(product.length);
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

confirmBtn.addEventListener("click", function() {
    // get the value of form
    var pid = document.getElementById("pid").value
    var catId = document.getElementById("catId").value;
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").value;
    var productDescription = document.getElementById("productDescription").value;
    // construct form data
    var formData = {
        pid: pid,
        catid: catId,
        name: productName,
        price: productPrice,
        description:productDescription

    };
    console.log(formData);

    // send post request to add product
    fetch("http://127.0.0.1:80/product/add", {
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
        description:productDescription

    };
    console.log(formData);

    // send post request to add product
    fetch("http://127.0.0.1:80/product/update", {
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

//delete product
//调用后端接口提交删除
//delete category
var deleteConfirmButton=document.getElementById('confirmDelete');
deleteConfirmButton.addEventListener('click', function() {

    // 发送HTTP DELETE请求到后端接口
    fetch('http://127.0.0.1:80/product/delete/' + deletePID, {
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
