//? Navbar expand
const navExpandButton = document.querySelector('#nav-expand-button')
const nav = document.getElementById('mainNav')

function handleClick() {
    nav.classList.toggle('open')
    const expandedState = nav.getAttribute('aria-expanded')
    nav.setAttribute('aria-expanded', !eval(expandedState))
};
navExpandButton.addEventListener('click', handleClick)
// Navbar expand END


//* The Card Factory
const cardFactory = (repoJson) => {

    // Create Elements
    const card = document.createElement('div')
    const cardHeader = document.createElement('h3')
    const cardBody = document.createElement('p')

    // Add classes
    card.classList.add('repo-card')
    cardHeader.classList.add('card-header')
    cardBody.classList.add('card-body')


    // Change Element Content (just the text)
    cardHeader.textContent = repoJson.name
    cardBody.textContent = repoJson.description

    // append child elements to the card
    card.appendChild(cardHeader)
    card.appendChild(cardBody)

    return card
}

const processingLine = (repoList, parentElement) => {
    parentElement.innerHTML = ''
    repoList.forEach((repo) => {
        parentElement.appendChild(cardFactory(repo))
    })
}

const fetchGitHubData = (username, callback, parentElement) => {
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url)
        .then(data => data.json())
        .then(json => callback(json, parentElement))
}

//! CHANGE YOUR USERNAME HERE
const usernames = ["purplebearddan"]


window.addEventListener('load', () => {

    //! CHANGE THE ID IN THE QUERY SELECTOR BRACKETS!!
    const mainElement = document.getElementById('mainContent')


    usernames.forEach(username => {
        fetchGitHubData(username, processingLine, mainElement)
    })
}, { once: true })
