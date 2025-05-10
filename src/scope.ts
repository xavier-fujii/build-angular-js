import { log } from "node:console"
import type { Procedure } from "../types/misc"

// maybe use a symbol?
function initWatchVal() {}

type Watcher = {
  watchFn: Procedure
  listenerFn: Procedure
  last: any
}

export class Scope {
  [x: string]: any
  #watchers: Watcher[]

  constructor() {
    this.#watchers = []
  }

  $watch(watchFn: Procedure, listenerFn?: Procedure) {
    const watcher = {
      watchFn: watchFn,
      listenerFn: listenerFn ?? (() => {}),
      last: initWatchVal,
    }
    this.#watchers.push(watcher)
  }

  $digest() {
    let newValue
    let oldValue
    for (const watcher of this.#watchers) {
      newValue = watcher.watchFn(this)
      oldValue = watcher.last
      if (newValue !== oldValue) {
        watcher.last = newValue
        watcher.listenerFn(
          newValue,
          oldValue === initWatchVal ? newValue : oldValue,
          this,
        )
      }
    }
  }
}
