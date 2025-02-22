import { Typewriter } from "react-simple-typewriter";

interface TypingEffectProps {
  string: string;
}

const TypingEffect = ({ string }: TypingEffectProps) => {
  return (
    <Typewriter
      words={[string]}
      loop={false}
      cursor
      cursorStyle="_"
      typeSpeed={100}
      deleteSpeed={100}
    />
  );
};

export default TypingEffect;
