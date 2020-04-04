let monsterCreate = document.querySelector('#create-monster')
let monsterContainer = document.querySelector('#monster-container')
let monsterBody = document.querySelector('body')
let counter = 1




monsterCreate.innerHTML = `<form id ="monster-form">
                         <input id="name" name="name" placeholder="name...">
                         <input id="age" name="age" placeholder="age...">
                         <input id="description" name="description" placeholder="description...">
                         <button> Create </button>
                         </form>`


function monsterAdd(monster){
    let monsterDiv = document.createElement('div')
    monsterDiv.dataset.id = monster.id
    monsterDiv.innerHTML = `<h2>${monster.name}</h2>
                            <h4>Age: ${monster.age}</h4>
                            <p>${monster.description}</p>
                            <button class="delete-button">Remove</delete>
                            `
    monsterContainer.append(monsterDiv)
}

function fetchMonsters(){fetch(`http://localhost:3000/monsters/?_limit=1000&_page=${counter}`)
                             .then(response => response.json())
                             .then(monster => {
                                 monsterContainer.innerHTML = ""
                                 monster.forEach(monster => monsterAdd(monster))
                             })
}

fetchMonsters()


function monsterFetchAdder(monster){
    fetch(`http://localhost:3000/monsters/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(monster)
    })
     .then(response => response.json())
     .then(monster => fetchMonsters())
}



monsterCreate.addEventListener('submit', e=>{
    e.preventDefault()
    let name = e.target.name.value
    let age = e.target.age.value
    let description = e.target.description.value
    let monster = {
        name,
        age,
        description
    }
    e.target.name.value = ""
    e.target.age.value = ""
    e.target.description.value = ""
    monsterFetchAdder(monster)

})


let forwardButton = document.querySelector('#forward')
let backButton = document.querySelector('#back')

forwardButton.addEventListener('click', e=>{   
        counter += 1
        monsterContainer.innerHTML = ""
        fetchMonsters()
})




backButton.addEventListener('click', e=>{
    if(counter === 1){
        counter =1 
    }
    else{
        counter--
    }
    monsterContainer.innerHTML = ""
    fetchMonsters() 
})



function monsterDelete(id,monsterFound){
    fetch(`http://localhost:3000/monsters/${id}`, {
        method: 'delete'
      })
      .then(response => {
          if(response.ok){
              monsterFound.remove()
          }
      })
}




monsterContainer.addEventListener('click', e=>{
    if(e.target.matches('.delete-button')){
        
        let monsterFound = e.target.closest('div')
        let id = monsterFound.dataset.id
        monsterDelete(id, monsterFound)
        

    }
})
