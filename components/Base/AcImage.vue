<template>
  <img :src="$src" />
</template>
<script>
import image from '~/mixins/image'

export default {
  name: 'AcImage',
  mixins: [image('imageProps')],
  props: {
    /** The crop of the image */
    fit: {
      default: undefined,
      type: String,
      validator: v => ['fill', 'crop', 'fit'].includes(v),
    },

    /** Resolution height */
    height: { default: undefined, type: [Number, String] },

    /** The image source URL (without cloudinary base) */
    src: { default: undefined, type: String },

    /** Resolution width */
    width: { default: undefined, type: [Number, String] },
  },
  computed: {
    imageProps() {
      const { fit, height, src, width } = this
      return { fit, height, src, width }
    },
  },
}
</script>
