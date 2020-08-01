

const template = document.createElement('template');
template.innerHTML = `
    <team-member-card></team-member-card>
`;

class Team extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    }
}

window.customElements.define('stamy-team', Team);