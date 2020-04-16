import { utils } from 'vevet';
import GlDomPlane from '../glPlanes/glDomPlane';
import three from '../three/three';



export default class GlLine extends GlDomPlane {

    get defaultProp() {
        return utils.merge(super.defaultProp, {
            canvas: null
        });
    }



    // Extra Constructor
    _extra() {

        super._extra();

        this._fragmentShader = 'letter.frag';

        this._data = [
            // eslint-disable-next-line no-undef
            {key: 'filterArea', type: 'vec4', value: new THREE.Vector4(three.width, three.height, 0, 0)},
            // eslint-disable-next-line no-undef
            {key: 'uCenter', type: 'vec2', value: new THREE.Vector2(three.width / 2, three.height / 2)},
            // eslint-disable-next-line no-undef
            {key: 'uStrength', type: 'float', value: 0},
            // eslint-disable-next-line no-undef
            {key: 'uInnerRadius', type: 'float', value: 0},
            // eslint-disable-next-line no-undef
            {key: 'uRadius', type: 'float', value: -1},
        ];


    }



    _onBeforeCompile(shader) {

        shader.fragmentShader = require('../shaders/letter-before.frag').default + shader.fragmentShader;

        super._onBeforeCompile(shader);

    }

    _createTexture() {
        
        // eslint-disable-next-line no-undef
        const texture = new THREE.CanvasTexture(this._prop.canvas);
        texture.needsUpdate = true;
        // eslint-disable-next-line no-undef
        texture.magFilter = THREE.LinearFilter;
        // eslint-disable-next-line no-undef
        texture.minFilter = THREE.LinearFilter;

        this.texture = texture;

    }





    render() {

        super.render();

    }

}
