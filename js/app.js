const settings = {
    input: {
        styles: ['form-check-input', 'me-1'],
        type: 'checkbox'
    },
    list: {
        styles: ['list-group-item']
    }
}

let list = document.getElementById('task-list');

function addTask(task, id) {
    let listItem = document.createElement('li');
    let input = document.createElement('input');

    settings.input.styles.forEach( style => input.classList.add(style) );
    settings.list.styles.forEach( style => listItem.classList.add(style) );

    input.setAttribute('type', settings.input.type);
    listItem.setAttribute( 'data-id', id);
    listItem.appendChild(input);
    listItem.innerHTML += task.title;

    list.appendChild(listItem);
    postHandler(id, task.done);
}

function postHandler(id, state) {
    let input = document.querySelector(`[data-id=${id}] input`); 

    if(state){
        input.parentElement.classList.add('done');
        input.checked = true;
    }

    let hander = (event) => {
        db.collection('todo').doc(id).update({
            done: event.target.checked
        })
        .then( () => {
            event.target.parentElement.classList.toggle('done');
        });
    }

    input.addEventListener('click', hander);
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
    db.collection('todo').add(task).then( _ => console.log(_.id))
});

