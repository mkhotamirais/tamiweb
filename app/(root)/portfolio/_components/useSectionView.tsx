import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePortfolio } from "./usePortfolio";
import { menu } from "./header";

export default function useSectionView(label: (typeof menu)[number]["label"]) {
  const { setActiveSection, timeLastClick } = usePortfolio();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView && Date.now() - timeLastClick > 1000) {
      setActiveSection(label);
    }
  }, [inView, setActiveSection, timeLastClick, label]);
  return { ref };
}
