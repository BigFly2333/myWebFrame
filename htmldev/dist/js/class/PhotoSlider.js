/**
 * Created by xumin on 16/10/17.
 */
;(function(){
    var PhotoSlider = Class.extend({
        init: function(id){
            var _this = this,
                x = 0,
                y = 0,
                isMove = false,
                n = 0;
            this.width = 16;
            this.height = 3.6;
            this.left = 0;
            this.top = 0;

            this.fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size']);
            this.wrap = typeof id === "string" ? document.getElementById(id) : id;
            this.oUl = this.wrap.getElementsByTagName("ul")[0];
            this.aLi = this.wrap.getElementsByTagName("li");
            this.timer = 3000;
            this.aSort = [];
            this.iCenter = 2;
            this._doPrev = function () {return _this.doPrev.apply(_this)};
            this._doNext = function () {return _this.doNext.apply(_this)};
            this._touchStart = function(e){
                x = e.touches[0].pageX;
                y = e.touches[0].pageY;
                clearInterval(_this.timer)
            };
            this._touchMove = function(e){
                if (Math.abs(e.touches[0].pageX - x) > (Math.abs(e.touches[0].pageY - y))) {
                    isMove = true;
                    n = e.touches[0].pageX - x;
                    e.preventDefault();
                } else {
                    isMove = false;
                    n = 0;
                }
            };
            this._touchEnd = function(){
                if(n<=-30){
                    _this.doNext();
                    n=0;
                }else if(n>=30){
                    _this.doPrev();
                    n=0;
                }
                _this.timer = setInterval(function ()
                {
                    _this.doNext()
                }, 3000);
            };
            this.options = [
                {width:this.width*this.fontSize, height:this.height*this.fontSize, top:this.top, left:this.left, zIndex:998 ,opacity:100},
                {width:this.width*this.fontSize, height:this.height*this.fontSize, top:this.top, left:this.left, zIndex:998 ,opacity:0},
                {width:this.width*this.fontSize, height:this.height*this.fontSize, top:this.top, left:this.left, zIndex:998 ,opacity:0},
            ];
            for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
            this.setUp();
            this.addEvent(this.oUl,'touchstart',this._touchStart);
            this.addEvent(this.oUl,'touchmove',this._touchMove);
            this.addEvent(this.oUl,'touchend',this._touchEnd);
            this.timer = setInterval(function ()
            {
                _this.doNext()
            }, 3000);
        },
        doPrev : function () {
            this.aSort.unshift(this.aSort.pop());
            this.setUp();
        },
        doNext : function () {
            this.aSort.push(this.aSort.shift());
            this.setUp();
        },
        setUp : function () {
            var _this = this;
            var i = 0;
            for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
            for (i = 0; i < this.aSort.length; i++)
            {
                this.aSort[i].index = i;
                if (i < 3)
                {
                    this.css(this.aSort[i], "display", "block");
                    this.doMove(this.aSort[i], this.options[i], function () {});
                }
                else
                {
                    this.css(this.aSort[i], "display", "none");
                    this.css(this.aSort[i], "width", 0);
                    this.css(this.aSort[i], "height", 0);
                    this.css(this.aSort[i], "top", 2.1*this.fontSize);
                    this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
                }
            }
            //var list = $('#focus_Box').find('ul').eq(0).find('li');
            //var list_id = list.eq(0).data('num');
            //$('.now').html(list_id+1);
            //$('.whole').html(list.length);
        },
        addEvent : function (oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
        },
        css : function (oElement, attr, value) {
            if (arguments.length == 2)
            {
                return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
            }
            else if (arguments.length == 3)
            {
                switch (attr)
                {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                    case "bottom":
                        oElement.style[attr] = value + "px";
                        break;
                    case "opacity" :
                        oElement.style.filter = "alpha(opacity=" + value + ")";
                        oElement.style.opacity = value / 100;
                        break;
                    default :
                        oElement.style[attr] = value;
                        break
                }
            }
        },
        doMove : function (oElement, oAttr, fnCallBack) {
            var _this = this;
            clearInterval(oElement.timer);
            oElement.timer = setInterval(function ()
            {
                var bStop = true;
                for (var property in oAttr)
                {
                    var iCur = parseFloat(_this.css(oElement, property));
                    property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
                    var iSpeed = (oAttr[property] - iCur) / 10;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                    if (iCur != oAttr[property])
                    {
                        bStop = false;
                        _this.css(oElement, property, iCur + iSpeed)
                    }
                }
                if (bStop)
                {
                    clearInterval(oElement.timer);
                    fnCallBack && fnCallBack.apply(_this, arguments)
                }
            }, 30)
        }
    });
    if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function () {
            return PhotoSlider;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = PhotoSlider.attach;
        module.exports.PhotoSlider = PhotoSlider;
    } else {
        window.PhotoSlider = PhotoSlider;
    }
}());