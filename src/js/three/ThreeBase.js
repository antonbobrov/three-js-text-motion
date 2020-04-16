import { Module, Frame } from 'vevet';
import app from '../vevet-app/app';

const viewport = app.viewport;
const cameraZ = 1000;



export default class ThreeBase extends Module {



    // Extra Constructor
    _extra() {

        super._extra();

        // create html elements
        this._createHTML();
        // create three.js base
        this._createTHREE();

        // render for the first time
        this.render();

        // add a frame
        this.frame = new Frame({
            fps: 60
        });
        this.frame.on("", this.render.bind(this));

    }

    get width() {
        return viewport.size[0];
    }
    get height() {
        return viewport.size[1];
    }



    _createHTML() {

        // create an outer for the three.js canvas
        this.outer = document.createElement("div");
        this.outer.classList.add("three-js");
        document.body.appendChild(this.outer)

        // create a canvas elements
        this.canvas = document.createElement("canvas");
        this.outer.appendChild(this.canvas);

    }



    _createTHREE() {

        // create base
        this.scene = this.buildScene();
        this.renderer = this.buildRender();
        this.camera = this.buildCamera();

    }



    // Set Events
    _setEvents() {

        viewport.on("resize", this._resize.bind(this));
        this._resize();

    }

    // When the window is resized
    _resize() {

        let width = this.width,
            height = this.height;

        // change canvas sizes
        this.canvas.width = width;
        this.canvas.height = height;
    
        // update the renderer's sizes
        this.renderer.setSize(width, height);
        this.camera.fov = this._getFOV();
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // events
        this.lbt('resize');

    }

    _getFOV() {

        return 180 * (2 * Math.atan( window.innerHeight / 2 / cameraZ)) / Math.PI;

    }



    // Play // Pause THREE.JS
    play() {
        this.frame.play();
    }

    pause() {
        this.frame.pause();
    }



    buildScene() {

        // eslint-disable-next-line no-undef
        const scene = new THREE.Scene();

        return scene;

    }

    buildRender() {

        let obj = {
            antialias: true,
            alpha: true,
            canvas: this.canvas
        };
    
        // eslint-disable-next-line no-undef
        const renderer = new THREE.WebGLRenderer(obj);

        const DPR = viewport.dprDevice;
        renderer.setPixelRatio(DPR);
        renderer.setSize(this.width, this.height);
        // renderer.gammaInput = true;
        // renderer.gammaOutput = true;
    
        return renderer;

    }

    buildCamera() {

        const aspectRatio = this.width / this.height;
        const fieldOfView = this._getFOV();
        const nearPlane = 1;
        const farPlane = 10000;
        
        // eslint-disable-next-line no-undef
        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.position.z = cameraZ;

        return camera;

    }



    // RENDERING
    render() {

        this.lbt("render");
        this.renderer.render(this.scene, this.camera);

    }



}