import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "src/lib/utils";

const SVG1 = () => (
  <svg
    width="173.5"
    height="800"
    viewBox="0 0 694 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_239)">
      <path
        d="M234.827 665L234.827 365L321.429 415L321.429 715L234.827 665Z"
        fill="#1E1E1E"
      />
      <path
        d="M61.6218 265L321.429 415L321.429 515L61.6218 365L61.6218 265Z"
        fill="#1E1E1E"
      />
      <rect
        width="125"
        height="125"
        transform="matrix(0.866025 0.5 -9.77409e-08 1 61.6218 440)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip1_1_239)">
      <path
        d="M173.205 170L433.013 320L346.41 370L86.6027 220L173.205 170Z"
        fill="#1E1E1E"
      />
      <path
        d="M606.218 220L346.41 370L259.808 320L519.615 170L606.218 220Z"
        fill="#1E1E1E"
      />
      <rect
        width="125.711"
        height="125.711"
        transform="matrix(0.866025 -0.5 0.866025 0.5 237.747 141.5)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip2_1_239)">
      <path
        d="M459.583 665L459.583 365L372.981 415L372.981 715L459.583 665Z"
        fill="#1E1E1E"
      />
      <path
        d="M632.788 265L372.981 415L372.981 515L632.788 365L632.788 265Z"
        fill="#1E1E1E"
      />
      <rect
        width="125"
        height="125"
        transform="matrix(-0.866025 0.5 9.77409e-08 1 632.788 440)"
        fill="#1E1E1E"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_239">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 0.5 -2.20305e-08 1 1 200)"
        />
      </clipPath>
      <clipPath id="clip1_1_239">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 0.866025 0.5 0 200)"
        />
      </clipPath>
      <clipPath id="clip2_1_239">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 2.20305e-08 1 347 400)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SVG2 = () => (
  <svg
    width="173.5"
    height="800"
    viewBox="0 0 694 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_269)">
      <path
        d="M148.491 315.413L148.491 614.917L62.032 565L62.032 265.496L148.491 315.413Z"
        fill="#1E1E1E"
      />
      <path
        d="M321.41 714.752L62.032 565L62.032 465.165L321.41 614.917L321.41 714.752Z"
        fill="#1E1E1E"
      />
      <rect
        width="125.204"
        height="125.204"
        transform="matrix(-0.866025 -0.5 9.77409e-08 -1 321.84 540.204)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip1_1_269)">
      <path
        d="M173.615 170L433.423 320L346.82 370L87.0127 220L173.615 170Z"
        fill="#1E1E1E"
      />
      <path
        d="M606.628 220L346.82 370L260.218 320L520.025 170L606.628 220Z"
        fill="#1E1E1E"
      />
      <rect
        width="125.711"
        height="125.711"
        transform="matrix(0.866025 -0.5 0.866025 0.5 238.157 141.5)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip2_1_269)">
      <path
        d="M460.868 580.722L460.868 430.181L417.41 455.271L417.41 605.813L460.868 580.722Z"
        fill="#262626"
      />
      <path
        d="M547.783 380L417.41 455.271L417.41 505.452L547.783 430.181L547.783 380Z"
        fill="#262626"
      />
      <rect
        width="200.259"
        height="200.259"
        transform="matrix(-0.866025 0.5 9.77409e-08 1 677.218 405.012)"
        fill="#262626"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_269">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 0.5 -2.20305e-08 1 1.41016 200)"
        />
      </clipPath>
      <clipPath id="clip1_1_269">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 0.866025 0.5 0.410156 200)"
        />
      </clipPath>
      <clipPath id="clip2_1_269">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 2.20305e-08 1 347.41 400)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SVG3 = () => (
  <svg
    width="173.5"
    height="800"
    viewBox="0 0 694 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M247.972 575.593L247.972 425.051L291.429 450.141L291.429 600.683L247.972 575.593Z"
      fill="#262626"
    />
    <path
      d="M161.056 374.87L291.429 450.141L291.429 500.322L161.056 425.051L161.056 374.87Z"
      fill="#262626"
    />
    <rect
      width="200.259"
      height="200.259"
      transform="matrix(0.866025 0.5 -9.77409e-08 1 31.6218 399.882)"
      fill="#262626"
    />
    <g clip-path="url(#clip0_1_259)">
      <path
        d="M173.205 170L433.013 320L346.41 370L86.6027 220L173.205 170Z"
        fill="#1E1E1E"
      />
      <path
        d="M606.218 220L346.41 370L259.808 320L519.615 170L606.218 220Z"
        fill="#1E1E1E"
      />
      <rect
        width="125.711"
        height="125.711"
        transform="matrix(0.866025 -0.5 0.866025 0.5 237.747 141.5)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip1_1_259)">
      <path
        d="M546.186 315L546.186 615L632.788 565L632.788 265L546.186 315Z"
        fill="#1E1E1E"
      />
      <path
        d="M372.981 715L632.788 565L632.788 465L372.981 615L372.981 715Z"
        fill="#1E1E1E"
      />
      <rect
        width="125"
        height="125"
        transform="matrix(0.866025 -0.5 -9.77409e-08 -1 372.981 540)"
        fill="#1E1E1E"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_259">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 0.866025 0.5 0 200)"
        />
      </clipPath>
      <clipPath id="clip1_1_259">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 2.20305e-08 1 347 400)"
        />
      </clipPath>
    </defs>
  </svg>
);

const SVG4 = () => (
  <svg
    width="173.5"
    height="800"
    viewBox="0 0 694 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_249)">
      <path
        d="M148.634 315L148.634 615L62.0319 565L62.0319 265L148.634 315Z"
        fill="#1E1E1E"
      />
      <path
        d="M321.84 715L62.0319 565L62.0319 465L321.84 615L321.84 715Z"
        fill="#1E1E1E"
      />
      <rect
        width="125"
        height="125"
        transform="matrix(-0.866025 -0.5 9.77409e-08 -1 321.84 540)"
        fill="#1E1E1E"
      />
    </g>
    <g clip-path="url(#clip1_1_249)">
      <path
        d="M477.189 244.732L281.636 131.829L346.82 94.1954L542.373 207.098L477.189 244.732Z"
        fill="#262626"
      />
      <path
        d="M151.268 207.098L346.82 94.1954L412.005 131.829L216.452 244.732L151.268 207.098Z"
        fill="#262626"
      />
      <rect
        width="100.119"
        height="100.119"
        transform="matrix(-0.866025 0.5 -0.866025 -0.5 432.822 270.06)"
        fill="#262626"
      />
    </g>
    <g clip-path="url(#clip2_1_249)">
      <path
        d="M546.596 315L546.596 615L633.199 565L633.199 265L546.596 315Z"
        fill="#1E1E1E"
      />
      <path
        d="M373.391 715L633.199 565L633.199 465L373.391 615L373.391 715Z"
        fill="#1E1E1E"
      />
      <rect
        width="125"
        height="125"
        transform="matrix(0.866025 -0.5 -9.77409e-08 -1 373.391 540)"
        fill="#1E1E1E"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_249">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 0.5 -2.20305e-08 1 1.41016 200)"
        />
      </clipPath>
      <clipPath id="clip1_1_249">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 0.866025 0.5 0.410156 200)"
        />
      </clipPath>
      <clipPath id="clip2_1_249">
        <rect
          width="400"
          height="400"
          fill="#262626"
          transform="matrix(0.866025 -0.5 2.20305e-08 1 347.41 400)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const AnimatedLoader: React.FC = () => {
  const [currentSvg, setCurrentSvg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSvg((prev) => (prev + 1) % 4);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[100%] h-[100%] flex justify-center items-center">
      {[SVG1, SVG2, SVG3, SVG4].map((SVG, index) => (
        <div
          key={index}
          className={cn(
            "absolute top-50 left-50 transition-all duration-600",
            currentSvg === index ? "opacity-100" : "opacity-0"
          )}
        >
          <SVG />
        </div>
      ))}
    </div>
  );
};
