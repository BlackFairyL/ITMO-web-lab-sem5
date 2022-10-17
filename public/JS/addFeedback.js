window.onload = function () {

  function addFeedback(){
    let content = document.getElementById("feedback").value;
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
  }


  const feedback = document.getElementById('feedbtn');
  if (feedback) {
    feedback.addEventListener(
      'submit',
      function(e) {
        addFeedback();
      },
      true,
    );
  }

}