/**
 * Created by bh on 2016/10/20.
 */
require.config({
    paths: {
        "zepto": "./lib/zepto.min",
        "underscore": "./lib/underscore.min",
        "meta": "./class/Meta",
        "diyAlert": "./class/DiyAlert",
        "fastClick": "./class/FastClick",
        "scrollFix": "./class/ScrollFix",
        "pageInit": "./class/PageInit",
        "photoSlider": "./class/PhotoSlider",
        "simpleInheritance": "./lib/simpleInheritance"
    },
    shim: {
        meta: {
            deps: ['simpleInheritance']
        },
        diyAlert: {
            deps: ['simpleInheritance']
        },
        photoSlider: {
            deps: ['simpleInheritance']
        },
        scrollFix: {
            deps: ['simpleInheritance']
        },
        pageInit: {
            deps: ['meta','fastClick','scrollFix', 'simpleInheritance']
        }
    }
});