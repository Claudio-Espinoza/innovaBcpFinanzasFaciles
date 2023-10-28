import { ApolloServer } from "apollo-server";
import {resolvers, typeDefs} from "../schema/schemas.js"


async function startAppServer(){
      const server = new ApolloServer({
            typeDefs, resolvers
      })

      await server.listen().then(({url}) => {
            console.log(`Server ready at ${url}`)

      })
}

startAppServer()