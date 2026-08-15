"use client";

import { BorderBeamPanel } from "./border-beam-panel";

export default function BorderBeamPanelDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <BorderBeamPanel className="w-full max-w-md" beams={2} thickness={2} radius={18} glow>
        <div className="flex flex-col gap-4 p-4 text-white">
          <span className="w-fit rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
            BNSS 2023 Shield
          </span>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            Border Beam Legal Shield
          </h3>
          <p className="text-sm text-white/80">
            A dynamic light beam traveling along statutory constitutional borders with responsive spring physics.
          </p>
        </div>
      </BorderBeamPanel>
    </div>
  );
}

export { BorderBeamPanelDemo };
