export const list = (arr)=>/*html*/`
    <ul id="nav_list">
        ${arr.map((el)=>`<li><a href="#">${el}</a></li>`).join('')}
    </ul>
`