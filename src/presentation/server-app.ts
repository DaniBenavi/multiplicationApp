import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileName: string
  destination?: string
}

export class ServerApp {
  static run({ base, limit, showTable, fileName, destination }: RunOptions) {
    console.log('Server running')

    const table = new CreateTable().execute({ base, limit, showTable })

    const wasCreated = new SaveFile().execute({ fileContent: table, fileName, destination })

    if (showTable) console.log(table)

    wasCreated ? console.log('File created') : console.error('File not created')
  }
}
