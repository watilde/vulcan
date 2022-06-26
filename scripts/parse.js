const fs = require('fs')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')
const { Parser, transforms: { flatten } } = require('json2csv');
const RESOURCE_PATH = path.join(__dirname, '../R4B/')
const OUT_PATH = path.join(__dirname, '../out/')
const list = fs.readdirSync(RESOURCE_PATH)

list.forEach((item) => {
  const json2csv = new Parser({
    transforms: [flatten({
      objects: true,
      arrays: true
    })]
  })
  const xml2json = new XMLParser()
  const xml = fs.readFileSync(path.join(RESOURCE_PATH, item), 'utf8')
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
  fs.writeFileSync(path.join(OUT_PATH, item.replace('xml', 'csv')), parsedCsv);
})
