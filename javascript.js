const addTodo = document.querySelector('.new-task-submit');
const newTodoTask = document.querySelector('#new-task-input1');
const newTodoPerson = document.querySelector('#new-task-input2');
const newTodoDescription = document.querySelector('#new-task-input3');
const newTodoCategory = document.querySelector('#cat');

const columns = document.querySelectorAll('.task-list');
const columnTodo = document.getElementById('column-to-do');
const columnOnGoing = document.getElementById('column-on-going');
const columnDone = document.getElementById('column-done');

let id = 0;

addTodo.addEventListener('click', () => {
    if(newTodoTask.value !== '' && newTodoPerson.value !== '' && newTodoDescription.value !== ''){
          const objectData = {
        id: id,
        task: newTodoTask.value,
        person: newTodoPerson.value,
        description: newTodoDescription.value,
        category: newTodoCategory.value,
    };

    const card = createCard(objectData);
    objectData["card"] = card;
    if (newTodoCategory.value === "ongoing") {
        columnOnGoing.appendChild(card);
    } else if (newTodoCategory.value === "done") {
        columnDone.appendChild(card);
    } else {
        columnTodo.appendChild(card);
    }

    newTodoTask.value = '';
    newTodoPerson.value = '';
    newTodoDescription.value = '';
    id++;
    }
});

function createCard(data) {
    /*CARD*/
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', true);

    /*BODY*/
    const card_body = document.createElement('div');
    card_body.classList.add('card-body');

    const row = document.createElement('div');
    row.classList.add('row');

    /* THE TASK */
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

    /*TASK*/

    const Title1 = document.createElement('h4');
    Title1.innerText = "TASK";
    task_content_el.appendChild(Title1);

    const task_input1_el = document.createElement('input');
    task_input1_el.classList.add('text');
    task_input1_el.type = 'text';
    task_input1_el.value = data.task;
    task_input1_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input1_el);

    /*WHO*/

    const Title2 = document.createElement('h4');
    Title2.innerText = "WHO";
    task_content_el.appendChild(Title2);

    const task_input2_el = document.createElement('input');
    task_input2_el.classList.add('text');
    task_input2_el.type = 'text';
    task_input2_el.value = data.person;
    task_input2_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input2_el);

    /*DESCRIPTION*/

    const Title3 = document.createElement('h4');
    Title3.innerText = "DESCRIPTION";
    task_content_el.appendChild(Title3);

    const task_input3_el = document.createElement('textarea');
    task_input3_el.classList.add('text');
    task_input3_el.type = 'text';
    task_input3_el.value = data.description;
    task_input3_el.setAttribute('readonly', 'readonly');

    task_content_el.appendChild(task_input3_el);

    /*BOUTON ACTION*/

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';

    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Delete';

    task_delete_el.addEventListener('click', () => {
        card.parentElement.removeChild(card)
    })

    /*ON RELIE LES ENFANTS ET LES PARENTS POUR BIEN STRUCTURER LES DIV*/

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    row.appendChild(task_el);
    card_body.appendChild(row);

    card.appendChild(card_body);

    /*FONCTIONNEMENT DU BOUTON EDIT*/

    task_edit_el.addEventListener('click', (e) => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
            task_edit_el.innerText = "Save";
            task_input1_el.removeAttribute("readonly");
            task_input1_el.focus();
            task_input2_el.removeAttribute("readonly");
            task_input2_el.focus();
            task_input3_el.removeAttribute("readonly");
            task_input3_el.focus();
        } else {
            task_edit_el.innerText = "Edit";
            task_input1_el.setAttribute("readonly", "readonly");
            task_input2_el.setAttribute("readonly", "readonly");
            task_input3_el.setAttribute("readonly", "readonly");
        }
    });

    return card;
}


/*DRAGGABLE*/

document.addEventListener("dragstart", (e)=>{
    e.target.classList.add("dragging");
})

document.addEventListener("dragend", (e)=>{
    e.target.classList.remove("dragging");
})

function getNewPosition(column, posY){
    const cards = column.querySelectorAll('.card:not(.dragging)');
    let result;

    for(let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if(posY>= boxCenterY) result = refer_card;
    }

    return result;
}
columns.forEach((card)=>{
    card.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(card, e.clientY);

        if(applyAfter){
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            card.prepend(dragging);
        }
    })
})

/*DARK MODE*/
function darkMode() {
    document.documentElement.style.setProperty('--ecriture', 'whitesmoke');
    document.documentElement.style.setProperty('--background', '#212121');
    document.documentElement.style.setProperty('--fond', 'rgb(80, 80, 80)');
    var element = document.body;
    element.className = "dark-mode";

}

function lightMode() {
    document.documentElement.style.setProperty('--ecriture', 'black');
    document.documentElement.style.setProperty('--background', 'whitesmoke');
    document.documentElement.style.setProperty('--fond', 'rgb(240, 240, 240)');
    var element = document.body;
    element.className = "light-mode";
}
/*FIN*/

/*THEME JOUR / NUIT*/

function themejour() {
    const date = new Date();
    const hour = date.getHours();

    if (hour > 5 || hour < 20) {
        lightMode();

    }
    else {
        darkMode();

    }
}
themejour();

/*FONCTIONNEMENT DU BOUTON DARKMODE*/

function darkOrlight() {
    var cb = document.querySelector('#darkorlight')

    if (cb.checked == false) {
        lightMode();
    }
    else {
        darkMode();
    }
}

