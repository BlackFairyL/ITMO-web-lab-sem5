window.onload = async function () {
  var tbody = document.querySelector('tbody');
  var template = document.querySelector('#template');

  function addRow(obj) {
    for (var i = 0; i < obj.length; i++) {
      var clone = template.content.cloneNode(true);
      var td = clone.querySelectorAll('td');
      td[0].textContent = obj[i].authorId;
      td[1].textContent = obj[i].title;
      td[2].textContent = obj[i].content;
      tbody.appendChild(clone);
    }
  }

  let request = await fetch('/feedback/feed');
  if (request.ok) {
    let data = await request.json();
    addRow(data);
  } else {
    document.querySelector('tbody').innerHTML = 'Что-то пошло не так';
  }
};
