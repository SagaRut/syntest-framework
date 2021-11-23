import { defaultBabelOptions } from "../configs/DefaultBabelConfig";
const { transformSync } = require('@babel/core');

export class AbstractSyntaxTreeGenerator {

  getAST(source, target) {
    const options = {...defaultBabelOptions}

    options.filename = target || String(new Date().getTime()) + '.js'

    const codeMap = transformSync(source, options);

    return codeMap.ast
  }
}
