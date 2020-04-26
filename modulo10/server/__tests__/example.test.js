function soma(a, b) {
  return a + b;
}

test('it should return 9 for soma(4, 5)', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
