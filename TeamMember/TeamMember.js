//Create a variable to store the custom color. 
const customColor = sessionStorage.getItem('customColor') || "#05C46B"

const template = document.createElement('template');

// TEMPLATE BEGINNING

template.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

    #team-member-container {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        color: #333;
        display: grid;
        max-width: 1250;
        padding: 25px;
        grid-template-columns: repeat(6, 1fr);
        gap: 25px;
    }
    
    #team-member-avatar-container {
        text-align: center;
        padding: 0 15px;
        box-shadow: 0px 2px 20px 2px rgba(51, 51, 51, 0.1);
    }
    
    .column-span-2 {
        grid-column: span 2;
    }
    .column-span-3 {
        grid-column: span 3;
    }
    .column-span-4 {
        grid-column: span 4;
    }
    .column-span-6 {
        grid-column: span 6;
    }
    
    #team-member-container img {
        margin-top: 20px;
        height: auto;
        width: 62%;
        min-width: 160px;
        max-width: 220px;
        padding: 3px;
        border: 10px solid ${customColor};
        border-radius: 200px;
    }
    
    #team-member-avatar-name {
        position: relative;
        font-weight: bold;
        font-size: 1.2em;
        margin: 20px 0;
        padding-bottom: 20px;
        text-transform: uppercase;
    }
    
    #team-member-avatar-name::before {
        position: absolute;
        content: "";
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 80px;
        background-color: ${customColor};
    }
    
    #team-member-avatar-title {
        font-weight: 500;
        padding-bottom: 20px;
    }
    
    .team-member-item-card {
        box-shadow: 0px 2px 20px 2px rgba(51, 51, 51, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
    }
    
    .border-decoration {
        border-left: 5px solid ${customColor};
    }

    .timeline {
        width: 100%;
        max-width: 1200px;
        background: #fff;
        padding: 60px 0;
        position: relative;
      }

      .timeline::before {
        content: '';
        position: absolute;
        top: 0px;
        left: 30%;
        bottom: 0px;
        width: 3px;
        background: ${customColor};
      }
     
      .entry {
        display: grid;
        grid-template-columns: 30% 70%;
        position: relative;
      }
      .entry .title {
        padding-top: 30px;
        padding-right: 30px;
        text-align: right;
        position: relative;
      }
      .entry .title::before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 4px solid ${customColor};
        background-color: #fff;
        border-radius: 100%;
        top: 30px;
        right: -14px;
        z-index: 2;
      }
      .entry .title .entry-title {
        margin-bottom: 5px;
        font-size: 1.1em;
        font-weight: bold;
      }
      .entry .title .entry-date {
        margin-bottom: 5px;
        font-size: .9em;
        color: ${customColor};
        font-weight: 700;
      }
      .entry .entry-details {
        margin: 0 0 3em;
        padding-left: 30px;
        padding-top: 20px;
      }
      
      .entry .entry-details h4 {
        margin: 10px 0;
        font-size: 1em;
        color: ${customColor};
      }
      
    
    @media only screen and (max-width: 767px) {
        #team-member-container {
            grid-template-columns: 1fr;
            gap: 15px;
            font-size: 14px;
        }
    
        .column-span-2 {
            grid-column: span 1;
        }
        .column-span-3 {
            grid-column: span 1;
        }
        .column-span-4 {
            grid-column: span 1;
        }
        .column-span-6 {
            grid-column: span 1;
        }
    
        .border-decoration {
           
            border-left: none;
        }
    
        .team-member-item-card {
            border-bottom: 5px solid ${customColor};
        }

        .timeline {
            padding: 20px 0;
        }

        .timeline::before {
            display: none;
        }

        .entry {
            grid-template-columns: 1fr;
        }

        .entry .title {
            padding-left: 10px;
            text-align: left;
        }

        .entry .title::before {
            display: none;
        }

        .entry .title .entry-title {
            font-size: 1.1em;
        }

        .entry .title .entry-date,
        .entry .title .entry-company {
            font-size: 0.8em
        }

        .entry .entry-details {
            padding-top: 5px;
            padding-left: 10px;
            margin-bottom: 0;
        }

        .entry .entry-details h4,
        .entry .entry-details .entry-description {
            font-size: 1em
        }
    }
    </style>

    <div id="team-member-container">
        <div id="team-member-avatar-container">
            <img src="// IMG URL //" alt="// ALT //" />
            <div id="team-member-avatar-name">// NAME //</div>
            <div id="team-member-avatar-title">// TITLE //</div>
        </div>

        <!-- The traits will be injected before this -->

        <!-- Resume section if exists will be injected below -->

    </div>`;

// TEMPLATE END

class Team extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    getConsultantDto = async (consultantId="") => {
        // Add endpoint URL here
        const endpoint = "https://widgets-api-staging.stamybooking.com/basedata/consultants";
        try {
            let response = await fetch(`${endpoint}/${consultantId}`);
            let data = await response.json();
            return data
        } catch (err) {
            console.log(err);
        }
    }

    //Make a node elements array with each trait available
    displayTraits = ({traits}) => {
        if(traits) {
            let nodes = traits.map((trait, index, arr) => (
                new DOMParser().parseFromString(
                    `<div class="team-member-item-card 
                    ${
                        !index ? 
                            `column-span-4` : 
                            (index === arr.length - 1 && arr.length % 2 === 0) ? 
                                `column-span-6 border-decoration` :
                                `column-span-3 border-decoration`
                    }">
                        ${trait}
                    </div>`
                , "text/html").body.firstChild
            ))
            return nodes.reverse();
        }
    }

    //Format the date to be displayed in the timeline
    formatDate = (startDate, endDate) => {

        let start = new Date(startDate);
        let end = new Date(endDate);
    
        let diffDays = parseInt((end - start) / (1000 * 60 * 60 * 24), 10);
    
        if(diffDays <= 31) {
            return `${start.getDate()}/${start.getFullYear()}`
        }else {
            return `${start.getDate()}/${start.getFullYear()} - ${end.getDate()}/${end.getFullYear()}`
        }
    }

    generateResumeEntries = (data) => {
        return data.map(entry => `
            <div class="entry">
            <div class="title">
                <div class="entry-title">${entry.title}</div>
                <div class="entry-date">${this.formatDate(entry.startDate, entry.endDate)}</div>
                <div class="entry-company">${entry.company}</div>
            </div>
            <div class="entry-details">
                <h4>Details and duties:</h4>
                <span class="entry-description">${entry.description}
            </div>
            </div>`
        ).join('')
    }

    //Insert each node element one after another
    insertAfter (referenceNode, nodes) {
        nodes.forEach(node => referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling));
    }
    
    replacementAvatarUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
    
    connectedCallback() {
        let consultantData;
        (async () => {

            // Get consultant data from the API
            let consultantId = this.getAttribute('consultant-id')
            consultantData = await this.getConsultantDto(consultantId)

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            //Add image info to the template
            this.shadowRoot.querySelector('img').src = consultantData.imageUrl ? consultantData.imageUrl : this.replacementAvatarUrl;
            this.shadowRoot.querySelector('img').alt = consultantData.title ? (consultantData.name + "-" + consultantData.title) : consultantData.name;
            
            //Add custom class for grid display 
            this.shadowRoot.getElementById('team-member-avatar-container').classList.add(consultantData.traits.length === 0 ? "column-span-6" : "column-span-2");
            
            //Insert data of the consultant in the avatar card
            this.shadowRoot.getElementById('team-member-avatar-name').innerText = consultantData.name || "No name";
            this.shadowRoot.getElementById('team-member-avatar-title').innerText = consultantData.title || "";
            
            //Inject the traits cards
            this.insertAfter(this.shadowRoot.getElementById('team-member-avatar-container'), this.displayTraits(consultantData))
            
            //Inject the resume section if exists
            this.shadowRoot.getElementById('team-member-container').insertAdjacentHTML('beforeend', 
                data.resume && data.resume.length > 0 ? 
                `<div class="team-member-item-card column-span-6">
                    <div class="timeline">
                        ${this.generateResumeEntries(data.resume)}
                    </div>
                </div>` 
                : "" 
            ) 
        })()
    }
}

window.customElements.define('stamy-team-member', Team);