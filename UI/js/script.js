
const quotes = [
    {
        quote: `The palest ink is better than the best memory. <br><br> ~~ "<em>Chinese Proverb</em>"`
    },
    {
        quote: `Own only what you can carry with you; know language, know countries, know people. 
        Let your memory be your travel bag. <br><br> ~~ "<em>Alexandr Solzhenitsyn</em>"`
    },
    {
        quote: `The more man meditates upon good thoughts, 
        the better will be his world and the world at large.<br><br> ~~ "<em>Confucius</em>"`
    }
];

const winload = () =>{
    quotes.map((v, i, arr) => {
        document.querySelector('#quotes').innerHTML = arr[Math.floor(Math.random()*arr.length)].quote;
    });
}
const introQuote = () =>{
    quotes.map((v, i, arr) => {
        setInterval(function(){
            document.querySelector('#quotes').innerHTML = arr[Math.floor(Math.random()*arr.length)].quote;
        }, 2000)
    });
}

window.onload = () => {
    winload();
    introQuote();
}

