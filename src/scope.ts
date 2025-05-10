import { log } from "node:console"
import type { Procedure } from "../types/misc"

type Watcher = {
  watchFn: Procedure
  listenerFn: Procedure
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any
}

export class Scope {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any
  $$watchers: Watcher[]

  constructor() {
    this.$$watchers = []
  }

  $watch(watchFn: Procedure, listenerFn: Procedure) {
    const watcher = {
      watchFn: watchFn,
      listenerFn: listenerFn,
    }
    this.$$watchers.push(watcher)
  }

  $digest() {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let newValue
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let oldValue
    for (const watcher of this.$$watchers) {
      newValue = watcher.watchFn(this)
      oldValue = watcher.last
      if (newValue !== oldValue) {
        watcher.last = newValue
        watcher.listenerFn(newValue, oldValue, this)
      }
    }
  }
}
