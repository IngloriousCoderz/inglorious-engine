import { generateData, ROWS_TO_GENERATE } from "../../utils"

const generateEntities = (count) => {
  const entities = {
    metrics: {
      type: "metrics",
      fps: 60,
      renderTime: 0,
      updateCount: 0,
      filter: "",
      sortBy: "id",
    },
    chart1: {
      type: "chart",
      title: "Value Distribution",
      rangeStart: 0,
      rangeEnd: 20,
    },
    chart2: {
      type: "chart",
      title: "Progress Overview",
      rangeStart: 20,
      rangeEnd: 40,
    },
    chart3: {
      type: "chart",
      title: "Live Updates",
      rangeStart: 40,
      rangeEnd: 60,
    },
    chart4: {
      type: "chart",
      title: "Status Breakdown",
      rangeStart: 60,
      rangeEnd: 80,
    },
    table: {
      type: "table",
      data: generateData(count),
    },
  }

  return entities
}

export const entities = generateEntities(ROWS_TO_GENERATE)
