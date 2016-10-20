/**
 * Created by bh on 2016/10/20.
 */
require(['./dist/js/config.js'], function(config) {
    require(['pageInit','photoSlider'],function(PageInit,PhotoSlider){
        // new PageInit('main');
        new PhotoSlider('slider',16,4);
    });
});
