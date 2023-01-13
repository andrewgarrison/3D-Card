import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
import { CardColor } from "../types";
import { Card3DName, Card3DNameRenderer, Card3DRenderer } from "../styles";

export interface Card3DProps {
  cardName: string;
  cardColor: CardColor;
}

export const Card3D = (props: Card3DProps) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const textRendererRef = useRef<HTMLDivElement>(null);
  const cardNameRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = React.useState<THREE.Group | null>(null);

  const textureMap: Record<
    CardColor,
    Record<"front" | "back", THREE.Texture>
  > = React.useMemo(
    () => ({
      [CardColor.White]: {
        front: new THREE.TextureLoader().load("/white_front.png"),
        back: new THREE.TextureLoader().load("/white_back.png"),
      },
      [CardColor.Black]: {
        front: new THREE.TextureLoader().load("/black_front.png"),
        back: new THREE.TextureLoader().load("/black_back.png"),
      },
      [CardColor.Gray]: {
        front: new THREE.TextureLoader().load("/gray_front.png"),
        back: new THREE.TextureLoader().load("/gray_back.png"),
      },
    }),
    []
  );

  useEffect(() => {
    if (rendererRef.current && textRendererRef.current && cardNameRef.current) {
      const camera = new THREE.PerspectiveCamera(
        50,
        rendererRef.current.offsetWidth / rendererRef.current.offsetHeight,
        0.1,
        2000
      );
      const scene = new THREE.Scene();
      camera.position.z = 60;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(
        rendererRef.current.offsetWidth,
        rendererRef.current.offsetHeight
      );
      rendererRef.current.appendChild(renderer.domElement);

      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(
        rendererRef.current.offsetWidth,
        rendererRef.current.offsetHeight
      );
      textRendererRef.current?.appendChild(cssRenderer.domElement);

      scene.add(new THREE.AmbientLight(0xd7d7d7, 1.15));

      const loader = new GLTFLoader();
      loader.load("/creditcard.glb", (gltf) => {
        scene.add(gltf.scene);
        setModel(gltf.scene);
      });

      const objectCSS = new CSS3DObject(cardNameRef.current);
      scene.add(objectCSS);

      const controls = new TrackballControls(camera, renderer.domElement);
      controls.noZoom = true;
      controls.noPan = true;

      const textControls = new TrackballControls(
        camera,
        cssRenderer.domElement
      );
      textControls.noZoom = true;
      textControls.noPan = true;

      const render = () => {
        requestAnimationFrame(render);

        controls.update();
        renderer.render(scene, camera);

        textControls.update();
        cssRenderer.render(scene, camera);

        if (cardNameRef.current) {
          if (textControls.object.position.z < 0) {
            cardNameRef.current.style.opacity = "1";
          } else {
            cardNameRef.current.style.opacity = "0";
          }
        }
      };

      const handleResize = () => {
        if (rendererRef.current) {
          renderer.setSize(
            rendererRef.current.offsetWidth,
            rendererRef.current.offsetHeight
          );
          cssRenderer.setSize(
            rendererRef.current.offsetWidth,
            rendererRef.current.offsetHeight
          );
          camera.aspect =
            rendererRef.current.offsetWidth / rendererRef.current.offsetHeight;
          camera.updateProjectionMatrix();
        }
      };

      render();
      window.addEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const texture = textureMap[props.cardColor];

    if (model) {
      model.traverse((object) => {
        if (object instanceof THREE.Mesh && texture) {
          if (object.material.name === "Card front") {
            object.material.map = texture.front;
          } else {
            object.material.map = texture.back;
          }
        }
      });
    }
  }, [props.cardColor, model, textureMap]);

  return (
    <Card3DRenderer ref={rendererRef}>
      <Card3DNameRenderer ref={textRendererRef} />
      <Card3DName ref={cardNameRef} cardColor={props.cardColor}>
        {props.cardName || "Your name here"}
      </Card3DName>
    </Card3DRenderer>
  );
};
