// Inject CSS stylesheet into HTML

const cardTemplate = document.createElement('template');

const buttonText = "see more"

cardTemplate.innerHTML = `
    <style>
        @import "Team/TeamMemberCard/TeamMemberCard.css";
    </style>
    <div id="member-card-container">
        <img src="// IMAGE URL //" alt="// IMAGE ALT //" />
        <div id="member-card-description-container">
            <div id="member-card-description-name"> // NAME // </div>
            <div id="member-card-description-title"> // TITLE //</div>
            <div id="member-card-description-intro"> // SHORT INTRO //</div>
        </div>
        <a href="details.html" id="member-card-button">${buttonText.toUpperCase()}</a>
    </div>
`;

class TeamMemberCard extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(cardTemplate.content.cloneNode(true));

        shadow.querySelector('img').src = this.getAttribute('imgURL');
        shadow.querySelector('img').alt = (this.getAttribute('name') + " " + this.getAttribute('title'));
        shadow.getElementById('member-card-description-name').innerText = this.getAttribute('name');
        shadow.getElementById('member-card-description-title').innerText = this.getAttribute('title');
        shadow.getElementById('member-card-description-intro').innerText = this.getAttribute('intro');
        
    }
}

window.customElements.define('team-member-card', TeamMemberCard);