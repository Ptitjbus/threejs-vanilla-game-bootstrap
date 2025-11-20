import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { FisheyeShader } from '../../Shaders/FisheyeShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import App from '../../App.js'
import { Vector2 } from 'three'

export default class PostProcessingManager {
    constructor(renderer, scene, camera) {
        this.composer = new EffectComposer(renderer)
        this.scene = scene
        this.camera = camera
        this.app = new App()

        this.renderPass = new RenderPass(scene, camera)
        this.fisheyePass = new ShaderPass(FisheyeShader)
        this.fisheyePass.uniforms['strength'].value = 0.5

        // Configuration du BokehPass pour l'effet de depth of field
        const bokehParams = {
            focus: 5.0,
            aperture: 0.00002,
            maxblur: 1.0,
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.bokehPass = new BokehPass(scene, camera, bokehParams)

        const bloomParams = {
            strength: 0.5,
            radius: 0.4,
            threshold: 0.9,
        }
        this.bloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            bloomParams.strength,
            bloomParams.radius,
            bloomParams.threshold
        )

        this.composer.addPass(this.renderPass)
        this.composer.addPass(this.fisheyePass)
        this.composer.addPass(this.bokehPass) // Ajout du BokehPass avant le BloomPass
        this.composer.addPass(this.bloomPass)
    }

    render(camera = this.camera) {
        // Toujours mettre à jour la caméra du renderPass, même si on n'utilise pas le composer
        this.renderPass.camera = camera

        // Mettre à jour la caméra principale de référence
        this.camera = camera

        this.composer.render()
    }

    resize(width, height) {
        const scaleFactor = 0.8
        this.composer.setSize(width * scaleFactor, height * scaleFactor)
        // Mise à jour de la taille pour le BokehPass
        this.bokehPass.uniforms['width'].value = width * scaleFactor
        this.bokehPass.uniforms['height'].value = height * scaleFactor
    }

    destroy() {
        this.composer.passes.forEach((pass) => {
            if (pass.dispose) pass.dispose()
        })
        this.composer = null
        this.scene = null
        this.camera = null
    }
}
