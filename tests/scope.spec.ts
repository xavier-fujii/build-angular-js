import { Scope } from "../src/scope"
import { describe, it, expect, vi, beforeEach } from "vitest"

let scope: Scope

beforeEach(() => {
  scope = new Scope()
})

describe("Scope", () => {
  describe("digest", () => {
    it("calls the listener function of a watch on first $digest", () => {
      const watchFn = () => {
        return "wat"
      }
      const listenerFn = vi.fn()

      scope.$watch(watchFn, listenerFn)
      scope.$digest()

      expect(listenerFn).toHaveBeenCalled()
    })
  })
})
