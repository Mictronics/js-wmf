"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_size = exports.get_actions = exports.render_canvas = exports.draw_canvas = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = require("./util");
var wmf_1 = require("./wmf");
var canvas_1 = require("./canvas");
Object.defineProperty(exports, "draw_canvas", { enumerable: true, get: function () { return canvas_1.draw_canvas; } });
Object.defineProperty(exports, "render_canvas", { enumerable: true, get: function () { return canvas_1.render_canvas; } });
var get_actions = function (data) {
    if (data instanceof ArrayBuffer)
        return (0, exports.get_actions)(new Uint8Array(data));
    (0, util_1.prep_blob)(data, 0);
    return (0, wmf_1.get_actions_prepped_bytes)(data);
};
exports.get_actions = get_actions;
var image_size = function (data) {
    if (data instanceof ArrayBuffer)
        return (0, exports.image_size)(new Uint8Array(data));
    (0, util_1.prep_blob)(data, 0);
    return (0, wmf_1.image_size_prepped_bytes)(data);
};
exports.image_size = image_size;
//# sourceMappingURL=index.js.map