/**
 * Created by XuDaMin on 2016/10/14 15:46.
 */
;(function () {
    //读取静态图片资源类
    window.StaticResoucesUtil = Class.extend({
        init: function () {
            this.images = {};
        },
        //loadImages 方法 接收两个参数;
        //jsonURL .json文件存放地址
        //callback 回调函数
        loadImages: function (jsonURL, callback) {
            //备份this
            var self = this;
            //创建ajax请求
            var xhr = new XMLHttpRequest();
            //Ajax监听
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        //请求成功时
                        var alreayLoadNumber = 0;
                        //将读取到的文本转换成json格式
                        var jsonObj = JSON.parse(xhr.responseText);
                        //遍历json对象
                        for (var i = 0; i < jsonObj.images.length; i++) {
                            // 创建图像元素
                            var image = new Image();
                            // 设置图像缘
                            image.src = jsonObj.images[i].src;
                            // 备份索引值
                            image.index = i;
                            image.onload = function () {
                                //统计已加载完图片数量
                                alreayLoadNumber++;
                                //储存image对象
                                self.images[jsonObj.images[this.index].name] = this;
                                //执行回调
                                callback(alreayLoadNumber, jsonObj.images.length, self.images);
                            }
                        }
                    }
                }
            };
            xhr.open("get", jsonURL, true);
            xhr.send(null);
        }
    });
}());