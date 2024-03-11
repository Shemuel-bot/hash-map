class HashMap {
  constructor(length) {
    this.bucket = Array(length);
    this.bucketsFilled = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.bucket.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    let exist = false;
    if (this.bucket[index] === undefined) {
      const percent = this.bucketsFilled / this.bucket.length;

      this.bucket[index] = [[key, value]];
      this.bucketsFilled += 1;

      if (percent >= 0.75) {
        this.bucket.length *= 2;
        for (let i = 0; i < this.bucket.length; i += 1) {
          if (this.bucket[i] !== undefined) {
            this.bucket[this.hash(this.bucket[i][0][0])] = this.bucket[i];
            this.bucket[i] = undefined;
          }
        }
      }
    } 
    if (this.bucket[index] !== undefined) {
      for (let i = 0; i < this.bucket[index].length; i += 1) {
        if (this.bucket[index][i][0] === key) {
          this.bucket[index][i][1] = value;
          exist = true;
        }
      }
      if (!exist) {
        this.bucket[index].push([key, value]);
      }
    }
  }
}
const a = new HashMap(16);
a.set("shem", 18);
a.set("shem", 15);
a.set("sara", 11);
a.set("sara", 12);
console.log(a.bucket[a.hash("shem")][0]);
console.log(a.bucket[a.hash("shem")][1]);
console.log(a.bucket);
