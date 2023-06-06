const db = require('../helper/db');
const Table = db.Table
const moment = require('moment'); // require

module.exports={
    getTable,

}

async function getTable() {

    let table =await Table.findOne().sort({ _id:-1 })
    if(table){
        console.log()
        const lastTableDate =moment(table.createdAt)
        const today = moment().format('YYYY MM DD')
        const difference = lastTableDate.diff(today,'days')
        console.log(difference)
        if(difference<0){
            const newTable = new Table
            table = new Table({status:"در حال انجام"})
            return table.save()

        }else{
            return table
        }

    }else{
        table = new Table({status:"در حال انجام"})
        return table.save()

    }




}
