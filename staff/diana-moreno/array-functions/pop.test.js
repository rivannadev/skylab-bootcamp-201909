describe('pop', function() {
  it('should return the deleted item', function() {
    var array = ['a', 'b', 'c'];

    expect(pop(array)).toBe('c');
    expect(array.length).toBe(2);
    expect(array[array.length - 1]).toBe('b');
    expect(array[array.length - 2]).toBe('a');
  });

  it('should return undefined when an empty array is passed', function() {
    var array = [];

    expect(pop(array)).toBe(undefined);
  });

  it('should throw an error when others types different to array are passed', function() {
    var string = 'hello';
    var number = 'number';

    expect(function() { pop(string) }).toThrowError('Data type is not Array');
  });

  it('should modify the original array', function() {
    var array = ['a', 'b', 'c'];
    pop(array);

    expect(array.toString()).toBe('a,b');
  });
});