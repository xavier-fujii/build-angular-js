import type { Procedure } from "../types/misc"

type Watcher = {
  watchFn: Procedure
  listenerFn: Procedure
}

export class Scope {
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
    for (const watcher of this.$$watchers) {
      watcher.listenerFn()
    }
  }
}
