module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    "@root/(.*)": "<rootDir>/$1",
    "@controllers/(.*)": "<rootDir>/server/controllers/$1",
    "@models/(.*)": "<rootDir>/server/models/$1",
    "@utils/(.*)": "<rootDir>/server/utils/$1"
  },
  setupFilesAfterEnv: [
    require.resolve('regenerator-runtime/runtime'),
  ],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/', 'client'],
  modulePathIgnorePatterns: ['/dist/'],
}
