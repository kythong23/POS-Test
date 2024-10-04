export class Food{
    constructor(id,img,name,price){
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
    };
}
export function addItem(food,tableid){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let amount = 0;
    let exist = cart.filter(item => item.foodid === food.id);
    if(exist.length==0){
        let cartItem = {};
        amount++;
        cartItem['foodid'] = food.id;
        cartItem['name'] = food.name;
        cartItem['price'] = food.price
        cartItem['amount'] = amount;
        cart.push(cartItem);
        localStorage.setItem("cart",JSON.stringify(cart));
        totalMoney(tableid);
    }
    else{ 
        let item = cart.find(item => item.foodid === food.id)
        item.amount += 1 ; 
        localStorage.setItem("cart",JSON.stringify(cart));
        totalMoney(tableid);
    }

}
export function MinusItem(food,tableid){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let item = cart.find(item => item.foodid === food.id)
    item.amount -= 1 ; 
    localStorage.setItem("cart",JSON.stringify(cart));
    totalMoney(tableid);
}
export function deleteItem(food,tableid) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let item = cart.find(item => item.foodid === food.id)
    item.amount = 0 ; 
    localStorage.setItem("cart",JSON.stringify(cart));
    totalMoney(tableid);
}
export function totalMoney(tableid) {
    let total = 0 ;
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(element => {
        let price = 0 ;
        let numberstring = element.price;
        numberstring=numberstring.replace(/[₫,]/g, '').trim();
        price = element.amount*parseInt(numberstring);
        total += price;
    });
    localStorage.setItem(`totalmoney${tableid}`,total);
    return total;
  }