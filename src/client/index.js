// imports js files
import { handleSubmit } from './js/formHandler'
import { isValidURL } from './js/isValidURL'

// import scss files
import './style/style.scss'

// start after the app fully loaded
window.addEventListener('DOMContentLoaded', () => {
    // console.log('Hello there')
    
    // get the form
    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        handleSubmit(event)
    })
});

export { handleSubmit, isValidURL }