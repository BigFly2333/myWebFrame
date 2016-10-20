/**
 * Created by xumin on 16/10/15.
 */
;(function(){
    var PageInit = Class.extend({
        init: function(params){
            this.fastClick();
            this.footerFix();
            this.compatibleIOSBtnActive();
            this.scrollFix(params);
        },
        //兼容ios端:active不能正常显示的bug
        compatibleIOSBtnActive: function(){
            document.addEventListener('touchmove',function(){});
        },
        //禁止ios端微信页面滚动溢出
        scrollFix: function(params){
            if(this.isArray(params)){
                for(var i=0;i<params.length;i++){
                    new ScrollFix(params[i]);
                }
            }
            if(this.isString(params)){
                new ScrollFix(params);
            }
        },
        //兼容ios手机端点击300ms延迟
        fastClick: function(){
            if(this.isIOS()){
                FastClick.attach(document.body);
            }
        },
        //兼容安卓手机底部按钮遮盖bug
        footerFix: function(){
            var footer = document.getElementById('footer');
            if(!this.isIOS()&&footer){
                window.onresize = function() {
                    var top = footer.offsetTop;
                    top < 400 ? footer.style.visibility = 'hidden' : footer.style.visibility = 'visible';
                };
            }
        },
        isString: function(str){
            return (typeof str=='string')&&str.constructor==String;
        },
        isArray: function(obj){
            return (typeof obj=='object')&&obj.constructor==Array;
        },
        isIOS: function(){
            var u = navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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