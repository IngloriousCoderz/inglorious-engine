import bounds from "./bounds.js"
import codeReuse from "./code-reuse.js"
import empty from "./empty.js"
import entities from "./entities.js"
import eventHandlers from "./event-handlers.js"
import framerate from "./framerate.js"
import UiChooser from "./ui-chooser.jsx"

export default {
  title: "Engine",
  component: UiChooser,
}

export const Empty = {
  args: { config: empty },
}

export const Bounds = {
  args: { config: bounds },
}

export const Entities = {
  args: { config: entities },
}

export const EventHandlers = {
  args: { config: eventHandlers },
}

export const CodeReuse = {
  args: { config: codeReuse },
}

export const Framerate = {
  args: { config: framerate },
}
