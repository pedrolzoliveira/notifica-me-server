import 'tsconfig-paths/register'
import './utils/load-env'
import { ServerFactory } from './factories/infra/server-factory'

async function main() {
  const server = await new ServerFactory().create()
  const PORT = Number(process.env.PORT)
  server.listen(PORT)
}

main()
