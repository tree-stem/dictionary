import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {

    async function getDef(word, callback) {
        try {
            const firstWordOnly = word.split(" ")[0]
            const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${firstWordOnly}?key=${config.apiKey}`);

            const json = await response.json();
            const shortDef = json
                .map(obj => obj.shortdef)
                .flat();
            callback(shortDef)

        } catch (error) {
            console.error(`Request failed: ${error.message}`);
        }
    }

    const displayShortDef = (shortDef) => {
        const shortDefDisplay = document.createElement('p');
        shortDefDisplay.innerHTML = `<p class='definition'>${shortDef[0]}</p>`
        if (!form.nextElementSibling) {
            form.insertAdjacentElement("afterend", shortDefDisplay);
        } else {
            form.nextElementSibling.remove();
            form.insertAdjacentElement("afterend", shortDefDisplay);
        }
    }

    const wordSearch = document.querySelector('input[type="text"]');
    const form = document.getElementById('search-bar');


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = wordSearch.value;
        if (query) {
            getDef(query, displayShortDef);
        }
    });
});
