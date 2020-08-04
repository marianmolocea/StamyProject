const data = {
    id: "a1",
    name: "alexa",
    title: "Yogateacher | Ayurveda therapist | MLD",
    serviceProductIds: [],
    imageUrl: "https://i2.wp.com/intoku-zurich.com/wp-content/uploads/2020/01/intoku-312-1-e1584517377833.jpg?w=426&ssl=1",
    traits: [
        `<div class="wpb_wrapper"><p><strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">What does Ayurveda mean to you?</font></font></strong></p><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Ayurveda offers answers to many questions that we ask ourselves every day and to which we do not receive satisfactory answers. </font><font style="vertical-align: inherit;">It offers solutions to a number of problems caused by a stressful everyday life or an inappropriate lifestyle. </font></font><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">By adhering to Ayurvedic principles in relation to nutrition, lifestyle, daily routine and mental health, many illnesses can be avoided in advance. </font><font style="vertical-align: inherit;">This applies in particular to all stress-related functional disorders, be it professional or private.</font></font></p> </div>`,
        `<div class="wpb_wrapper"><div class="wpb_text_column wpb_content_element vc_custom_1586172759934"><div class="wpb_wrapper"><p><strong><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">Focus therapy</span></span></strong></p><p><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">I am happy to help change the perspective on some things,give impulses and give impetus to think new ways and to go. </span><span style="vertical-align: inherit;">I am most pleased when people manage to accept thesesuggestions, to implement them for themselves on a permanentbasis and to gain new strength and vitality.</span></span></p></div></div></div>`,
        `<div class="wpb_wrapper"><div class="wpb_text_column wpb_content_element vc_custom_1586172759934"><div class="wpb_wrapper"><p><strong><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">Focus therapy</span></span></strong></p><p><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">I am happy to help change the perspective on some things,give impulses and give impetus to think new ways and to go. </span><span style="vertical-align: inherit;">I am most pleased when people manage to accept thesesuggestions, to implement them for themselves on a permanentbasis and to gain new strength and vitality.</span></span></p></div></div></div>`,
        `<div class="wpb_wrapper"><div class="wpb_text_column wpb_content_element vc_custom_1586172759934"><div class="wpb_wrapper"><p><strong><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">Focus therapy</span></span></strong></p><p><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">I am happy to help change the perspective on some things,give impulses and give impetus to think new ways and to go. </span><span style="vertical-align: inherit;">I am most pleased when people manage to accept thesesuggestions, to implement them for themselves on a permanentbasis and to gain new strength and vitality.</span></span></p></div></div></div>`
    
    ],
    resume: ` <strong>Work Experience</strong>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>`
}

const getConsultantDto = async (consultantId="") => {
    // Add endpoint URL here
    const endpoint = "https://randomuser.me/api/";

    try {
        let response = await fetch(`${endpoint}${consultantId}`);
        let data = await response.json();
        return data
    } catch (err) {
        console.log(err);
    }
}

//Make a node elements array with each trait available
const displayTraits = ({traits}) => {
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

//Insert each node element one after another
function insertAfter (referenceNode, nodes) {
    nodes.forEach(node => referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling));
}

const customColor = sessionStorage.getItem('customColor')

const template = document.createElement('template');
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
    }
    
    .border-decoration {
        border-left: 5px solid ${customColor};
    }
    
    @media only screen and (max-width: 767px) {
        #team-member-container {
            grid-template-columns: 1fr;
            gap: 15px;
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

class Team extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        let consultantData;
        (async () => {

            // Get consultant data from the API
            let consultantId = this.getAttribute('consultant-id')
            consultantData = await getConsultantDto()

            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            //Add image info to the template
            this.shadowRoot.querySelector('img').src = consultantData.imageUrl ? consultantData.imageUrl : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
            this.shadowRoot.querySelector('img').alt = consultantData.title ? (consultantData.name + "-" + consultantData.title) : consultantData.name;
            
            //Add custom class for grid display 
            this.shadowRoot.getElementById('team-member-avatar-container').classList.add(data.traits.length === 0 ? "column-span-6" : "column-span-2");
            
            //Insert data of the consultant in the avatar card
            this.shadowRoot.getElementById('team-member-avatar-name').innerText = consultantData.name || "No name";
            this.shadowRoot.getElementById('team-member-avatar-title').innerText = consultantData.title || "Team Member";
            
            //Inject the traits cards
            insertAfter(this.shadowRoot.getElementById('team-member-avatar-container'), displayTraits(data))
            
            //Inject the resume section if exists
            this.shadowRoot.getElementById('team-member-container').insertAdjacentHTML('beforeend', `${
                data.resume ? 
                `<div class="team-member-item-card column-span-6">
                    ${data.resume}
                </div>` : ""
            }`)
        })()
    }
}

window.customElements.define('stamy-team-member', Team);