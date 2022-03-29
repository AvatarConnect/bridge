import Downloader from 'async-downloader'

export default (_, inject) => {
  const downloader = new Downloader({
    workerUrl: '/workers/download.worker.js',
  })

  inject('download', downloader.download.bind(downloader))
}
