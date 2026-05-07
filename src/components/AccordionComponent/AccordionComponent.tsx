import React, { createContext, useContext, useState } from "react";
import styles from "../AccordionComponent/AccordionComponent.module.scss"


type AccordionContextType = {
  openIndex: number | null;
  toggle: (index: number) => void;
};

const AccordionContext = createContext<AccordionContextType>({
  openIndex: null,
  toggle: () => {},
});

type AccordionProps = {
  children: React.ReactNode;
  defaultOpenIndex?: number;
};

const Accordion = ({ children, defaultOpenIndex = 0 }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className={styles.accordion}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<AccordionCardInternalProps>,
                { _index: index },
              )
            : child,
        )}
      </div>
    </AccordionContext.Provider>
  );
};
export type AccordionCardProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

type AccordionCardInternalProps = AccordionCardProps & { _index?: number };

export const AccordionCard = ({
  title,
  children,
  _index = 0,
}: AccordionCardInternalProps) => {
  const { openIndex, toggle } = useContext(AccordionContext);
  const isOpen = openIndex === _index;

  return (
    <div className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
      <button
        type="button"
        className={`${styles.header} ${isOpen ? styles.headerOpen : ""}`}
        onClick={() => toggle(_index)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;


