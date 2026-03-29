"use client";
import { Dispatch, SetStateAction, useState } from "react";
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

const presenceList = [
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
    if (!activePresence) return <></>;

    const { label, labelLeft, labelRight } = activePresence;

    if (label) return <div className="animate-fade-in-fast">{label}</div>;

    return (
      <div className="grid grid-cols-[1fr_auto_1fr] animate-fade-in-fast" key={labelLeft! + labelRight!}>
        <div className="text-right">{labelLeft}</div>
        <div className="px-2">|</div>
        <div className="text-left">{labelRight}</div>
      </div>
    );
  };

  return (
    <div className="grid flex justify-center py-12">
      <div className="flex justify-center min-h-16 text-xl">
        {getLabel()}
      </div>
      <div className="flex flex-wrap justify-center">
        {presenceList.map((presence) => PresenceIcon(presence, setActivePresence))}
      </div>
    </div>
  );
}

function PresenceIcon(
  presence: PresenceProps,
  setActivePresence: Dispatch<SetStateAction<PresenceProps | undefined>>,
) {
  const { url, icon: Icon, label, labelLeft, labelRight } = presence;

  const onMouseOver = () => {
    setActivePresence(presence);
  };

  const onMouseLeave = () => {
    setActivePresence(undefined);
  };

  return (
    <a
      key={url}
      href={url}
      className="px-3 text-white/50 hover:text-white transition-all duration-150"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseOver}
      onBlur={onMouseLeave}
      aria-label={label ?? `${labelLeft}, ${labelRight}`}
    >
      <Icon
        size="3.2em"
      />
    </a>
  );
}
