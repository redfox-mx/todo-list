const settings = {
    input: {
        class: ['form-check-input', 'me-1'],
        type: 'checkbox'
    },
    list: {
        class: 'list-group-item'
    }
}

function addTask(title){
    let list = document.getElementById('task-list');
    let listItem = document.createElement('li');
    let input = document.createElement('input');

    input.setAttribute( 'type', settings.input.type);
    settings.input.class.forEach(_ => input.classList.add(_));
    
    
    listItem.appendChild(input);
    listItem.innerHTML += title;
    listItem.classList.add(settings.list.class);

    list.appendChild(listItem);
}


/*
let listElement = document.querySelectorAll(".form-check-input");
for(item of listElement){
    item.addEventListener('click', (e)=>{
        e.target.parentElement.classList.toggle('done')
    })
}
*/



