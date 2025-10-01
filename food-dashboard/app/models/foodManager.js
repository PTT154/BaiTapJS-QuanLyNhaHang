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
        const index = this.findIndexFood(id);
        // xóa món ăn
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }
    editFood() { }
    update() { }
    filterFood() { }
}

export default FoodManager;