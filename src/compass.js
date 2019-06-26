import * as React from "react"
import { Frame } from "framer"
import DeviceOrientation from 'react-device-orientation';

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function Compass() {

    const [alpha, setAlpha] = React.useState(0.0)
    
    React.useEffect(() => {
        const handleOrientation = e => setAlpha(e.alpha)
        window.addEventListener("deviceorientation", handleOrientation, true)

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation)
        }
    }, [])

    return (
        <Frame center backgroundColor={"transparent"} y={-40}>
            {alpha.toFixed(1)}
            <DeviceOrientation>
                {({ absolute, alpha, beta, gamma }) => (
                <div>
                    {`Absolute: ${absolute}`}
                    {`Alpha: ${alpha}`}
                    {`Beta: ${beta}`}
                    {`Gamma: ${gamma}`}
                </div>
                )}
            </DeviceOrientation>
        </Frame>
    )
}
