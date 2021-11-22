import { ReversePipe } from "./reverse.pipe";

describe('Pipe: Reverse', () => {
  it('should display "olleh"', () => {
    let reversePipe = new ReversePipe();

    expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
