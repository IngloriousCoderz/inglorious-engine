export const entities = {
  logoForm: {
    type: "logoForm",
    initialValues: {
      size: 256,
      isInteractive: false,
      faces: [
        { image: "I", reverse: false, eye: true },
        { image: "W", reverse: false, eye: false },
      ],
    },
  },
  liveLogo: {
    type: "liveLogo",
    size: 256,
    faces: [
      { image: "I", reverse: false, eye: true },
      { image: "W", reverse: false, eye: false },
    ],
    isInteractive: false,
    isScrollPrevented: true,
  },
}
