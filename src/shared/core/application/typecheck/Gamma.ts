
export class Gamma<T> {

  private hash: Map<string, T>

  constructor() {
    this.hash = new Map()
  }

  add(name: string, type: T) {
    if (this.hash.has(name)) {
      throw new Error(`Variable ${name} is already defined in the current context.`)
    }
    this.hash.set(name, type)
  }

  get(name: string): T | undefined {
    return this.hash.get(name)
  }

  has(name: string): boolean {
    return this.hash.has(name)
  }

  delete(name: string): void {
    this.hash.delete(name)
  }

  copy(): Gamma<T> {
    const newGamma = new Gamma<T>()
    for (const [key, value] of this.hash.entries()) {
      newGamma.add(key, value)
    }
    return newGamma
  }

  clear(): void {
    this.hash.clear()
  }

  serializeGamma(): Record<string, T> {
    return Object.fromEntries(this.hash.entries())
  }

  public entries(): IterableIterator<[string, T]> {
    return this.hash.entries();
  }

  toString(): string {
    return `{ ${[...this.hash.entries()].map(([k, v]) => `${k}: ${v}`).join(", ")} }`
  }

}