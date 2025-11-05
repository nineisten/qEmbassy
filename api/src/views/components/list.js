export const list = (arr)=>/*html*/`
    <ul id="nav_list">
        <!-- render link list -->
        ${arr.map((el)=>`<li><a href="#">${el}</a></li>`).join('')}
    </ul>
`