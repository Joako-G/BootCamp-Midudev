const jobsListingSection = document.querySelector('.jobs-listings')
jobsListingSection.addEventListener('click', function (event) {
    const element = event.target

    if (element.classList.contains('button-apply-job')) {
        element.textContent = 'Aplicado'
        element.disabled = true
        element.classList.add('is-applied')
    }
})


/** OTROS EJEMPLOS 

const button = document.querySelector('#applied-job')

button.addEventListener('click', function () {
    button.textContent = 'Aplicado'
    button.style.backgroundColor = 'green'
    button.disabled = true
    button.classList.add('applied')
    console.log(button.classList)
})

const buttonsApplied = document.querySelectorAll('.button-apply-job')

buttonsApplied.forEach((button) => {
    button.addEventListener('click', function () {
        button.textContent = 'Aplicado'
        button.disabled = true
        button.classList.add('is-applied')
    })
})
*/