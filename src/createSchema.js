import generateSchema from 'json-to-graphql'
import data from './data/race.json'

const schema = generateSchema(data)
fs.writeFile('schema.js', schema, callback)
