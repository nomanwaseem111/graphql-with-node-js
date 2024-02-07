const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const { default: axios } = require('axios')


async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
          type Todo{
            id: ID!,
            title: String!,
            completed: Boolean
          }
          type User{
            name:String!
            email:String!
            website:String!
          }

          type Query{
             getTodos: [Todo]
             getUsers: [User]
          }
        `,
        resolvers:{
            Query:{
              getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
              getUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data

            }
        }
    })

    app.use(bodyParser.json())
    app.use(cors())

    await server.start()


    app.use('/graphql', expressMiddleware(server))

    app.listen(3000, () => console.log("Server is Running PORT 3000"))
}

startServer()