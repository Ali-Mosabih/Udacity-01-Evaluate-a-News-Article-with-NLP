import { handleSubmit } from './js/formHandler'
import { isValidURL } from './js/isValidURL'

import './style/style.scss'

window.addEventListener('DOMContentLoaded', () => {
    // console.log('Hello there')

    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        handleSubmit(event)
    })
});

export { handleSubmit, isValidURL }