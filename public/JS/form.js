window.onload = function() {
    function addRow(obj) {
        var tbody = document.querySelector("tbody");
        var template = document.querySelector('#template');
        var clone = template.content.cloneNode(true);
        var td = clone.querySelectorAll("td");
        td[0].textContent = obj.name;
        td[1].textContent = obj.lastName;
        td[2].textContent = obj.group;
        tbody.appendChild(clone);
    }
   function send(){
        let id = localStorage.length;
        let name = document.querySelector("#name").value;
        let lastName = document.querySelector("#lastName").value;
        let group = document.querySelector("#group").value;

        if (!(name == '' || lastName == '' || group == "Выберете группу")){
            localStorage.setItem(id.toString(), JSON.stringify({name, lastName, group}));
            addRow({name, lastName, group});
            default_value();
        }
    }

    function default_value() {
        document.querySelector("#name").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#group").value = "Выберете группу";
    }   
    const submit_form = document.querySelector('form');
    submit_form.addEventListener("submit",function(e){
        send();
    }, true);
}
