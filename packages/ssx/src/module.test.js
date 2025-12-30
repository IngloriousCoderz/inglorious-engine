import { expect, it } from "vitest"

import { getModuleName } from "./module"

it("should get the name when it's the only export", () => {
  const module = {
    about: {
      render: () => {},
    },
  }

  expect(getModuleName(module)).toBe("about")
})

it("should get the name when there's other exports", () => {
  const module = {
    about: {
      render: () => {},
    },
    title: "About",
    meta: {
      description: "About page",
    },
    scripts: ["/script.js"],
    styles: ["/style.css"],
  }

  expect(getModuleName(module)).toBe("about")
})

it("should get the name when the exports are functions", () => {
  const module = {
    about: {
      render: () => {},
    },
    title: () => "About",
    meta: () => ({
      description: "About page",
    }),
    scripts: ["/script.js"],
    styles: ["/style.css"],
  }

  expect(getModuleName(module)).toBe("about")
})
