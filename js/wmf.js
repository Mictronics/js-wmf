"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_size_prepped_bytes = exports.get_actions_prepped_bytes = exports.ePenStyles = exports.eMixMode = exports.eTextAlignmentMode = void 0;
/*! wmf.js (C) 2020-present SheetJS LLC -- https://sheetjs.com */
var util_1 = require("./util");
var Records_1 = require("./Records");
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
    eMixMode[eMixMode["Opaque"] = 2] = "Opaque";
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
        console.log("0x".concat(rt, " ").concat(Record.n));
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
                                if (tmp != 0x43464D57)
                                    throw "Escape: Comment ID 0x".concat(tmp.toString(16), " != 0x43464D57");
                                tmp = data.read_shift(4);
                                if (tmp != 0x00000001)
                                    throw "Escape: Comment Type 0x".concat(tmp.toString(16), " != 0x00000001");
                                tmp = data.read_shift(4);
                                if (tmp != 0x00010000)
                                    throw "Escape: Version 0x".concat(tmp.toString(16), " != 0x00010000");
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
//# sourceMappingURL=wmf.js.map