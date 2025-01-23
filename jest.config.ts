import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$', // Указывает Jest искать файлы с расширением .spec.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Использует ts-jest для транспиляции TypeScript в JavaScript
  },
  collectCoverageFrom: ['**/*.(t|j)s'], // Покрытие тестами
  coverageDirectory: '../coverage', // Директория для отчета о покрытии
  testEnvironment: 'node', // Указывает, что тесты будут выполняться в среде node.js
};

export default config;
