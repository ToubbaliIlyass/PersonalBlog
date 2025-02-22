import Typewriter from "typewriter-effect";

interface TypingEffectProps {
  string: string;
}

const TypingEffect = ({ string }: TypingEffectProps) => {
  return (
    <Typewriter
      options={{
        strings: string,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypingEffect;
