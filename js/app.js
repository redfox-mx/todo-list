const settings = {
    input: {
        styles: ['form-check-input', 'me-1'],
        type: 'checkbox'
    },
    list: {
        styles: ['list-group-item', 'd-flex']
    },
    icon: {
        styles: ['material-icons-outlined', 'icon']
    }
}

let list = document.getElementById('task-list');

function addTask(task, id) {
    let listItem = document.createElement('li');
    let input = document.createElement('input');
    let delet = document.createElement('i');

    settings.input.styles.forEach( style => input.classList.add(style) );
    settings.list.styles.forEach( style => listItem.classList.add(style) );
    settings.icon.styles.forEach( style => delet.classList.add(style) );

    delet.innerHTML = 'delete';
    input.setAttribute('type', settings.input.type);
    listItem.setAttribute( 'data-id', id);
    listItem.appendChild(input);
    listItem.innerHTML += '<span>' + task.title + '</span>';
    listItem.appendChild(delet);

    list.appendChild(listItem);
    postHandler(id, task.done);
}

function removeTask(id) {
    let listItem = document.querySelector(`li[data-id=${''+id}]`);
    list.removeChild(listItem);
}

function postHandler(id, state) {
    let input = document.querySelector(`[data-id=${''+id}] input`); 
    let trash = document.querySelector(`[data-id=${''+id}] .icon`); 

    if(state){
        input.parentElement.querySelector('span')
            .classList
            .toggle('done');
        input.checked = true;
    }

    let checkedHander = (event) => {
        db.collection('todo').doc(id).update({
            done: event.target.checked
        })
        .then( () => {
            event.target.parentElement.querySelector('span')
            .classList
            .toggle('done');
        });
    }

    let deleteHandler = (event) => {
        db.collection('todo').doc(id).delete()
        .then(removeTask(id));
    }

    input.addEventListener('click', checkedHander);
    trash.addEventListener('click', deleteHandler);
}

db.collection('todo').get().then((snapshot)=>{
    snapshot.docs.forEach( doc => addTask(doc.data(), doc.id) )
})

let form = document.getElementById('todo-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let task = {
        done: false,
        title: form.task.value
    }
    db.collection('todo').add(task).then( _ => addTask(task, _.id));
});

