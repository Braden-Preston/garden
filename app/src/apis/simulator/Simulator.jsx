import React, { Fragment, Component } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
// import three from 'three'
// import threeEntryPoint from './threejs/threeEntryPoint';
// import { withStyles } from '@material-ui/core/styles'
// import { inject, observer } from 'mobx-react'
// import { observable, action } from 'mobx'
// import { compose } from 'recompose'

const styles = theme => ({
    root: {
        // color: 'red',
    },
})

// @inject('store')
// @withStyles(styles)
// @observer
export class Simulator extends Component {

    // @observable open = true

    // @action toggle = () => 
    //         this.open = !this.open

    componentDidMount = () => {
        // : Create Renderer & Canvas
        this.renderer = new WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.canvas = this.mountCanvas(this.renderer.domElement)

        // : Create Scene Components
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.bindEventListeners()

        // : Create Geometry
        const geometry = new BoxGeometry(1, 1, 1)
        const material = new MeshBasicMaterial({ color: '#FF0099' })
        const cube = new Mesh(geometry, material)

        this.scene.add(cube)
        this.camera.position.z = 5

        let animate = () => {
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            this.renderer.render(this.scene, this.camera)
        }

        animate()

    }

    mountCanvas = (canvas) => {
        this.anchor.appendChild(canvas);
        return canvas;
    }

    bindEventListeners = () => {
        window.addEventListener('resize', this.resizeCanvas, false);
        // this.resizeCanvas()
    }

    resizeCanvas = () => {
        const { canvas, camera, renderer } = this
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        canvas.width = window.innerHeight;
        canvas.height = window.innerWidth;

        const { width, height } = canvas;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // createCanvas = () => {
    //     const canvas = document.createElement('canvas');     
    //     this.anchor.appendChild(canvas);
    //     return canvas;
    // }

    render() {
        console.log(this.anchor)
        return (
            <div id="Simulator"
                ref={element => this.anchor = element}
                style={{ height: '100vh', width: '100vw' }}
            />
        )
    }
}
