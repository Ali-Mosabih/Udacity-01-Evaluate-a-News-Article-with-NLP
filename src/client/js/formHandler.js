import { isValidURL } from "..";

const myAPI = 'http://localhost:8000'

function handleSubmit(event) {
    // event.preventDefault()

    // get url
    let articleUrl = document.getElementById('url').value

    // check if the url is valid or not
    if (isValidURL(articleUrl)) {
        // console.log(articleUrl);
        postData(`${myAPI}/check-url`, { articleUrl })
            .then(res => {
                // get data from meaningcloude API, then update the UI
                updateUI(res)
            })
        // console.log("::: Form Submitted :::")
    }
    else {
        // execute if the url not valid
        // console.log("Url is not valid")
        alert("Url is not valid")
        document.getElementById('url').value = '';
        // articleUrl = '';
        return
    }

    // sent the url to the local API, then get the result from MeaningCloude API
    async function postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            const urlAnalysisData = await res.json();
            // console.log(urlAnalysisData)
            return urlAnalysisData;
        }
        catch (error) {
            console.log(error);
        }
    }

    // Update the UI with the result
    function updateUI(urlAnalysisData) {
        document.getElementById('polarity').innerHTML = `Polarity: ${urlAnalysisData.score_tag}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${urlAnalysisData.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${urlAnalysisData.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${urlAnalysisData.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${urlAnalysisData.irony}`;
    }
}

export { handleSubmit }
