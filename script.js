const users = [
    {
        id: 1,
        login: 'user1',
        password: '12',
    },
    {
        id: 2,
        login: 'user2',
        password: '12',
    },
    {
        id: 3,
        login: 'user3',
        password: '12',
    },
    {
        id: 4,
        login: 'user4',
        password: '12',
    },
    {
        id: 5,
        login: 'user5',
        password: '12',
    },
    {
        id: 6,
        login: 'user6',
        password: '12',
    },
]

//#region Login part

const loginPageContainer = document.querySelector(".login-page");
const mainPage = document.querySelector(".main-page");
let currentUser = null;

document.querySelector("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    login();
});

function login() {
    let loginTry = document.getElementById("username").value;
    let passTry = document.getElementById("password").value;
    let checkedUser = users.find(user => {
        return user.login === loginTry && user.password === passTry
    })

    currentUser = checkedUser;


    loginPageContainer.style.display = "none";
    mainPage.style.display = "block";

    discover();
    getNotification();
    getAllFollowers();


    loginTry = "";
    passTry = "";
}


//logout part

const logOutButton = document.querySelectorAll(".logout");

logOutButton.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        logOut();
    })
})


function logOut() {
    loginPageContainer.style.display = "block";
    mainPage.style.display = "none";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

//#endregion

var user_followers = [];
var notifications = [];


function discover(){
    const tableBodyDiscover = document.getElementById("table_body_discover");

    tableBodyDiscover.innerHTML = '';

    users.filter(user => user.id != currentUser.id).forEach(du=>{
        const trBody = document.createElement('tr');

        trBody.innerHTML = `
        <td>${du.login}</td>
        <td><button data-id="${du.id}" type="button" onclick="sendNotification()" class="btn btn-primary follow-btn">Follow</button></td>
        `

        tableBodyDiscover.append(trBody);
    })

}

let newId = 0;
let newestId = 0;



function sendNotification(){

    let followBtn = document.querySelectorAll('.follow-btn');
    
    followBtn.forEach(btn=>{
        btn,addEventListener('click', function(e){
            e.preventDefault();

            let nextUser = Number(btn.getAttribute('data-id'));

            if(notifications.length){
                newId = notifications[notifications.length - 1].id;
            }
            else{
                newId = 0;
            }
        
            newId++;
        
            let notification = {
                id:newId,
                sender_id:currentUser.id,
                accepter_id:nextUser,
                accept:false
            }

            notifications.push(notification);

            if(user_followers.length){
                newestId = user_followers[user_followers.length - 1].id;
            }
            else{
                newestId = 0;
            }
        
            newestId++;


            let newFollower = {
                id:newestId,
                follower_id:nextUser,
                accept:false
            }

            user_followers.push(newFollower);

        })
    })

  
}

function getNotification(){

    const tableBodyNotification = document.querySelector('#table_body_notifications');

    notifications.filter(user=> user.accepter_id == currentUser.id)
    .forEach(notification => {
        const trBody = document.createElement('tr');

        trBody.innerHTML = `
        <td>${notification.login}</td>
        <td><button data-id="${notification.id}" type="button" onclick="Accept()" class="btn btn-primary accept-btn">Accept</button></td>
        `

        tableBodyNotification.append(trBody);
    })
}

function getAllFollowers(){

    const tableBodyFollowers = document.querySelector('#table_body_followers');


    user_followers.filter(follower => follower.accept)
    .forEach(fol => {
        const trBody = document.createElement('tr');

        trBody.innerHTML = `
        <td>${notification.login}</td>
        `

        tableBodyFollowers.append(trBody);
    })
}

function getAllFollowing(){

}

function Accept(){
    let acceptBtn = document.querySelectorAll('.accept-btn');

    acceptBtn.forEach(btn => function(e){
        e.preventDefault();

        let nextUser = Number(btn.getAttribute('data-id'));

        user_followers.forEach(us => {
            if(us.follower_id == nextUser){
                us.accept = true;
            }
        })
    });
}