const Bugsnag = require('@bugsnag/electron')
const nativeCrashes = require('@bugsnag/electron-test-helpers/src/native_crashes')

module.exports = {
  uncaughtException () {
    // eslint-disable-next-line
    foo()
  },

  unhandledRejection () {
    Promise.reject(new TypeError('invalid'))
  },

  crash (crashType) {
    if (!crashType) {
      process.crash()
    } else if (nativeCrashes[crashType]) {
      nativeCrashes[crashType]()
    } else {
      throw new Error(`unknown crashType: ${crashType}`)
    }
  },

  notify () {
    Bugsnag.notify(new ReferenceError('something bad'))
  }
}
