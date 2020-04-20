import {utils, Text} from 'vevet';
import three from '../three/three';
import Line from './Line';
import app from '../vevet-app/app';
// import Letter from './Letter';
// import textCanvas from './text-canvas';

export default function motionText() {

    // get outer
    const textOuter = utils.element(".motion-text .v-text");
    if (textOuter == null) {
        return;
    }



    // split text
    const text = new Text({
        selector: textOuter
    });



    // create letters
    let lines = [],
        letters = [];
    text.lines.forEach(el => {

        let chars = [];

        // get letters
        let words = el.children;
        words.forEach(word => {
            let letters = word.children;
            letters.forEach(letter => {
                chars.push(letter.el);
            });
        });

        let line = new Line(chars);
        lines.push(line);

        letters = letters.concat(line.chars);

    });

    three.render();



    // animate letters
    window.onload = () => {

    text.play({
        types: ['lineletter', 'line'],
        durationAuto: false,
        duration: 3500,
        shift: .95,
        shiftLine: .95,
        letter: [{
            value: data => {
                letters[data.position].alpha = data.e;
            }
        }],

        line: [
            {
                value: data => {
                    lines[data.position].draw();
                }
            }, 
            {
                value: data => {
                    lines[data.position].centerX = data.e * app.viewport.size[0] * .5;
                    // lines[data.position].centerY = data.e * app.viewport.size[1] * 1;
                }
            }, 
            {
                value: data => {

                    let strength = .35,
                        edge = .5;
                    if (data.e < edge) {
                        strength *= utils.progress(data.e, [0, edge]);
                    }
                    else {
                        strength *= 1 - utils.progress(data.e, [edge, 1]);
                    }

                    lines[data.position].strength = strength;
                }
            }, 
            // {
            //     scope: [.75, 1],
            //     value: data => {
            //         lines[data.position].centerX = data.e * app.viewport.size[0];
            //     }
            // }
    ],

        callbacks: [{
            target: 1,
            do: () => {
                three.pause();
            }
        }]
    });

    }



}
