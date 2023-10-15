"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw_canvas_rectangle = exports.draw_canvas = exports.render_canvas_rectangle = exports.render_canvas = exports.render_actions_to_context = exports.set_ctx_state = exports.css_color = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = require("./util");
var wmf_1 = require("./wmf");
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
        var negX = act.s.Extent[0] < 0;
        var negY = act.s.Extent[1] < 0;
        image.width = negX ? -act.s.Extent[0] : act.s.Extent[0];
        image.height = negY ? -act.s.Extent[1] : act.s.Extent[1];
        ctx = image.getContext('2d');
        ctx.setTransform(negX ? -1 : 1, 0, 0, negY ? -1 : 1, negX ? act.s.Origin[0] : -act.s.Origin[0], negY ? act.s.Origin[1] : -act.s.Origin[1]);
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
var render_canvas_rectangle = function (out, image, x, y, width, height) {
    var ctx;
    ctx = image.getContext('2d');
    ctx.save();
    ctx.rect(x, y, width, height);
    ctx.clip();
    /* find first action with window info */
    for (var _i = 0, out_1 = out; _i < out_1.length; _i++) {
        var act = out_1[_i];
        if (!act.s || !act.s.Extent || !act.s.Origin)
            continue;
        var scaleX = width / act.s.Extent[0];
        var scaleY = height / act.s.Extent[1];
        var offX = act.s.Origin[0] * scaleX;
        var offY = act.s.Origin[1] * scaleY;
        ctx.setTransform(scaleX, 0, 0, scaleY, x - offX, y - offY);
        ctx.save();
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.fillRect(0, 0, act.s.Extent[0] - act.s.Origin[0], act.s.Extent[1] - act.s.Origin[1]);
        ctx.restore();
        break;
    }
    (0, exports.render_actions_to_context)(out, ctx);
    ctx.restore();
};
exports.render_canvas_rectangle = render_canvas_rectangle;
var draw_canvas = function (data, image) {
    if (data instanceof ArrayBuffer)
        return (0, exports.draw_canvas)(new Uint8Array(data), image);
    (0, util_1.prep_blob)(data, 0);
    var out = (0, wmf_1.get_actions_prepped_bytes)(data);
    return (0, exports.render_canvas)(out, image);
};
exports.draw_canvas = draw_canvas;
var draw_canvas_rectangle = function (data, image, x, y, width, height) {
    if (data instanceof ArrayBuffer)
        return (0, exports.draw_canvas_rectangle)(new Uint8Array(data), image, x, y, width, height);
    (0, util_1.prep_blob)(data, 0);
    var out = (0, wmf_1.get_actions_prepped_bytes)(data);
    return (0, exports.render_canvas_rectangle)(out, image, x, y, width, height);
};
exports.draw_canvas_rectangle = draw_canvas_rectangle;
//# sourceMappingURL=canvas.js.map