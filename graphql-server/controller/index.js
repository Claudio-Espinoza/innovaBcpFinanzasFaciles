import { ApolloServer } from "apollo-server";
import {resolvers, typeDefs} from "../schema/schemas.JS"


async function startAppServer(){
      const server = new ApolloServer({
            typeDefs, resolvers
      })

      await server.listen().then(({URL}) => {
            console.log(`Server ready at ${URL}`)

      })
}

startAppServer()