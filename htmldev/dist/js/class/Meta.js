/**
 * Created by xumin on 16/10/20.
 */
;(function(){
    var Meta = Class.extend({
        init: function(name,content){
            this.name = name;
            this.content = content;
            this.render();
        },
        render: function(){
            var head = document.getElementsByTagName('head')[0];
            var oMeta = document.createElement('meta');
            oMeta.content = this.content;
            oMeta.name = this.name;
            head.appendChild(oMeta);
        }
    });
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return Meta;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Meta.attach;
        module.exports.Meta = Meta;
    } else {
        window.Meta = Meta;
    }
}());