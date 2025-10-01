class Food {
    constructor(id, name, type, price, discount, status, img, description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.discount = discount;
        this.status = status;
        this.img = img;
        this.description = description;
        this.pricePromotion = 0;
    }

    calcPricePromotion() {
        this.pricePromotion = Number(this.price) * (100 - this.discount) / 100;
    }
}

export default Food;