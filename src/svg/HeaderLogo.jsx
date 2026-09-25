function HeaderLogo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 400" width="80px" height="80px">
            <defs>
                <linearGradient id="whiteFront" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="100%" stop-color="#E0E0E0" />
                </linearGradient>

              
                <linearGradient id="depthSide" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#B0B0B0" />
                    <stop offset="100%" stop-color="#707070" />
                </linearGradient>

               
                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="10" dy="18" stdDeviation="10" flood-color="#000000" flood-opacity="0.35" />
                </filter>
            </defs>

            <g filter="url(#dropShadow)" transform="translate(40, 40)">

              
                <path d="M 50,220 L 50,80 L 100,160 L 150,80 L 150,220 L 125,220 L 125,130 L 100,170 L 75,130 L 75,220 Z"
                    fill="url(#depthSide)"
                    transform="translate(12, 12)" />

               
                <path d="M 50,220 L 50,80 L 100,160 L 150,80 L 150,220 L 125,220 L 125,130 L 100,170 L 75,130 L 75,220 Z"
                    fill="url(#whiteFront)"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linejoin="round" />

               
                <path d="M 280,105 C 280,85 255,75 225,75 C 195,75 170,88 170,110 C 170,145 275,135 275,185 C 275,215 245,225 215,225 C 180,225 160,205 160,185 L 185,185 C 185,200 200,208 218,208 C 240,208 250,198 250,183 C 250,150 145,160 145,110 C 145,80 178,60 222,60 C 265,60 305,80 305,105 Z"
                    fill="url(#depthSide)"
                    transform="translate(12, 12)" />

               
                <path d="M 280,105 C 280,85 255,75 225,75 C 195,75 170,88 170,110 C 170,145 275,135 275,185 C 275,215 245,225 215,225 C 180,225 160,205 160,185 L 185,185 C 185,200 200,208 218,208 C 240,208 250,198 250,183 C 250,150 145,160 145,110 C 145,80 178,60 222,60 C 265,60 305,80 305,105 Z"
                    fill="url(#whiteFront)"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linejoin="round" />

            </g>
        </svg>

    );
}

export default HeaderLogo;