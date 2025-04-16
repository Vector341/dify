// 仅保留 chat 相关文件
const fs = require('node:fs').promises
const path = require('node:path')

async function readDependFile() {
  const content = await fs.readFile('web/depend', 'utf8')
  return content.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//'))
}

async function getAllFiles(dir) {
  const files = []
  const items = await fs.readdir(dir, { withFileTypes: true })

  // Skip specified directories
  const skipDirs = ['node_modules', 'assets', 'themes', 'bin', 'public', '.next', '.husky', '.vscode', '.storybook', 'i18n', 'base/grid-mask']
  const baseName = path.basename(dir)
  if (skipDirs.includes(baseName)) {
    return files
  }

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)))
    } else if (path.dirname(fullPath) !== 'web' && path.extname(fullPath) !== '.md') {
      files.push(fullPath)
    }
  }

  return files
}

async function cleanWeb() {
  try {
    // Read depend file to get files to keep
    const dependFiles = await readDependFile()
    const filesToKeep = new Set(dependFiles.map(f => path.join('web', f)))

    // Get all files in web directory (excluding root level)
    const allFiles = await getAllFiles('web')

    // Delete files not in depend
    for (const file of allFiles) {
      if (!filesToKeep.has(file)) {
        console.log(`Deleting: ${file}`)
        await fs.unlink(file)
      }
    }

    // Clean up empty directories, but not the web root
    const dirs = (await getAllFiles('web'))
      .filter(f => fs.stat(f).then(stat => stat.isDirectory()))
      .filter(dir => dir !== 'web') // Don't include web root
      .sort((a, b) => b.length - a.length) // Sort by depth, deepest first

    for (const dir of dirs) {
      try {
        await fs.rmdir(dir)
        console.log(`Removed empty directory: ${dir}`)
      }
      catch (err) {
        // Directory not empty, skip
      }
    }

    console.log('Cleanup completed')
  }
  catch (err) {
    console.error('Error during cleanup:', err)
  }
}

cleanWeb()