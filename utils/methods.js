export const mapPrivateMethods = (mixinTag, methods) =>
  Object.entries(methods).reduce(
    (acc, [name, method]) => ({
      ...acc,
      [`$_${mixinTag}_${name}`]: method,
    }),
    {}
  )
