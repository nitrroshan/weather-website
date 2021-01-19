
// fetch('http://localhost:3000/weather?address=berhampur').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const mssgOne=document.querySelector('#mssg-1')
const mssgTwo=document.querySelector('#mssg-2')

// mssgOne.textContent='Hello World'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mssgOne.textContent=''
                mssgTwo.textContent=data.error
            }else{
                mssgOne.textContent=data.forecast
                mssgTwo.textContent=data.location
            }
        })
    })
})