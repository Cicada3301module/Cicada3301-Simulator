// ─────────────────────────────────────────────────────────────────────────────
// MONO RANDOM  (exact port of C# System.Random)
// ─────────────────────────────────────────────────────────────────────────────

class MonoRandom {
  constructor(seed) {
    this.seed = seed;
    this._seedArray = new Array(56).fill(0);
    let num = (161803398 - Math.abs(seed)) | 0;
    this._seedArray[55] = num;
    let num2 = 1;
    for (let i = 1; i < 55; i++) {
      const idx = (21 * i) % 55;
      this._seedArray[idx] = num2;
      num2 = (num - num2) | 0;
      if (num2 < 0) num2 = (num2 + 2147483647) | 0;
      num = this._seedArray[idx];
    }
    for (let j = 1; j < 5; j++)
      for (let k = 1; k < 56; k++) {
        this._seedArray[k] = (this._seedArray[k] - this._seedArray[1 + (k + 30) % 55]) | 0;
        if (this._seedArray[k] < 0) this._seedArray[k] = (this._seedArray[k] + 2147483647) | 0;
      }
    this._inext  = 0;
    this._inextp = 31;
  }

  nextDouble() {
    if (++this._inext  >= 56) this._inext  = 1;
    if (++this._inextp >= 56) this._inextp = 1;
    let num = (this._seedArray[this._inext] - this._seedArray[this._inextp]) | 0;
    if (num < 0) num = (num + 2147483647) | 0;
    this._seedArray[this._inext] = num;
    return num * 4.6566128752457969e-10;
  }

  nextMax(max)           { return (this.nextDouble() * max) | 0; }
  nextInt()              { return (this.nextDouble() * 2147483647) | 0; }
  next(min, max)         { return max - min <= 1 ? min : this.nextMax(max - min) + min; }

  shuffleArray(arr) {
    return arr.map(v => ({ r: this.nextDouble(), v }))
              .sort((a, b) => a.r - b.r)
              .map(x => x.v);
  }

  shuffleFisherYates(list) {
    let i = list.length;
    while (i > 1) {
      const idx = this.next(0, i--);
      [list[idx], list[i]] = [list[i], list[idx]];
    }
    return list;
  }
}


function combinedSeed(ruleseedNumber) {
  return (ruleseedNumber * state.userID) % 2147483647;
}