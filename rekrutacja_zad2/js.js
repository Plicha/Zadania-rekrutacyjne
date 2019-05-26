let SortUpVotBtn = document.getElementById('upvotesSort');
let SortNumOfBtn = document.getElementById('num_comments');
let SortScoreBtn = document.getElementById('score');
let SortDateBtn = document.getElementById('created');
let BiggestRatioBtn = document.getElementById('biggestRatio');
let Last24Btn = document.getElementById('last24');


SortUpVotBtn.addEventListener('click',()=>sortJson('upvotes'));
SortNumOfBtn.addEventListener('click',()=>sortJson('num_comments'));
SortScoreBtn.addEventListener('click',()=>sortJson('score'));
SortDateBtn.addEventListener('click',()=>sortJson('created'));
BiggestRatioBtn.addEventListener('click',()=>biggestRatio());
Last24Btn.addEventListener('click',()=>onlyLast24());

let url = 'https://www.reddit.com/r/funny.json';
var json;

window.onload = () =>{setup()};
const setup = () =>{
    fetch(url)
    .then((res) => res.json())
    .then(data => returnJSON(data))
}
// zad1
const returnJSON = (JSONdata) =>{    
    let path = JSONdata.data;
    let count = path.dist;
    let posts=[];
    
    for (let i = 0; i < count; i++) {
        let normalDate = new Date((path.children[i].data.created_utc)*1000);        
        posts[i]={
            "title":path.children[i].data.title,
            "upvotes":path.children[i].data.ups,
            "score":path.children[i].data.score,
            "num_comments":path.children[i].data.num_comments,
            "created":
            addZero(normalDate.getDate())+'.'
            +addZero((normalDate.getMonth()+1))+'.'
            +normalDate.getFullYear()+' '
            +addZero(normalDate.getHours())+':'
            +addZero(normalDate.getMinutes()),
        }
    }
    json = {"posts":posts,"count":count};
    console.log('zadanie 1');
    console.log(json);
    
    
};

const addZero = (num => num<10 ? '0'+num : num )

//zad2
const sortJson = (sortType)=>{
    switch (sortType) {
        case 'upvotes':
            json.posts.sort((a, b) => b.upvotes - a.upvotes);
            console.log("Sortowanie wg ocen");
            break;
        case 'num_comments':
            json.posts.sort((a, b) => b.num_comments - a.num_comments);
            console.log("Sortowanie wg liczby komentarzy");
            break;
        case 'score':
            json.posts.sort((a, b) => b.score - a.score);
            console.log("Sortowanie punktów");
            break;
        case 'created':
            json.posts.sort(function(a,b){ return b ? -1 : a ? 1 : 0;});
            console.log("Sortowanie wg daty dodania");
            break;
        default:
            break;
    }
    console.log(json); 
}

//zad3
const biggestRatio = ()=>{
    let divResult =[];
    let path = json.posts;
    for (let i = 0; i < json.count; i++) {
        divResult[i]={'result':(path[i].num_comments)/(path[i].upvotes),'id':i}
    }
    let max = divResult.reduce((max, p) => p.result > max ? p.result : max, divResult[0].result);
    let id = divResult.find(x => x.result === max)
    console.log("Współczynnik komentarzy do ocen: " + max);
    console.log("Tytuł: \n"+json.posts[id.id].title);  
}
//zad4
const onlyLast24 = () =>{
    let whichShow=[];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate()-1);
    

    for (let i = 0; i < json.count; i++) {
        let a = "'"+json.posts[i].created+"'";
        let x = new Date(
            a.substring(7,11),
            a.substring(4,6)-1,
            a.substring(1,3),
            a.substring(12,14),
            a.substring(15,17)
        )
        
        if (currentDate<x) { 
            whichShow.push(json.posts[i])
        }
    }
    console.log("Lista z ostatnich 24h");
    console.log(whichShow);
}