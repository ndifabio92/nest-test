import { sum } from './sum';

describe('sum.helper.ts', () => {
  it('should sum two numbers', () => {
    //Arrange
    const num1 = 10;
    const numb2 = 20;

    //Act
    const result = sum(num1, numb2);

    //Assert
    expect(result).toBe(num1 + numb2);
  });
});
