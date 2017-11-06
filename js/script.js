$(document).ready(function () {
  $('#logo').addClass('rollOut')
})

const numberOfPers = 87

let i = 1
let persArr = []
let loaderWidth = 0
let loaderPersents = 0

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
        const loader = document.getElementById('loader')
        const loader_inner = document.getElementById('loader_inner')

        persArr.push(data.name)
        loaderWidth = loaderWidth + loader.clientWidth / numberOfPers
        loader_inner.style.width = loaderWidth + 'px'
        loaderPersents = loaderPersents + 100/numberOfPers
        loader_inner.innerHTML = Math.round(loaderPersents) + '%'
      }

      if (i <= numberOfPers) {
        return allPers()
      } else {

        let isChecked = localStorage.getItem('lastname') === null ? [] : JSON.parse(localStorage.getItem('lastname'))
        let parentElem = document.getElementById('pers_section')

        loader.style.display = 'none'
        parentElem.style.display = 'flex'
        for (let j = 0; j < numberOfPers; j++) {
          let pers = document.createElement('div')
          let checkbox = document.createElement('input')

          pers.className = 'pers'
          checkbox.setAttribute('type', 'checkbox')
          checkbox.id = persArr[j]
          absent = isChecked.indexOf(persArr[j])

          if (absent !== -1) {
            checkbox.setAttribute('checked', 'true')
          }

          pers.innerHTML = persArr[j]
          pers.appendChild(checkbox)
          parentElem.appendChild(pers)

          document.getElementById(persArr[j]).onchange = function (event) {
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
        persArr = null
      }
    })
    .catch(e => {
      console.log(e)
    })
}

allPers()