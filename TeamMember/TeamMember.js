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
    ]
}

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "TeamMember/TeamMember.css";
    </style>
    <div class="team-member-container">
    <div class="team-member-avatar-container column-span-2">
      <img
        src=${data.imageUrl}
        alt=${data.name}
      />
      <div id="team-member-avatar-name">${data.name}</div>
      <div id="team-member-avatar-role">${data.title}</div>
    </div>
    ${
        (data.traits && data.traits.map((trait, index, arr) => (
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
        )).join(""))
    }

    <!-- CV timeline section -->
    <div class="team-member-item-card column-span-6">
        <strong>Work Experience</strong>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam asperiores totam vitae tempore magni distinctio eaque obcaecati enim, eos optio quos quisquam quia facere ipsum perspiciatis nulla repudiandae atque.</p>
    </div>
  </div>
`;

class Team extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('stamy-team-member', Team);