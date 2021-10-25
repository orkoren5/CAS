let s = "2baufaa";
let v = "2baauf";

function solution(S) {
    let a = 2;
    let num = 0;
    for (let l = 0; l < S.length; l++) {
        let char = S.charAt(l);
        if (char === "a") {
            a -=1;
            if (a < 0) {
                return -1;
            }
        }
        else {
            num += a;
            a = 2;
        }
    }
    num += a;
    return num;
}