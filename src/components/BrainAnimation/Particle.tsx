import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function ParticlesBg() {
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
                    color: { value: "#ffffff30" },
                    links: {
                        enable: true,
                        color: "#ffffff30",
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