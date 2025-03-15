const fs = require('fs').promises // use the promisified fs module
const path = require('path')

async function countFiles (folderPath, doRecurse) {
  let files = 0 // initiate count to add to
  try {
    const childPaths = []
    const usablePath = path.resolve(folderPath) // get the full path
    const contents = await fs.readdir(usablePath, { withFileTypes: true }) // read the directory

    contents.forEach((dirent) => {
      files = files + 1 // add 1 for every file in the directory

      if (doRecurse && dirent.isDirectory()) {
        childPaths.push(path.join(usablePath, dirent.name))
      }
    })

    for (const childPath of childPaths) {
      files += await countFiles(childPath)
    }

    return files
  } catch (error) { // this will most likely be triggered if `folderPath` is not a real path.
    throw new Error(`It seems there was a problem. Are you sure ${folderPath} a valid path?`)
  }
}

module.exports = countFiles
