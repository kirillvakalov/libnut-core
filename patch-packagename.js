const fs = require("fs");
const { join } = require("path");

if (process.env.CI) {
  const filename = join(__dirname, "package.json");
  const packageJson = require(filename);

  const arch = process.platform === "linux" && process.arch === "arm64" ? "_arm64" : "";
  const plattformPackageName = `@kirillvakalov/nut-tree__libnut-${process.platform}${arch}`;
  packageJson.name = plattformPackageName;

  try {
    fs.writeFileSync(filename, JSON.stringify(packageJson, null, 2));
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Patched package name to '${plattformPackageName}'`);
}
