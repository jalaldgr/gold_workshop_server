const db = require('../helper/db');
const Table = db.Table
const moment = require('moment-jalaali')
module.exports={
    getTable,
    postTable,
    getAllTables,
    postTableById,
    getTableById,
    getSearchInAllTables

}

async function getTable() {
    const d =  Date.now()

    let table = await Table.findOne().sort({_id: -1})
    if (table) {
        const lastTableDate = table.createdAt
        const today = new Date(Date.now())
        // if( (lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth() || lastTableDate.getYear() < today.getYear())
        if ((lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth())// if last table was older than today
        {
            table = new Table({status: "در حال انجام",date:new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'full'}).format(d)})
            return table.save()

        } else {
            const table6 = JSON.parse(table["table6"])

            if(table6["burnish_deficiency"]>0)table6["burnish_deficiency"]=table6["burnish_deficiency"]*-1
            if(table6["melt_deficiency"]>0)table6["melt_deficiency"]=table6["melt_deficiency"]*-1
            if(table6["cut_deficiency"]>0)table6["cut_deficiency"]=table6["cut_deficiency"]*-1
            table6["sum"] =table6["burnish_deficiency"]+table6["melt_deficiency"]+table6["cut_deficiency"]+table6["cut_deference"]


            table["table6"]=JSON.stringify(table6)


            return table.save()
        }

    } else {
        table = new Table({status: "در حال انجام",date:new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'full'}).format(d)})
        return table.save()

    }

}


async function postTable(params) {
    const cleanParams = clean(params)
    const d =  Date.now()
    let table = await Table.findOne().sort({_id: -1})
    if (table) {
        const lastTableDate = table.createdAt
        const today = new Date(Date.now())
        if ((lastTableDate.getDate() < today.getDate() && lastTableDate.getMonth() <= today.getMonth()) || lastTableDate.getMonth() < today.getMonth())// if last table was older than today
        {
            table = new Table({status: "در حال انجام",date:new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'full'}).format(d)})
            return table.save()
        } else {

            Object.assign(table, cleanParams)

            await table.save()
            return await table
        }
    } else {
        table = new Table({status: "در حال انجام",date:new Intl.DateTimeFormat('fa-IR-u-nu-latn', {dateStyle: 'full'}).format(d)})
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

async function getAllTables() {
    try{
        return await Table.find().sort({"createdAt":-1})
    }catch (e) {
        return e
    }

}




async function getTableById(id) {

    try{
        return await Table.findOne({_id:id})
    }catch (e) {
        return e
    }

}

async function postTableById(params,id) {

    try{
        const table = await Table.findById(id)
        const cleanParams = clean(params)
        Object.assign(table, cleanParams)
        return table.save()
    }catch (e) {
        return e
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


function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined ||obj[propName]==="") {
            delete obj[propName];
        }
    }
    return obj
}

async function getSearchInAllTables(s) {
    try{
        return await Table.find( { $text: { $search: s } } ).sort({"createdDate":-1})
    }catch (e) {
        return e
    }

}
