/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var WMF;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Records.js":
/*!***********************!*\
  !*** ./js/Records.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WMFEscapes = exports.WMFRecords = void 0;
/* 2.1.1.1 RecordType Enumeration */
exports.WMFRecords = {
    0x0000: { n: "META_EOF" },
    0x001E: { n: "META_SAVEDC" },
    0x0035: { n: "META_REALIZEPALETTE" },
    0x0037: { n: "META_SETPALENTRIES" },
    0x00F7: { n: 'META_CREATEPALETTE' },
    0x0102: { n: "META_SETBKMODE" },
    0x0103: { n: "META_SETMAPMODE" },
    0x0104: { n: 'META_SETROP2' },
    0x0105: { n: 'META_SETRELABS' },
    0x0106: { n: "META_SETPOLYFILLMODE" },
    0x0107: { n: "META_SETSTRETCHBLTMODE" },
    0x0108: { n: 'META_SETTEXTCHAREXTRA' },
    0x0127: { n: "META_RESTOREDC" },
    0x012C: { n: "META_SELECTCLIPREGION" },
    0x012D: { n: "META_SELECTOBJECT" },
    0x012E: { n: "META_SETTEXTALIGN" },
    0x012A: { n: 'META_INVERTREGION' },
    0x012B: { n: 'META_PAINTREGION' },
    0x0139: { n: 'META_RESIZEPALETTE' },
    0x0142: { n: 'META_DIBCREATEPATTERNBRUSH' },
    0x0149: { n: 'META_SETLAYOUT' },
    0x01F0: { n: "META_DELETEOBJECT" },
    0x01F9: { n: 'META_CREATEPATTERNBRUSH' },
    0x0201: { n: 'META_SETBKCOLOR' },
    0x0209: { n: "META_SETTEXTCOLOR" },
    0x020B: { n: "META_SETWINDOWORG" },
    0x020C: { n: "META_SETWINDOWEXT" },
    0x020A: { n: 'META_SETTEXTJUSTIFICATION' },
    0x020D: { n: 'META_SETVIEWPORTORG' },
    0x020E: { n: 'META_SETVIEWPORTEXT' },
    0x020F: { n: 'META_OFFSETWINDOWORG' },
    0x0211: { n: 'META_OFFSETVIEWPORTORG' },
    0x0213: { n: 'META_LINETO' },
    0x0214: { n: 'META_MOVETO' },
    0x0220: { n: 'META_OFFSETCLIPRGN' },
    0x0228: { n: 'META_FILLREGION' },
    0x0231: { n: 'META_SETMAPPERFLAGS' },
    0x0234: { n: 'META_SELECTPALETTE' },
    0x02FA: { n: "META_CREATEPENINDIRECT" },
    0x02FB: { n: "META_CREATEFONTINDIRECT" },
    0x02FC: { n: "META_CREATEBRUSHINDIRECT" },
    0x0324: { n: "META_POLYGON" },
    0x0325: { n: "META_POLYLINE" },
    0x0410: { n: 'META_SCALEWINDOWEXT' },
    0x0412: { n: 'META_SCALEVIEWPORTEXT' },
    0x0415: { n: 'META_EXCLUDECLIPRECT' },
    0x0416: { n: "META_INTERSECTCLIPRECT" },
    0x0418: { n: 'META_ELLIPSE' },
    0x0419: { n: 'META_FLOODFILL' },
    0x041B: { n: 'META_RECTANGLE' },
    0x041F: { n: 'META_SETPIXEL' },
    0x0429: { n: 'META_FRAMEREGION' },
    0x0436: { n: 'META_ANIMATEPALETTE' },
    0x0521: { n: 'META_TEXTOUT' },
    0x0538: { n: "META_POLYPOLYGON" },
    0x0548: { n: 'META_EXTFLOODFILL' },
    0x061C: { n: 'META_ROUNDRECT' },
    0x061D: { n: 'META_PATBLT' },
    0x0626: { n: "META_ESCAPE" },
    0x06FF: { n: 'META_CREATEREGION' },
    0x0817: { n: 'META_ARC' },
    0x081A: { n: 'META_PIE' },
    0x0830: { n: 'META_CHORD' },
    0x0922: { n: 'META_BITBLT' },
    0x0940: { n: "META_DIBBITBLT" },
    0x0A32: { n: "META_EXTTEXTOUT" },
    0x0B41: { n: "META_DIBSTRETCHBLT" },
    0x0B23: { n: 'META_STRETCHBLT' },
    0x0D33: { n: 'META_SETDIBTODEV' },
    0x0F43: { n: 'META_STRETCHDIB' },
    0xFFFF: { n: "META_SHEETJS" }
};
exports.WMFEscapes = {
    0x000F: { n: "META_ESCAPE_ENHANCED_METAFILE" }
};


/***/ }),

/***/ "./js/canvas.js":
/*!**********************!*\
  !*** ./js/canvas.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.draw_canvas = exports.render_canvas = exports.render_actions_to_context = exports.set_ctx_state = exports.css_color = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = __webpack_require__(/*! ./util */ "./js/util.js");
var wmf_1 = __webpack_require__(/*! ./wmf */ "./js/wmf.js");
var css_color = function (clr) { return "#".concat((clr & 0xFF).toString(16).padStart(2, "0")).concat(((clr >> 8) & 0xFF).toString(16).padStart(2, "0")).concat(((clr >> 16) & 0xFF).toString(16).padStart(2, "0")); };
exports.css_color = css_color;
var set_ctx_state = function (ctx, state) {
    if (!state)
        return;
    var font = "";
    if (state.Font) {
        if (state.Font.Italic)
            font += " italic";
        if (state.Font.Weight)
            font += " ".concat(state.Font.Weight == 700 ? "bold" : state.Font.Weight == 400 ? "" : state.Font.Weight);
        if (state.Font.Height < 0)
            font += " ".concat(-state.Font.Height, "px");
        else if (state.Font.Height > 0)
            font += " ".concat(state.Font.Height, "px");
        var name_1 = state.Font.Name || "";
        if (name_1 == "System")
            name_1 = "Calibri"; // TODO: default sys font is Segoe UI
        if (name_1)
            font += " '".concat(name_1, "', sans-serif");
        ctx.font = font.trim();
    }
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    if ((state.TextAlignmentMode & wmf_1.eTextAlignmentMode.Top) == wmf_1.eTextAlignmentMode.Top) {
        ctx.textBaseline = 'top';
    }
    if ((state.TextAlignmentMode & wmf_1.eTextAlignmentMode.Bottom) == wmf_1.eTextAlignmentMode.Bottom) {
        ctx.textBaseline = 'bottom';
    }
    if ((state.TextAlignmentMode & wmf_1.eTextAlignmentMode.Center) == wmf_1.eTextAlignmentMode.Center) {
        ctx.textAlign = 'center';
    }
    else if ((state.TextAlignmentMode & wmf_1.eTextAlignmentMode.Right) == wmf_1.eTextAlignmentMode.Right) {
        ctx.textAlign = 'right';
    }
};
exports.set_ctx_state = set_ctx_state;
// TODO: DIB BIT ORDER?
var render_actions_to_context = function (out, ctx) {
    out.forEach(function (act) {
        ctx.save();
        (0, exports.set_ctx_state)(ctx, act.s);
        switch (act.t) {
            case "poly":
                ctx.beginPath();
                if (act.s.Pen.Color != null)
                    ctx.strokeStyle = (0, exports.css_color)(act.s.Pen.Color);
                if (act.s.Pen.Width > 0)
                    ctx.lineWidth = act.s.Pen.Width;
                if (act.s.Brush.Color != null)
                    ctx.fillStyle = (0, exports.css_color)(act.s.Brush.Color);
                ctx.moveTo(act.p[0][0], act.p[0][1]);
                act.p.slice(1).forEach(function (_a) {
                    var x = _a[0], y = _a[1];
                    ctx.lineTo(x, y);
                });
                if (act.g)
                    ctx.closePath();
                if (act.s.Pen.Style != 5)
                    ctx.stroke();
                if (act.s.BkMode !== wmf_1.eMixMode.Transparent && act.s.Brush.Style != wmf_1.eBrushStyles.Null)
                    ctx.fill();
                break;
            case 'lineto':
                ctx.beginPath();
                ctx.moveTo(act.s.Position[0], act.s.Position[1]);
                if (act.s.Pen.Color != null)
                    ctx.strokeStyle = (0, exports.css_color)(act.s.Pen.Color);
                if (act.s.Pen.Width > 0)
                    ctx.lineWidth = act.s.Pen.Width;
                if (act.s.Brush.Color != null)
                    ctx.fillStyle = (0, exports.css_color)(act.s.Brush.Color);
                ctx.lineTo(act.p[0], act.p[1]);
                ctx.closePath();
                if (act.s.Pen.Style != 5)
                    ctx.stroke();
                if (act.s.BkMode !== wmf_1.eMixMode.Transparent && act.s.Brush.Style != wmf_1.eBrushStyles.Null)
                    ctx.fill();
                break;
            case "rect":
                ctx.beginPath();
                if (act.s.Pen.Color != null)
                    ctx.strokeStyle = (0, exports.css_color)(act.s.Pen.Color);
                if (act.s.Pen.Width > 0)
                    ctx.lineWidth = act.s.Pen.Width;
                if (act.s.Brush.Color != null)
                    ctx.fillStyle = (0, exports.css_color)(act.s.Brush.Color);
                ctx.rect(act.p[0][0], act.p[0][1], act.p[1][0] - act.p[0][0], act.p[1][1] - act.p[0][1]);
                ctx.closePath();
                if (act.s.Pen.Style != 5)
                    ctx.stroke();
                if (act.s.BkMode !== wmf_1.eMixMode.Transparent || act.s.Brush.Style != wmf_1.eBrushStyles.Null)
                    ctx.fill();
                break;
            case "roundrect":
                if (act.s.Pen.Color != null)
                    ctx.strokeStyle = (0, exports.css_color)(act.s.Pen.Color);
                if (act.s.Pen.Width > 0)
                    ctx.lineWidth = act.s.Pen.Width;
                if (act.s.Brush.Color != null)
                    ctx.fillStyle = (0, exports.css_color)(act.s.Brush.Color);
                ctx.roundRect(act.p[0][0], act.p[0][1], act.p[1][0] - act.p[0][0], act.p[1][1] - act.p[0][1], act.r);
                if (act.s.Pen.Style != 5)
                    ctx.stroke();
                if (act.s.BkMode !== wmf_1.eMixMode.Transparent || act.s.Brush.Style != wmf_1.eBrushStyles.Null)
                    ctx.fill();
                break;
            case 'ellipse':
                ctx.beginPath();
                if (act.s.Pen.Color != null)
                    ctx.strokeStyle = (0, exports.css_color)(act.s.Pen.Color);
                if (act.s.Pen.Width > 0)
                    ctx.lineWidth = act.s.Pen.Width;
                if (act.s.Brush.Color != null)
                    ctx.fillStyle = (0, exports.css_color)(act.s.Brush.Color);
                var rx = (act.p[1][0] - act.p[0][0]) / 2;
                var ry = (act.p[1][1] - act.p[0][1]) / 2;
                var x = act.p[0][0] + rx;
                var y = act.p[0][1] + ry;
                ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
                ctx.closePath();
                if (act.s.Pen.Style !== 5)
                    ctx.stroke();
                if (act.s.BkMode !== wmf_1.eMixMode.Transparent && act.s.Brush.Style !== wmf_1.eBrushStyles.Null)
                    ctx.fill();
                break;
            case "text":
                {
                    if (act.s && act.s.TextColor)
                        ctx.fillStyle = (0, exports.css_color)(act.s.TextColor);
                    if (act.s.Font.Angle != 0) {
                        ctx.translate(act.p[0], act.p[1]);
                        ctx.rotate(-act.s.Font.Angle * Math.PI / 180);
                        ctx.fillText(act.v, 0, 0);
                        ctx.translate(-act.p[0], -act.p[1]);
                    }
                    else
                        ctx.fillText(act.v, act.p[0], act.p[1]);
                }
                break;
            case "cpy":
                {
                    // TODO: base on ROP
                    var idata = ctx.getImageData(act.src[0][0], act.src[1][0], act.src[0][1], act.src[1][1]);
                    ctx.putImageData(idata, act.dst[0], act.dst[1]);
                }
                break;
            case "str":
                {
                    if (act.data && act.data.BitCount == 24 && act.data.ImageData) {
                        var _o = new Uint8ClampedArray(act.data.Width * act.data.Height * 4);
                        for (var i = 0; i < act.data.Width * act.data.Height; ++i) {
                            var j = (i % act.data.Width) + act.data.Width * (act.data.Height - 1 - Math.floor(i / act.data.Width));
                            _o[4 * i] = act.data.ImageData[3 * j + 2];
                            _o[4 * i + 1] = act.data.ImageData[3 * j + 1];
                            _o[4 * i + 2] = act.data.ImageData[3 * j];
                            _o[4 * i + 3] = 255;
                        }
                        var idata = new ImageData(_o, act.data.Width, act.data.Height);
                        ctx.putImageData(idata, act.dst[0][0], act.dst[1][0]);
                    }
                    // TODO: ROP et al
                }
                break;
        }
        ctx.restore();
    });
};
exports.render_actions_to_context = render_actions_to_context;
var render_canvas = function (out, image) {
    var ctx;
    /* find first action with window info */
    out.forEach(function (act) {
        if (ctx)
            return;
        if (!act.s)
            return;
        if (!act.s.Extent || !act.s.Origin)
            return;
        image.width = act.s.Extent[0] - act.s.Origin[0];
        image.height = act.s.Extent[1] - act.s.Origin[1];
        ctx = image.getContext('2d');
        ctx.save();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(0, 0, act.s.Extent[0] - act.s.Origin[0], act.s.Extent[1] - act.s.Origin[1]);
        ctx.restore();
    });
    if (!ctx)
        ctx = image.getContext('2d');
    (0, exports.render_actions_to_context)(out, ctx);
};
exports.render_canvas = render_canvas;
var draw_canvas = function (data, image) {
    if (data instanceof ArrayBuffer)
        return (0, exports.draw_canvas)(new Uint8Array(data), image);
    (0, util_1.prep_blob)(data, 0);
    var out = (0, wmf_1.get_actions_prepped_bytes)(data);
    return (0, exports.render_canvas)(out, image);
};
exports.draw_canvas = draw_canvas;


/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.image_size = exports.get_actions = exports.render_canvas = exports.draw_canvas = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = __webpack_require__(/*! ./util */ "./js/util.js");
var wmf_1 = __webpack_require__(/*! ./wmf */ "./js/wmf.js");
var canvas_1 = __webpack_require__(/*! ./canvas */ "./js/canvas.js");
Object.defineProperty(exports, "draw_canvas", ({ enumerable: true, get: function () { return canvas_1.draw_canvas; } }));
Object.defineProperty(exports, "render_canvas", ({ enumerable: true, get: function () { return canvas_1.render_canvas; } }));
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


/***/ }),

/***/ "./js/util.js":
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bconcat = exports.__utf16le = exports.new_buf = exports.prep_blob = exports.CheckField = exports.WriteShift = exports.ReadShift = exports.chr1 = exports.chr0 = exports._chr = exports.new_unsafe_buf = exports.new_raw_buf = exports.has_buf = exports.Buffer_from = void 0;
// ---
var has_buf = !!(typeof Buffer !== 'undefined' && typeof process !== 'undefined' && typeof process.versions !== 'undefined' && process.versions.node);
exports.has_buf = has_buf;
var Buffer_from;
exports.Buffer_from = Buffer_from;
if (typeof Buffer !== 'undefined') {
    var nbfs = !Buffer.from;
    if (!nbfs)
        try {
            Buffer.from("foo", "utf8");
        }
        catch (e) {
            nbfs = true;
        }
    exports.Buffer_from = Buffer_from = nbfs ? (function (buf, enc) { return (enc) ? new Buffer(buf, enc) : new Buffer(buf); }) : Buffer.from.bind(Buffer);
    if (!Buffer.alloc)
        Buffer.alloc = function (n) { return new Buffer(n); };
    if (!Buffer.allocUnsafe)
        Buffer.allocUnsafe = function (n) { return new Buffer(n); };
}
var new_raw_buf = function (len) { return has_buf ? Buffer.alloc(len) : new Array(len); };
exports.new_raw_buf = new_raw_buf;
var new_unsafe_buf = function (len) { return has_buf ? Buffer.allocUnsafe(len) : new Array(len); };
exports.new_unsafe_buf = new_unsafe_buf;
var _chr = function (c) { return String.fromCharCode(c); };
exports._chr = _chr;
exports.chr0 = /\u0000/g; // eslint-disable-line no-control-regex
exports.chr1 = /[\u0001-\u0006]/g; // eslint-disable-line no-control-regex
// ---
var read_double_le = function (b, idx) {
    var s = 1 - 2 * (b[idx + 7] >>> 7);
    var e = ((b[idx + 7] & 0x7f) << 4) + ((b[idx + 6] >>> 4) & 0x0f);
    var m = (b[idx + 6] & 0x0f);
    for (var i = 5; i >= 0; --i)
        m = m * 256 + b[idx + i];
    if (e == 0x7ff)
        return m == 0 ? (s * Infinity) : NaN;
    if (e == 0)
        e = -1022;
    else {
        e -= 1023;
        m += Math.pow(2, 52);
    }
    return s * Math.pow(2, e - 52) * m;
};
var write_double_le = function (b, v, idx) {
    var bs = ((((v < 0) || (1 / v == -Infinity)) ? 1 : 0) << 7);
    var e = 0, m = 0;
    var av = bs ? (-v) : v;
    if (!isFinite(av)) {
        e = 0x7ff;
        m = isNaN(v) ? 0x6969 : 0;
    }
    else if (av == 0)
        e = m = 0;
    else {
        e = Math.floor(Math.log(av) / Math.LN2);
        m = av * Math.pow(2, 52 - e);
        if ((e <= -1023) && (!isFinite(m) || (m < Math.pow(2, 52)))) {
            e = -1022;
        }
        else {
            m -= Math.pow(2, 52);
            e += 1023;
        }
    }
    for (var i = 0; i <= 5; ++i, m /= 256)
        b[idx + i] = m & 0xff;
    b[idx + 6] = ((e & 0x0f) << 4) | (m & 0xf);
    b[idx + 7] = (e >> 4) | bs;
};
var __toBuffer = function (bufs /*:Array<Array<RawBytes> >*/) {
    var x = [];
    for (var i = 0; i < bufs[0].length; ++i)
        if (bufs[0][i])
            for (var j = 0, L = bufs[0][i].length; j < L; j += 10240)
                x.push.apply(x, bufs[0][i].slice(j, j + 10240));
    return x;
};
var ___toBuffer = __toBuffer;
var __readUInt8 = function (b, idx) { return b[idx]; };
var __readUInt16LE = function (b, idx) { return (b[idx + 1] * (1 << 8)) + b[idx]; };
var __readInt16LE = function (b, idx) { var u = (b[idx + 1] * (1 << 8)) + b[idx]; return (u < 0x8000) ? u : ((0xffff - u + 1) * -1); };
var __readUInt32LE = function (b, idx) { return b[idx + 3] * (1 << 24) + (b[idx + 2] << 16) + (b[idx + 1] << 8) + b[idx]; };
var __readInt32LE = function (b, idx) { return (b[idx + 3] << 24) | (b[idx + 2] << 16) | (b[idx + 1] << 8) | b[idx]; };
var __readInt32BE = function (b, idx) { return (b[idx] << 24) | (b[idx + 1] << 16) | (b[idx + 2] << 8) | b[idx + 3]; };
var __utf16le = function (b, s, e) {
    var ss = [];
    for (var i = s; i < e; i += 2)
        ss.push(String.fromCharCode(__readUInt16LE(b, i)));
    return ss.join("").replace(exports.chr0, '');
};
exports.__utf16le = __utf16le;
var ___utf16le = __utf16le;
var __hexlify = function (b /*:RawBytes|CFBlob*/, s, l) { var ss = []; for (var i = s; i < s + l; ++i)
    ss.push(("0" + b[i].toString(16)).slice(-2)); return ss.join(""); };
var ___hexlify = __hexlify;
var __utf8 = function (b /*:RawBytes|CFBlob*/, s, e) { var ss = []; for (var i = s; i < e; i++)
    ss.push(String.fromCharCode(__readUInt8(b, i))); return ss.join(""); };
var ___utf8 = __utf8;
var __lpstr = function (b /*:RawBytes|CFBlob*/, i) { var len = __readUInt32LE(b, i); return len > 0 ? __utf8(b, i + 4, i + 4 + len - 1) : ""; };
var ___lpstr = __lpstr;
var __cpstr = function (b /*:RawBytes|CFBlob*/, i) { var len = __readUInt32LE(b, i); return len > 0 ? __utf8(b, i + 4, i + 4 + len - 1) : ""; };
var ___cpstr = __cpstr;
var __lpwstr = function (b /*:RawBytes|CFBlob*/, i) { var len = 2 * __readUInt32LE(b, i); return len > 0 ? __utf8(b, i + 4, i + 4 + len - 1) : ""; };
var ___lpwstr = __lpwstr;
var __lpp4, ___lpp4;
__lpp4 = ___lpp4 = function lpp4_(b /*:RawBytes|CFBlob*/, i) { var len = __readUInt32LE(b, i); return len > 0 ? __utf16le(b, i + 4, i + 4 + len) : ""; };
var ___8lpp4 = function (b /*:RawBytes|CFBlob*/, i) { var len = __readUInt32LE(b, i); return len > 0 ? __utf8(b, i + 4, i + 4 + len) : ""; };
var __8lpp4 = ___8lpp4;
var ___double = function (b /*:RawBytes|CFBlob*/, idx) { return read_double_le(b, idx); };
var __double = ___double;
if (has_buf) {
    exports.__utf16le = __utf16le = function (b /*:RawBytes|CFBlob*/, s, e) { return (!Buffer.isBuffer(b)) ? ___utf16le(b, s, e) : b.toString('utf16le', s, e).replace(exports.chr0, ''); };
    __hexlify = function (b /*:RawBytes|CFBlob*/, s, l) { return Buffer.isBuffer(b) ? b.toString('hex', s, s + l) : ___hexlify(b, s, l); };
    __lpstr = function (b /*:RawBytes|CFBlob*/, i) { if (!Buffer.isBuffer(b))
        return ___lpstr(b, i); var len = b.readUInt32LE(i); return len > 0 ? b.toString('utf8', i + 4, i + 4 + len - 1) : ""; };
    __cpstr = function (b /*:RawBytes|CFBlob*/, i) { if (!Buffer.isBuffer(b))
        return ___cpstr(b, i); var len = b.readUInt32LE(i); return len > 0 ? b.toString('utf8', i + 4, i + 4 + len - 1) : ""; };
    __lpwstr = function (b /*:RawBytes|CFBlob*/, i) { if (!Buffer.isBuffer(b))
        return ___lpwstr(b, i); var len = 2 * b.readUInt32LE(i); return b.toString('utf16le', i + 4, i + 4 + len - 1); };
    __lpp4 = function (b /*:RawBytes|CFBlob*/, i) { if (!Buffer.isBuffer(b))
        return ___lpp4(b, i); var len = b.readUInt32LE(i); return b.toString('utf16le', i + 4, i + 4 + len); };
    __8lpp4 = function (b /*:RawBytes|CFBlob*/, i) { if (!Buffer.isBuffer(b))
        return ___8lpp4(b, i); var len = b.readUInt32LE(i); return b.toString('utf8', i + 4, i + 4 + len); };
    __utf8 = function (b /*:RawBytes|CFBlob*/, s, e) { return (Buffer.isBuffer(b)) ? b.toString('utf8', s, e) : ___utf8(b, s, e); };
    __toBuffer = function (bufs) { return (bufs[0].length > 0 && Buffer.isBuffer(bufs[0][0])) ? Buffer.concat(bufs[0]) : ___toBuffer(bufs); };
    __double = function (b /*:RawBytes|CFBlob*/, i) { return (Buffer.isBuffer(b)) ? b.readDoubleLE(i) : ___double(b, i); };
}
function ReadShift(size, t) {
    var o = "", oI = 0, oR, w, vv, i, loc;
    var oo = [];
    switch (t) {
        case 'dbcs':
            loc = this.l;
            if (has_buf && Buffer.isBuffer(this))
                o = this.slice(this.l, this.l + 2 * size).toString("utf16le");
            else
                for (i = 0; i < size; ++i) {
                    o += String.fromCharCode(__readUInt16LE(this, loc));
                    loc += 2;
                }
            size *= 2;
            break;
        case 'utf8':
            o = __utf8(this, this.l, this.l + size);
            break;
        case 'utf16le':
            size *= 2;
            o = __utf16le(this, this.l, this.l + size);
            break;
        case 'wstr':
            return ReadShift.call(this, size, 'dbcs');
        /* [MS-OLEDS] 2.1.4 LengthPrefixedAnsiString */
        case 'lpstr-ansi':
            o = __lpstr(this, this.l);
            size = 4 + __readUInt32LE(this, this.l);
            break;
        case 'lpstr-cp':
            o = __cpstr(this, this.l);
            size = 4 + __readUInt32LE(this, this.l);
            break;
        /* [MS-OLEDS] 2.1.5 LengthPrefixedUnicodeString */
        case 'lpwstr':
            o = __lpwstr(this, this.l);
            size = 4 + 2 * __readUInt32LE(this, this.l);
            break;
        /* [MS-OFFCRYPTO] 2.1.2 Length-Prefixed Padded Unicode String (UNICODE-LP-P4) */
        case 'lpp4':
            size = 4 + __readUInt32LE(this, this.l);
            o = __lpp4(this, this.l);
            if (size & 0x02)
                size += 2;
            break;
        /* [MS-OFFCRYPTO] 2.1.3 Length-Prefixed UTF-8 String (UTF-8-LP-P4) */
        case '8lpp4':
            size = 4 + __readUInt32LE(this, this.l);
            o = __8lpp4(this, this.l);
            if (size & 0x03)
                size += 4 - (size & 0x03);
            break;
        case 'cstr':
            size = 0;
            o = "";
            while ((w = __readUInt8(this, this.l + size++)) !== 0)
                oo.push(String.fromCharCode(w));
            o = oo.join("");
            break;
        case '_wstr':
            size = 0;
            o = "";
            while ((w = __readUInt16LE(this, this.l + size)) !== 0) {
                oo.push(String.fromCharCode(w));
                size += 2;
            }
            size += 2;
            o = oo.join("");
            break;
        /* sbcs and dbcs support continue records in the SST way TODO codepages */
        case 'dbcs-cont':
            o = "";
            loc = this.l;
            for (i = 0; i < size; ++i) {
                if (this.lens && this.lens.indexOf(loc) !== -1) {
                    w = __readUInt8(this, loc);
                    this.l = loc + 1;
                    vv = ReadShift.call(this, size - i, w ? 'dbcs-cont' : 'sbcs-cont');
                    return oo.join("") + vv;
                }
                oo.push(String.fromCharCode(__readUInt16LE(this, loc)));
                loc += 2;
            }
            o = oo.join("");
            size *= 2;
            break;
        case 'cpstr':
        /* falls through */
        case 'sbcs-cont':
            o = "";
            loc = this.l;
            for (i = 0; i != size; ++i) {
                if (this.lens && this.lens.indexOf(loc) !== -1) {
                    w = __readUInt8(this, loc);
                    this.l = loc + 1;
                    vv = ReadShift.call(this, size - i, w ? 'dbcs-cont' : 'sbcs-cont');
                    return oo.join("") + vv;
                }
                oo.push(String.fromCharCode(__readUInt8(this, loc)));
                loc += 1;
            }
            o = oo.join("");
            break;
        default:
            switch (size) {
                case 1:
                    oI = __readUInt8(this, this.l);
                    this.l++;
                    return oI;
                case 2:
                    oI = (t === 'i' ? __readInt16LE : __readUInt16LE)(this, this.l);
                    this.l += 2;
                    return oI;
                case 4:
                case -4:
                    if (t === 'i' || ((this[this.l + 3] & 0x80) === 0)) {
                        oI = ((size > 0) ? __readInt32LE : __readInt32BE)(this, this.l);
                        this.l += 4;
                        return oI;
                    }
                    else {
                        oR = __readUInt32LE(this, this.l);
                        this.l += 4;
                    }
                    return oR;
                case 8:
                case -8:
                    if (t === 'f') {
                        if (size == 8)
                            oR = __double(this, this.l);
                        else
                            oR = __double([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
                        this.l += 8;
                        return oR;
                    }
                    else
                        size = 8;
                /* falls through */
                case 16:
                    o = __hexlify(this, this.l, size);
                    break;
            }
    }
    this.l += size;
    return o;
}
exports.ReadShift = ReadShift;
var __writeUInt32LE = function (b /*:RawBytes|CFBlob*/, val, idx) { b[idx] = (val & 0xFF); b[idx + 1] = ((val >>> 8) & 0xFF); b[idx + 2] = ((val >>> 16) & 0xFF); b[idx + 3] = ((val >>> 24) & 0xFF); };
var __writeInt32LE = function (b /*:RawBytes|CFBlob*/, val, idx) { b[idx] = (val & 0xFF); b[idx + 1] = ((val >> 8) & 0xFF); b[idx + 2] = ((val >> 16) & 0xFF); b[idx + 3] = ((val >> 24) & 0xFF); };
var __writeUInt16LE = function (b /*:RawBytes|CFBlob*/, val, idx) { b[idx] = (val & 0xFF); b[idx + 1] = ((val >>> 8) & 0xFF); };
function WriteShift(t, val, f) {
    var size = 0, i = 0;
    if (f === 'dbcs') {
        if (typeof val !== 'string')
            throw new Error("expected string");
        for (i = 0; i != val.length; ++i)
            __writeUInt16LE(this, val.charCodeAt(i), this.l + 2 * i);
        size = 2 * val.length;
    }
    else if (f === 'sbcs') {
        {
            val = val.replace(/[^\x00-\x7F]/g, "_"); // eslint-disable-line no-control-regex
            for (i = 0; i != val.length; ++i)
                this[this.l + i] = (val.charCodeAt(i) & 0xFF);
        }
        size = val.length;
    }
    else if (f === 'hex') {
        for (; i < t; ++i) {
            this[this.l++] = (parseInt(val.slice(2 * i, 2 * i + 2), 16) || 0);
        }
        return this;
    }
    else if (f === 'utf16le') {
        /*:: if(typeof val !== "string") throw new Error("unreachable"); */
        var end = Math.min(this.l + t, this.length);
        for (i = 0; i < Math.min(val.length, t); ++i) {
            var cc = val.charCodeAt(i);
            this[this.l++] = (cc & 0xff);
            this[this.l++] = (cc >> 8);
        }
        while (this.l < end)
            this[this.l++] = 0;
        return this;
    }
    else if (typeof val === 'number')
        switch (t) {
            case 1:
                size = 1;
                this[this.l] = val & 0xFF;
                break;
            case 2:
                size = 2;
                this[this.l] = val & 0xFF;
                val >>>= 8;
                this[this.l + 1] = val & 0xFF;
                break;
            case 3:
                size = 3;
                this[this.l] = val & 0xFF;
                val >>>= 8;
                this[this.l + 1] = val & 0xFF;
                val >>>= 8;
                this[this.l + 2] = val & 0xFF;
                break;
            case 4:
                size = 4;
                __writeUInt32LE(this, val, this.l);
                break;
            case 8:
                size = 8;
                if (f === 'f') {
                    write_double_le(this, val, this.l);
                    break;
                }
            /* falls through */
            case 16: break;
            case -4:
                size = 4;
                __writeInt32LE(this, val, this.l);
                break;
        }
    this.l += size;
    return this;
}
exports.WriteShift = WriteShift;
function CheckField(hexstr, fld) {
    var m = __hexlify(this, this.l, hexstr.length >> 1);
    if (m !== hexstr)
        throw new Error(fld + 'Expected ' + hexstr + ' saw ' + m);
    this.l += hexstr.length >> 1;
}
exports.CheckField = CheckField;
var prep_blob = function (blob, pos) {
    blob.l = pos;
    blob.read_shift = ReadShift;
    blob.chk = CheckField;
    blob.write_shift = WriteShift;
};
exports.prep_blob = prep_blob;
var new_buf = function (sz) {
    var o = (0, exports.new_raw_buf)(sz);
    prep_blob(o, 0);
    return o;
};
exports.new_buf = new_buf;
// ---
var __bconcat = function (bufs /*:Array<RawBytes>*/) {
    var is_all_arrays = true;
    for (var w = 0; w < bufs.length; ++w)
        if (!Array.isArray(bufs[w]))
            is_all_arrays = false;
    if (is_all_arrays)
        return [].concat.apply([], bufs);
    var maxlen = 0, i = 0;
    for (i = 0; i < bufs.length; ++i)
        maxlen += bufs[i].length;
    var o = new Uint8Array(maxlen);
    for (i = 0, maxlen = 0; i < bufs.length; maxlen += bufs[i].length, ++i)
        o.set(bufs[i], maxlen);
    return o;
};
var bconcat = __bconcat;
exports.bconcat = bconcat;
if (has_buf)
    exports.bconcat = bconcat = function (bufs) { return Buffer.isBuffer(bufs[0]) ? Buffer.concat(bufs) : [].concat.apply([], bufs); };


/***/ }),

/***/ "./js/wmf.js":
/*!*******************!*\
  !*** ./js/wmf.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.image_size_prepped_bytes = exports.get_actions_prepped_bytes = exports.eBrushStyles = exports.ePenStyles = exports.eMixMode = exports.eTextAlignmentMode = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = __webpack_require__(/*! ./util */ "./js/util.js");
var Records_1 = __webpack_require__(/*! ./Records */ "./js/Records.js");
/* Text Alignment Options */
var eTextAlignmentMode;
(function (eTextAlignmentMode) {
    eTextAlignmentMode[eTextAlignmentMode["Left"] = 0] = "Left";
    eTextAlignmentMode[eTextAlignmentMode["Top"] = 0] = "Top";
    eTextAlignmentMode[eTextAlignmentMode["NoUpdateCp"] = 0] = "NoUpdateCp";
    eTextAlignmentMode[eTextAlignmentMode["UpdateCp"] = 1] = "UpdateCp";
    eTextAlignmentMode[eTextAlignmentMode["Right"] = 2] = "Right";
    eTextAlignmentMode[eTextAlignmentMode["Center"] = 6] = "Center";
    eTextAlignmentMode[eTextAlignmentMode["Bottom"] = 8] = "Bottom";
    eTextAlignmentMode[eTextAlignmentMode["Baseline"] = 24] = "Baseline";
})(eTextAlignmentMode = exports.eTextAlignmentMode || (exports.eTextAlignmentMode = {}));
;
/* Background mix mode */
var eMixMode;
(function (eMixMode) {
    eMixMode[eMixMode["Transparent"] = 1] = "Transparent";
    eMixMode[eMixMode["Opaque"] = 2] = "Opaque"; /* Background is filled with the current background color before the text, hatched brush, or pen is drawn. */
})(eMixMode = exports.eMixMode || (exports.eMixMode = {}));
;
/* Pen styles */
var ePenStyles;
(function (ePenStyles) {
    ePenStyles[ePenStyles["Cosmetic"] = 0] = "Cosmetic";
    ePenStyles[ePenStyles["EndCapRound"] = 0] = "EndCapRound";
    ePenStyles[ePenStyles["JoinRound"] = 0] = "JoinRound";
    ePenStyles[ePenStyles["Solid"] = 0] = "Solid";
    ePenStyles[ePenStyles["Dash"] = 1] = "Dash";
    ePenStyles[ePenStyles["Dot"] = 2] = "Dot";
    ePenStyles[ePenStyles["DashDot"] = 3] = "DashDot";
    ePenStyles[ePenStyles["DashDotDot"] = 4] = "DashDotDot";
    ePenStyles[ePenStyles["Null"] = 5] = "Null";
    ePenStyles[ePenStyles["InsideFrame"] = 6] = "InsideFrame";
    ePenStyles[ePenStyles["UserStyle"] = 7] = "UserStyle";
    ePenStyles[ePenStyles["Alternate"] = 8] = "Alternate";
    ePenStyles[ePenStyles["EndCapSquare"] = 256] = "EndCapSquare";
    ePenStyles[ePenStyles["EndCapFlat"] = 512] = "EndCapFlat";
    ePenStyles[ePenStyles["JoinBevel"] = 4096] = "JoinBevel";
    ePenStyles[ePenStyles["JoinMiter"] = 8192] = "JoinMiter";
})(ePenStyles = exports.ePenStyles || (exports.ePenStyles = {}));
;
var eBrushStyles;
(function (eBrushStyles) {
    eBrushStyles[eBrushStyles["Solid"] = 0] = "Solid";
    eBrushStyles[eBrushStyles["Null"] = 1] = "Null";
    eBrushStyles[eBrushStyles["Hatched"] = 2] = "Hatched";
    eBrushStyles[eBrushStyles["Pattern"] = 3] = "Pattern";
    eBrushStyles[eBrushStyles["Indexed"] = 4] = "Indexed";
    eBrushStyles[eBrushStyles["DibPattern"] = 5] = "DibPattern";
    eBrushStyles[eBrushStyles["DibPatternPT"] = 6] = "DibPatternPT";
    eBrushStyles[eBrushStyles["Pattern8x8"] = 7] = "Pattern8x8";
    eBrushStyles[eBrushStyles["DibPattern8x8"] = 8] = "DibPattern8x8";
    eBrushStyles[eBrushStyles["MonoPattern"] = 9] = "MonoPattern";
})(eBrushStyles = exports.eBrushStyles || (exports.eBrushStyles = {}));
;
var parse_emf = function (data) {
    //try { require("fs").writeFileSync("out.emf", data); } catch(e) {}
};
/* 2.2.2.9 */
var parse_dib = function (data) {
    if (data.length == 0)
        return null;
    (0, util_1.prep_blob)(data, 0);
    /* DIBHeaderInfo */
    var HeaderSize = data.read_shift(4);
    var Width = 0, Height = 0, Planes = 0, BitCount = 0;
    var Compression = 0, ImageSize = 0, XPelsPerMeter = 0, YPelsPerMeter = 0, ColorUsed = 0, ColorImportant = 0;
    if (HeaderSize == 0x0C) {
        Width = data.read_shift(2);
        Height = data.read_shift(2);
    }
    else {
        Width = data.read_shift(4, 'i');
        Height = data.read_shift(4, 'i');
    }
    Planes = data.read_shift(2);
    BitCount = data.read_shift(2);
    var out = {
        Width: Width,
        Height: Height,
        BitCount: BitCount,
    };
    if (HeaderSize != 0x0C) {
        Compression = data.read_shift(4);
        ImageSize = data.read_shift(4);
        XPelsPerMeter = data.read_shift(4, 'i');
        YPelsPerMeter = data.read_shift(4, 'i');
        ColorUsed = data.read_shift(4);
        ColorImportant = data.read_shift(4);
        out["Compression"] = Compression;
        if (BitCount == 24 && ImageSize > Height * 3 * Width)
            Width = out["Width"] = ImageSize / (Height * 3);
    }
    /* Colors */
    /* BitmapBuffer */
    if (ImageSize == data.length - data.l) {
        out["ImageData"] = data.slice(data.l, data.length);
        (0, util_1.prep_blob)(out["ImageData"], 0);
    }
    return out;
};
var add_to_objects = function (objects, obj) {
    for (var i = 0; i < objects.length; ++i)
        if (!objects[i]) {
            objects[i] = obj;
            return;
        }
    objects.push(obj);
};
var get_actions_prepped_bytes = function (data) {
    var out = [];
    var h = data.read_shift(2);
    if (h == 0xcdd7) {
        h = data.read_shift(2);
        if (h != 0x9ac6)
            throw 'Header: Not a META_PLACEABLE Record';
        /* 2.3.2.3 META_PLACEABLE Record */
        // Must start with key ID 0x9AC6CDD7
        var hWmf = data.read_shift(2);
        var left = data.read_shift(2);
        var top_1 = data.read_shift(2);
        var right = data.read_shift(2);
        var bottom = data.read_shift(2);
        var inch = data.read_shift(2);
        var reserved = data.read_shift(4);
        var cs = data.read_shift(2);
        // Skip META PLACABLE record
        h = data.read_shift(2);
    }
    /* 2.3.2.2 META_HEADER */
    // Type (2 bytes) must be 1 or 2
    if (h != 1 && h != 2)
        throw "Header: Type ".concat(h, " must be 1 or 2");
    // HeaderSize expected to be 9
    if ((h = data.read_shift(2)) != 9)
        throw "Header: HeaderSize ".concat(h, " must be 9");
    // Version (2 bytes) 1 or 3
    h = data.read_shift(2);
    if (h != 0x0100 && h != 0x0300)
        throw "Header: Version ".concat(h, " must be 0x0100 or 0x0300");
    // SizeLow / SizeHigh
    data.l += 4;
    // #Objects
    var NumberOfObjects = data.read_shift(2);
    var objects = Array.from({ length: NumberOfObjects }, function () { return null; });
    // MaxRecord
    data.l += 4;
    // NumberOfMembers
    data.l += 2;
    var rt = 0;
    /* used for EMF */
    var escapecnt = 0;
    var CommentRecordCount = 0;
    var RemainingBytes = 0;
    var EnhancedMetafileDataSize = 0;
    var bufs = [];
    var states = [];
    var state = {};
    var sidx = -1;
    while (data.l < data.length) {
        h = data.read_shift(4);
        var end = data.l + h * 2 - 4;
        rt = data.read_shift(2);
        var Record = Records_1.WMFRecords[rt];
        if (rt == 0x0000)
            break; // META_EOF
        console.log("0x".concat(rt.toString(16), " ").concat(Record.n));
        switch (rt) {
            case 0x0626:
                { // META_ESCAPE
                    var EscapeFunction = data.read_shift(2);
                    var Escape = Records_1.WMFEscapes[EscapeFunction];
                    /* 2.3.6 */
                    switch (EscapeFunction) {
                        case 0x000F:
                            { // META_ESCAPE_ENHANCED_METAFILE
                                var ByteCount = data.read_shift(2);
                                var tmp = data.read_shift(4);
                                if (tmp != 0x43464D57) {
                                    console.log("Escape: Comment ID 0x".concat(tmp.toString(16), " != 0x43464D57"));
                                    break;
                                }
                                ;
                                tmp = data.read_shift(4);
                                if (tmp != 0x00000001) {
                                    console.log("Escape: Comment Type 0x".concat(tmp.toString(16), " != 0x00000001"));
                                    break;
                                }
                                tmp = data.read_shift(4);
                                if (tmp != 0x00010000) {
                                    console.log("Escape: Version 0x".concat(tmp.toString(16), " != 0x00010000"));
                                    break;
                                }
                                var Checksum = data.read_shift(2);
                                data.l += 4; // Flags
                                if (escapecnt == 0) {
                                    CommentRecordCount = data.read_shift(4); // total number of records
                                }
                                else {
                                    var _CommentRecordCount = data.read_shift(4);
                                    if (_CommentRecordCount != CommentRecordCount)
                                        throw "Escape: CommentRecordCount ".concat(_CommentRecordCount, " != ").concat(CommentRecordCount);
                                }
                                var CurrentRecordSize = data.read_shift(4); // size of this record
                                var _RemainingBytes = data.read_shift(4);
                                if (escapecnt > 0 && CurrentRecordSize + _RemainingBytes != RemainingBytes)
                                    throw "Escape: ".concat(RemainingBytes, " != ").concat(CurrentRecordSize, " + ").concat(_RemainingBytes);
                                RemainingBytes = _RemainingBytes;
                                var _EnhancedMetafileDataSize = data.read_shift(4);
                                if (escapecnt == 0) {
                                    if (_EnhancedMetafileDataSize != CurrentRecordSize + _RemainingBytes)
                                        throw "Escape: ".concat(_EnhancedMetafileDataSize, " != ").concat(CurrentRecordSize, " + ").concat(_RemainingBytes);
                                    EnhancedMetafileDataSize = _EnhancedMetafileDataSize;
                                }
                                else if (EnhancedMetafileDataSize != _EnhancedMetafileDataSize)
                                    throw "Escape: ".concat(EnhancedMetafileDataSize, " != ").concat(_EnhancedMetafileDataSize);
                                if (ByteCount != (end - data.l) + 34)
                                    throw "Escape: Sizes ".concat(ByteCount, " != ").concat(end - data.l, " + 34");
                                if (end - data.l != CurrentRecordSize)
                                    throw "Escape: CRSize ".concat(CurrentRecordSize, " != ").concat(end - data.l);
                                bufs.push(data.slice(data.l, end));
                                ++escapecnt;
                                if (escapecnt == CommentRecordCount) {
                                    var prepped = (0, util_1.bconcat)(bufs);
                                    (0, util_1.prep_blob)(prepped, 0);
                                    parse_emf(prepped);
                                }
                            }
                            break;
                        default: throw "Escape: Unrecognized META_ESCAPE Type 0x".concat(EscapeFunction.toString(16));
                    }
                }
                break;
            // #region 2.3.1 Bitmap Record Types
            case 0x0940:
                { // 2.3.1.2 META_DIBBITBLT
                    var has_bitmap = h != (rt >> 8) + 3;
                    var RasterOperation = data.read_shift(4);
                    var YSrc = data.read_shift(2, "i");
                    var XSrc = data.read_shift(2, "i");
                    if (!has_bitmap)
                        data.l += 2;
                    var Height = data.read_shift(2, "i");
                    var Width = data.read_shift(2, "i");
                    var YDest = data.read_shift(2, "i");
                    var XDest = data.read_shift(2, "i");
                    var res = {
                        t: "cpy",
                        src: [[XSrc, Width], [YSrc, Height]],
                        dst: [XDest, YDest],
                        rop: RasterOperation,
                        s: Object.assign({}, state)
                    };
                    if (has_bitmap) {
                        var DIB = parse_dib(data.slice(data.l, end));
                        res.data = DIB;
                    }
                    out.push(res);
                }
                break;
            case 0x0B41:
                { // 2.3.1.3 META_DIBSTRETCHBLT
                    var has_bitmap = h != (rt >> 8) + 3;
                    var RasterOperation = data.read_shift(4);
                    var SrcHeight = data.read_shift(2, "i");
                    var SrcWidth = data.read_shift(2, "i");
                    var YSrc = data.read_shift(2, "i");
                    var XSrc = data.read_shift(2, "i");
                    if (!has_bitmap)
                        data.l += 2;
                    var DestHeight = data.read_shift(2, "i");
                    var DestWidth = data.read_shift(2, "i");
                    var YDest = data.read_shift(2, "i");
                    var XDest = data.read_shift(2, "i");
                    var res = {
                        t: "str",
                        src: [[XSrc, SrcWidth], [YSrc, SrcHeight]],
                        dst: [[XDest, DestWidth], [YDest, DestHeight]],
                        rop: RasterOperation,
                        s: Object.assign({}, state)
                    };
                    if (has_bitmap) {
                        var DIB = parse_dib(data.slice(data.l, end));
                        res.data = DIB;
                    }
                    out.push(res);
                }
                break;
            // #endregion
            // #region 2.3.3 Drawing Record Types
            case 0x0A32:
                { // 2.3.3.5 META_EXTTEXTOUT
                    var Y = data.read_shift(2, 'i');
                    var X = data.read_shift(2, 'i');
                    var StringLength = data.read_shift(2);
                    var fwOpts = data.read_shift(2); // 2.1.2.2
                    if (fwOpts & 0x06) {
                        data.l += 8; // Rectangle 2.2.2.18 (for clipping/opaquing)
                    }
                    var str = data.read_shift(StringLength, 'cpstr');
                    if (data.l < end) { /* TODO: Dx */ }
                    out.push({ t: "text", v: str, p: [X, Y], s: Object.assign({}, state) });
                    /* TODO!! */
                }
                break;
            case 0x0325: // 2.3.3.14 META_POLYLINE
            case 0x0324: // 2.3.3.15 META_POLYGON
                {
                    var nPoints = data.read_shift(2);
                    var points = [];
                    for (var i = 0; i < nPoints; ++i)
                        points.push([data.read_shift(2, 'i'), data.read_shift(2, 'i')]);
                    out.push({ t: "poly", p: points, g: rt !== 0x0325, s: Object.assign({}, state) });
                }
                break;
            case 0x0538:
                { // 2.3.3.16 META_POLYPOLYGON
                    var nPolygons = data.read_shift(2);
                    var polys = [];
                    var szs = [];
                    /* 2.2.2.17 PolyPolygon */
                    for (var i = 0; i < nPolygons; ++i)
                        szs[i] = data.read_shift(2);
                    for (var i = 0; i < szs.length; ++i) {
                        polys[i] = [];
                        for (var j = 0; j < szs[i]; ++j)
                            polys[i].push([data.read_shift(2, 'i'), data.read_shift(2, 'i')]);
                        out.push({ t: "poly", p: polys[i], g: true, s: Object.assign({}, state) });
                    }
                }
                break;
            // #endregion
            // #region 2.3.4 Object Record Types
            case 0x02FC:
                { // 2.3.4.1 META_CREATEBRUSHINDIRECT
                    var obj = {};
                    obj.Brush = {
                        Style: data.read_shift(2),
                        Color: data.read_shift(4),
                        Hatch: data.read_shift(2)
                    };
                    add_to_objects(objects, obj);
                }
                break;
            case 0x02FB:
                { // 2.3.4.2 META_CREATEFONTINDIRECT
                    var obj = {};
                    obj.Font = {};
                    /* 2.2.1.2 Font TODO!! */
                    var Height = data.read_shift(2, "i");
                    var Width = data.read_shift(2, "i");
                    var Escapement = data.read_shift(2, "i");
                    var Orientation = data.read_shift(2, "i");
                    var Weight = data.read_shift(2, "i");
                    var Italic = !!data.read_shift(1);
                    var Underline = !!data.read_shift(1);
                    var StrikeOut = !!data.read_shift(1);
                    var CharSet = data.read_shift(1);
                    var OutPrecision = data.read_shift(1);
                    var ClipPrecision = data.read_shift(1);
                    var Quality = data.read_shift(1);
                    var PitchAndFamily = data.read_shift(1);
                    var Facename = data.read_shift(32, "cstr");
                    obj.Font.Name = Facename;
                    obj.Font.Height = Height;
                    obj.Font.Weight = Weight;
                    obj.Font.Italic = Italic;
                    obj.Font.Angle = Escapement / 10;
                    add_to_objects(objects, obj);
                }
                break;
            case 0x02FA:
                { // 2.3.4.5 META_CREATEPENINDIRECT
                    var obj = {};
                    obj.Pen = {
                        Style: data.read_shift(2),
                        Width: data.read_shift(4) & 0xFF,
                        Color: data.read_shift(4)
                    };
                    add_to_objects(objects, obj);
                }
                break;
            case 0x01F0:
                { // 2.3.4.7 META_DELETEOBJECT
                    var ObjectIndex = data.read_shift(2);
                    objects[ObjectIndex] = null;
                }
                break;
            case 0x012C:
                { // 2.3.4.9 META_SELECTCLIPREGION
                    var Region = data.read_shift(2);
                    //Object.assign(state, objects[Region]);
                }
                break;
            case 0x012D:
                { // 2.3.4.10 META_SELECTOBJECT
                    var ObjectIndex = data.read_shift(2);
                    Object.assign(state, objects[ObjectIndex]);
                    // TODO!!
                }
                break;
            // #endregion
            // #region 2.3.5 State Record Types
            case 0x0416: // 2.3.5.3 META_INTERSECTCLIPRECT
                state.ClipRect = [[0, 0], [0, 0]];
                state.ClipRect[1][1] = data.read_shift(2, 'i');
                state.ClipRect[1][0] = data.read_shift(2, 'i');
                state.ClipRect[0][1] = data.read_shift(2, 'i');
                state.ClipRect[0][0] = data.read_shift(2, 'i');
                break;
            case 0x0127:
                { // 2.3.5.10 META_RESTOREDC
                    var nSavedDC = data.read_shift(2, 'i');
                    state = states[sidx = (nSavedDC >= 0 ? nSavedDC : sidx + nSavedDC)];
                }
                break;
            case 0x001E: // 2.3.5.11 META_SAVEDC
                states.push(state);
                sidx = states.length - 1;
                state = JSON.parse(JSON.stringify(state));
                break;
            case 0x0102: // 2.3.5.15 META_SETBKMODE
                state.BkMode = data.read_shift(2);
                break;
            case 0x0103: // 2.3.5.17 META_SETMAPMODE
                state.MapMode = data.read_shift(2);
                break;
            case 0x0106: // 2.3.5.20 META_SETPOLYFILLMODE
                state.PolyFillMode = data.read_shift(2);
                break;
            case 0x0107: // 2.3.5.23 META_SETSTRETCHBLTMODE
                state.StretchMode = data.read_shift(2);
                break;
            case 0x012E: // 2.3.5.24 META_SETTEXTALIGN
                state.TextAlignmentMode = data.read_shift(2);
                break;
            case 0x0209: // 2.3.5.26 META_SETTEXTCOLOR
                state.TextColor = data.read_shift(4);
                break;
            case 0x020C: // 2.3.5.30 META_SETWINDOWEXT
                state.Extent = [0, 0];
                state.Extent[1] = data.read_shift(2, 'i');
                state.Extent[0] = data.read_shift(2, 'i');
                break;
            case 0x020B: // 2.3.5.31 META_SETWINDOWORG
                state.Origin = [0, 0];
                state.Origin[1] = data.read_shift(2, 'i');
                state.Origin[0] = data.read_shift(2, 'i');
                break;
            case 0x0214: // 2.3.5.4 META_MOVETO
                {
                    var y = data.read_shift(2, 'i');
                    var x = data.read_shift(2, 'i');
                    state.Position = [x, y];
                }
                break;
            // #endregion
            case 0x0213: // 2.3.3.10 META_LINETO
                {
                    var y = data.read_shift(2, 'i');
                    var x = data.read_shift(2, 'i');
                    var point = [x, y];
                    out.push({ t: "lineto", p: point, s: Object.assign({}, state) });
                    state.Position = point;
                }
                break;
            case 0x0201: // 2.3.5.14 META_SETBKCOLOR
                state.BkColor = data.read_shift(4);
                break;
            case 0x041B: // 2.3.3.17 META_RECTANGLE
                {
                    var a = data.read_shift(2, 'i');
                    var b = data.read_shift(2, 'i');
                    var c = data.read_shift(2, 'i');
                    var d = data.read_shift(2, 'i');
                    var i = void 0;
                    if (a < c && b < d) {
                        i = a;
                        a = c;
                        c = i;
                        i = b;
                        b = d;
                        d = i;
                    }
                    out.push({ t: "rect", p: [[d, c], [b, a]], s: Object.assign({}, state) });
                }
                break;
            case 0x061C: // 2.3.3.18 META_ROUNDRECT
                {
                    var r = data.read_shift(2, 'i');
                    var w = data.read_shift(2, 'i');
                    if (w > r) {
                        r = w;
                    }
                    var a = data.read_shift(2, 'i');
                    var b = data.read_shift(2, 'i');
                    var c = data.read_shift(2, 'i');
                    var d = data.read_shift(2, 'i');
                    var i = void 0;
                    if (a < c && b < d) {
                        i = a;
                        a = c;
                        c = i;
                        i = b;
                        b = d;
                        d = i;
                    }
                    out.push({ t: "roundrect", p: [[d, c], [b, a]], r: r, s: Object.assign({}, state) });
                }
                break;
            case 0x0418: // 2.3.3.3 META_ELLIPSE
                {
                    var a = data.read_shift(2, 'i');
                    var b = data.read_shift(2, 'i');
                    var c = data.read_shift(2, 'i');
                    var d = data.read_shift(2, 'i');
                    var i = void 0;
                    if (a < c && b < d) {
                        i = a;
                        a = c;
                        c = i;
                        i = b;
                        b = d;
                        d = i;
                    }
                    out.push({ t: "ellipse", p: [[d, c], [b, a]], s: Object.assign({}, state) });
                }
                break;
            case 0x521: // 2.3.3.20 META_TEXTOUT
                {
                    var StringLength = data.read_shift(2, 'i');
                    var str = data.read_shift(StringLength, 'cpstr');
                    if (StringLength % 2 === 1) {
                        /* String field size is always of even length, even if the string is odd length.
                         * read additional padding byte in case of odd string length.
                         */
                        data.read_shift(1);
                    }
                    var Y = data.read_shift(2, 'i');
                    var X = data.read_shift(2, 'i');
                    out.push({ t: "text", v: str, p: [X, Y], s: Object.assign({}, state) });
                }
                break;
            default:
                //if(!Record) throw `Record: Unrecognized type 0x${rt.toString(16)}`;
                console.log("Record: Unrecognized type 0x".concat(rt.toString(16)));
        }
        data.l = end;
    }
    if (rt !== 0)
        throw "Record: Last Record Type ".concat(rt, " is not EOF type");
    return out;
};
exports.get_actions_prepped_bytes = get_actions_prepped_bytes;
var image_size_prepped_bytes = function (data) {
    var extents = [NaN, NaN];
    var h = data.read_shift(2);
    if (h == 0xcdd7) {
        h = data.read_shift(2);
        if (h != 0x9ac6)
            throw 'Header: Not a META_PLACEABLE Record';
        /* 2.3.2.3 META_PLACEABLE Record */
        // Must start with key ID 0x9AC6CDD7
        var hWmf = data.read_shift(2);
        var left = data.read_shift(2);
        var top_2 = data.read_shift(2);
        var right = data.read_shift(2);
        var bottom = data.read_shift(2);
        var inch = data.read_shift(2);
        var reserved = data.read_shift(4);
        var checksum = data.read_shift(2);
        extents[0] = right - left;
        extents[1] = bottom - top_2;
        return extents;
    }
    else {
        /* 2.3.22 META_HEADER */
        // Type (2 bytes) must be 1 or 2
        if (h != 1 && h != 2)
            throw "Header: Type ".concat(h, " must be 1 or 2");
        // HeaderSize expected to be 9
        if ((h = data.read_shift(2)) != 9)
            throw "Header: HeaderSize ".concat(h, " must be 9");
        // Version (2 bytes) 1 or 3
        h = data.read_shift(2);
        if (h != 0x0100 && h != 0x0300)
            throw "Header: Version ".concat(h, " must be 0x0100 or 0x0300");
        data.l = 18;
        var rt = 0;
        while (data.l < data.length) {
            h = data.read_shift(4);
            var end = data.l + h * 2 - 4;
            rt = data.read_shift(2);
            if (rt == 0x0000)
                break; // META_EOF
            if (rt == 0x020C) { // 2.3.5.30 META_SETWINDOWEXT
                extents[1] = data.read_shift(2);
                extents[0] = data.read_shift(2);
                return extents;
            }
            data.l = end;
        }
    }
    return extents;
};
exports.image_size_prepped_bytes = image_size_prepped_bytes;


/***/ }),

/***/ "./misc/entry.js":
/*!***********************!*\
  !*** ./misc/entry.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var WMF = __webpack_require__(/*! ../js/ */ "./js/index.js");
module.exports = WMF;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./misc/entry.js");
/******/ 	WMF = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=wmf.js.map