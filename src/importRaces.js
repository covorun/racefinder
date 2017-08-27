const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

// set timezone to UTC (needed for Graphcool)
process.env.TZ = 'UTC'

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj6u0jtcy0hhf0110spmn783y')
})

// convert to ISO 8601 format
const convertToDateTimeString = (str) => new Date(Date.parse(str)).toISOString()

const createMovie = async(movie) => {
  const result = await client.mutate(`{
    movie: createMovie(
      oldId: "${movie.id}"
      description: "${movie.description}"
      released: "${convertToDateTimeString(movie.released)}"
      title: "${movie.title}"
    ) {
      id
    }
  }`)

  return result.movie.id
}

const createMovies = async(rawMovies) => {
  return await Promise.all(rawMovies.map(createMovie))
}

const main = async() => {
  const rawMovies = require('./movies.json')

  // create movies
  const movieIds = await createMovies(rawMovies)
  console.log(`Created ${movieIds.length} movies`)
}

main().catch((e) => console.error(e))
