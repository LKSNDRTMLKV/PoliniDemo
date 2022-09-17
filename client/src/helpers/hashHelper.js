function hashHelper () {
    let hash = [];
    let char =  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

    for(let i = 0; i < 64; i++ ) {
        hash.push(char.charAt(Math.floor(Math.random() * char.length)));
    }

    return hash.join("");
}

export default hashHelper;

