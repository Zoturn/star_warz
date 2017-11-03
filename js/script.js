$(document).ready(function () {

  $('#logo').addClass('rollOut')

})

let i = 1

let storage = localStorage.getItem('lastname')
let isChecked = storage === null ? [] : JSON.parse(storage)

function allPers () {

  var address = 'https://swapi.co/api/people/' + i + '/'

  fetch(address)
    .then(response => {
    i++
    if (response.status !== 200) return false
  return response.json()
})
.then(data => {
    if (data) {
      let pers = document.createElement('div')
      let parentElem = document.getElementById('pers_section')
      let checkbox = document.createElement('input')

      pers.className = 'pers'
      checkbox.setAttribute('type', 'checkbox')
      checkbox.id = data.name
      absent = isChecked.indexOf(data.name)
      if (absent !== -1) {
        checkbox.setAttribute('checked', 'true')
      }
      pers.innerHTML = data.name
      pers.appendChild(checkbox)
      parentElem.appendChild(pers)
      document.getElementById(data.name).onchange = function (event) {
        const id = event.target.id
        if (document.getElementById(id).checked) {

          isChecked.push(id)
          localStorage.setItem('lastname', JSON.stringify(isChecked))
        } else {
          var index = isChecked.indexOf(id)
          isChecked.splice(index, 1)
          localStorage.setItem('lastname', JSON.stringify(isChecked))
        }
      }
    }
    if (i <= 88) return allPers()
})
.catch(e => {
    console.log(e)
})
}

allPers()









