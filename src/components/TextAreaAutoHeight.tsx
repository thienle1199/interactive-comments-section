import React, { useRef, useEffect, TextareaHTMLAttributes } from "react";

// Create a type that extends the built-in TextareaHTMLAttributes type.
type TextAreaAutoHeightProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaAutoHeight: React.FC<TextAreaAutoHeightProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAutoResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    handleAutoResize(); // Initial resize
  }, []);

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e); // Call any passed-in onChange handler
        }
        handleAutoResize();
      }}
    />
  );
};

export default TextAreaAutoHeight;
