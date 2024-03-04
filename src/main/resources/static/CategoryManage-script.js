let url='http://54.251.177.52:8080'
//selected catid when delete
var deleteCatId=undefined;
function fillEditForm(button) {
    var catIdElement = document.getElementById("editcatId");
    var catNameElement = document.getElementById("editcatName");

    console.log(catIdElement);

    var tableRow = button.parentNode.parentNode;
    console.log(tableRow)
    console.log(tableRow.cells[0].innerHTML);
    var catId = tableRow.cells[0].innerHTML;
    var catName = tableRow.cells[1].innerHTML;


    catIdElement.value = catId;
    catNameElement.value = catName;
}


function fillEditForm(button) {
    var catIdElement = document.getElementById("editcatId");
    var catNameElement = document.getElementById("editcatName");

    console.log(catIdElement);

    var tableRow = button.parentNode.parentNode;
    console.log(tableRow)
    console.log(tableRow.cells[0].innerHTML);
    var catId = tableRow.cells[0].innerHTML;
    var catName = tableRow.cells[1].innerHTML;


    catIdElement.value = catId;
    catNameElement.value = catName;
}

//get category info
var caturl = url+'/category/get';
var category;
fetch(caturl)
    .then(response => response.json()) // 将响应解析为JSON格式
    .then(data => {
        // 将获取到的数据存储在category变量中
        category = data;
        console.log(category);
        console.log(category.length);
        // 在这里可以对category变量进行进一步处理或展示
        var tableBody=document.getElementById("categoryTableBody");
        // 遍历category数组
        for (var i = 0; i < category.length; i++) {
            // create a table row
            var row = document.createElement("tr");

            // create id column
            var idCell = document.createElement("td");
            idCell.textContent = category[i].catid;
            row.appendChild(idCell);

            //create name column
            var nameCell = document.createElement("td");
            nameCell.textContent = category[i].name;
            row.appendChild(nameCell);

            //action column
            var actionsCell = document.createElement("td");
            // edit button
            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-info";
            editButton.setAttribute("data-toggle", "modal");
            editButton.setAttribute("data-target", "#editCategory");
            editButton.innerText="edit";
            // 使用闭包创建一个作用域，保存每个按钮的引用
            (function (button) {
                editButton.addEventListener("click", function () {
                    fillEditForm(button);
                });
            })(editButton);
            actionsCell.appendChild(editButton);

            // deletebutton
            var deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-danger";
            deleteButton.setAttribute("data-toggle", "modal");
            deleteButton.setAttribute("data-target", "#deleteCategory");
            deleteButton.textContent = "Delete";
            // 使用闭包创建一个作用域，保存每个按钮的引用
            (function (button) {
                deleteButton.addEventListener("click", function () {
                    var tableRow = button.parentNode.parentNode;
                    deleteCatId = tableRow.cells[0].innerHTML; //令deleteCatId变量=要删除的类别的catid
                    console.log(deleteCatId)
                });
            })(editButton);
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

// add category
var confirmBtn = document.getElementById("confirmAdd");

confirmBtn.addEventListener("click", function() {
    // get the value of form
    var catId = document.getElementById("catId").value;
    var catName = document.getElementById("catName").value;

    // construct form data
    var formData = {
        catid: catId,
        name: catName
    };
    console.log(formData);

    // send post request
    fetch(url+"/category/add", {
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

//update category
var confirmEditBtn = document.getElementById("confirmEdit");

confirmEditBtn.addEventListener("click", function() {

    //get the value of form
    var catId = document.getElementById("editcatId").value;
    var catName = document.getElementById("editcatName").value;

    //construct form data
    var editformData = {
        catid: catId,
        name: catName
    };
    console.log(editformData);
    // send post request
    var jsonEditData = JSON.stringify(editformData);

    // 创建一个XMLHttpRequest对象
    var xhr = new XMLHttpRequest();

    // 定义请求方法、URL和是否异步
    xhr.open("POST", url+"/category/update", true);

    // 设置请求头，指定发送的数据类型为JSON
    xhr.setRequestHeader("Content-Type", "application/json");

    // 发送JSON数据到后端接口
    xhr.send(jsonEditData);

    // 监听请求完成的事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 请求成功，可以在这里处理返回的数据
            console.log(xhr.responseText);
            location.reload();
        }
    };
});


//delete category
var deleteConfirmButton=document.getElementById('confirmDelete');
deleteConfirmButton.addEventListener('click', function() {

    //获取这一行的catid

    // 发送HTTP DELETE请求到后端接口
    fetch(url+'/category/delete/' + deleteCatId, {
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

