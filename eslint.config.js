import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    astro: true,
    css: true,
    html: true,
    markdown: true,
    svg: true,
  },
  markdown: true,
  unocss: true,
  astro: true,
})
