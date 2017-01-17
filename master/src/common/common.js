/*
 * @Author: huili.sun
 * @Date:   2016-11-28 15:12:11
 * @Last Modified by:   huili.sun
 * @Last Modified time: 2017-01-13 13:55:19
 */

'use strict';


/*window.onload=function(){  
     fixedTable();  
}  
//当浏览器窗口大小改变时，设置显示内容的高度  
window.onresize=function(){  
     fixedTable();  
     setTimeout(onresize,100);
}  */
function fixedTable(viewid, scrollid, size) {    //viewid为表的ID,scrollid为父div的ID，

    var top = document.getElementById('top').offsetHeight;
    var bottom = document.getElementById('base_pagination').offsetHeight;
    console.log(top)
    console.log(bottom)
    var scroll = document.getElementById(scrollid);     //获取父元素
    scroll.style.height = document.body.clientHeight-top-bottom-115+'px';
    console.log(scroll.style.height)
    var tb2 = document.getElementById(viewid).cloneNode(true);    //复制id为viewid的表元素
    var len = tb2.rows.length;               //获取表的行数
    for (var i = tb2.rows.length; i > size; i--) {       //保留复制表的表头
        tb2.deleteRow(size);
    }
    var bak = document.createElement("div");     //创建一个div标签
    scroll.appendChild(bak);       //将div标签追加到父元素尾部
    bak.appendChild(tb2);          //将复制出来的表的表头追加到新建的div尾部    
    bak.style.position = "absolute";
    bak.style.display = "block";
    bak.style.left = 0;
    bak.style.top = "0px";
    bak.style.width = "100%";
    scroll.onscroll = function() {
        bak.style.top = this.scrollTop + "px";
    }
}



module.exports = fixedTable;
