$(document).ready(function () {

    $('#logo').addClass('rollOut')

})

let storage = localStorage.getItem('lastname')
let isChecked = storage === null ? [] : JSON.parse(storage)

for(i=1; i<=87; i++){

  var adress='https://swapi.co/api/people/'+i+'/'

  $.ajax({
    url: adress,
    success: function(data){
      var pers = document.createElement('div')
      var parentElem = document.getElementById('pers_section')
      var checkbox = document.createElement('input')

      pers.className = 'pers'
      checkbox.setAttribute("type", "checkbox")
      checkbox.id = data.name
      apsent = isChecked.indexOf(data.name)
      if(apsent!== -1){
        checkbox.setAttribute("checked", "true")
      }
      pers.innerHTML = data.name
      pers.appendChild(checkbox)
      parentElem.appendChild(pers)
      document.getElementById(data.name).onchange = function(event) {
        const id = event.target.id
        if(document.getElementById(id).checked){

          isChecked.push(id)
          localStorage.setItem('lastname', JSON.stringify(isChecked))
        }else {
          var index = isChecked.indexOf(id)
          isChecked.splice(index, 1)
          localStorage.setItem('lastname', JSON.stringify(isChecked))
        }
      }
    }
  })
}












