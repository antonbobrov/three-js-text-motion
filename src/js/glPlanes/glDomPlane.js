import { utils, Module } from 'vevet';
import three from '../three/three';



export default class GlDomPlane extends Module {

    get defaultProp() {
        return utils.merge(super.defaultProp, {
            // reference DOM element according to which
            // sizes of the plane will be calculated
            el: false,
            // auto rendering in three.js
            autoRender: true
        });
    }



    // Extra Constructor
    _extra() {

        super._extra();

        // get element
        this.el = this._prop.el;

        // proportions
        this._startSize = [0, 0];
        this._scale = [1, 1];

        // three.js base events
        this._threeEvents = [];

        // vars
        this._data = [];
        this._fragmentShader = 'fragment.frag';

    }



    // Set events

    _setResize() {

        this._threeEvents.push(
            three.on("resize", () => {
                this.resize();
            })
        );

    }

    _setRender() {

        // add rendering event
        if (this._prop.autoRender) {
            this._threeEvents.push(
                three.on("render", this.render.bind(this))
            );
        }

    }

    _setStartSize() {

        let el = this.el;

        this._startSize = [
            el.clientWidth,
            el.clientHeight
        ];

    }



    // Set events
    _setEvents() {

        // create three.js
        this._setStartSize();
        this._create();
        this._setResize();
        this._setRender();

    }



    // Create THREE.js base

    _create() {

        this._createTexture();
        this._createMesh();

    }

    _createTexture() {

    }

    _createMesh() {

        // get dimensions
        let width = this._startSize[0],
            height = this._startSize[1];
            
        // eslint-disable-next-line no-undef
        const geometry = new THREE.PlaneGeometry(width, height, 1);
        this.geometry = geometry;

        // eslint-disable-next-line no-undef
        const material = new THREE.MeshBasicMaterial({
            transparent: true
        });
        if (this.texture) {
            material.map = this.texture;
        }
        this.material = material;

        // add uniforms from data
        this._setMaterialUserData();
        this.material.onBeforeCompile = this._onBeforeCompile.bind(this);

        // eslint-disable-next-line no-undef
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 1);
        this.mesh = mesh;
        
        // resize
        this.resize();

        // append to renderer
        this._append();

    }

    _setMaterialData() {

    }

    _setMaterialUserData() {

        this._data.forEach(obj => {
            this.material.userData[obj.key] = {
                type: obj.type,
                value: obj.value
            };
        });

    }

    _onBeforeCompile(shader) {
        
        this._setMaterialUniforms(shader);
            
        // the rest is the same
        shader.fragmentShader = 
            shader.fragmentShader.replace(
                '#include <map_fragment>', 
                require('../shaders/' + this._fragmentShader).default
            );

    }

    _setMaterialUniforms(shader) {

        this._data.forEach(obj => {
            shader.uniforms[obj.key] = this.material.userData[obj.key];
            shader.fragmentShader = `uniform ${obj.type} ${obj.key}; \n ${shader.fragmentShader}`;
        });

    }

    _append() {

        // add the mesh to the scene
        three.scene.add(this.mesh);

    }



    // Resizing
    resize() {

        let startWidth = this._startSize[0],
            startHeight = this._startSize[1],
            currentWidth = this.el.clientWidth,
            currentHeight = this.el.clientHeight;

        let scaleX = currentWidth / startWidth,
            scaleY = currentHeight / startHeight;
        this._scale = [scaleX, scaleY];

        // scale mesh
        if (this.mesh) {
            this.mesh.scale.x = scaleX;
            this.mesh.scale.y = scaleY;
        }
        
    }



    // RENDERING

    render() {

        // this._renderPosition();

    }

    _renderPosition() {

        // get bounding of the DOM element
        const bounding = this.el.getBoundingClientRect();

        // calculate translates top/left coordinates
        let xStart = (three.width - bounding.width) / 2 * -1,
            yStart = (three.height - bounding.height) / 2;
        
        // add bounding
        let x = xStart + bounding.left,
            y = yStart - bounding.top;

        // apply 
        this.mesh.position.x = x;
        this.mesh.position.y = y;

    }



    // Destroy images

    _removeFromScene() {

        this.geometry.dispose();
        this.material.dispose();
        three.scene.remove(this.mesh);

    }

    removeThreeEvents() {

        this._threeEvents.forEach(id => {
            three.remove(id);
        });

    }

    destroy() {

        super.destroy();

        this.removeThreeEvents();
        this._removeFromScene();

    }



}
