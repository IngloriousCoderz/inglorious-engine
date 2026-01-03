export function getModuleName(pageModule) {
  const name = Object.keys(pageModule).find((key) => {
    const value = pageModule[key]
    return (
      value && typeof value === "object" && typeof value.render === "function"
    )
  })

  if (!name) {
    throw new Error(
      "Page module must export an entity with a render() method. " +
        `Found exports: ${Object.keys(pageModule).join(", ")}`,
    )
  }

  return name
}
