//boiler-plate code for fetching data

async function fetchData(req){
    let resp = await fetch(req);
    if(resp.ok == true){
        return await resp.json();
    }
    throw new Erro (resp.status);
}

function getStars(stars){
    return `${"*".repeat(stars)} =${(stars / 5 *100).toFixed(2)}`;
}

function getImage(stars){
    return `<img src="icons/${stars}.png">`;
}

document.getElementById("btnFind").addEventListener("click", async function(){
    let title = document.getElementById("txtGame").value;
    let games = await fetchData("json/games.json");
    let match = games.find(g=> g.game == title);
    
    let output = undefined;

    if(match != undefined){
        let character =  document.getElementById("txtCharacter").value;
        let charMatch = match.characters.includes(character)? "Character is in game" : "Character is not in the game";
        console.log(charMatch);
        output = `Release Year: ${match.release} <br> 
                # of Characters: ${match.characters.length} <br> 
                Ratings: ${getStars(match.stars)}% <br> 
                ${getImage(match.stars)}<br>
                ${charMatch}`;
    }else{
        output= "Games not found";
    }
    console.log(output);
    document.getElementById("results").innerHTML = output;
    
});