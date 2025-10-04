import Food from "../models/food.js";
import FoodManager from "../models/foodManager.js";
import Validation from "../models/validation.js";

// tạo đối tượng validate
const validate = new Validation();

// tạo đối tượng manager từ lớp đối tượng FoodManager
const manager = new FoodManager();

export const getEle = (id) => document.getElementById(id); //Nếu dùng arrow function thì có thể chỉ cần viết một dòng đẻ trả về như thế này

const getInfoFood = (isAdd) => {
    const id = getEle('foodID').value;
    const name = getEle('tenMon').value;
    const type = getEle('loai').value;
    const price = getEle('giaMon').value;
    const discount = getEle('khuyenMai').value;
    const status = getEle('tinhTrang').value;
    const img = getEle('hinhMon').value;
    const des = getEle('moTa').value;

    /**
     * Kiểm tra tính hợp lệ (validation)
     */

    //flag: boolean
    let isValid = true;

    // if (id === "") {
    //     // Lỗi => Show câu thông báo lỗi
    //     getEle('invalidID').style.display = 'block';
    //     getEle('invalidID').innerHTML = '(*) Vui lòng nhập ID';
    //     isValid = false;
    // } else {
    //     // có nhập ID
    //     getEle('invalidID').style.display = 'none';
    //     getEle('invalidID').innerHTML = '';
    //     isValid = true;
    // }

    // dùng lớp đối tượng validate để kiểm tra
    if (isAdd) {
        //validation id
        isValid &= validate.checkEmpty(id, 'invalidID', '(*) Vui lòng nhập ID') && validate.checkExist(id, 'invalidID', '(*) ID đã tồn tại', manager.arr);
    }
    //validation name
    isValid &= validate.checkEmpty(name, 'invalidTen', '(*) Vui lòng nhập tên món') && validate.checkCharacterString(name, 'invalidTen', '(*) Vui lòng nhập chuỗi kí tự') && validate.checkLength(name, 'invalidTen', '(*) vui lòng nhập tên món từ 3 đến 10 ký tự', 3, 10);
    //validation price
    isValid &= validate.checkEmpty(price, 'invalidGia', '(*) Vui lòng nhập giá món') && validate.checkMoneyNumber(price, 'invalidGia', '(*) Vui lòng nhập chuỗi số');
    //validation type
    isValid &= validate.checkOption('loai', 'invalidLoai', '(*) Vui lòng chọn loại món');
    //validation discount
    isValid &= validate.checkOption('khuyenMai', 'invalidKM', '(*) Vui lòng chọn giảm giá');
    //validation status
    isValid &= validate.checkOption('tinhTrang', 'invalidTT', '(*) Vui lòng chọn trạng thái');
    if (!isValid) return null; //trả về null không thực hiện code bên dưới (sau đó xử lý giá trị null ở phần add food)

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
    const food = getInfoFood(false);
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
    const food = getInfoFood(true);
    // nếu là null thì return không thực hiện bên dưới (không thêm food vào mảng)
    if (!food) return;
    // add food vào arr
    manager.addFood(food);

    //hiển thị food ra ngoài tbody
    renderListFoods(manager.arr);

    //set local storage
    setLocalStorage();

    //close modal
    document.getElementsByClassName('close')[0].click();
};

// Select Filter Food
getEle('selLoai').addEventListener('change', function () {
    const type = getEle('selLoai').value;
    const foodFilter = manager.filterFood(type);

    //hiển thị food ra ngoài tbody
    renderListFoods(foodFilter);

    //set local storage
    setLocalStorage();
});

// Search Food 
// getEle('search').addEventListener('keyup', function () {
//     const keyword = getEle('search').value;

//     const foodSearch = manager.searchFood(keyword);

//     //hiển thị food ra ngoài tbody
//     renderListFoods(foodSearch);

//     //set local storage
//     setLocalStorage();

// });

//Search Food search thứ 2
getEle('txtSearch').addEventListener('keyup', function () {
    const keyword = getEle('txtSearch').value;

    const foodSearch = manager.searchFood(keyword);

    //hiển thị food ra ngoài tbody
    renderListFoods(foodSearch);

    //set local storage
    setLocalStorage();

});