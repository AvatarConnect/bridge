import privatePropProxy from './privatePropProxy'

export default (
  imagePropsAttribute,
  { defer = false, target = '$src' } = {}
) => {
  target = target.replace('$', '')
  // @vue/component
  return {
    mixins: [privatePropProxy('image', { [target]: null })],
    watch: {
      [imagePropsAttribute]: defer ? () => {} : '$loadImage',
    },
    created() {
      if (defer || !process.browser) return
      this.$loadImage()
    },
    methods: {
      async $loadImage() {
        const { fit, height, src, width } = this[imagePropsAttribute]
        this[`$${target}`] = await this.$download(
          this.$img(
            src,
            { fit, height, width },
            { provider: this.$config.imageProvider }
          )
        )
      },
    },
  }
}
