export default class Char {

    constructor(el) {

        this._el = el;

        this._alpha = 0;
        this._x = 0;
        this._y = 0;

        this._width = 0;
        this._height = 0;

        this._resize();

    }

    _resize() {

        const bounding = this._el.getBoundingClientRect();
        this._x = bounding.x;
        this._y = bounding.y;

    }



    draw(ctx) {

        ctx.beginPath();

        ctx.globalAlpha = this._alpha;

        ctx.textBaseline = 'hanging';
        ctx.font = getComputedStyle(this._el).font;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this._el.innerText, this._x, this._y);

        ctx.closePath();

    }

    set alpha(val) {

        this._alpha = val;

    }



}