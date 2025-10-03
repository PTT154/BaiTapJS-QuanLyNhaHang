class FoodManager {
    constructor() {
        this.arr = []
    }

    addFood(food) {
        this.arr.push(food)
    }

    // tạo hàm find index để dễ tìm vị trí food
    findIndexFood(id) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const food = this.arr[i];
            if (food.id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    deleteFood(id) {
        // tìm vị trí của food cần xóa
        const index = this.findIndexFood(id);
        // xóa món ăn
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }
    editFood(id) {
        // tìm vị trí của food cần edit
        const index = this.findIndexFood(id);
        // lấy food từ vị trí tìm thấy trong mảng
        if (index !== -1) {
            //trả về food
            return this.arr[index];
        }
        return null;
    }
    updateFood(food) {
        // Tìm vị trí food cần update
        const index = this.findIndexFood(food.id);

        if (index !== -1) {
            this.arr[index] = food;
        }
        return null;
    }

    filterFood(type) {
        /**
         * 0. Tạo mảng result = []
         * 1. Kiểm tra nếu type === "all"
         *      => Đúng: trả về mảng arr
         * 2. Duyệt qua từng phàn tử trong mảng arr
         *      1.1 food = arr[i]
         *      1.2 Nếu food.type === type
         *          => Đúng: thêm food và result
         *  trả về result
         */
        if (type === "all") {
            return this.arr;
        } else {
            let result = []
            for (let i = 0; i < this.arr.length; i++) {
                const food = this.arr[i];
                if (food.type === type) {
                    result.push(food);
                }
            }
            return result;
        }
    }

    searchFood(keyword) {
        let result = [];
        for (let i = 0; i < this.arr.length; i++) {
            const food = this.arr[i];

            // chuyển keyword và food.name về chữ thường
            const keywordLowerCase = keyword.toLowerCase();
            const foodNameLowerCase = food.name.toLowerCase();

            // so sánh tương đối chỉ cần đúng một kí tự
            //Hàm indexOf trong JavaScript được dùng để tìm vị trí xuất hiện đầu tiên của một chuỗi con (substring) trong một chuỗi lớn (string).
            //index bắt đầu từ 0 nên nếu ko tìm được thì sẽ trả về -1
            if (foodNameLowerCase.indexOf(keywordLowerCase) !== -1) {
                result.push(food);
            }
        }
        return result;
    }
}

export default FoodManager;