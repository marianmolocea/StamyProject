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

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "TeamMember/TeamMember.css";
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