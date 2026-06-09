'use client';

import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

interface PixiMapProps {
  onProjectClick?: (project: any) => void;
}

export default function PixiMap({ onProjectClick }: PixiMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new PIXI.Application();
    app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x4a3520,
    }).then(async () => {
      containerRef.current?.appendChild(app.canvas);
      pixiAppRef.current = app;

      // 1. Load the map image
      const texture = await PIXI.Assets.load('/maps/map.png');
      const mapSprite = new PIXI.Sprite(texture);
      
      // Scale to fit screen
      const scale = Math.min(
        window.innerWidth / texture.width,
        window.innerHeight / texture.height
      );
      mapSprite.scale.set(scale);
      mapSprite.x = (window.innerWidth - texture.width * scale) / 2;
      mapSprite.y = (window.innerHeight - texture.height * scale) / 2;
      app.stage.addChild(mapSprite);

      // 2. Load the JSON with clickable areas
      const response = await fetch('/maps/map.json');
      const mapData = await response.json();
      
      // Find the Projects layer
      const projectsLayer = mapData.layers.find((l: any) => l.name === 'Projects');
      
      if (projectsLayer && projectsLayer.objects) {
        projectsLayer.objects.forEach((obj: any) => {
          // Create clickable area
          const hitArea = new PIXI.Graphics();
          hitArea.fill(0xffffff, 0.01);
          hitArea.rect(obj.x, obj.y, obj.width, obj.height);
          hitArea.endFill();
          
          // Scale and position to match map
          hitArea.scale.set(scale);
          hitArea.x = (window.innerWidth - texture.width * scale) / 2;
          hitArea.y = (window.innerHeight - texture.height * scale) / 2;
          
          // Make interactive
          hitArea.interactive = true;
          hitArea.cursor = 'pointer';
          
          // Hover effect
          hitArea.on('mouseover', () => {
            hitArea.clear();
            hitArea.fill(0xffd700, 0.3);
            hitArea.rect(obj.x, obj.y, obj.width, obj.height);
            hitArea.endFill();
          });
          hitArea.on('mouseout', () => {
            hitArea.clear();
            hitArea.fill(0xffffff, 0.01);
            hitArea.rect(obj.x, obj.y, obj.width, obj.height);
            hitArea.endFill();
          });
          
          // Click event
          hitArea.on('click', () => {
            const props: any = {};
            obj.properties?.forEach((p: any) => {
              props[p.name] = p.value;
            });
            if (onProjectClick) {
              onProjectClick(props);
            }
          });
          
          app.stage.addChild(hitArea);
        });
      }
    });

    return () => {
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true);
      }
    };
  }, [onProjectClick]);

  return <div ref={containerRef} className="w-full h-full" />;
}