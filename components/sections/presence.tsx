"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { SiBluesky, SiOsu, SiYoutube } from "react-icons/si";

interface PresenceProps {
  url: string;
  label?: string;
  labelLeft?: string;
  labelRight?: string;
  icon: IconType;
}

interface PresenceIconProps {
  presence: PresenceProps;
  setActivePresence: (presence?: PresenceProps) => void;
}

const presenceList: PresenceProps[] = [
  {
    url: "mailto:mail@a-mo.io",
    label: "mail@a-mo.io",
    icon: FaEnvelope,
  },
  {
    url: "https://github.com/TheMoMan/",
    labelLeft: "GitHub",
    labelRight: "TheMoMan",
    icon: FaGithub,
  },
  {
    url: "https://bsky.app/profile/a-mo.io/",
    labelLeft: "Bluesky",
    labelRight: "@a-mo.io",
    icon: SiBluesky,
  },
  {
    url: "https://osu.ppy.sh/users/2202163",
    labelLeft: "osu!",
    labelRight: "-Mo-",
    icon: SiOsu,
  },
  {
    url: "https://www.youtube.com/@AMo_osu/",
    labelLeft: "YouTube (osu!)",
    labelRight: "A Mo",
    icon: SiYoutube,
  },
  {
    url: "https://www.youtube.com/@AMoIncidents/",
    labelLeft: "YouTube (gaming)",
    labelRight: "A Mo's Incidents",
    icon: SiYoutube,
  },
];

export function Presence() {
  const [activePresence, setActivePresence] = useState<PresenceProps>();

  const getLabel = () => {
    const { label, labelLeft, labelRight } = activePresence!;

    if (label) return <div>{label}</div>;

    return (
      <div className="grid grid-cols-[1fr_auto_1fr]">
        <div className="text-right">{labelLeft}</div>
        <div className="px-2">|</div>
        <div className="text-left">{labelRight}</div>
      </div>
    );
  };

  return (
    <div className="grid justify-center py-12">
      <div className="flex justify-center min-h-16 text-xl">
        <AnimatePresence mode="popLayout">
          {activePresence && (
            <motion.div
              key={activePresence.url}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <a href={activePresence.url}>
                {getLabel()}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap justify-center">
        {presenceList.map((presence) =>
          <PresenceIcon
            presence={presence}
            setActivePresence={setActivePresence}
            key={presence.url}
          />
        )}
      </div>
    </div>
  );
}

function PresenceIcon({
  presence,
  setActivePresence,
}: PresenceIconProps) {
  const { url, icon: Icon, label, labelLeft, labelRight } = presence;

  const onMouseOver = () => {
    setActivePresence(presence);
  };

  const onMouseLeave = () => {
    setActivePresence(undefined);
  };

  return (
    <a
      href={url}
      className="px-3 text-white/50 hover:text-white transition-colors duration-150"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseOver}
      onBlur={onMouseLeave}
      onTouchStart={onMouseOver}
      aria-label={label ?? `${labelLeft}, ${labelRight}`}
    >
      <Icon
        size="3.2em"
      />
    </a>
  );
}
