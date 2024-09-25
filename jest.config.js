module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
  },
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
};
