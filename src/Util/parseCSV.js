export default function parseCSV(input){
    //Expect an CSV file with a title line and separated by comma.
    const lines = input.split(/\r?\n/);
    let json = [];
    let titles = [];
    let content = [];
    for(const lineBrut of lines){
        //If a field contains a comma, it needs to be between double quotes or escaped
        const line = removeComma(lineBrut);
        const values = line.split(',');
        if(titles.length === 0){
            titles = values;
        } else {
            content.push(values);
            const newObj = {};
            for(let i = 0; i < titles.length; i++){
                try {
                    newObj[titles[i]] = values[i]
                } catch {
                    newObj[titles[i]] = 'error';
                }
            }
            json.push(newObj);
        }
    }
    return [titles, content, json]
};

const removeComma = str => {
    const regex = /".*,.*"/gm;
    let m;
    let newStr = str;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
            newStr = newStr.replace(match, match.replace(',', " "))
        });
    }
    return newStr;
}