import { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import "./payment.scss";

const Payment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((cur) => cur + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((cur) => cur - 1);
    }
  };

  return (
    <div className="container_bx pt-8">
      <div className="w-full px-24 py-4">
        <Stepper
          activeStep={activeStep}
          isLastStep={(val) => setIsLastStep(val)}
          isFirstStep={(val) => setIsFirstStep(val)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <UserIcon className="h-5 w-5" />
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={
                  activeStep === 0 ? "text-[#263238]" : "text-gray-500"
                }
              >
                Step 1
              </Typography>
            </div>
          </Step>

          <Step onClick={() => setActiveStep(1)}>
            <CogIcon className="h-5 w-5" />
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={
                  activeStep === 1 ? "text-[#263238]" : "text-gray-500"
                }
              >
                Step 2
              </Typography>
            </div>
          </Step>

          <Step onClick={() => setActiveStep(2)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                className={
                  activeStep === 2 ? "text-[#263238]" : "text-gray-500"
                }
              >
                Step 3
              </Typography>
            </div>
          </Step>
        </Stepper>

        {/* Conditional content rendering */}
        <div className="mt-32 px-2">
          {activeStep === 0 && (
            <>
              <Typography variant="h5" className="mb-4">
                HTML
              </Typography>
              <Typography>
                It really matters and then like it really doesnt matter. What
                matters is the people who are sparked by it.
              </Typography>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h5" className="mb-4">
                React
              </Typography>
              <Typography>
                Because its about motivating the doers. Because Im here to
                follow my dreams and inspire others too.
              </Typography>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography variant="h5" className="mb-4">
                Vue
              </Typography>
              <Typography>
                Were not always in the position we want to be at. Were
                constantly growing and making mistakes.
              </Typography>
            </>
          )}
        </div>

        <div className="mt-32 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
