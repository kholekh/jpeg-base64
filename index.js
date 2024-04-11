const fs = require('fs/promises');
const path = require('path');

const arg1 = process.argv[2];
const fileIn = path.join(__dirname, arg1);
const fileInExt = path.parse(fileIn).ext;

async function main() {
  switch(fileInExt) {
    case '.jpg': {
      const fileOut = path.join(__dirname, '/out', path.parse(fileIn).name + '.txt');
      console.log({fileIn, fileOut});

      const data = await fs.readFile(fileIn, 'base64');
      const buffer = Buffer.from(data, 'base64');
      console.log(buffer);

      await fs.writeFile(fileOut, data);
      await fs.writeFile(path.parse(fileIn).name + '.jpg', buffer);

      break;
    }
    case '.txt': {
      const fileOut = path.join(__dirname, '/out', path.parse(fileIn).name + '.jpg');
      console.log({fileIn, fileOut});

      const data = await fs.readFile(fileIn, 'utf-8');
      const buffer = Buffer.from(data, 'base64');
      console.log(buffer);

      await fs.writeFile(fileOut, buffer);

      break;
    }
    default:
      console.log(`This type (${fileInExt}) is not supported`);
  }
}

try {
  main();
} catch (error) {
  console.error(error);
}
