const login= document.getElementById('loginButton');


login.addEventListener('click', (e) => {

    
    e.preventDefault();
    
    let username= document.getElementById('username');
    let password= document.getElementById('password');

    let user = username.value;
    let pass=password.value;


    let user_name = document.getElementById("username");
    let userName = user_name.value;
    //console.log(aa);
    let doc1=document.getElementById("username");
    if (!userName) {
       // alert("enter ur name");
        doc1.style.border="2.5px solid red";	
        return false;
    }
    else if (userName.length < 3) {
       // alert("Name should have Minimum  3 character!");
       doc1.style.border="2.5px solid red";	
     return false;
    }
    else{
        doc1.style.border="1px solid black";	
        
    }

    let pass_word = document.getElementById("password");
    let passWord = pass_word.value;
    let doc2=document.getElementById("password");

    if (!passWord) {
       // alert("enter ur password");
        doc2.style.border="2.5px solid red";	
        return false;
    }
    else{
        doc2.style.border="1px  solid black";	
            

    }
    // console.log(user);
    // console.log(pass);
    validateUserLogin(user,pass);
    })

const gitHubForm = document.getElementById('githubButton');

gitHubForm.addEventListener('click', (e) => {


    e.preventDefault();

 
    let usernameInput = document.getElementById('usernameInput');

    let gitHubUsername = usernameInput.value;
   
    requestUserRepos(gitHubUsername);

})
function validateUserLogin(user_name, pass_word) {

      const url = '/data/users.json';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {


        const data = JSON.parse(this.response);

        let i, flag = 0;
        for (i = 0; i < 4; i++) {
            if ((user_name == data[i].username) && (pass_word== data[i].password)) {
                flag = 1;
                break;
            }
            else  {
                
                let result=document.getElementById("invalid-res");
            result.innerHTML="Enter valid username and password";
    
            }
        }
        if (flag === 1) {
            let result=document.getElementById("valid-res");
           result.innerHTML="Successfully login your page";
          
           alert("success");
            document.getElementById('loginPage').style.display = "none";
            document.getElementById('githubPage').style.display = "block";
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
