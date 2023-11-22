module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,mjs}'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ["json", "lcov"],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { 'url': 'http://localhost/' },
  snapshotSerializers: ['enzyme-to-json/serializer', '@emotion/jest/enzyme-serializer' ],
  snapshotResolver: "<rootDir>/jest/snapshotResolver.js",
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: false,
  setupFilesAfterEnv:['<rootDir>/jest/jest.setup.js'],
  moduleNameMapper: {
    '^lib_ui/(.*)$': '$1' ,
    '^.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    '^@components$': '../../components',
    '^@grids$': '../../grids',
    '^@exposed$': '../../exposed',
    '^@services$': '../../services',
    '^@utils$': '../../utils',
    '^@searches$': '../../searches',
    '^@jest$':'../../../jest'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileTransformer.js' 
  },

  };