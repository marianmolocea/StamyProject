// Inject CSS stylesheet into HTML

const cardTemplate = document.createElement('template');

const buttonText = "See More"

cardTemplate.innerHTML = `
    <style>
        @import "Team/TeamMemberCard/TeamMemberCard.css";
    </style>
    <div id="member-card-container">
        <img src="// IMAGE URL //" alt="// IMAGE ALT //" />
        <div id="member-card-description-container">
            <div id="member-card-description-name"> // NAME // </div>
            <div id="member-card-description-role"> // ROLE //</div>
            <div id="member-card-description-intro"> // SHORT INTRO //</div>
        </div>
        <a href="#" id="member-card-button">${buttonText}</a>
    </div>
`;

class TeamMemberCard extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(cardTemplate.content.cloneNode(true));

        shadow.querySelector('img').src = this.getAttribute('imgURL');
        shadow.querySelector('img').alt = (this.getAttribute('name') + " " + this.getAttribute('role'));
        shadow.getElementById('member-card-description-name').innerText = this.getAttribute('name');
        shadow.getElementById('member-card-description-role').innerText = this.getAttribute('role');
        shadow.getElementById('member-card-description-intro').innerText = this.getAttribute('intro');
        
    }
}

window.customElements.define('team-member-card', TeamMemberCard);