const generateRandomCoode = () => {
    let code;
    // let iscodeUnique = false;

    code = Math.floor(100000 + Math.random() * 900000);
    return code;
}

export default generateRandomCoode;