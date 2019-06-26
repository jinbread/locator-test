import * as React from "react"
import { Frame } from "framer"
import { Compass } from "./compass"


// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function Locator() {


    const [devicePosition, setDevicePosition] = React.useState({
        centerX: 0.0,
        centerY: 0.0,
        deviceX1: 0.0,
        deviceY1: 0.0,
        deviceX2: 0.0,
        deviceY2: 0.0,
        // deviceX3: 0.0,
        // deviceY3: 0.0,
    })
    const [timer, setTimer] = React.useState(null)
    let isMounted = true
    React.useEffect(() => {
        updateDevicePosition()
        return () => {
            isMounted = false
        }
    }, [])

    async function updateDevicePosition() {
        try {
            const result = await fetch("http://192.168.10.233:34599/")
            const data = await result.json()
            if (isMounted) {
                setDevicePosition({
                    centerX: data[0].x,
                    centerY: data[0].y,
                    deviceX1: data[1].x,
                    deviceY1: data[1].y,
                    deviceX2: data[2].x,
                    deviceY2: data[2].y,
                    // deviceX3: data[3].x,
                    // deviceY3: data[3].y,
                })
            }
        } catch (e) {
            console.error(e)
        }
        if (isMounted) {
            clearTimeout(timer)
            setTimer(setTimeout(updateDevicePosition, 200))
        }
    }



    

    
    let offset_pos_x_1 = ((devicePosition.deviceX1 - devicePosition.centerX) / 4) * 300
    let offset_pos_y_1 = ((devicePosition.deviceY1 - devicePosition.centerY) / 4) * 300

    let offset_pos_x_2 = ((devicePosition.deviceX2 - devicePosition.centerX) / 4) * 300
    let offset_pos_y_2 = ((devicePosition.deviceY2 - devicePosition.centerY) / 4) * 300

    // let offset_pos_x_3 = ((devicePosition.deviceX3 - devicePosition.centerX) / 4) * 300
    // let offset_pos_y_3 = ((devicePosition.deviceY3 - devicePosition.centerY) / 4) * 300


    let tag_x_1 =
        offset_pos_x_1 * Math.cos(180) - offset_pos_y_1 * Math.sin(180)
    let tag_y_1 =
        offset_pos_y_1 * Math.cos(180) - offset_pos_x_1 * Math.sin(180)

    let tag_x_2 =
        offset_pos_x_2 * Math.cos(180) - offset_pos_y_2 * Math.sin(180)
    let tag_y_2 =
        offset_pos_y_2 * Math.cos(180) - offset_pos_x_2 * Math.sin(180)

    //     let tag_x_3 =
    //     offset_pos_x_3 * Math.cos(alpha) - offset_pos_y_3 * Math.sin(alpha)
    // let tag_y_3 =
    //     offset_pos_y_3 * Math.cos(alpha) - offset_pos_x_3 * Math.sin(alpha)

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
            <Frame
                // x={tag_x_3 * 2}
                // y={tag_y_3 * 2}
                center
                radius={"50%"}
                size={30}
                backgroundColor={"green"}
            />
            <Compass />
            <Frame backgroundColor={"transparent"} y={0}>
                {tag_x_1.toFixed(1)}, {tag_y_1.toFixed(1)}
            </Frame>
            <Frame backgroundColor={"transparent"} y={40}>
            {tag_x_2.toFixed(1)}, {tag_y_2.toFixed(1)}
            </Frame>
            <Frame backgroundColor={"transparent"} y={80}>
            
            </Frame>

        </Frame>
    )
}
