

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "Team/Team.css";
    </style>
    <div id="team-container">
        <team-member-card 
            imgURL="https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1"
            name="Bea"
            title="Coach"
            intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."
        >
        </team-member-card>
        <team-member-card 
            imgURL="https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1"
            name="Bea"
            title="Coach"
            intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."
        >
        </team-member-card>
        <team-member-card 
            imgURL="https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1"
            name="Bea"
            title="Coach"
            intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."
        >
        </team-member-card>
    </div>
`;

class Team extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('stamy-team', Team);