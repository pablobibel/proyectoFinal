// Crea un array de USERS 
let users = [];

// ver si existe un usuario ya pre-registrado
if (localStorage.getItem("users")) {
  //si hay, parsearlo y setiar user value
  users = JSON.parse(localStorage.getItem("users"));
}


const registerUser = () => {
  // obtener valores del input
  const username = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const isAdmin = document.getElementById("admin").checked

  // crear un objeto nuevo de usuario
  const newUser = { user: username, pass: password, email: email , isAdmin};

  // pushear el nuevo usuario
  users.push(newUser);

  // guardarlo en el storage
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "main.html";
};


const loginUser = () => {
  // obtener inputs del login
  const username = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  // fijarse si ya hay alguno registrado
  if (users.length === 0) {
    alert("No users registered.");
    return;
  }


  // loopear en el array de users a ver si hay un match
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === username && users[i].pass === password) {
      // si encuentra un match fijarse si es admin
      if (users[i].isAdmin) {
        // aca va la pagina directiada a admins
       
        sessionStorage.setItem("user", JSON.stringify(users[i]));
        setTimeout(() => {
          window.location.href = "loginAdmin.html";
        }, 100);
        return;
      } else {
        // aca va el window.location a otra pagina que no sea de admins
        sessionStorage.setItem("user", JSON.stringify(users[i]));
        setTimeout(() => {
          window.location.href = "loginUser.html";
        }, 100);
        return;
      }

    }
  }

  // no match? no problem 
  alert("Username or password is incorrect.");
};

console.log(sessionStorage.getItem("user"))
// llamar a las funciones con eventlistener
document.getElementById("btnRegistrarse").addEventListener("click", registerUser);
document.getElementById("btnLogin").addEventListener("click", loginUser);


