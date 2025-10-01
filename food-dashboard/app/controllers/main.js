import Food from "../models/food.js";
import FoodManager from "../models/foodManager.js";

// tạo đối tượng manager từ lớp đối tượng FoodManager
const manager = new FoodManager();

const getEle = (id) => document.getElementById(id); //Nếu dùng arrow function thì có thể chỉ cần viết một dòng đẻ trả về như thế này

const getInfoFood = () => {
    const id = getEle('foodID').value;
    const name = getEle('tenMon').value;
    const type = getEle('loai').value;
    const price = getEle('giaMon').value;
    const discount = getEle('khuyenMai').value;
    const status = getEle('tinhTrang').value;
    const img = getEle('hinhMon').value;
    const des = getEle('moTa').value;

    // tạo đối tượng food từ lớp đối tượng Food (phân biệt chữ hoa và thường)
    const food = new Food(id, name, type, price, discount, status, img, des);

    // tính giá tiền khuyến mãi
    food.calcPricePromotion();
    return food;
};

const renderListFoods = (data) => {
    // hiển thị danh sách ở tbodyFood
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const food = data[i];

        // convert loai1 => chay | loai2 => man
        let typeConvert = food.type === "loai1" ? "Chay" : "Mặn";
        // convert 0 => Hết | 1 => Mặn
        let statusCovert = food.status === "0" ? "Hết" : "Còn";

        contentHTML += `
        <tr>
            <td>${food.id}</td>
            <td>${food.name}</td>
            <td>${typeConvert}</td>
            <td>${food.price}</td>
            <td>${food.discount}</td>
            <td>${food.pricePromotion}</td>
            <td>${statusCovert}</td>
            <td>
                <button class = "btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick = "handleEditFood('${food.id}')">Edit</button>
                <button class = "btn btn-danger" onclick = "handleDeleteFood('${food.id}')">Delete</button>
            </td>
        </tr>
        `;
    }
    getEle("tbodyFood").innerHTML = contentHTML;
};

//Sửa lại tiêu đề và hiển thị lại nút thêm cho nút "Thêm Món Ăn"
getEle('btnThem').onclick = function () {
    getEle('exampleModalLabel').innerHTML = "Add Food";

    // hiển thị lại nút thêm
    getEle('btnThemMon').style.display = "inline-block";

    // Ẩn nút cập nhật
    getEle('btnCapNhat').style.display = "none";

    //reset value
    getEle('foodForm').reset();

    // enable input
    // getEle('foodID').removeAttribute("disabled");
    // cách 2
    getEle('foodID').disabled = false;
}

// delete Food
const handleDeleteFood = (id) => {
    manager.deleteFood(id);
    renderListFoods(manager.arr);
    setLocalStorage();
};

// khai báo handleDeleteFood ra ngoài window (để dùng được hàm handleDeleteFood)
window.handleDeleteFood = handleDeleteFood;

// edit food
const handleEditFood = (id) => {
    // Sửa lại tiêu đề của model
    getEle('exampleModalLabel').innerHTML = "Edit Food";

    // disable nút thêm
    getEle('btnThemMon').style.display = "none";

    // hiển thị lại nút cập nhật
    getEle('btnCapNhat').style.display = "inline-block";

    const food = manager.editFood(id);
    if (food) {
        // show value của food ra form
        getEle('foodID').value = food.id;

        // disable input
        // getEle('foodID').setAttribute("disabled", true);
        // cách 2
        getEle('foodID').disabled = true;

        getEle('tenMon').value = food.name;
        getEle('loai').value = food.type;
        getEle('giaMon').value = food.price;
        getEle('khuyenMai').value = food.discount;
        getEle('tinhTrang').value = food.status;
        getEle('hinhMon').value = food.img;
        getEle('moTa').value = food.description;
    }
};

window.handleEditFood = handleEditFood;

// button Cập nhật lại food
getEle('btnCapNhat').onclick = function () {
    const food = getInfoFood();
    //cập nhật food
    manager.updateFood(food);
    //hiển thị food ra ngoài tbody
    renderListFoods(manager.arr);

    //set local storage
    setLocalStorage();

    //close modal
    document.getElementsByClassName('close')[0].click();
}

// SetLocalStorage: Lưu trữ danh sách món ăn xuống LocalStorage
const setLocalStorage = () => {
    // chuyển qua string
    const dataString = JSON.stringify(manager.arr);
    // lưu vào localstorage
    localStorage.setItem("LIST_FOOD", dataString);
};

// getLocalStorage: Lấy danh sách món ăn từ LocalStorage lên

const getLocalStorage = () => {
    const dataString = localStorage.getItem("LIST_FOOD");
    if (!dataString) return; // Không có dữ liệu thì thoát luôn
    // convert từ dataString => JSON
    const dataJson = JSON.parse(dataString);
    // phục hồi dữ liệu cho manager.arr
    manager.arr = dataJson;
    // hiển thị ra ngoài UI
    renderListFoods(dataJson);
};

getLocalStorage();

// Add food
getEle('btnThemMon').onclick = function () {
    const food = getInfoFood();
    // add food vào arr
    manager.addFood(food);

    //hiển thị food ra ngoài tbody
    renderListFoods(manager.arr);

    //set local storage
    setLocalStorage();

    //close modal
    document.getElementsByClassName('close')[0].click();
};

