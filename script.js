$(document).ready(function(){
    let openShopping = $('.shopping');
    let closingShopping = $('.closeShopping');
    let list = $('.list');
    let listCard = $('.listCard');
    let body = $('body');
    let total = $('.total');
    let quantity = $('.quantity');

    openShopping.click(() => {
        body.addClass('active');
    });

    closingShopping.click(() => {
        body.removeClass('active');
    });

    let products1 = [
        
        {
            id: 1,
            image: 'shoes7.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            // price: '$49.99'
            price: 10000
        },
        {
            id: 2,
            image: 'shoes4.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            // price: '$49.99'
            price: 20000
        },
        {
            id: 3,
            image: 'shoes2.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        },
        {
            id: 4,
            image: 'shoes3.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        }
    ];

    let products2 = [
        {
            id: 5,
            image: 'shoes3.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        },
        {
            id: 6,
            image: 'shoes4.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        },
        {
            id: 7,
            image: 'shoes5.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        },
        {
            id: 8,
            image: 'shoes6.jpg',
            name: 'Here Product Title',
            oldPrice: '$79.99',
            price: '$49.99'
        }
    ];

    let listCards = [];

function menuApp() {
    $.each(products1, function(key, value) {
        let newDiv = $('<div>').addClass('col-md-6 col-lg-4 col-xl-3').html(`
            <div id="product-${key}" class="single-product">
                <div class="img">
                    <img src="IMG/${value.image}" alt="">
                    <div class="part-1">
                        <span class="new">new</span>
                        <ul>
                            <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
                            <li><a href="#"><i class="fas fa-heart"></i></a></li>
                            <li><a href="#"><i class="fas fa-plus"></i></a></li>
                            <li><a href="#"><i class="fas fa-expand"></i></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="part-2">
                    <h3 class="product-title">${value.name}</h3>
                    ${value.oldPrice ? `<h4 class="product-old-price">${value.oldPrice}</h4>` : ''}
                    <h4 class="product-price">${value.price.toLocaleString()}</h4>
                    <button class="add-to-card" data-key="${key}">Add To Card</button>
                </div>
            </div>
        `);
        list.append(newDiv);
    });

    $.each(products2, function(key, value) {
        let newDiv = $('<div>').addClass('col-md-6 col-lg-4 col-xl-3').html(`
            <div id="product-${key}" class="single-product">
                <div class="img">
                    <img src="IMG/${value.image}" alt="">
                    <div class="part-1">
                        <span class="discount">15% off</span>
                        <ul>
                            <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
                            <li><a href="#"><i class="fas fa-heart"></i></a></li>
                            <li><a href="#"><i class="fas fa-plus"></i></a></li>
                            <li><a href="#"><i class="fas fa-expand"></i></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="part-2">
                    <h3 class="product-title">${value.name}</h3>
                    ${value.oldPrice ? `<h4 class="product-old-price">${value.oldPrice}</h4>` : ''}
                    <h4 class="product-price">${value.price.toLocaleString()}</h4>
                    <button class="add-to-card" data-key="${key}">Add To Card</button>
                </div>
            </div>
        `);
        list.append(newDiv);
    });
}
menuApp();

// $(document).on('click', '.add-to-card', function() {
//     let key = $(this).data('key');
//     if (listCards[key] == null) {
//         listCards[key] = $.extend({}, products1[key]);
//         listCards[key].quantity = 1;
//     } else {
//         listCards[key].quantity++;
//     }
//     reloadCard();
// });

$(document).on('click', '.add-to-card', function() {
    let key = $(this).data('key');

    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = $.extend({}, products1[key], { quantity: 1 });
        
    }
    reloadCard();
});

function reloadCard() {
    listCard.empty();
    let count = 0;
    let totalPrice = 0;

    $.each(listCards, function(key, value) {
        if (value?.price != null) { // Check if value and value.price are not null or undefined
            totalPrice += value.price;
            count += value.quantity;

            let newDiv = $("<li>");
            newDiv.html(`
                <div><img src="IMG/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button class="change-quantity" data-key="${key}" data-quantity="${value.quantity - 1}">-</button>
                    <div class="count">${value.quantity}</div>
                    <button class="change-quantity" data-key="${key}" data-quantity="${value.quantity + 1}">+</button>
                </div>
            `);
            listCard.append(newDiv);
        }
    });

    total.text(totalPrice.toLocaleString());
    quantity.text(count);
}


$(document).on('click', '.change-quantity', function() {
        let key = $(this).data('key');
        let quantity = $(this).data('quantity');
        if (quantity == 0) {
            delete listCards[key];
        } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products1[key].price;
        }
        reloadCard();
    });

});

// $(document).on('click', '.decrement', function() {
//     let key = $(this).data('key');
//     let quantity = listCards[key].quantity - 1;
//     changeQuantity(key, quantity);
// });

// $(document).on('click', '.increment', function() {
//     let key = $(this).data('key');
//     let quantity = listCards[key].quantity + 1;
//     changeQuantity(key, quantity);
// });

// function changeQuantity(key, quantity){
//     if(quantity == 0){
//         delete listCards[key];
//     }
//     else{
//         listCards[key].quantity = quantity;
//         listCards[key].price = quantity * products1[key].price;
//     }
//     reloadCard();
// }