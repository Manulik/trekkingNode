let products = JSON.parse(localStorage.getItem('products')) || [];

function showProducts(products) {

    let view = '';

    for (product of products) {
        console.log(product);
        view += `
        <li class="product">
            <a class="product-link" href="#">
                <div class="product-header">
                    <div class="product-size">size: ${product.size}</div>
                    <div class="product-color">color: ${product.color}</div>
                </div>
                <div class="product-content">
                    <img src="${product.imageUrl || './images/product.png'}" alt="">
                </div>
                <div class="product-footer">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}$</div>
                </div>
            </a>
            <button class="remove-product" data-id="${product.id}">Remove</button>  
        </li>`
    }

    document.querySelector('.products-container').innerHTML = view;

}

showProducts(products);

let delayFormServer = new Promise((resolve, reject) => {
    setTimeout(() => reject({ id: 123 }), 6000);
});

document.querySelector('.products-container').addEventListener('click', (e) => {
    if (e.target.nodeName = 'BUTTON' && e.target.dataset.id) {
        console.log(e.target.dataset.id);
        products = products.filter((product) => {
            return +product.id !== +e.target.dataset.id;
        });
        localStorage.setItem('products', JSON.stringify(products));


        delayFormServer.then((result) => {
            console.log('promise: ', result);
        });

        showProducts(products);
    }
});




function handleForm() {

    const data = {
        id: '',
        name: '',
        price: '',
        size: '',
        color: '',
        gender: '',
        imageUrl: '',

    }

    document.getElementById('add-product').addEventListener('click', (e) => {
        e.preventDefault();
        data.id = Date.now();
        console.log(data.id);
        products.push(data);
        localStorage.setItem('products', JSON.stringify(products));
        showProducts(products);

    });

    const inputs = document.querySelectorAll('form.add-product input[name]');

    for (input of inputs) {
        input.addEventListener('input', (e) => {
            data[e.target.attributes.name.value] = e.target.value;
            console.log(data);
        });
    }
}

handleForm();