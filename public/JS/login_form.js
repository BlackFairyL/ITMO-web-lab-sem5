window.onload = function () {
  async function authEmail() {
    console.log("KEK")
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = `{
    "formFields": [
        {
            "id": "email",
            "value": "${email}"
        },
        {
            "id": "password",
            "value": "${password}"
        }
    ]
}`;
    await fetch('/auth/signin', {
      method: "POST",
      headers: {'Accept': '*/*',
      'Content-Type': 'application/json'},
      body: data
    }).then(function(response){
      response.json().then(function(data) {
        if (data.status !== "OK") {
          document.getElementById("error").style.display = "block";
        }
        else {
          closeForm();
          window.location.href = '/';
        }
      });
    }).catch(function(error) {
      console.log('Fetch Error:', error);
    });
  }

  const auth_form = document.getElementById('authform');
  if(auth_form) {
    auth_form.addEventListener(
      'submit',
      function(e) {
        authEmail();
      },
      true,
    );
  }

  async function registration(){
    let email = document.getElementById("email_reg").value;
    let password = document.getElementById("password_reg").value;
    let password_two = document.getElementById("password_reg_two").value;
    if(password !== password_two){
      console.log(password);
      console.log(password_two);
      document.getElementById("error_form").style.display = "block";
      return;
    }

    let data = `{
    "formFields": [
        {
            "id": "email",
            "value": "${email}"
        },
        {
            "id": "password",
            "value": "${password}"
        }
    ]
}`;
    await fetch('/auth/signup', {
      method: "POST",
      headers: {'Accept': '*/*',
        'Content-Type': 'application/json'},
      body: data
    }).then(function(response){
      response.json().then(function(data) {
        if (data.status !== "OK") {
          console.log(data);
          document.getElementById("error_form").innerHTML = data.formFields[0].error;
          document.getElementById("error_form").style.display = "block";
          let id = data.formFields[0].id;

        }
        else {
          window.location.href = '/';
        }
      });
    }).catch(function(error) {
      console.log('Fetch Error:', error);
    });
  }

  const reg_form = document.getElementById('regform');
  if(reg_form) {
    reg_form.addEventListener(
      'submit',
      function(e) {
        registration();
      },
      true,
    );
  }
}


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}