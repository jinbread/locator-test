import React, {useEffect, useState} from "react"
import { Frame } from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function Locator() {

    const [centerX, setCenterX] = useState(0.0)
    const [centerY, setCenterY] = useState(0.0)
    const [deviceX1, setDeviceX1] = useState(0.0)
    const [deviceY1, setDeviceY1] = useState(0.0)
    const [deviceX2, setDeviceX2] = useState(0.0)
    const [deviceY2, setDeviceY2] = useState(0.0)

    const [alpha, setAlpha] = useState(0.0)

    const [timer, setTimer] = useState(null)
    const [isMounted, setIsMounted] = useState(false)

    async function updateDevicePosition() {
        try {
            const result = await fetch("http://192.168.10.233:34599/")
            const data = await result.json()
            setCenterX(data[0].x)
            setCenterY(data[0].y)
            setDeviceX1(data[1].x)
            setDeviceY1(data[1].y)
            setDeviceX2(data[2].x)
            setDeviceY2(data[2].y)
        } catch (e) {
            console.error(e)
        }
        clearTimeout(timer)
        setTimer(setTimeout(updateDevicePosition, 200))
    }

    useEffect(() => {
        if (!isMounted) {
            updateDevicePosition()
            setIsMounted(true)
        }
    })


    useEffect(() => {
        const handleOrientation = e => {
            setAlpha(e.alpha)
        }
        window.addEventListener("deviceorientation", handleOrientation, true)
        return () => {
            window.addEventListener(
                "deviceorientation",
                handleOrientation,
                true
            )
        }
    }, [])

    let offset_pos_x_1 = ((deviceX1 - centerX) / 4) * 300
    let offset_pos_y_1 = ((deviceY1 - centerY) / 4) * 300

    let offset_pos_x_2 = ((deviceX2 - centerX) / 4) * 300
    let offset_pos_y_2 = ((deviceY2 - centerY) / 4) * 300

    let tag_x_1 =
        offset_pos_x_1 * Math.cos(alpha) - offset_pos_y_1 * Math.sin(alpha)
    let tag_y_1 =
        offset_pos_y_1 * Math.cos(alpha) - offset_pos_x_1 * Math.sin(alpha)

    let tag_x_2 =
        offset_pos_x_2 * Math.cos(alpha) - offset_pos_y_2 * Math.sin(alpha)
    let tag_y_2 =
        offset_pos_y_2 * Math.cos(alpha) - offset_pos_x_2 * Math.sin(alpha)

    return (
        <Frame center backgroundColor={"transparent"}>
            <Frame
                center
                radius={"50%"}
                size={30}
                backgroundColor={"lightgray"}
            />
            <Frame
                x={tag_x_1 * 2}
                y={tag_y_1 * 2}
                center
                radius={"50%"}
                size={30}
                backgroundColor={"blue"}
            />
            <Frame
                x={tag_x_2 * 2}
                y={tag_y_2 * 2}
                center
                radius={"50%"}
                size={30}
                backgroundColor={"green"}
            />
            <Frame backgroundColor={"transparent"} y={-40}>
                {alpha.toFixed(1)}
            </Frame>
            <Frame backgroundColor={"transparent"} y={0}>
                {tag_x_1.toFixed(1)} / {tag_y_1.toFixed(1)}
            </Frame>
            <Frame backgroundColor={"transparent"} y={40}>
                {tag_x_2.toFixed(1)} / {tag_y_2.toFixed(1)}
            </Frame>
        </Frame>
    )
}
