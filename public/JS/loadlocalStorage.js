var tbody = document.querySelector("tbody");
var template = document.querySelector('#template');

for (var key in localStorage) {
    var clone = template.content.cloneNode(true);
    var td = clone.querySelectorAll("td");
    var local = JSON.parse(localStorage.getItem(key));
    td[0].textContent = local.name;
    td[1].textContent = local.lastName;
    td[2].textContent = local.group;
    tbody.appendChild(clone);
}
