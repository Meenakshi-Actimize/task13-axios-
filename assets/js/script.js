let tbody = document.querySelector('tbody');
let addBtn = document.querySelector('.add');
let form = document.querySelector('.form-wrapper');
let saveBtn = document.querySelector('.save');
let cancelBtn =  document.querySelector('.cancel');
let bookEle =  document.querySelector('#bname');
let authorEle =  document.querySelector('#bauthor');
let publishEle =  document.querySelector('#bpublish');
let rateEle =  document.querySelector('#brate');

let httpm =null;

let url ='http://localhost:3000/books/';
let baseurl ='http://localhost:3000/books/';

let books =[];

let id=null;

let data ={};

addBtn.onclick = function(){
    httpm="POST";
    clearForm();
    form.classList.add('active')
}


cancelBtn.onclick = function(){
    form.classList.remove('active')
}

saveBtn.onclick= function(){

    data.Bookname= bookEle.value;
    data.Bookauthor= authorEle.value;
    data.Publisher = publishEle.value;
    data.Rating = rateEle.value;
    if(httpm=="PUT"){
        data.id= id,
        url =url+data.id
    }
       
    fetch(url,
        { 
            method: httpm, 
            body: JSON.stringify(data), 
            headers: { "Content-type": "application/json" } 
        })
    .then((response)=>{
        
        url = baseurl;
        clearForm();
        form.classList.remove('active');
        getbooks();
    })


}

function clearForm(){
    bookEle.value =null;
    authorEle.value =null;
    publishEle.value= null;
    rateEle.value =null;
}



function getbooks(){
    
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        books = data;
        updateTable();

    })

    
}

getbooks();

function updateTable(){
    let data="";

    if(books.length>0){
        for(i= 0;i<books.length;i++){

            data+=  `<tr id="${books[i]['id']}">
                        <td>${books[i]['Bookname']}</td>
                        <td>${books[i]['Bookauthor']}</td>
                        <td>${books[i]['Publisher']}</td>
                        <td>${books[i]['Rating']}</td>
                        <td><button class="btn btn-primary" onclick="editbooks(event)">Edit</button></td>
                        <td><button class="btn btn-danger" onclick="deletebooks(event)">Delete</button></td>   
                     </tr>`
        }

     tbody.innerHTML=data;
     
    }
    else{
        tbody.innerHTML= "No records found...";

    }

}

function editbooks(e){
   form.classList.add('active');
   httpm="PUT";
   id= e.target.parentElement.parentElement.id;
   console.log("Form:", form);
   console.log("HTTP Method:", httpm);
   console.log("Book ID:", id);

  let selectedbooks = books.filter((m)=>{return m['id'] ==id})[0];
  bookEle.value= selectedbooks.Bookname;
  authorEle.value = selectedbooks.Bookauthor;
  publishEle.value = selectedbooks.Publisher;
  rateEle.value = selectedbooks.Rating;


   

}

function deletebooks(e){
    id= e.target.parentElement.parentElement.id;
     fetch(url+id, {method:'DELETE'})
     .then(
        ()=>{
            getbooks()
        }
     )

}



