const login= document.getElementById('loginButton');


login.addEventListener('click', (e) => {

    
    e.preventDefault();
    
    let username= document.getElementById('username');
    let password= document.getElementById('password');

    let user = username.value;
    let pass=password.value;


    let a = document.getElementById("username");
    let aa = a.value;
    //console.log(aa);
    let doc1=document.getElementById("id1");
    if (aa === "") {
       // alert("enter ur name");
        doc1.innerHTML="Enter Your name!";	
        return false;
    }
    else if (aa.length < 3) {
       // alert("Name should have Minimum  3 character!");
       doc1.innerHTML="Name should have Minimum  3 character!";	

        return false;
    }
    else{
        doc1.innerHTML="";	
        
    }

    let b = document.getElementById("password");
    let bb = b.value;
    let doc2=document.getElementById("id2");

    if (bb === "") {
       // alert("enter ur password");
        doc2.innerHTML="Enter Your Password!";	
        return false;
    }
    else{
        doc2.innerHTML="";
            

    }
    // console.log(user);
    // console.log(pass);
    validateUserLogin(user,pass);
    })

const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {


    e.preventDefault();

 
    let usernameInput = document.getElementById('usernameInput');

    let gitHubUsername = usernameInput.value;
   
    requestUserRepos(gitHubUsername);

})
function validateUserLogin(u, p) {

    console.log("function loaded");
    // first.addEventListener('submit', (e) => {


        //e.preventDefault();
        let a = document.getElementById("username");
        let aa = a.value;
        //console.log(aa);
        let doc1=document.getElementById("id1");
        if (aa === "") {
           // alert("enter ur name");
            doc1.innerHTML="Enter Your name!";	
            return false;
        }
        else if (aa.length < 3) {
           // alert("Name should have Minimum  3 character!");
           doc1.innerHTML="Name should have Minimum  3 character!";	

            return false;
        }
        else{
            doc1.innerHTML="";	
            
        }

        let b = document.getElementById("password");
        let bb = b.value;
        let doc2=document.getElementById("id2");

        if (bb === "") {
           // alert("enter ur password");
            doc2.innerHTML="Enter Your Password!";	
            return false;
        }
        else{
            doc2.innerHTML="";
            	

        }

    // })




    const url = '/data/users.json';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {


        const data = JSON.parse(this.response);

        let i, flag = 0;
        for (i = 0; i < 4; i++) {
            if ((u == data[i].username) && (p == data[i].password)) {
                flag = 1;
                break;
            }
            else  {
                
                let r=document.getElementById("res");
            r.innerHTML="Enter valid username and password";
    
            }
        }
        if (flag === 1) {
            let r=document.getElementById("res");
           r.innerHTML="Successfully login your page";
          
           alert("success");
            document.getElementById('first').style.display = "none";
            document.getElementById('sec').style.display = "block";
        }
       
    };

    xhr.send();

}

function requestUserRepos(username) {

   
    const xhr = new XMLHttpRequest();


    const url = `https://api.github.com/users/${username}/repos`;

   
    xhr.open('GET', url, true);

    xhr.onload = function() {

        
        const data = JSON.parse(this.response);
        let root = document.getElementById('userRepos');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');

     
            let li = document.createElement('li');

           
            li.classList.add('list-group-item')
                
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
           
            ul.appendChild(li);
        } else {

            let ul = document.getElementById('userRepos');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>Number of Public Repos:${data.length}</p>`)
            ul.appendChild(p);
        
            for (let i in data) {
              
                let li = document.createElement('li');

                li.classList.add('list-group-item')

               
                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

               
                ul.appendChild(li);

            }

        }
    }

    xhr.send();

}
