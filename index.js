const app = require('fastify')()

const _data = require('./data.json')

app.get('/', (req, res) => res.send('Heh!'))

app.get("/countries", (req, res) => {
    
    let data = []
    
    data = _data.map(_ => {
        return {
            "id" : _.id,
            "name" : _.name,
            "iso3" : _.iso3,
            "phone_code" : _.phone_code,
            "capital" : _.capital,
            "region" : _.region,
            "timezones" : _.timezones
        }
    });

    return {"status": 200, "data": data}
})

app.get("/states", (req, res) => {
    const {country} = req.query

    const _ = Object.values(_data).find(value => `${value.id}` === `${country}`)

    const __ = _.states

    let data = []

    data = __.map(___ => {
        return {
            "id" : ___.id,
            "name" : ___.name
        }
    })

    return {"status": 200, "data": data}
})


app.get("/cities", (req, res) => {
    const {country, state} = req.query
    
    const _ = Object.values(_data).find(value => `${value.id}` === `${country}`)

    const __ = Object.values(_.states).find(value => `${value.id}` === `${state}`)

    const ___ = __.cities

    let data = []

    data = ___.map(____ => {
        return {
            "id" : ____.id,
            "name" : ____.name
        }
    })

    return {"status": 200, "data": data}
})


module.exports = app
