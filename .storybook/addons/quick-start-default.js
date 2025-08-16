import { addons } from "@storybook/manager-api"

// This addon ensures the quick-start page is shown by default
addons.register("quick-start-default", () => {
  // Listen for when the manager is ready
  addons.getChannel().on("STORY_RENDERED", (storyId) => {
    // If no specific story is selected, redirect to quick-start
    if (!storyId || storyId === "docs-engine--docs") {
      // Redirect to quick-start
      window.location.hash = "#/docs-quick-start--docs"
    }
  })
})
