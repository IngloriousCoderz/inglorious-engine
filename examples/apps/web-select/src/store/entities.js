export const entities = {
  countrySelect: {
    type: "select",
    id: "countrySelect",
    options: [
      { value: "br", label: "Brazil" },
      { value: "it", label: "Italy" },
      { value: "ca", label: "Canada" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "fr", label: "France" },
    ],
    placeholder: "Select a country...",
    isSearchable: true,
    isClearable: true,
  },

  multiSelect: {
    type: "select",
    id: "multiSelect",
    options: [
      { value: "js", label: "JavaScript" },
      { value: "ts", label: "TypeScript" },
      { value: "java", label: "Java" },
      { value: "csharp", label: "C#" },
      { value: "py", label: "Python" },
      { value: "go", label: "Go" },
      { value: "php", label: "PHP" },
    ],
    placeholder: "Select languages...",
    isMulti: true,
    isSearchable: true,
    isClearable: true,
  },
}
