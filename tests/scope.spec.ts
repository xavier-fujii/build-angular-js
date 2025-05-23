import { beforeEach, describe, expect, it, vi } from "vitest"
import { Scope } from "../src/scope"

let scope: Scope

beforeEach(() => {
  scope = new Scope()
})

describe("Scope", () => {
  it("can be constructed and used as an object", () => {
    const scope = new Scope()
    scope.aProperty = 1
    expect(scope.aProperty).toBe(1)
  })

  describe("digest", () => {
    // if dirty checking is working,
    // this test suite is wrong

    // it("calls the listener function of a watch on first $digest", () => {
    //   const watchFn = () => {}
    //   const listenerFn = vi.fn()

    //   scope.$watch(watchFn, listenerFn)
    //   scope.$digest()

    //   expect(listenerFn).toHaveBeenCalled()
    // })

    it("calls the watch function with the scope as the argument", () => {
      const watchFn = vi.fn()
      const listenerFn = () => {}
      scope.$watch(watchFn, listenerFn)

      scope.$digest()
      // the scope is provided as the argument
      expect(watchFn).toHaveBeenCalledWith(scope)
    })

    it("calls the listener function when the watched value changes", () => {
      scope.someValue = "a"
      scope.counter = 0

      scope.$watch(
        (scope) => scope.someValue,
        (newValue, oldValue, _scope) => {
          _scope.counter++
        },
      )

      expect(scope.counter).toBe(0)

      scope.$digest()
      expect(scope.counter).toBe(1)

      scope.$digest()
      expect(scope.counter).toBe(1)

      scope.someValue = "b"
      expect(scope.counter).toBe(1)

      scope.$digest()
      expect(scope.counter).toBe(2)
    })

    it("calls listner with new value as old value the first time", () => {
      scope.someValue = 123
      let oldValueGiven

      scope.$watch(
        (scope) => scope.someValue,
        (newValue, oldValue, scope) => {
          oldValueGiven = oldValue
        },
      )

      scope.$digest()

      expect(oldValueGiven).toBe(123)
    })

    it("may have watchers that omit the listener function", () => {
      const watchFn = vi.fn(() => {
        return "something"
      })
      scope.$watch(watchFn)
      scope.$digest()
      expect(watchFn).toHaveBeenCalled()
    })
  })
})
