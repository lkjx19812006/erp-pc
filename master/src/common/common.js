/*
 * @Author: huili.sun
 * @Date:   2016-11-28 15:12:11
 * @Last Modified by:   huili.sun
 * @Last Modified time: 2016-11-28 15:57:32
 */

'use strict';



function fixedTable(viewid, scrollid, size) {
    var scroll = document.getElementById(scrollid);
    var tb2 = document.getElementById(viewid).cloneNode(true);
    var len = tb2.rows.length;
    for (var i = tb2.rows.length; i > size; i--) {
        tb2.deleteRow(size);
    }
    var bak = document.createElement("div");
    scroll.appendChild(bak);
    bak.appendChild(tb2);
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
