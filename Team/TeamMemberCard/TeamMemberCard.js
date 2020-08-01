// Inject CSS stylesheet into HTML

const cardTemplate = document.createElement('template');

const userImage = "https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1"
const userName = "Bea";
const userRole = "Coach";
const userIntro = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."

const buttonText = "See More"

cardTemplate.innerHTML = `
    <style>
        @import "Team/TeamMemberCard/TeamMemberCard.css";

    </style>
    <div class="member-card-container">
        <img src=${userImage} alt=${`${userName} + ${userRole}`}/>
        <div class="member-card-description-container">
            <div class="member-card-description-name">${userName}</div>
            <div class="member-card-description-role">${userRole}</div>
            <div class="member-card-description-intro">${userIntro}</div>
        </div>
        <a href="#" class="member-card-button">${buttonText}</a>
    </div>
`;

class TeamMemberCard extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(cardTemplate.content.cloneNode(true));
    }
}

window.customElements.define('team-member-card', TeamMemberCard);