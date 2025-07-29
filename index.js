const express = require('express');
const app = express();

app.use(express.json());


const name = "Sarthak Jyoti Mishra";
const rollNo = "2210990801";
const email = "sarthak801.be22@chitkara.edu.in";
const user_id = `${name.toLowerCase().replace(/\s+/g,'_')}_${rollNo}`;


function isNumber(str) {
    return /^-?\d+$/.test(str);
}
function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function alternatingCaps(str) {
    let res = '';
    let upper = true;
    for (let ch of str) {
        res += upper ? ch.toUpperCase() : ch.toLowerCase();
        upper = !upper;
    }
    return res;
}

app.post('/bfhl', (req, res)=>{
    try{
        const {data} = req.body;
        if(!data || !Array.isArray(data)){
            return res.status(400).json({status: false, error: 'Invalid input, expected an array'});
        }

        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialChars = [];
        let sum_of_num = 0;
        let alpha_string = [];

        data.forEach(ele=>{
            if (isNumber(ele)) {
                if (parseInt(ele) % 2 === 0) evenNumbers.push(ele);
                else oddNumbers.push(ele);
                sum_of_num += parseInt(ele);
            } else if (isAlphabet(ele)) {
                alphabets.push(ele.toUpperCase());
                alpha_string.push(ele); 
            } else {
                specialChars.push(ele);
            }
        });

        const reversedAlpha = alpha_string.reverse().join('');
        const concatReversedAlpha = alternatingCaps(reversedAlpha); 

        const response = {
            status: true,
            user_id: user_id,
            email : email,
            college_rollNumber : rollNo,
            oddNumbers,
            evenNumbers,
            alphabets,
            specialChars,
            sum_of_num: sum_of_num.toString(),
            concatReversedAlpha
        };

        return res.status(200).json(response);
    } catch(err){
        console.error(err);
        return res.status(500).json({status: false, error: err.message});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});