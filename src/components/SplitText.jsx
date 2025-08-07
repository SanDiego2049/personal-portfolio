import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars", // "words" | "lines"
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    const el = ref.current;

    const isLineSplit = splitType === "lines";
    if (isLineSplit) el.style.position = "relative";

    let splitter;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: isLineSplit,
        linesClass: "split-line",
      });
    } catch (err) {
      console.error("SplitText failed:", err);
      return;
    }

    const targets =
      (splitType === "lines" && splitter.lines) ||
      (splitType === "words" && splitter.words) ||
      splitter.chars;

    if (!targets?.length) {
      console.warn("No animation targets found for SplitText.");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    // Scroll trigger start calculation
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
    const sign =
      marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
    const startPct = (1 - threshold) * 100;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => (scrollTriggerRef.current = self),
      },
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: "willChange" });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      tl.kill();
      scrollTriggerRef.current?.kill();
      gsap.killTweensOf(targets);
      splitter?.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      ref={ref}
      aria-label={text}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowWrap: "normal",
        wordBreak: "keep-all",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
