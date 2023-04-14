let items = loadItems();

class Item {
    constructor(name,stock,year,deposito,cover,description)   {
        this.name = name.toUpperCase();
        this.stock = parseInt(stock);
        this.year = parseInt(year);
        this.deposito = deposito;
        if (cover == '') {
            this.cover = 'https://via.placeholder.com/500x500/d9d2fa/403f3f.jpg?text=Portada+no+disponible';
        } else {
            this.cover = cover;
        }

    }

}
function saveStorage(items) {
    localStorage.setItem('setItems', JSON.stringify(items))
}

function loadItems() {
    const storedItems = localStorage.getItem('setItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
/*
function loadItems() {
  const storedItems = localStorage.getItem('setItems');
  if (storedItems) {
    return JSON.parse(storedItems);
  } else {
    return [];
  }
}
*/
class UI {
    addProduct (item)
    {

const productList = document.getElementById('product-list');
const element = document.createElement('div');
element.innerHTML = ` <div class="card text-center mb-4">
<div class="card-body">
 <strong>Nombre:</strong> ${item.name}
 <br><strong>Cantidad:</strong> ${item.stock}
 <br><strong>Deposito:</strong> ${item.deposito}
 <br><img class="image-square" src="${item.cover}" alt="">
<br><a href="#" class='btn btn-danger' name="delete"> Borrar </a>

</div>

</div>

`; 
productList.appendChild(element);
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Elemento agregado con EXITO',
    showConfirmButton: false,
    timer: 3000
  })
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }
    deleteProduct(element)
    {
if (element.name === 'delete') {
element.parentElement.parentElement.parentElement.remove();
Swal.fire({
    icon: 'error',
    title: 'Borrado',
    text: 'Elemento borrado con EXITO!',
  })
    }
    }
      
      

    
}
document.getElementById("product-form").addEventListener('submit',function (e) {
   
    const name = document.getElementById('name').value;
    const stock = document.getElementById('stock').value;
    const year = document.getElementById('year').value;
    const deposito = document.getElementById('depositoSelection').value;
    const cover = document.getElementById('picture-url').value;


    const item = new Item (name,stock,year,deposito,cover);
   
    
    const ui = new UI();

    ui.addProduct(item);
    items.push(item);
    saveStorage(items);

    ui.resetForm();
    e.preventDefault();

});
document.getElementById('product-list').addEventListener('click',function(e)
{
    const ui = new UI()
    ui.deleteProduct(e.target)
});

window.addEventListener('load', function() {
    items.forEach(function(item) {
      const ui = new UI();
      ui.addProduct(item);
    });
  });



const apiKey = '3b28f3d1b413371135f85099d2a2cbd2';
const city = 'Buenos Aires';
const countryCode = 'AR';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const city = data.name;
    document.getElementById('temp').textContent = temp;
    document.getElementById('city').textContent = city;
  })
  .catch(error => {
    console.error('Error fetching weather data', error);
  });


 