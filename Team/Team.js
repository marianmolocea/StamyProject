let datas = [
    {
        imageUrl: "https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1",
        name: "Bea B",
        title: "Coach",
        traits: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."],
    },
    {
        imageUrl: "https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1",
        name: "Bea",
        title: "Coach",
        //traits: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."],    
    },
    {
        imageUrl: "https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1",
        name: "Bea",
        title: "Coach",
        traits: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus tristique pharetra eu ipsum. Porttitor adipiscing viverra mauris nunc eu semper nisl."],    }
]

const generateTemplate = ({imageUrl, name, title, traits}) => {
    let element = `
        <div id="member-card-container">
            <img src=${imageUrl} alt=${name} />
            <div id="member-card-description-container">
                <div id="member-card-description-name">${name}</div>
                <div id="member-card-description-title">${title}</div>
                ${traits && traits.length > 0 ? 
                    `<div id="member-card-description-intro">
                        ${traits[0].split('').slice(0, 120).join('') + "..."}
                    </div>` : ""}
            </div>
            <a href="details.html" id="member-card-button">SEE MORE</a>
        </div>`
    return element;
}

let defaultColor = "#05C46B"
let customColor = sessionStorage.getItem('customColor')

const pickColor = (color) => {
    if(color === 1) {
        sessionStorage.setItem('customColor', '#8854d0');
        location.reload();
    } else if (color === 2) {
        sessionStorage.setItem('customColor', "#fa8231");
        location.reload();
    } else if (color === 3) {
        sessionStorage.setItem('customColor', "#eb3b5a");
        location.reload();
    }else if (color === 4) {
        sessionStorage.setItem('customColor', "#05C46B");
        location.reload();
    }
}


const template = document.createElement('template');
template.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

    #team-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        max-width: 1180px;
        width: 100%;
    }
    
    #member-card-container {
        position: relative;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        line-height: 15px;
        background-color: #fff;
        color: #333;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 380px;
        max-height: 480px;
        min-width: 250px;
        min-height: 380px;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
        transition: color ease-in-out 300ms;
    }
    
    #member-card-container::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 480px;
        background-color: ${customColor || defaultColor};
        transition: top ease-in-out 300ms;
    }
      
    #member-card-container img {
        position: relative;
        margin-top: 20px;
        height: auto;
        max-width: 180px;
        min-width: 160px;
        padding: 3px;
        border: 10px solid ${customColor || defaultColor};
        border-radius: 200px;
        transition: border ease-in-out 300ms;
    }
    
    #member-card-description-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 40px;
    }
    
    #member-card-description-name {
        position: relative;
        font-weight: 700;
        font-size: 1.1em;
        margin-bottom: 20px;
    }
    
    #member-card-description-title {
        position: relative;
        font-weight: 500;
    }
    
    #member-card-description-intro {
        position: relative;
        font-size: 0.8em;
        font-weight: 300;
        text-align: justify;
        padding-top: 20px;
        margin-top: 20px;
        margin-bottom: 75px;
    }
    
    #member-card-description-intro::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 80px;
        background-color: ${customColor || defaultColor};
        transition: background-color ease-in-out 300ms;
    }
    
    #member-card-button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        height: 55px;
        width: 100%;
        border: none;
        border-top: 1px solid transparent;
        border-radius: 0 0 5px 5px;
        background-color: ${customColor || defaultColor};
        color: #fff;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2em;
        transition: border-top ease-in-out 300ms;
        overflow: hidden;
    }
    
    #member-card-container:hover {
        color: #fff
    }
    
    #member-card-container:hover::before {
        top: 0;
    }
    
    #member-card-container:hover img {
        border: 10px solid #fff;
    }
    
    #member-card-container:hover #member-card-description-intro::before {
        background-color: #fff;
    }
    
    #member-card-container:hover #member-card-button {
        border-top: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    #member-card-button::after {
        content: "";
        position: absolute;
        top: 0;
        left: 25%;
        height: 55px;
        width: 50%;
        background-color: #fff;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        transition: all ease-in-out 700ms;
        transform: scale(5, 5);
    }
    
    #member-card-button:active::after {
        padding: 0;
        margin: 0;
        opacity: .2;
        transition: 0s;
        transform: scale(0, 0);
    }
    
    @media only screen and (max-width: 1023px) {
        #team-container {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            width: 100%;
        }
    }
    
    @media only screen and (max-width: 767px) {
        #team-container {
            grid-template-columns: 1fr;
        }
    }
    
    @media only screen and (max-width: 767px) {
        #member-card-container {
            grid-column: span 1;
            width: 100%;
        }
    }
    
    .purple, .red, .orange, .green {
        height: 40px;
        width: 120px;
        margin-right: 10px;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    
    .purple {
        background-color: #8854d0;
    }
    
    .red {
        
        background-color: #eb3b5a;
    }
    .orange {
    
        background-color: #fa8231;
    }
    
    .green {
        background-color: #05C46B;
    }
    </style>
    <div class="button-container">
        <button class="purple" onclick="pickColor(1)">Click me!</button>
        <button class="orange" onclick="pickColor(2)">Click me!</button>
        <button class="red" onclick="pickColor(3)">Click me!</button>
        <button class="green" onclick="pickColor(4)">Click me!</button>
    </div>
    <div id="team-container">
        <!-- Inject cards here -->
    </div>
`;

function insertAfter (referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

class Team extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    getAllTeam = async () => {
        // Add endpoint URL here
        const endpoint = "https://randomuser.me/api/";
    
        try {
            let response = await fetch(endpoint);
            let data = await response.json();
            return data
        } catch (err) {
            console.log(err);
        }
    }

    connectedCallback() {
        let team;
        (async () => {

            // Get all team members from the API
            team = datas //await getAllTeam()
                        
            //Inject the member cards
            team.forEach(member => this.shadowRoot.getElementById('team-container').insertAdjacentHTML('afterbegin', generateTemplate(member)) )
            
        })()


    }
}

window.customElements.define('stamy-team', Team);