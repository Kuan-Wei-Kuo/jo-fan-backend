const fs = require('fs')
const path = require('path')
const PWD = __dirname
class RouterParser {
  static readDir (dirPath, pathOnion = '', routes = {}) {
    const dirs = fs.readdirSync(dirPath)
    dirs.forEach((name) => {
      const subPath = path.join(dirPath, name)
      const stat = fs.lstatSync(subPath)
      if (stat.isDirectory()) {
        this.readDir(subPath, `${pathOnion}/${name}`, routes)
      }
      if (stat.isFile()) {
        routes[`${pathOnion}/${name.split('.')[0]}`] = subPath
      }
    })
    return routes
  }
}
module.exports = (app) => {
  const routes = RouterParser.readDir(PWD)
  for (const routePath in routes) {
    if (routePath === '/index') {
      continue
    }
    console.log(`[ ${routePath} => ${routes[routePath]} ]`)
    app.use(routePath, require(routes[routePath]))
  }
}
