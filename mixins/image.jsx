import privatePropProxy from './privatePropProxy'

const CLOUDINARY_BASE = 'https://res.cloudinary.com'

const getImageUrl = (cloudinaryName, src, { fit, height, width } = {}) => {
  const transformations = []
  transformations.push('q_auto')
  transformations.push('f_auto')
  if (fit) transformations.push(`c_${fit}`)
  if (height) transformations.push(`h_${height}`)
  if (width) transformations.push(`w_${width}`)
  let url = `${CLOUDINARY_BASE}/${cloudinaryName}/image/fetch/`
  if (transformations.length) url += `${transformations.join(',')}/`
  return url + src
}

export default (
  imagePropsAttribute,
  { defer = false, target = '$src' } = {}
) => {
  target = target.replace('$', '')
  // @vue/component
  return {
    mixins: [privatePropProxy('image', { [target]: null })],
    computed: {
      $_image_src() {
        const { fit, height, src, width } = this[imagePropsAttribute]
        return this.$config.cloudinaryName
          ? getImageUrl(this.$config.cloudinaryName, src, {
              fit,
              height,
              width,
            })
          : src
      },
    },
    watch: {
      $_image_src: defer ? () => {} : '$loadImage',
    },
    created() {
      if (defer || !process.browser) return
      this.$loadImage()
    },
    methods: {
      async $loadImage() {
        this[`$${target}`] = await this.$download(this.$_image_src)
      },
    },
  }
}
