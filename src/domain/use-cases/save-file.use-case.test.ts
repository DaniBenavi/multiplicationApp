import fs from 'fs'
import { SaveFile } from './save-file.use-case'

describe('SavefileUseCase', () => {
  const customOptions = {
    fileContent: 'custon content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  afterEach(() => {
    const outputsExist = fs.existsSync('outputs')
    if (outputsExist) fs.rmSync('outputs', { recursive: true })

    const customOutputOptions = fs.existsSync(customOptions.fileDestination)
    if (customOutputOptions) fs.rmSync(customOptions.fileDestination, { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath) // ojo
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('should return false if directory does not created', () => {
    const saveFile = new SaveFile()

    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error')
    })

    const result = saveFile.execute(customOptions)

    expect(result).toBe(false)
  })

  test('should return false if the file does not created', () => {
    const saveFile = new SaveFile()

    const mkDirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error')
    })

    const result = saveFile.execute({ fileContent: 'Hola' })

    expect(result).toBe(false)

    mkDirSpy.mockRestore()
  })

  test('should return false if the file could no be created', () => {
    const saveFile = new SaveFile()

    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('This is a custom writing error message')
    })

    const result = saveFile.execute({ fileContent: 'Hola' })

    expect(result).toBe(false)

    writeFileSpy.mockRestore()
  })
})
