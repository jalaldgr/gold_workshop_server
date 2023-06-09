const db = require('../helper/db');
const Table = db.Table
const moment = require('moment'); // require

module.exports={
    getTable,
    postTable

}

async function getTable() {

    let table = await Table.findOne().sort({_id: -1})
    if (table) {
        const lastTableDate = table.createdAt
        const today = new Date(Date.now())
        // if( (lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth() || lastTableDate.getYear() < today.getYear())
        if ((lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth())// if last table was older than today
        {
            table = new Table({status: "در حال انجام"})
            return table.save()

        } else {
            return table
        }

    } else {
        table = new Table({status: "در حال انجام"})
        return table.save()

    }

}


async function postTable(params) {
    const cleanParams = clean(params)
    let table = await Table.findOne().sort({_id: -1})
    if (table) {
        const lastTableDate = table.createdAt
        const today = new Date(Date.now())
        if ((lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth())// if last table was older than today
        {
            table = new Table({status: "در حال انجام"})
            return table.save()
        } else {
            Object.assign(table, cleanParams)
            await table.save()
            return await table
        }
    } else {
        table = new Table({status: "در حال انجام"})
        return table.save()

    }


    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined ||obj[propName]==="") {
                delete obj[propName];
            }
        }
        return obj
    }

}
