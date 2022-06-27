const fs = require('fs')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')
const { Parser, transforms: { flatten } } = require('json2csv')
const RESOURCE_PATH = path.join(__dirname, '../FHIR/')
const OUT_PATH = path.join(__dirname, '../OUT/')
const versions = fs.readdirSync(RESOURCE_PATH)

versions.forEach((version) => {
  const resources = fs.readdirSync(path.join(RESOURCE_PATH, version))
  resources.forEach((resource) => {
    const json2csv = new Parser({
      transforms: [flatten({
        objects: true,
        arrays: true
      })]
    })
    const xml2json = new XMLParser()
    const xml = fs.readFileSync(path.join(RESOURCE_PATH, version, resource), 'utf8')
    const json = xml2json.parse(xml)
    const csv = json2csv.parse(json)
    const parsedCsv = csv.split(',')
      .map((item) => {
        return item.replace(/"/g, '').replace('[x]', '').replace('#', '')
      })
      .filter((item) => {
        return item !== '' && item !== 'doco'
      })
      .join(',')
    const TARGET_DIR = path.join(OUT_PATH, version)
    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR, { recursive: true })
    }
    fs.writeFileSync(path.join(TARGET_DIR, resource.replace('xml', 'csv')), parsedCsv)
  })
})
