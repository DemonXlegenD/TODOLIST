

function start(e) {
   
    e.dataTransfer.setData('text', e.target.getElementById('drag'));
    

    
}
function over(e){
    return false;
}

function drop(e){
    var ob= e.dataTransfer.getData("text");
    e.currentTarget.appendChild(document.getElementById(ob));
    e.stopPropagation();
    return false;
}

function valueoption() {
    let option = document.getElementById('cat').selectedIndex;
    console.log(option);
    getTasks(option);
}

function getTasks(opt){
	const form = document.querySelector("#new-task-form");
	const input1 = document.querySelector("#new-task-input1");
    const input2 = document.querySelector("#new-task-input2");
    const input3 = document.querySelector("#description");
	const list1_el = document.querySelector("#tasks1");
    const list2_el = document.querySelector("#tasks2");
    const list3_el = document.querySelector("#tasks3");

    
    form.addEventListener('submit', (e) => {
		e.preventDefault();
        let option = document.getElementById('cat').selectedIndex;
        console.log(option);


        /*DRAG AND DROP*/

        const drag = document.createElement('div');
        drag.classList.add('drag');
        drag.ondragstart = function(event) {
            event.dataTransfer.setData("Text", event.target.id);
            
          };
          
        
          
          /* Events fired on the drop target */
          document.ondragover = function(event) {
            event.preventDefault();
          };
          
          drag.ondrop = function(event) {
            event.preventDefault();
            if ( event.target.className == "droptarget" ) {
              var data = event.dataTransfer.getData("Text");
              event.target.appendChild(drag.getElementById(data));
            }
          };
        /*Le drop ne fonctionne pas, je n'ai pas eu le temps de l'inachever 
        car j'ai recontré beaucoup de problème et je sais qu'il y a des problèmes qui vont se rajouter comme par exemple si j'ai déplacé une card dans une autre catégorie 
        le numéro de la catégorie ne va pas changer et donc si je veux edit ou delete cela va l'effectuer sur une card ayant le numéro de catégorie de la card que je veux cibler*/

        
        /*CARD*/

        const card = document.createElement('div');
        card.classList.add('card');
        
        
        const card_body = document.createElement('div');
        card_body.classList.add('card-body');

        

        const row = document.createElement('div');
        row.classList.add('row');

        /* THE TASK */

		const task1 = input1.value;
        const task2 = input2.value;
        const task3 = input3.value;
        
        
        
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

        /*TASK*/

        const Title1 = document.createElement('h4');
        Title1.innerText= "TASK";
        task_content_el.appendChild(Title1);

		const task_input1_el = document.createElement('input');
		task_input1_el.classList.add('text');
		task_input1_el.type = 'text';
		task_input1_el.value = task1;
		task_input1_el.setAttribute('readonly', 'readonly');
        
        task_content_el.appendChild(task_input1_el);

        /*WHO*/

        const Title2 = document.createElement('h4');
        Title2.innerText= "WHO";
        task_content_el.appendChild(Title2);

        const task_input2_el = document.createElement('input');
		task_input2_el.classList.add('text');
		task_input2_el.type = 'text';
		task_input2_el.value = task2;
		task_input2_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input2_el);

        /*DESCRIPTION*/

        const Title3 = document.createElement('h4');
        Title3.innerText= "DESCRIPTION";
        task_content_el.appendChild(Title3);

        const task_input3_el = document.createElement('textarea');
		task_input3_el.classList.add('text');
		task_input3_el.type = 'text';
		task_input3_el.value = task3;
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

        
        /*ON RELIE LES ENFANTS ET LES PARENTS POUR BIEN STRUCTURER LES DIV*/

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

        row.appendChild(task_el);
        card_body.appendChild(row);
        
        card.appendChild(card_body);

        drag.appendChild(card);


        /*CATEGORIE CIBLEE*/

        if(option == 0) /*TO DO*/
        {
            list1_el.appendChild(drag);
        }
		if(option == 1) /*ONGOING*/
        {
            list2_el.appendChild(drag);
        }
        if(option == 2) /*DONE*/
        {
            list3_el.appendChild(drag);
        }

        /*ON REINITIALISE LES VALEURS DANS LA TO DO LIST*/

		input1.value = '';
        input2.value = '';
        input3.value = '';

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
        if(option == 0){task_delete_el.addEventListener('click', (e) => {
			list1_el.removeChild(drag);
		});}
        if(option == 1){task_delete_el.addEventListener('click', (e) => {
			list2_el.removeChild(drag);
		});}
        if(option == 2){task_delete_el.addEventListener('click', (e) => {
			list3_el.removeChild(drag);
		});}
		
	});
}

getTasks(0);


/*DARK MODE*/
function darkMode() {
    document.documentElement.style.setProperty('--ecriture', 'whitesmoke');
    document.documentElement.style.setProperty('--background', '#212121')  ;
    document.documentElement.style.setProperty('--fond', 'url(../image/imagefond.jpg)');
    var element = document.body;
    element.className = "dark-mode";
    
}

function lightMode() {
    document.documentElement.style.setProperty('--ecriture', 'black');
    document.documentElement.style.setProperty('--background', 'whitesmoke');
    document.documentElement.style.setProperty('--fond', 'url(../image/imagetexturecubique-modified.jpg)');
    var element = document.body;
    element.className = "light-mode";
}
/*FIN*/

/*THEME JOUR / NUIT*/ 

function themejour(){
    const date= new Date();
    const hour = date.getHours();

    if(hour > 5 || hour < 20)
    {
        lightMode();

    }
    else
    {
        darkMode();

    }
}
themejour();

/*FONCTIONNEMENT DU BOUTON DARKMODE*/

function darkOrlight(){
    var cb = document.querySelector('#darkorlight')

    if(cb.checked == false)
    {
        lightMode();
    }
    else
    {
        darkMode();
    }
}

