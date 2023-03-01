
let cart =[]
let modelQt = 1
let modalKey = 0
// (e) ou (el) são usados para o elementos . para tira o return tiramos o {}

//querySelector vai Retorna o item 

const cEl= (el) => document.querySelector(el)

// querySelectorall vai Retornara com  array 
const cA = (el) => document.querySelectorAll(el)

// Listagem das Pizzas
pizzaJson.map((item,index)=>{
 let pizzaItem = cEl('.models .pizza-item').cloneNode(true)





 pizzaItem.setAttribute('data-key',index)// setar Atributo 
 pizzaItem.querySelector('.pizza-item--img img').src=item.img 
 pizzaItem.querySelector('.pizza-item--price').innerHTML= `R$: ${item.price.toFixed(2)}`
 pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name
 pizzaItem.querySelector('.pizza-item--desc').innerHTML= item.description

 // abrir model 
 pizzaItem.querySelector('a').addEventListener('click',(e)=>{
  e.preventDefault() // previna o evento padrão

   // proprio elemento (closest significa ache o elemento mais proximo ) 
   let key = e.target.closest('.pizza-item').getAttribute('data-key')
   modelQt = 1 
   modalKey = key
   cEl('.pizzaBig img').src=pizzaJson[key].img
   cEl('.pizzaInfo h1').innerHTML=pizzaJson[key].name
   cEl('.pizzaInfo--desc').innerHTML=pizzaJson[key].description
   cEl('.pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price.toFixed(2)}`
   cEl('.pizzaInfo--size.selected').classList.remove('selected')
   
   cA('.pizzaInfo--size').forEach ((size,sizeIndex)=>{
     
    if(sizeIndex==2){
     size.classList.add('selected')
    }
    size.querySelector('span').innerHTML=pizzaJson[key].sizes[sizeIndex]


   })// forEachpara cada um dos itens
   cEl('.pizzaInfo--qt').innerHTML= modelQt
  cEl('.pizzaWindowArea').style.opacity= 0
  cEl('.pizzaWindowArea').style.display="flex"
  setTimeout(()=>{
   cEl('.pizzaWindowArea').style.opacity= 1
  },200)
  
 })


 // preencher as informações em pizzaitem
 
 cEl('.pizza-area').append(pizzaItem )

 
})
// Evento do modal

function closeModel(){
 cEl('.pizzaWindowArea').style.opacity= 0
 setTimeout(()=>{
  cEl('.pizzaWindowArea').style.display='none'
 })

}
cA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{

 item.addEventListener('click',closeModel)
})
cEl('.pizzaInfo--qtmenos').addEventListener('click',()=>{
 if(modelQt > 1){
  modelQt--
  cEl('.pizzaInfo--qt').innerHTML= modelQt
 }

})
cEl('.pizzaInfo--qtmais').addEventListener('click',()=>{
 modelQt++
 cEl('.pizzaInfo--qt').innerHTML= modelQt
})
cA('.pizzaInfo--size').forEach ((size,sizeIndex)=>{
     
size.addEventListener('click',(e) =>{

 cEl('.pizzaInfo--size.selected').classList.remove('selected')

 size.classList.add('selected')

})


})
cEl('.pizzaInfo--addButton').addEventListener('click',()=>{
 

  let size= parseInt(cEl('.pizzaInfo--size.selected').getAttribute('data-key'))
  let identifier = pizzaJson[modalKey].id+'@'+size 

  let key = cart.findIndex((item) =>{
    return item.identifier == identifier

  })

  if(key > -1){
   cart[key].qt += modelQt
  }
  else{
    cart.push({
      identifier,
     id:pizzaJson[modalKey].id,
     size,
     qt:modelQt
    })
  }

  
  updateCart()
  closeModel()
})
 cEl('.menu-openner').addEventListener('click',() =>{
  if(cart.length > 0){
    cEl('aside').style.left = 0
  }
   
 })

 cEl('.menu-closer').addEventListener('click',()=>{
  cEl('aside').style.left = '100vw'
 })
 function updateCart(){
  cEl('.menu-openner span').innerHTML = cart.length
   let subTotal = 0
   let desconto =0
   let total = 0

  if(cart.length > 0){

   cEl('aside').classList.add('show')
   cEl('.cart').innerHTML=''

     for(let i in cart){
      let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)
      subTotal+= pizzaItem.price * cart[i].qt
      let cartItem = cEl('.models .cart--item').cloneNode(true)
      let pizzaSizeName;
      switch(cart[i].size){
        case 0:
          pizzaSizeName = 'P'
        break
        case 1:
          pizzaSizeName = 'M'
          break
        case 2:
        pizzaSizeName = 'G'
        break

      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

       cartItem.querySelector('img').src = pizzaItem.img
       cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
       cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
       cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
        if(cart[i].qt > 1 ){
          cart[i].qt--
        
        }
        else{
          cart.splice(i,1) //fechamento do cart 
        }
        updateCart()
      })
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
        cart[i].qt++
        updateCart()
      })

      cEl('.cart').append(cartItem)
     }
     desconto = subTotal * 0.1
     total = subTotal - desconto
     cEl('.subtotal span:last-child').innerHTML = `R$: ${subTotal.toFixed(2)}`
     cEl('.desconto span:last-child').innerHTML = `R$: ${desconto.toFixed(2)}`
     cEl('.total span:last-child').innerHTML = `R$: ${total.toFixed(2)}`
  }
  else{
    cEl('aside').classList.remove('show')
    cEl ('aside').style.left = '100vw'
  }
 }
