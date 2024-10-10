document.getElementById('colorInput').addEventListener('input', updateColors);
document.getElementById('rSlider').addEventListener('input', updateFromRGBSliders);
document.getElementById('gSlider').addEventListener('input', updateFromRGBSliders);
document.getElementById('bSlider').addEventListener('input', updateFromRGBSliders);
document.getElementById('rValue').addEventListener('input', updateFromRGB);
document.getElementById('gValue').addEventListener('input', updateFromRGB);
document.getElementById('bValue').addEventListener('input', updateFromRGB);
document.getElementById('cSlider').addEventListener('input', updateFromCMYKSliders);
document.getElementById('mSlider').addEventListener('input', updateFromCMYKSliders);
document.getElementById('ySlider').addEventListener('input', updateFromCMYKSliders);
document.getElementById('kSlider').addEventListener('input', updateFromCMYKSliders);
document.getElementById('cValue').addEventListener('input', updateFromCMYK);
document.getElementById('mValue').addEventListener('input', updateFromCMYK);
document.getElementById('yValue').addEventListener('input', updateFromCMYK);
document.getElementById('kValue').addEventListener('input', updateFromCMYK);
document.getElementById('hSlider').addEventListener('input', updateFromHSVSliders);
document.getElementById('sSlider').addEventListener('input', updateFromHSVSliders);
document.getElementById('vSlider').addEventListener('input', updateFromHSVSliders);
document.getElementById('hValue').addEventListener('input', updateFromHSV);
document.getElementById('sValue').addEventListener('input', updateFromHSV);
document.getElementById('vValue').addEventListener('input', updateFromHSV);

function updateColors() {
    const hex = document.getElementById('colorInput').value;
    const rgb = hexToRgb(hex);
    setRGB(rgb);
    setCMYK(rgbToCmyk(rgb));
    setHSV(rgbToHsv(rgb));
    updateColorDisplay(hex);
}

function updateFromRGB() {
    const r = parseInt(document.getElementById('rValue').value) || 0;
    const g = parseInt(document.getElementById('gValue').value) || 0;
    const b = parseInt(document.getElementById('bValue').value) || 0;
    const hex = rgbToHex({ r, g, b });
    setHex(hex);
    setCMYK(rgbToCmyk({ r, g, b }));
    setHSV(rgbToHsv({ r, g, b }));
    updateColorDisplay(hex);
}

function updateFromRGBSliders() {
    const r = parseInt(document.getElementById('rSlider').value);
    const g = parseInt(document.getElementById('gSlider').value);
    const b = parseInt(document.getElementById('bSlider').value);
    setHex(rgbToHex({ r, g, b }));
    setRGB({ r, g, b });
    setCMYK(rgbToCmyk({ r, g, b }));
    setHSV(rgbToHsv({ r, g, b }));
    updateColorDisplay(rgbToHex({ r, g, b }));
}

function updateFromCMYK() {
    const c = parseInt(document.getElementById('cValue').value) || 0;
    const m = parseInt(document.getElementById('mValue').value) || 0;
    const y = parseInt(document.getElementById('yValue').value) || 0;
    const k = parseInt(document.getElementById('kValue').value) || 0;
    const rgb = cmykToRgb({ c, m, y, k });
    const hex = rgbToHex(rgb);
    setHex(hex);
    setRGB(rgb);
    setHSV(rgbToHsv(rgb));
    updateColorDisplay(hex);
}

function updateFromCMYKSliders() {
    const c = parseInt(document.getElementById('cSlider').value);
    const m = parseInt(document.getElementById('mSlider').value);
    const y = parseInt(document.getElementById('ySlider').value);
    const k = parseInt(document.getElementById('kSlider').value);
    const rgb = cmykToRgb({ c, m, y, k });
    const hex = rgbToHex(rgb);
    setHex(hex);
    setRGB(rgb);
    setCMYK({ c, m, y, k });
    setHSV(rgbToHsv(rgb));
    updateColorDisplay(hex);
}

function updateFromHSV() {
    const h = parseInt(document.getElementById('hValue').value) || 0;
    const s = parseInt(document.getElementById('sValue').value) || 0;
    const v = parseInt(document.getElementById('vValue').value) || 0;
    const rgb = hsvToRgb({ h, s, v });
    const hex = rgbToHex(rgb);
    setHex(hex);
    setRGB(rgb);
    setCMYK(rgbToCmyk(rgb));
    updateColorDisplay(hex);
}

function updateFromHSVSliders() {
    const h = parseInt(document.getElementById('hSlider').value);
    const s = parseInt(document.getElementById('sSlider').value);
    const v = parseInt(document.getElementById('vSlider').value);
    const rgb = hsvToRgb({ h, s, v });
    const hex = rgbToHex(rgb);
    setHex(hex);
    setRGB(rgb);
    setCMYK(rgbToCmyk(rgb));
    setHSV({ h, s, v });
    updateColorDisplay(hex);
}

function setRGB({ r, g, b }) {
    document.getElementById('rValue').value = r;
    document.getElementById('gValue').value = g;
    document.getElementById('bValue').value = b;
    document.getElementById('rSlider').value = r;
    document.getElementById('gSlider').value = g;
    document.getElementById('bSlider').value = b;
}

function setCMYK({ c, m, y, k }) {
    document.getElementById('cValue').value = c;
    document.getElementById('mValue').value = m;
    document.getElementById('yValue').value = y;
    document.getElementById('kValue').value = k;
    document.getElementById('cSlider').value = c;
    document.getElementById('mSlider').value = m;
    document.getElementById('ySlider').value = y;
    document.getElementById('kSlider').value = k;
}

function setHSV({ h, s, v }) {
    document.getElementById('hValue').value = h;
    document.getElementById('sValue').value = s;
    document.getElementById('vValue').value = v;
    document.getElementById('hSlider').value = h;
    document.getElementById('sSlider').value = s;
    document.getElementById('vSlider').value = v;
}

function setHex(hex) {
    document.getElementById('colorInput').value = hex;
}

function updateColorDisplay(hex) {
    document.getElementById('colorDisplay').style.backgroundColor = hex;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHex({ r, g, b }) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function rgbToCmyk({ r, g, b }) {
    const c = 1 - (r / 255);
    const m = 1 - (g / 255);
    const y = 1 - (b / 255);
    const k = Math.min(c, m, y);
    return {
        c: Math.round(((c - k) / (1 - k)) * 100),
        m: Math.round(((m - k) / (1 - k)) * 100),
        y: Math.round(((y - k) / (1 - k)) * 100),
        k: Math.round(k * 100),
    };
}

function cmykToRgb({ c, m, y, k }) {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function rgbToHsv({ r, g, b }) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    const v = max / 255;

    let h;
    switch (max) {
        case min:
            h = 0;
            break;
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
    }
    h /= 6;
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function hsvToRgb({ h, s, v }) {
    const c = (v / 100) * (s / 100);
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = (v / 100) - c;
    let r, g, b;
    if (h >= 0 && h < 60) {
        r = c, g = x, b = 0;
    } else if (h >= 60 && h < 120) {
        r = x, g = c, b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0, g = c, b = x;
    } else if (h >= 180 && h < 240) {
        r = 0, g = x, b = c;
    } else if (h >= 240 && h < 300) {
        r = x, g = 0, b = c;
    } else {
        r = c, g = 0, b = x;
    }
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

updateColors();
