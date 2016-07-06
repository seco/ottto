/* jshint multistr: true */

var gulp = require('gulp'),
    exec = require('gulp-exec'),
    args = require('yargs').argv;

gulp.task('flash', function() {
  return gulp.src('./' + args.project + '/main.js')
    .pipe(exec('./esptool.py --port /dev/tty.SLAB_USBtoUART --baud 115200 \
      write_flash --flash_freq 80m --flash_mode qio --flash_size 32m \
      0x0000 "./_firmware/boot_v1.4(b1).bin" \
      0x1000 "./_firmware/espruino_esp8266_user1.bin" \
      0x3FC000 "./_firmware/esp_init_data_default.bin" \
      0x3FE000 "./_firmware/blank.bin" \
    '))
    .pipe(exec.reporter());
});
