import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import type { CollectionEntry } from "astro:content";
import { getProjectImagePath, formatProjectSlug } from "../utils/projectUtils";

interface WorkDisplayProps {
  work: CollectionEntry<"work">[];
  className?: string;
}

export default function WorkDisplay({ work, className }: WorkDisplayProps) {
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    decayRate: 0.95,
  });

  // Sort work items (keeping your original sorting logic)
  const sortedWork = [...work].sort((a, b) => {
    const orderA = [
      "gamepal",
      "helpper",
      "scorecard",
      "realo",
      "shelf",
      "immo brown",
      "diabetik",
    ].indexOf(a.data.name.toLowerCase());
    const orderB = [
      "gamepal",
      "helpper",
      "scorecard",
      "realo",
      "shelf",
      "immo brown",
      "diabetik",
    ].indexOf(b.data.name.toLowerCase());
    return orderA - orderB;
  });

  // Prepare images array
  const allImages = sortedWork.flatMap((project) =>
    project.data.artwork.map((art: any) => ({
      ...art,
      projectName: project.data.name,
      projectUrl: `/work/${formatProjectSlug(project.data.name)}`,
    }))
  );

  return (
    <div className={`bg-emerald-100 ${className || ""}`}>
      <div
        ref={ref}
        {...events}
        className="flex gap-4 no-scrollbar overflow-x-scroll cursor-grab active:cursor-grabbing"
      >
        {allImages.map((image, index) => (
          <img
            key={index}
            src={getProjectImagePath(image.projectName, image.src)}
            alt={image.caption || `Image from ${image.projectName}`}
            loading="lazy"
            className="pointer-events-none max-h-[60vh] object-contain select-none"
          />
        ))}
      </div>
    </div>
  );
}
