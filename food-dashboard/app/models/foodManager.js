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

        if (index !== -1){
            this.arr[index] = food;
        }
    }
    filterFood() { }
}

export default FoodManager;