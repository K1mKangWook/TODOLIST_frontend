var main_box = document.querySelector('#main_box');
var ul = document.querySelector('ul');
const text = document.querySelector('#input_todo');

function saveItemsFn () { // 로컬에 데이터 저장하기
    const saveItems = []; // 빈 배열 할당
    //const ul = document.querySelector('ul'); 
  	for (let i = 0; i < ul.children.length; i++){
        const todoObj = {
        	contents: ul.children[i].querySelector('span').textContent, // 리스트 목록
          	complete: ul.children[i].classList.contains('complete') // 완료 표시된 리스트
        };
        saveItems.push(todoObj);
    }
    if (saveItems.length === 0) { // 데이터가 없다면 값 삭제
        localStorage.removeItem('saved-items')
    }
    else {
        localStorage.setItem('saved-items',JSON.stringify(saveItems));
    }
}

const savedTodoList = JSON.parse(localStorage.getItem('saved-items')); // savedTodoList는 객체를 저장하는 배열

if (savedTodoList) {
    for (let i = 0; i < savedTodoList.length; i++) {
        createToDo(savedTodoList[i]);
    }
}

function createToDo(storageData) {
        var text_value = text.value;
        const li = document.createElement("li");
        const span = document.createElement("span"); 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        checkbox.addEventListener('click', () => {
            const sibling = checkbox.nextElementSibling;
            const parent = checkbox.parentElement;

            if(checkbox.checked) {
                sibling.style.color = 'gray';   
                sibling.style.textDecoration = 'line-through';
                parent.classList.toggle('complete');
            }
            else {
                sibling.style.color = 'black';
                sibling.style.textDecoration = 'none';
                parent.classList.toggle('complete');
            }

            saveItemsFn();
        })

        // li에 추가
        li.appendChild(checkbox);
        li.appendChild(span);

        //span 태그 더블클릭 시 삭제
        span.addEventListener('dblclick', () => {
            li.remove();
            DecreaseHeight();
            saveItemsFn();
        });

        span.addEventListener('mouseover', () => {
            span.style.cursor = 'pointer';
        });

         // 만약 storageData가 존재한다면
         if (storageData) {
            text_value = storageData.contents;
        }
        span.textContent = text_value;
        

        if (storageData && storageData.complete === true) {
            checkbox.checked = true;

            const sibling = checkbox.nextElementSibling;
            const parent = checkbox.parentElement;
            sibling.style.color = 'gray';   
            sibling.style.textDecoration = 'line-through';
            parent.classList.add('complete');  
        }


        IncreaseHeight();
        ul.appendChild(li);
        saveItemsFn();    
    
        text.value = '';
}

function DecreaseHeight() {
    var height = main_box.offsetHeight;
        height = height - 40;
        main_box.style.height = height.toString() + "px";
}
    
function IncreaseHeight() {
    var height = main_box.offsetHeight;
        height = height + 40;
        main_box.style.height = height.toString() + "px";
}

//enter 키를 눌렀을 때 ToDo를 만듬
function enterkey() {
    if (window.event.keyCode == 13 && text.value !== '') { // enter 키를 눌렀을 때
        createToDo();   
    }
}

//submit 버튼을 눌렀을 때 ToDo를 만듬
function clickSubmit() {
    if (text.value !== '') {
        createToDo();
    }
}

//전체삭제 버튼을 눌렀을 때 전체를 삭제함
function deleteAll() {
    while(ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    saveItemsFn();
    main_box.style.height = "230px";    
}

// 마우스를 제출이나 삭제 버튼 위에 올려 놓을경우 마우스 포인터를 바꿈
function MouseOntheSubmit(self) {
    self.style.cursor = 'pointer';
}