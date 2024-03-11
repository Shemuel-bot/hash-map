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

  get(key) {
    for (let i = 0; i < this.bucket[this.hash(key)]?.length ?? 0; i += 1) {
      if (this.bucket[this.hash(key)][i][0] === key)
        return this.bucket[this.hash(key)][i][1];
    }
    return null;
  }

  has(key) {
    for (let i = 0; i < this.bucket[this.hash(key)]?.length ?? 0; i += 1) {
      if (this.bucket[this.hash(key)][i][0] === key) return true;
    }
    return false;
  }

  remove(key) {
    for (let i = 0; i < this.bucket[this.hash(key)]?.length ?? 0; i += 1) {
      if (this.bucket[this.hash(key)][i][0] === key) {
        this.bucket[this.hash(key)].splice(
          this.bucket[this.hash(key)].indexOf(this.bucket[this.hash(key)][i]),
          1,
        );
      }
    }
    return false;
  }

  length() {
    let size = 0;
    for (let i = 0; i < this.bucket.length; i += 1) {
      if (this.bucket[i] !== undefined) size += this.bucket[i].length;
    }
    return size;
  }

  clear() {
    for (let i = 0; i < this.bucket.length; i += 1) {
      this.bucket[i] = undefined;
    }
  }

  keys() {
    const list = [];
    for (let i = 0; i < this.bucket.length; i += 1) {
      if (this.bucket[i] !== undefined) {
        this.bucket[i].map((x) => list.push(x[0]));
      }
    }
    return list;
  }

  values() {
    const list = [];
    for (let i = 0; i < this.bucket.length; i += 1) {
      if (this.bucket[i] !== undefined) {
        this.bucket[i].map((x) => list.push(x[1]));
      }
    }
    return list;
  }

  entries() {
    let list = [];
    for (let i = 0; i < this.bucket.length; i += 1) {
      if (this.bucket[i] !== undefined) {
        list = list.concat(this.bucket[i]);
      }
    }
    return list;
  }
}
