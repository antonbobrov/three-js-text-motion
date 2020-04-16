import app from "../vevet-app/app";
import GlLine from "./GlLine";
import {utils} from 'vevet';
import Char from "./Char";

const viewport = app.viewport;

export default class Line {

    constructor(chars) {

        this._chars = chars;
        this.chars = [];

        this._width = 0;
        this._height = 0;

        this._create();
        this._resize();

    }



    _create() {

        this._createCanvas();
        this._createThree();
        this._createChars();
        this.draw();

    }

    _createCanvas() {

        this._canvas = document.createElement("canvas");
        this._ctx = this._canvas.getContext("2d");

    }

    _createThree() {

        this.glLine = new GlLine({
            canvas: this._canvas,
            el: utils.element(".motion-text"),
            autoRender: true
        });

    }

    _createChars() {

        this._chars.forEach(el => {
            let char = new Char(el);
            this.chars.push(char);
        });

    }

    _resize() {

        this._width = viewport.size[0];
        this._height = viewport.size[1];

        this._canvas.width = this._width;
        this._canvas.height = this._height;

        this.draw();

    }



    draw() {

        this._ctx.clearRect(0, 0, this._width, this._height);

        this.chars.forEach(char => {
            char.draw(this._ctx);
        })

        // update texture
        this.glLine.texture.needsUpdate = true;

    }



    set centerX(val) {

        let uniforms = this.glLine.material.userData;
        uniforms.uCenter.value.x = val;

    }

    set centerY(val) {

        let uniforms = this.glLine.material.userData;
        uniforms.uCenter.value.y = val;

    }

    set strength(val) {

        let uniforms = this.glLine.material.userData;
        uniforms.uStrength.value = val;

    }



}