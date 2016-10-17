/**
 * Created by XuDaMin on 2016/10/14 15:46.
 */
;$(function(){
    /*
    *   实用此类需要先调用 simpleInheritance.js
    *   按钮无事件时 调用方法 new DiyAlert('这里是要显示的title')
    *   按钮有事件时 调用方法 new DiyAlert('这里是要显示的title',params,callback)
    *   params可为空{}
    *   params可用参数
    *       btnText : 按钮的文本 默认为知道了
    *       background : 弹窗背景色
    *       shadowWithEvent : 点击蒙层是否隐藏弹窗 默认为false
    *   callback为点击按钮触发的事件方法
    */

    var DiyAlert = Class.extend({
        init: function(titleText,params,callback){
            //判断是否为pc端
            this.client = this.isPC();
            //标题文本
            this.titleText = titleText||'这是一个alert';
            //按钮文本
            this.btnText = params&&!this.isNullObj(params)&&params['btnText']?params.btnText:'知道了';
            this.background = params&&!this.isNullObj(params)&&params['background']?params.background:'#ECEEF4';
            this.shadowWithEvent = params&&!this.isNullObj(params)&&params['shadowWithEvent']?params.shadowWithEvent:false;
            //定义点击按钮触发的事件
            this.callback = callback?callback:function(){return false};

            //定义弹窗宽度
            this.width = this.client?'400px':'12.75rem';
            //定义弹窗的左右padding
            this.padding = this.client?'20px':'.8rem';
            //定义标题的上margin
            this.titleMarginTop = this.client?'50px':'2.2rem';
            //定义标题的下margin
            this.titleMarginBottom = this.client?'50px':'1.6rem';
            //定义标题字体大小
            this.titleFontsize = this.client?'25px':'.85rem';
            //定义按钮盒子高度
            this.btnBoxH = this.client?'60px':'2.6rem';
            //定义按钮字体大小
            this.btnFontsize = this.client?'20px':'.82rem';
            //定义按钮字体行高
            this.btnLineHeight = this.client?'60px':'2.6rem';
            //定义按钮字体颜色
            this.btnTextColor = '#09d976';

            this.render();
        },
        isPC: function(){
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        isNullObj : function(obj){
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    return false;
                }
            }
            return true;
        },
        render: function(){
            var self = this;
            //创建蒙层元素
            var shadow = document.createElement('div');
            shadow.setAttribute('style','position: fixed;' +
                'z-index:9999;' +
                'bottom:0;' +
                'right:0;' +
                'left:0;' +
                'top:0;' +
                'background:rgba(0,0,0,.7)'
            );
            if(this.shadowWithEvent){
                shadow.addEventListener('click',function(){
                    shadow.remove();
                    popup.remove();
                })
            }
            //创建弹窗元素
            var popup = document.createElement('div');
            popup.setAttribute('style','position:fixed;' +
                'z-index:10000;' +
                'top:50%;' +
                'left:50%;' +
                'width:'+this.width+';' +
                'padding:0 '+this.padding+';' +
                '-webkit-border-radius:.5rem;' +
                '-moz-border-radius:.5rem;' +
                '-ms-border-radius:.5rem;' +
                'border-radius:.5rem;' +
                '-webkit-transform:translate(-50%,-50%);' +
                '-moz-transform:translate(-50%,-50%);' +
                '-ms-transform:translate(-50%,-50%);' +
                'transform:translate(-50%,-50%);' +
                'background-color:'+this.background+';' +
                '-webkit-box-sizing:border-box;' +
                '-moz-box-sizing:border-box;' +
                '-ms-box-sizing:border-box;' +
                'box-sizing:border-box;'
            );

            //创建提醒标题元素
            var title = document.createElement('p');
            title.setAttribute('style','position:relative;' +
                'display:inline-block;' +
                'left:50%;' +
                'max-width:100%;' +
                'color:#555456;' +
                'margin-top:'+this.titleMarginTop+';' +
                'margin-bottom'+this.titleMarginBottom+';' +
                'font-family:"microsoft yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
                'font-size:'+this.titleFontsize+';' +
                'text-align:left;' +
                '-webkit-transform:translate(-50%,-50%);' +
                '-moz-transform:translate(-50%,-50%);' +
                '-ms-transform:translate(-50%,-50%);' +
                'transform:translate(-50%,-50%);'
            );
            title.innerHTML = this.titleText;

            //创建btn盒子
            var btnBox = document.createElement('div');
            btnBox.setAttribute('style','width:100%;' +
                'height:'+this.btnBoxH+';' +
                '-webkit-border-radius:0 0 0.5rem 0.5rem;' +
                '-moz-border-radius:0 0 0.5rem 0.5rem;' +
                '-ms-border-radius:0 0 0.5rem 0.5rem;' +
                'border-radius:0 0 0.5rem 0.5rem;' +
                'border-top:solid 1px #d4d4d4;' +
                '-webkit-box-sizing:border-box;' +
                '-moz-box-sizing:border-box;' +
                '-ms-box-sizing:border-box;' +
                'box-sizing:border-box;'
            );
            btnBox.addEventListener('click',function(){
                shadow.remove();
                popup.remove();
                self.callback();
            });

            //创建按钮元素
            var btn = document.createElement('div');
            btn.setAttribute('style','margin:0;' +
                'text-align:center;' +
                'font-size:'+this.btnFontsize+';' +
                'line-height:'+this.btnLineHeight+';' +
                'font-family:"microsoft yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
                'color:'+this.btnTextColor+';');
            btn.innerHTML = this.btnText;

            var body = document.getElementsByTagName("body").item(0);
            btnBox.appendChild(btn);
            popup.appendChild(title);
            popup.appendChild(btnBox);
            body.appendChild(shadow);
            body.appendChild(popup);
        }
    });
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return DiyAlert;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = DiyAlert.attach;
        module.exports.DiyAlert = DiyAlert;
    } else {
        console.log(0);
        window.DiyAlert = DiyAlert;
    }
}());