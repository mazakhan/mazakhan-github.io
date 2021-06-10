const letters = {1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H"};
const board_ul = document.getElementById("board");
var black = false
for (let i = 8; i >0; i--){
    let row = document.createElement("ul")
    row.setAttribute("class", "rows")
    row.setAttribute("Id", i)
    for (let j = 1; j <9; j++){
        let col = document.createElement("li")
        col.setAttribute("class", "cols")
        col.setAttribute("Id", letters[j]+""+i)
        col.innerHTML = letters[j]+""+i
        if (col.innerHTML === "C8" ||col.innerHTML === "F8" ){
            col.classList.add("whitebishop")
        }
        else if (col.innerHTML === "C1" ||col.innerHTML === "F1" ){
            col.classList.add("blackbishop")
        }
        if (col.innerHTML[1] === "2"){
            col.classList.add("whitepawn")
        }
        else if ( col.innerHTML[1] === "7"){
            col.classList.add("blackpawn")
        }
        if (col.innerHTML === "G8" ||col.innerHTML === "B8" )
        {
            col.classList.add("whitehorse")
        }
        else if (col.innerHTML === "G1" ||col.innerHTML === "B1" ){
            col.classList.add("blackhorse")
        }
        if (col.innerHTML === "A8" ||col.innerHTML === "H8" )
        {
            col.classList.add("whiterook")
        }
        else if (col.innerHTML === "A1" ||col.innerHTML === "H1" ){
            col.classList.add("blackrook")
        }
        if (col.innerHTML === "D1" )
        {
            col.classList.add("whitequeen")
        }
        else if (col.innerHTML === "D8"){
            col.classList.add("blackqueen")
        }
        if (col.innerHTML === "E1" )
        {
            col.classList.add("whiteking")
        }
        else if (col.innerHTML === "E8"){
            col.classList.add("blackking")
        }

        if (black){
            col.classList.add("black")
            black = !black
        }
        else{
            col.classList.add("white")
            black = !black
        }
        row.appendChild(col)
        if (parseInt(col.innerHTML[1]) > 6){
            col.classList.add("p2")
        }
        else if (parseInt(col.innerHTML[1]) < 3){
            col.classList.add("p1")
        }
    }
    black = !black



    board_ul.appendChild(row)
}
main2()
function main(){
    let rows = document.getElementsByClassName("rows")
    for (let i = 0 ; i<rows.length; i++){
        let cols = rows[i].getElementsByClassName("cols")
        for (let j = 0; j < cols.length; j++){
            let node = cols[j]
            node.addEventListener("click",  function(){
                if (node.classList.contains("pawn")){
                    let othercols = rows[i-1].getElementsByClassName("cols")
                    let newcol = othercols[j]
                    newcol.addEventListener("click", function(){
                        node.removeChild(node.childNodes[1])
                        node.classList.remove("pawn")
                        console.log(node.classList)
                        let sprite = document.createElement("img")
                        sprite.setAttribute("src", "jovinpic.jpg")
                        newcol.classList.add("pawn")
                        newcol.appendChild(sprite)
                        node.removeEventListener("click", function(){})
                        newcol.removeEventListener("click", function(){})
                    })
                }
                if (node.classList.contains("bishop")){
                    let othercols = []
                    for (let move = 0; move < rows.length; move++){
                        othercols.push(rows[i+move].getElementsByClassName("cols")[j+move],
                        rows[i-move].getElementsByClassName("cols")[j+move],
                        rows[i-move].getElementsByClassName("cols")[j-move], 
                        rows[i+move].getElementsByClassName("cols")[j-move])
                    }
                    for (let move = 0; move < othercols.length;i++){
                        othercols[move].addEventListener("click", function(){
                            console.log("walkda")
                            othercols[move].removeEventListener("click", function(){})
                        })
                    }
                }
            })
        }
    }
    
}
var selected = undefined;
function main2(){
    document.addEventListener("click", function(event){
        var x = event.pageX;
        var y = event.pageY;
        var clickedElement = document.elementFromPoint(x, y);
        if (!clickedElement.classList.contains("cols")){
            console.log("u clicked on a row")
            return 
        }
        if ((!selected) && (clickedElement.classList.length > 3)){
            selected = clickedElement
            clickedElement = undefined;
        }
        if (selected){
            if (clickedElement){
                console.log(clickedElement.classList.length)
                if (clickedElement.classList.length < 3){
                    
                    for (let i = 0; i < selected.classList.length+1;i++){
                        console.log(selected.classList[i])
                        switch (selected.classList[i]){
                            case "black":
                            case "white":
                            case "cols":
                            break
                            default:
                                clickedElement.classList.add(selected.classList[i])
                                selected.classList.remove(selected.classList[i])
                        }
                    }
                    selected = undefined;
                    clickedElement = undefined;
                    
                }
                else{
                    /*
                    make the peice dissapear
                    */

                    if (clickedElement){
                        for (let i = 0; i < clickedElement.classList.length +1; i++){
                            switch (clickedElement.classList[i]){
                                case "pawn":
                                case "bishop":
                                case "horse":

                            }
                        }
                    }

                    selected = undefined;
                    clickedElement = undefined;
                }
            }
        }
    })
}
