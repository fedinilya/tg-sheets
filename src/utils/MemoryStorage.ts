class LoginStorage {
  data: Array<number | string> = []

  constructor() {}

  has(id: string | number) {
    return this.data.includes(id)
  }

  remove(id: string | number) {
    this.data = this.data.filter((i) => i !== id)
  }

  add(id: string | number) {
    this.data.push(id)
  }
}

class CalcStorage {
  data: Array<number | string> = []

  constructor() {}

  has(id: string | number) {
    return this.data.includes(id)
  }

  remove(id: string | number) {
    this.data = this.data.filter((i) => i !== id)
  }

  add(id: string | number) {
    this.data.push(id)
  }
}

const loginStorage = new LoginStorage()
const calcStorage = new CalcStorage()

export {loginStorage as LoginStorage, calcStorage as CalcStorage}
