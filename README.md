# vulcan-fhir-resource-content-extractor
Extract FHIR Resource content as csv header to support mapping of FHIR to something elsex.

## Folders and files
Place a FHIR's version folder and resource definitions in xml into the folder
```
FHIR
└── R4B
    ├── observation.xml
    └── patient.xml
```

`npm run build` generates the list of resource content in csv as `OUT/<version>/<resource name>.xml`.
```
OUT
└── R4B
    ├── observation.csv
    └── patient.csv
```

## Getting started
1. Install dependencies.

```bash
$ npm install
```

2. Build resource type header in csv
```bash
$ npm run build
```

3. Check outputs
```bash
$ open OUT
```