import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { styles } from "../constants/styles";

interface Props {
  Component: React.ElementType;
  idName: string;
}

const getSectionReveal = (): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 36,
      scale: 0.985,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
};

const SectionWrapper = (
  Component: Props["Component"],
  idName: Props["idName"]
) =>
  function HOC() {
    return (
      <motion.section
        variants={getSectionReveal()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className={`${styles.padding} light-section-surface relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;


