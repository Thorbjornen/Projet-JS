const gulp = require('gulp')
const { exec } = require('child_process')

gulp.task('train', cb => {
    exec('node src/train.js', (err, stdout, stderr) => {
        console.log(stdout)
        console.error(stderr)
        cb(err)
    })
})

gulp.task('start', cb => {
    exec('node src/cli.js', (err, stdout, stderr) => {
        console.log(stdout)
        console.error(stderr)
        cb(err)
    })
})

gulp.task('watch', () => {
    gulp.watch('data/dictionnaire.txt', gulp.series('train'))
})
