const readline = require('readline')
const fs = require('fs')

const parseLine = (line) => {
    const parts = line.split(';')

    if (parts.length === 3) {
        const [ rawName, rawLineCategoryId, rawValue ] = parts

        const name = rawName.replace(/"+/g, '"').replace(/^"/, '')
        const value = parseFloat(rawValue.replace(/\s+/, '').replace(',', '.'))
        const categoryParts = rawLineCategoryId.split('')
        const lineCategoryId = (categoryParts[0] === '0' ? categoryParts.splice(1) : categoryParts).join('')

        return { name, lineCategoryId, value }
    }
}

const getLevel = (lineId) => {
    return lineId.length - lineId.split('').reverse().findIndex((x) => x !== '0')
}

class CsvLoader {
    constructor(db) {
        this.db = db
    }

    loadData(tableName, csv) {

        const self = this

        let data = ''

        let dbQueries = []

        return new Promise((resolve, reject) => {

            const rl = readline.createInterface({
                input: fs.createReadStream(csv),
                crlfDelay: Infinity
            })

            let parents = [ { level: 1, parentId: Promise.resolve(null) } ]

            rl.on('line', (line) => {

                const lineData = parseLine(line)

                if (!lineData) {
                    return
                }

                const { name, lineCategoryId, value } = lineData

                let level = parents[parents.length - 1].level

                let parentId = parents[parents.length - 1].parentId

                const lineLevel = getLevel(lineCategoryId)

                if (lineLevel <= level) {                                        // категория выше по иерархии
                    const levelIndex = parents.findIndex(({ level }) => level >= lineLevel)

                    if (levelIndex !== -1) {
                        parents.splice(Math.max(levelIndex, 1))
                    }

                    parentId = parents[parents.length - 1].parentId
                }

                const promise = parentId.then(id => {
                    const dbQuery = self.db.insertData(tableName, { name, parent_id: id, value })

                    data += JSON.stringify({ name, parent_id: id, value, lineLevel }) + '\n'

                    parents.push({
                        level: lineLevel,
                        parentId: dbQuery,
                    })

                    return dbQuery
                })

                parents.push({
                    level: lineLevel,
                    parentId: promise
                })

                dbQueries.push(promise)
            })

            rl.on('close', () => resolve())
        }).then(() => Promise.all(dbQueries)).then(() => data)
    }
}

module.exports = CsvLoader