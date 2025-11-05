import { lock } from "./lock.js"
export const top = (logo) => /*html*/`
        <header id="top_header">
            <div class='logo'>
                ${logo}
            </div>
            <div id="account" class="account" >
                <div class="avatar">
                    JD
                </div>
                ${lock()}
            </div>
        </header>
    ` 