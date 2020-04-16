import {utils} from 'vevet';
import app from "../vevet-app/app";

export default (function textCanvas() {

    const outer = utils.element(".motion-text");

    // create canvas
    const canvas = document.createElement("canvas");
    outer.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // resize canvas
    canvas.width = app.viewport.size[0];
    canvas.height = app.viewport.size[1];



    // letters array
    let letters = [];

    // add a letter
    function add(el) {

        letters.push({
            el: el,
            alpha: 0
        });
        console.warn(letters)
        
    }
    


    // draw letters
    function draw() {


        
        ctx.clearRect(0);

    }



    return {
        add: add.bind(this)
    }


})();