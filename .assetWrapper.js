const path = require('path')

const CWD = process.cwd()
const PACKAGE = require(path.join(CWD, 'package.json'))
 
const yourAssetProcess = async ({name, bundler}) => {
  if (name.split('.').pop() === 'js' && bundler.options.production) {
    return {
      header: `/* ${PACKAGE.name} - ${PACKAGE.version} */\nvar `,
      footer: `// The End.`
    }
  }
}
 
module.exports = yourAssetProcess