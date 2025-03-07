import React, {useEffect, useRef} from 'react';
import axios from 'axios';
import styles from '../styles';

export default function ParcelImage({parcel}) {
    const classes = styles();
    const canvasRef = useRef(null);

    const processColorsMap = (map) => {
        let cache = [];

        map.forEach((item) => {
            if (!cache.length) {
                cache[0] = []
            }

            if (cache[cache.length -1].length < 4) {
                cache[cache.length - 1].push(item)
            } else {
                cache[cache.length] =[item]
            }
        })

        let canvas = canvasRef.current;

        if (!canvas) return;

        let context = canvas.getContext('2d');

        context.globalAlpha = 1;

        for (let x = 0; x < 100; x++) {
            for (let y = 0; y < 100; y++) {
                context.beginPath();
                context.fillStyle = `rgba(${cache[x*100+y].join(',')})`;
                context.fillRect(y,x, x+1,y+1);
            }
        }

        const {size} = parcel;

        context.strokeStyle = 'white';
        size === 0 && context.rect(48, 48, 5, 5);
        size === 1 && context.rect(45, 45, 10, 10);
        size === 3 && context.rect(34, 41, 32, 17);
        size === 2 && context.rect(41, 34, 17, 32);
        context.stroke();
    };


    useEffect(() => {
        axios.get(`https://api.gotchiverse.io/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${parcel.parcelId},100`).then((response) => {
            processColorsMap(response.data);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <canvas className={classes.parcelImage} ref={canvasRef} width='100' height='100'></canvas>
    );
}
