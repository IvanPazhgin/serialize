function serialize(arr) {
  const to9BitString = (num) => num.toString(2).padStart(9, '0');
  const to6BitString = (str) => String.fromCharCode(parseInt(str, 2) + 32);

  let bitString = arr.map(to9BitString).join('');
  let result = '';

  for (let i = 0; i < bitString.length; i += 6) {
    let segment = bitString.substring(i, i + 6).padEnd(6, '0');
    result += to6BitString(segment);
  }

  return result;
}

function deserialize(str) {
  const to9BitNumber = (bitStr) => parseInt(bitStr, 2);
  const to6BitString = (char) => (char.charCodeAt(0) - 32).toString(2).padStart(6, '0');

  let bitString = str.split('').map(to6BitString).join('');
  let result = [];

  for (let i = 0; i < bitString.length; i += 9) {
    let segment = bitString.substring(i, i + 9);
    if (segment.length === 9) {
      result.push(to9BitNumber(segment));
    }
  }

  return result;
}

// Тестовые примеры
const tests = [
  { input: [1, 2, 3], expectedRatio: 50 },
  { input: [10, 20, 30, 40, 50], expectedRatio: 50 },
  { input: Array.from({length: 50}, (_, i) => i + 1), expectedRatio: 50 },
  { input: Array.from({length: 100}, (_, i) => i + 1), expectedRatio: 50 },
  { input: Array.from({length: 500}, (_, i) => i + 1), expectedRatio: 50 },
  { input: Array.from({length: 1000}, (_, i) => i + 1), expectedRatio: 50 },
  { input: Array.from({length: 900}, (_, i) => (i % 100) + 1), expectedRatio: 50 }
];

// Запуск тестов
tests.forEach(test => {
  const { input, expectedRatio } = test;
  const serialized = serialize(input);
  const deserialized = deserialize(serialized);
  const compressionRatio = (serialized.length / JSON.stringify(input).length * 100).toFixed(2);

  console.log(`Input: ${JSON.stringify(input)}`);
  console.log(`Serialized: ${serialized}`);
  console.log(`Deserialized: ${JSON.stringify(deserialized)}`);
  console.log(`Compression Ratio: ${compressionRatio}% (Expected: ${expectedRatio}%)\n`);
});
