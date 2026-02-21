import Image from "next/image"
import * as React from "react"
const Logo = () => (
    <Image
        src="/assets/images/site-logo.webp"
        alt="Logo"
        width={549}
        height={372}
    />
    // <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     xmlnsXlink="http://www.w3.org/1999/xlink"
    //     viewBox="0 0 549 372"
    //     style={{ 'width': '100%', 'height': '100%' }}
    //     // width={549}
    //     // height={372}
    //     fill="none"
    // >
    //     <path fill="url(#a)" d="M165 140h384v200H165z" />
    //     <path fill="url(#b)" d="M0 0h247v372H0z" />
    //     <defs>
    //         <pattern
    //             id="a"
    //             width={1}
    //             height={1}
    //             patternContentUnits="objectBoundingBox"
    //         >
    //             <use xlinkHref="#c" transform="scale(.0026 .005)" />
    //         </pattern>
    //         <pattern
    //             id="b"
    //             width={1}
    //             height={1}
    //             patternContentUnits="objectBoundingBox"
    //         >
    //             <use xlinkHref="#d" transform="matrix(.00291 0 0 .00193 -.001 0)" />
    //         </pattern>
    //         <image
    //             xlinkHref="/assets/images/logo.webp"
    //             id="c"
    //             width={384}
    //             height={200}
    //             preserveAspectRatio="none"
    //         />
    //         <image
    //             xlinkHref="/assets/images/fox.webp"
    //             id="d"
    //             width={344}
    //             height={517}
    //             preserveAspectRatio="none"
    //         />
    //     </defs>
    // </svg>
)
export default Logo
