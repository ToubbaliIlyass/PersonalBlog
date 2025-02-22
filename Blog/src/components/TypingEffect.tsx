import { Typewriter } from "react-simple-typewriter";

interface TypingEffectProps {
  strings: string[];
}

const TypingEffect = ({ strings }: TypingEffectProps) => {
  return (
    <Typewriter
      words={strings}
      loop={false}
      cursor
      cursorStyle="_"
      typeSpeed={100}
      deleteSpeed={100}
    />
  );
};

export default TypingEffect;
