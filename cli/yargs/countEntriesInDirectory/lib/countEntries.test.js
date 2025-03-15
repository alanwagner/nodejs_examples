const countEntries = require('./countEntries')

describe('test `countFiles()` successful runs', () => {
  test('Test entries in cli/yargs/countEntriesInDirectory', async () => {
    const directory = __dirname // this will be `lib`
    const entries = await countEntries(directory)

    expect(entries).toBe(4)
  })
})

describe('test `countFiles()` throws error', () => {
  test('Call cli/yargs/countEntriesInDirectory with invalid arg', async () => {
    const directory = 'foo'
    expect.assertions(1)
    try {
      await countEntries(directory)
    } catch (error) {
      expect(error.toString()).toMatch(`Error: It seems there was a problem. Are you sure ${directory} a valid path?`)
    }
  })
})
