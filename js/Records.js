"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=Records.js.map