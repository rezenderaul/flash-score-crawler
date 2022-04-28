const allMatches = [
    'são paulo',
    'palmeiras',
    'corinthians',
    'santos',
    'flamengo'
];

let newAllMatches = [
    'são paulo',
    'corinthians',
    'flamengo',
    'bangu',
    'volta redonda'
];

newAllMatches.filter(match => allMatches.indexOf(match) == -1 ).map(match => allMatches.push(match));
console.log(allMatches)