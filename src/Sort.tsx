import { SortType } from "./type"

import './assets/sort.sass'

interface SortProp {
    type: SortType,
    width: number,
    height: number,
}

export default function Sort({ type, width, height }: SortProp) {
    return (
        <canvas width={width} height={height}>

        </canvas>
    )
}