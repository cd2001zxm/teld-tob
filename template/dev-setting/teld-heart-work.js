/*! builded Wed Mar 11 2020 13:58:59 */

onmessage = function(e) {
    var a = e.data[0], t = e.data[1], o = e.data[2], n = e.data[3], d = e.data[4], s = e.data[5], r = e.data[6], i = e.data[7], p = r + "&userOnlineInfo=" + JSON.stringify({
        BrowserType: s,
        clientType: n,
        addressComponent: a.addressComponent,
        formattedAddress: a.formattedAddress,
        position: a.position,
        pageName: o,
        application: t.isPlatformIndex ? "\u9996\u9875" : t.SubApplication,
        Ext1: i
    });
    oReq = new XMLHttpRequest(), oReq.async = !0, oReq.open("POST", d + "WRPFrame-RecordUserOnline", !0), 
    oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), 
    oReq.send(p);
};