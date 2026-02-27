import type {Type} from "@/shared/core/domain/ast";

export class Gamma {

  private hash: Map<string, Type>

  constructor() {
    this.hash = new Map()
  }

  add(name: string, type: Type) {
    if (this.hash.has(name)) {
      throw new Error(`Variable ${name} is already defined in the current context.`)
    }
    this.hash.set(name, type)
  }

  get(name: string): Type | undefined {
    return this.hash.get(name)
  }

  has(name: string): boolean {
    return this.hash.has(name)
  }

  delete(name: string): void {
    this.hash.delete(name)
  }

  copy(): Gamma {
    const newGamma = new Gamma()
    for (const [key, value] of this.hash.entries()) {
      newGamma.add(key, value)
    }
    return newGamma
  }

  toString(): string {
    return `{ ${[...this.hash.entries()].map(([k, v]) => `${k}: ${v}`).join(", ")} }`
  }

}