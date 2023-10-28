import { gql } from "apollo-server"
import axios from "axios"

export const typeDefs = gql`
      enum NIVEL_USUARIO{ # No se si lo usare
            NUEVO
            PRINCIPIANTE
            EXPERIMENTADO
      }

      type Perfil_usuario {
            perfil_inversion: String
            nivel_usuario: String!
      }

      type Usuario {
            id_usuario: String!
            nombre: String!
            dni: String!
            tarjeta: String!
            clave: String!
            balance: Balance
            cuenta: [Cuenta]
      }

      type Balance {
            movimiento: [Movimiento]
            num_movimiento: Int
            ingreso: Int!
            balance_geneal: Int
            perfil_Usuario: Perfil_usuario!
            cuenta: [Cuenta]
      }

      type Movimiento {
            consumo: Int!
            fecha: String!
      }

      type Cuenta {
            nombre: String!
            tipo_cuenta: String!
      }

       
      type Query {
            personCount: Int!
            findUserByDni(dni: String!): Usuario
            findUserByTarjeta(dni: String!): Usuario
      }
`

export const resolvers = {
      Query: { 
            personCount: async (root, args) => {
                  const { data: personFromRestApi } = await axios.get('http://localhost:3000/Usuario')
                  return personFromRestApi.length
            },

            findUserByDni: async (root, args) => {
                  const { data: usuarioLista } = await axios.get('http://localhost:3000/Usuario')
                  const { dni } = args

                  if ((usuarioLista.find(persons => persons.dni == args.dni))) {
                        return usuarioLista.find(personFromRestApi => personFromRestApi.dni == dni)
                  } else {
                        console.log("\nNo se encuentran relaciones con ese parametro\nParametro ingresado: ", dni)
                  }
            },

            findUserByTarjeta: async (root, args) => {
                  const { data: usuarioLista } = await axios.get('http://localhost:3000/Usuario')
                  const { tarjeta } = args

                  if ((usuarioLista.find(persons => persons.dni == args.dni))) {
                        return personFromRestApi.find(personFromRestApi => personFromRestApi.tarjeta == tarjeta)
                  } else {
                        console.log("\nNo se encuentran relaciones con ese parametro\nParametro ingresado: ", dni)
                  }
            }
      }
}