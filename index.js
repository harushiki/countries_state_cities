const app = require('fastify')()

const _data = require('./data.json')

app.get('/', (req, res) => res.send('Heh!'))

app.get("/countries", (req, res) => {
    
    let data = []
    
    _data.forEach(_ => {
        data.push({
            "id" : _.id,
            "name" : _.name,
            "iso3" : _.iso3,
            "phone_code" : _.phone_code,
            "capital" : _.capital,
            "region" : _.region,
            "timezones" : _.timezones
        })
    });

    return {"status": 200, "data": data}
})

app.get("/states", (req, res) => {
    const {country} = req.query

    const _ = Object.keys(_data).find(key => `${_data[key].id}` === `${country}`)

    const __ = _data[_].states

    let data = []

    __.forEach(___ => {
        data.push({
            "id" : ___.id,
            "name" : ___.name
        })
    })
    

    return {"status": 200, "data": data}
})


app.get("/cities", (req, res) => {
    const {country, state} = req.query

    const _ = Object.keys(_data).find(key => `${_data[key].id}` === `${country}`)

    const __ = _data[_].states

    const ___ = Object.keys(__).find(key => `${__[key].id}` === `${state}`)

    const ____ = __[___].cities

    let data = []

    ____.forEach(_____ => {
        data.push({
            "id" : _____.id,
            "name" : _____.name
        })
    })
    

    return {"status": 200, "data": data}
})


module.exports = app
