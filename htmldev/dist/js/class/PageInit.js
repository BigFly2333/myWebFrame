/**
 * Created by xumin on 16/10/15.
 */
;(function(){
    var PageInit = Class.extend({
        init: function(params){
            if(this.isIOS()) this.fastClick();

            this.compatibleIOSBtnActive();

            if(this.isArray(params)){
                for(var i=0;i<params.length;i++){
                    this.scrollFix(params[i]);
                }
            }
            if(this.isString(params)){
                this.scrollFix(params);
            }
        },
        isString: function(){
            return (typeof str=='string')&&str.constructor==String;
        },
        isArray: function(obj){
            return (typeof obj=='object')&&obj.constructor==Array;
        },
        isIOS: function(){
            var u = navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        },
        //兼容ios端:active不能正常显示的bug
        compatibleIOSBtnActive: function(){
            document.addEventListener('touchmove',function(){});
        },
        //禁止ios端微信页面滚动溢出
        scrollFix: function(className){
            new ScrollFix(className);
        },
        //兼容ios手机端点击300ms延迟
        fastClick: function(){
            FastClick.attach(document.body);
        }
    });
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return PageInit;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = PageInit.attach;
        module.exports.PageInit = PageInit;
    } else {
        window.PageInit = PageInit;
    }
}());