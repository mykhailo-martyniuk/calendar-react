// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateApi } = require('swagger-typescript-api');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('node:fs');

const swaggerUrl = 'https://date.nager.at/swagger';
const version = 'v3';
const swaggerUrlWithVersion = `${swaggerUrl}/${version}/swagger.json`;

const currentDir = path.resolve(process.cwd(), 'scripts/generate-types');
const tempGeneratedDir = `${currentDir}/temp`;
const apiDir = path.resolve(process.cwd(), 'src/Services/Api');
const typesDir = path.resolve(process.cwd(), 'src/types');

generateApi({
  templates: `${currentDir}/templates`,
  output: tempGeneratedDir,
  url: swaggerUrlWithVersion,
  httpClientType: 'fetch',
  defaultResponseAsSuccess: false,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  prettier: {
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'es5',
    parser: 'typescript',
  },
  defaultResponseType: 'void',
  singleHttpClient: false,
  modular: true,
  cleanOutput: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: true,
  generateUnionEnums: false,
  extraTemplates: [],
})
  //@ts-expect-error any
  .then(({ files }) => {
    //@ts-expect-error any
    files.forEach(({ fileContent, fileName }) => {
      //@ts-expect-error any
      let output;
      if (fileName === 'http-client') {
        output = '';
      } else if (fileName === 'data-contracts') {
        output = `${typesDir}/types.generated.ts`;
      } else {
        output = `${apiDir}/Api${fileName?.split('.')}.generated.ts`;
      }

      if (output !== '') {
        fs.writeFile(output, fileContent, () => {
          //@ts-expect-error any
          console.log('write', output);
        });
      }
      fs.unlink(`${tempGeneratedDir}/${fileName}`, () => {
        console.log('remove', fileName);
      });
    });
  })
  //@ts-expect-error any
  .catch((error) => console.error(error));
