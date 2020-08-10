let defaultColor = "#ccc"

const template = document.createElement('template');

const cardLoader = `
    <style>

    #team-container-loader {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        max-width: 1180px;
        width: 100%;
    }

    .loader-card-container {
        width: 350px;
        min-height: 400px;
        background-color: #eee;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    
    .loader-card-container .loader-image-placeholder {
        width: 150px;
        height: 150px;
        background-color: #ddd;
        border-radius: 200px;
        overflow: hidden;
    }
    
    .loader-card-container .loader-description-container {
        display: flex;
        flex-direction: column;
    }
    
    .loader-description-container .loader-name {
        height: 18px;
        width: 130px;
        background-color: #ddd;
        margin-top: 40px;
        overflow: hidden;
    }
    
    .loader-description-container .loader-description {
        height: 18px;
        width: 230px;
        background-color: #ddd;
        margin-top: 15px;
        overflow: hidden;
    }
    
    /* The loading Class */ 
    .loading { 
        position: relative; 
    } 
    
    /* The moving element */ 
    .loading::after { 
        display: block; 
        content: ""; 
        position: absolute; 
        width: 100%;
        height: 100%; 
        transform: translateX(-100%);                   
        background: linear-gradient(90deg, transparent, 
                rgba(255, 255, 255, 0.3), transparent); 
    
        /* Adding animation */ 
        animation: loading 1s infinite; 
    } 
    
    /* Loading Animation */ 
    @keyframes loading { 
        100% { 
            transform: translateX(100%); 
        } 
    }

    @media only screen and (max-width: 767px) {
        #team-container-loader {
            grid-template-columns: 1fr;
        }
    
        #loader-member-container .loader-image-placeholder {
            margin: 0;
        }
    }    

    </style>
    <div id="team-container-loader">
        <div class="loader-card-container">
            <div class="loader-image-placeholder loading"></div>
            <div class="loader-description-container">
                <div class="loader-name loading"></div>
                <div class="loader-description loading"></div>
                <div class="loader-description loading"></div>
            </div>
        </div>
        <div class="loader-card-container">
            <div class="loader-image-placeholder loading"></div>
            <div class="loader-description-container">
                <div class="loader-name loading"></div>
                <div class="loader-description loading"></div>
                <div class="loader-description loading"></div>
            </div>
        </div>
        <div class="loader-card-container">
            <div class="loader-image-placeholder loading"></div>
            <div class="loader-description-container">
                <div class="loader-name loading"></div>
                <div class="loader-description loading"></div>
                <div class="loader-description loading"></div>
            </div>
        </div>
    </div>
`

class Team extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    getAllTeam = async () => {
        // Add endpoint URL here
        const endpoint = "https://widgets-api-staging.stamybooking.com/basedata/consultants";
        
        try {
            let response = await fetch(endpoint);
            let data = await response.json();
            return data
        } catch (err) {
            console.log(err);
        }
    }
    
    generateTemplate = ({id,imageUrl, name, title, intro}) => {
        
        let replacementAvatarUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg";
        
        //Change the anchor tag href to the corresponding element.
        let element = `
            <div id="member-card-container">
            <img src=${imageUrl || replacementAvatarUrl} alt=${name} />
            <div id="member-card-description-container">
            <div id="member-card-description-name">${name}</div>
            ${title ? `<div id="member-card-description-title">${title}</div>` : ""}
            ${intro ? 
                `<div id="member-card-description-intro">
                ${intro.split('').slice(0, 120).join('') + "..."}
                </div>` : ""}
                </div>
                <a href="${"details.html" || id}" id="member-card-button">SEE MORE</a>
                </div>`;
        return element;
    }

    getCustomColor = async () => {
        // Add Color endpoint URL here
        const endpoint = "https://www.thecolorapi.com/id?hex=DC143C";
        try {
            let response = await fetch(endpoint);
            let color = await response.json();
            sessionStorage.setItem('customColor', color.hex.value)
        } catch (err) {
            console.log(err);
        }
    }
        
    connectedCallback() {
        (async () => {
            
            this.shadowRoot.innerHTML = cardLoader;
            
            let customColorAttr = this.getAttribute('custom-color');
            
            // Get all team members from the API
            let team = await this.getAllTeam();

            let customColor;
            if(customColorAttr) {
                customColor = customColorAttr;
            } else if (sessionStorage.getItem('customColor')) {
                customColor = sessionStorage.getItem('customColor')
            } else {
                await this.getCustomColor();
                customColor = sessionStorage.getItem('customColor')
            }

            //TEMPLATE BEGINNING

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
                object-fit: cover;
                margin-top: 20px;
                width: 160px;
                height: 160px;
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
                #member-card-container {
                    grid-column: span 1;
                    width: 100%;
                }

                #team-container {
                    grid-template-columns: 1fr;
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
            <div id="team-container">
                <!-- Inject cards here -->
            </div>
            `;

            //TEMPLATE END

            this.shadowRoot.appendChild(template.content.cloneNode(true));

            //Inject the member cards
            team.forEach(member => this.shadowRoot.getElementById('team-container').insertAdjacentHTML('afterbegin', this.generateTemplate(member)))
            this.shadowRoot.getElementById('team-container-loader').parentNode.replaceChild(document.createTextNode(""), this.shadowRoot.getElementById('team-container-loader'))
        })();
    }
}

window.customElements.define('stamy-team', Team);