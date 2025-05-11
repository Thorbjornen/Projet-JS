const {exec} = require('node:child_process')
const gulp = require('gulp')

gulp.task('format', cb => {
  exec('npx xo --fix', (error, stdout, stderr) => {
    console.log(stdout)
    console.error(stderr)
    cb(error)
  })
})
