import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, MobileStepper, Button, useMediaQuery } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import { CheckCircle, RadioButtonUnchecked, Lens } from '@mui/icons-material';
import ResumePage from 'src/sections/resume/Page/ResumePage';
import ContractPage from 'src/module/contract/page';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import CardList from '../module/cards/components/ListCard';
import Form from '../module/companies/components/companyView';
import Clearify from '../module/histories/components/clearify';
import ManegersDetails from '../module/manegers/components/manegersDetails';
import Shareholders from '../module/shareholders/components/shareholders';
import CompletionMessage from './finishLine';
import Validation from '../module/validations/Validation';
import Other from '../module/otherUploads/components/other';

const steps = [
  'انتخاب یا ایجاد',
  'اطلاعات شرکت',
  'اطلاعات مدیران',
  'مستندات مدیران',
  'سهامداران',
  'سایر موارد',
  'اعتبارسنجی',
  'سوء پیشینه',
  'اطلاعات قرارداد',
];

const Sterpercrowd = () => {
  const { setCartId } = UseCartId();
  const [isCompleted, setIsCompleted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const maxSteps = steps.length;
  const [cardSelected, setCardSelected] = useState(null);
  const [isStepLocked, setIsStepLocked] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const access = getCookie('access');
  const { page: activeStep, incrementPage, changePage } = useNavigateStep();

  useEffect(() => {
    if (!access) {
      navigate('/login');
    } else {
      setIsCheckingAuth(false);
    }
  }, [access, navigate]);

  const handleStepClick = (stepIndex) => {
    if (isStepLocked && stepIndex > 0) {
      toast.error('ابتدا یک لیست را انتخاب  یا ایجاد کنید');
      return;
    }
    changePage(stepIndex);
    setIsCompleted(false);
  };

  const getStepIcon = (index) => {
    if (activeStep > index) {
      return (
        <CheckCircle className="text-green-500 transition-transform duration-300 transform scale-125" />
      );
    }
    if (activeStep === index) {
      return (
        <Lens className="text-blue-600 transition-transform duration-300 transform scale-110" />
      );
    }
    return (
      <RadioButtonUnchecked className="text-gray-400 transition-transform duration-300 transform scale-100" />
    );
  };

  const renderStepContent = (step) => {
    if (isCompleted) {
      return <CompletionMessage />;
    }

    switch (step) {
      case 0:
        return (
          <CardList
            setCartId={setCartId}
            setCardSelected={(card) => {
              setCardSelected(card);
              setIsStepLocked(false);
            }}
            incrementPage={incrementPage}
          />
        );
      case 1:
        return <Form setCartId={setCartId} incrementPage={incrementPage} />;
      case 2:
        return <ManegersDetails setCartId={setCartId} incrementPage={incrementPage} />;
      case 3:
        return <ResumePage cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 4:
        return <Shareholders cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 5:
        return <Other cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 6:
        return <Validation cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 7:
        return <Clearify cardSelected={cardSelected} incrementPage={incrementPage} />;
      case 8:
        return <ContractPage cardSelected={cardSelected} incrementPage={incrementPage} />;
      default:
        return <CompletionMessage />;
    }
  };

  if (isCheckingAuth) {
    return null;
  }
  const handleNext = () => {
    if (isStepLocked && activeStep > 0) {
      toast.error('ابتدا یک لیست را انتخاب  یا ایجاد کنید');
      return;
    }
    setIsCompleted(false);
    incrementPage();
  };

  const handleBack = () => {
    if (isStepLocked && activeStep > 0) {
      toast.error('ابتدا یک لیست را انتخاب  یا ایجاد کنید');
      return;
    }
    changePage(activeStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 block mx-auto p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-2xl">
      <ToastContainer />
      {isMobile ? (
        <div>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}

                disabled={(isStepLocked && activeStep === 0) || activeStep === maxSteps - 1}
              >
                بعدی
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0} 
              >
                قبلی
              </Button>
            }
          />
          
        </div>
      ) : (
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={null}
          className="w-full flex-grow flex-wrap"
        >
          {steps.map((label, index) => (
            <Step key={index} className="flex flex-col items-center">
              <StepLabel icon={getStepIcon(index)} onClick={() => handleStepClick(index)}>
                <span>{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <div className="mt-8 sm:mt-12">{renderStepContent(activeStep)}</div>
    </div>
  );
};

export default Sterpercrowd;
