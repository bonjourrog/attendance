const bcrypt = require('bcryptjs')
const helpers = {}

helpers.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

helpers.verifyPassword = async (password, storedPassword)=>{
    try {
        return await bcrypt.compare(password, storedPassword)
    } catch (e) {
        console.log(`Error => ${e.message}`);
    }
}

helpers.sortArrByName = arr=>{
    arr.sort((a, b)=>{
        if(a.Name > b.Name){
            return 1
        }
        if(a.Name < b.Name){
            return -1
        }
        return 0
    })
}
module.exports = helpers
