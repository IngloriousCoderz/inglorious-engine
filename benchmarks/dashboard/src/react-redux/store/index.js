import { configureStore } from "@reduxjs/toolkit"

import data from "./data.slice.js"
import metrics from "./metrics.slice.js"

export const store = configureStore({
  reducer: { data, metrics },
})
