// ==UserScript==
// @name         MEGA.nz Ultimately Import
// @name:zh-TW   MEGA.nz Ultimately Import /
// @name:zh-CN   MEGA.nz Ultimately Import 
// @namespace    methusela
// @version      1.0
// @description  Bypass import limit on Mega Web client & remove warning about the space usage
// @author       muneebwanee
// @match        chrome-extension://bigefpfhnfcobdlfbedofhhaibnlghod/*
// @match        http://mega.co.nz/*
// @match        http://mega.io/*
// @match        http://mega.is/*
// @match        http://mega.nz/*
// @match        https://mega.co.nz/*
// @match        https://mega.io/*
// @match        https://mega.is/*
// @match        https://mega.nz/*
// @icon         https://mega.nz/favicon.ico?v=3
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Reference [Augular loaded detect]: https://stackoverflow.com/a/31970556/9182265
    var initWatcher = setInterval(function () {
        if (window.MegaUtils) {
            clearInterval(initWatcher);
            hookImport();
            hookFull();
            console.info('FUNtions Hooked!');
        }
    }, 500);
})();

var hookImport = function () {
    MegaUtils.prototype.checkGoingOverStorageQuota = function(opSize) {
        var promise = new MegaPromise();
        loadingDialog.pshow();

        M.getStorageQuota()
            .always(function() {
            loadingDialog.phide();
        })
            .fail(promise.reject.bind(promise))
            .done(function(data) {

            /*
            if (opSize === -1) {
                opSize = data.mstrg;
            }

            if (opSize > data.mstrg - data.cstrg) {
                var options = {custom: 1, title: l[882], body: l[16927]};

                M.showOverStorageQuota(data, options)
                    .always(function() {
                    promise.reject();
                });
            }
            else {
            */
            promise.resolve();
        });
        return promise;
    };
}

var hookFull = function () {
    FileManager.prototype.showOverStorageQuota = null;
}