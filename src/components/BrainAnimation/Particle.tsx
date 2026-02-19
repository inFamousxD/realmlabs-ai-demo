import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

interface ParticlesBgProps {
    particleColor?: string;
    particleLinkColor?: string;
}

export default function ParticlesBg({
                                        particleColor = "#ffffff30",
                                        particleLinkColor = "#ffffff30",
                                    }: ParticlesBgProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="tsparticles"
            options={{
                fullScreen: { enable: true, zIndex: -1 },
                particles: {
                    number: { value: 250 },
                    color: { value: particleColor },
                    links: {
                        enable: true,
                        color: particleLinkColor,
                        distance: 20,
                    },
                    move: { enable: true, speed: 0.3 },
                    size: { value: { min: 1, max: 1 } },
                    opacity: { value: 0.5 },
                },
            }}
        />
    );
}