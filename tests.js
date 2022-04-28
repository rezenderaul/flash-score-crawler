const allMatches = [
    ['são paulo', '0'],
    ['palmeiras', '0'],
    ['corinthians', 1],
    ['santos', 2 ],
    ['flamengo', 3]
];

let newAllMatches = [
    ['são paulo', 1, ],
    ['corinthians', 1],
    ['flamengo', 3],
    ['bangu', '0'],
    ['volta redonda', '0']
];

//newAllMatches.filter(match => allMatches.indexOf(match) == -1 ).map(match => allMatches.push(match));
//newAllMatches.filter(match => allMatches.map(info => info[0].indexOf(match[0])) == -1 ).map(match => allMatches.push(match));
newAllMatches
    .filter(match => 
        allMatches.filter(info => 
            info[0].indexOf(match[0]) == -1))