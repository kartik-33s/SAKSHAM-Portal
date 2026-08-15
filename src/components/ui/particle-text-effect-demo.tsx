import { ParticleTextEffect } from "./particle-text-effect";

export default function DemoOne() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <ParticleTextEffect 
        words={["SAKSHAM", "POLICE RIGHTS", "KNOW YOUR LAW", "PROTECT FREEDOM", "ZERO FIR"]}
      />
    </div>
  );
}

export { DemoOne };
