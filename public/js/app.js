

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=chennai').then((response) =>{

// response.json().then((data) => {
//     if(data.error){
//        console.log(data.error)
//     }else{
//         console.log(data.location)
//     }
//  })
// })

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value

    msgOne.textContent = 'Loading..'
    msgTwo.textContent = ''
  
    
    
    fetch('gi/weather?address='+ location).then((response) =>{

   response.json().then((data) => {
    if(data.error){
        msgOne.textContent = data.error
    }else{
       
        console.log(data)
        
       msgTwo.textContent =data[0].forecast+ ', Place: '+ data[0].location
    //    msgThree.textContent =
       
    
    }
 })
})

})