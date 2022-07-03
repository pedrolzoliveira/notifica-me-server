/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// const { compilerOptions } = require('./tsconfig.json');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleNameMapper: {
    "@application/(.*)": "<rootDir>/application/$1",
    "@domain/(.*)": "<rootDir>/domain/$1",
    "@errors/(.*)": "<rootDir>/errors/$1",
    "@infra/(.*)": "<rootDir>/infra/$1",
    "@utils/(.*)": "<rootDir>/utils/$1",
    "@factories/(.*)": "<rootDir>/factories/$1",
    "@interfaces/(.*)": "<rootDir>/interfaces/$1"
  },
  

};