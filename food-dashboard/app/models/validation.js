import { getEle } from "../controllers/main.js";

class Validation {
    checkEmpty(value, errorId, mess) {
        if (value === "") {
            // Lỗi => Show câu thông báo lỗi
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }
        // có nhập ID
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    checkOption(idSelect, errorId, mess) {
        const optionIndex = getEle(idSelect).selectedIndex;
        if (optionIndex === 0) {
            //error
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }
        //success
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }

    checkCharacterString(value, errorId, mess) {
        let letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //success
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        //error
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    checkMoneyNumber(value, errorId, mess) {
        let number = /^[0-9]+$/;
        if (number.test(value)) {
            // success
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        // error
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    checkLength(value, errorId, mess, min, max) {
        if (value && min <= value.trim().length && value.trim().length <= max) { // dùng trim() để loại bỏ khoảng trắng ở bên "  abc   " -> "abc"
            // success
            getEle(errorId).style.display = 'none';
            getEle(errorId).innerHTML = '';
            return true;
        }
        // error
        getEle(errorId).style.display = 'block';
        getEle(errorId).innerHTML = mess;
        return false;
    }

    //Kiểm tra có tồn tại id đó trong danh sách chưa (để không nhập trùng id)
    checkExist(value, errorId, mess, listData) {
        let isExist = false; // false: chưa tồn tại, true: tồn tại
        for (let i = 0; i < listData.length; i++) {
            const food = listData[i];
            if (food.id === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            // error
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }
        // success
        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = '';
        return true;
    }
}

export default Validation;