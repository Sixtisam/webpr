
function generateDiscs(number){
    number = number || 3;
    
    const firstStick = document.querySelector('#gamepanel .stick.col-1');
    for(let i = 0; i < number; i++){
        const el = document.createElement("div");
        el.setAttribute("data-value", i);
        el.classList.add("disc");
        el.style.backgroundColor = generateRandomColor();
        el.style.width = 100 + (i * 25) + "px";
        firstStick.appendChild(el);
    }
}

function move(startStickNr, endStickNr){
    
    const startStick = document.querySelector('#gamepanel .stick.col-' + startStickNr);
    const endStick = document.querySelector('#gamepanel .stick.col-' + endStickNr);
    
    const firstDisc = startStick.children[0];

    const secondDisc = endStick.children[0];
    
    if(secondDisc) {
        if(!firstDisc){
            console.error('No disc to take from stick ' + startStickNr);
            return false;
        }

        const firstDiscVal = Number(firstDisc.attributes["data-value"]);
        const secondDiscVal = Number(secondDisc.attributes["data-value"]);
        if(firstDiscVal > secondDiscVal){
            console.error("First disc bigger than second");
            //console.error('Cannot move first disc of stick ' + startStickNr + '(' + firstDisc.attr('data-value') + ') to stick ' + endStickNr + '(' + secondDisc.attr('data-value') + ')');
            return false;
        }
    }
    
    firstDisc.remove();
    endStick.prepend(firstDisc);
    
}

function generateRandomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

function solveHanoi(i, stick1, stick2, stick3, callback) {
    if(i > 0) {
        solveHanoi(i-1, stick1, stick3, stick2, function() {
            window.setTimeout(function() {
                if(move(stick1, stick3) === false) {
                    return;
                }
                solveHanoi(i-1, stick2, stick1, stick3, callback);
            }, 0);
        });

    } else {
        if(callback) callback();
    }

}