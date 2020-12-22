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

    if(task.done) listItem.classList.add('done');

    list.appendChild(listItem);
}

db.collection('todo').get().then((snapshot)=>{
    snapshot.docs.forEach( doc => addTask(doc.data(), doc.id) )
})



