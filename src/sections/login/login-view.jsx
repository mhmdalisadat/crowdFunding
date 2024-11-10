/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { ToastContainer, toast } from 'react-toastify';
import SmallLoader from 'src/components/SmallLoader';
import { Link } from '@mui/material';
import useCaptcha from './hooks/useCaptcha';
import useApplyNationalCode from './hooks/postNationalCode';
import useSubmitOtp from './hooks/useSubmit';
import useTimer from './hooks/useTimer';
import NoSejamModal from './components/nosejam';

export default function LoginView() {
  const theme = useTheme();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otp, setOtp] = useState('');

  const [isNoSejamModalOpen, setIsNoSejamModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { data: captchaData, refetch: refreshCaptcha, isLoading: isCaptchaLoading } = useCaptcha();
  const { mutate: applyNationalCode } = useApplyNationalCode();
  const { mutate: submitOtp, isLoading: loadingOtp } = useSubmitOtp();
  const { timer, step, setStep, startTimer } = useTimer();

  const handleApplyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length < 10 || nationalCode.length > 12) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      setIsButtonDisabled(true);
      applyNationalCode(
        {
          nationalCode,
          captchaInput,
          encryptedResponse: captchaData?.encrypted_response,
        },
        {
          onSuccess: (data) => {
            setStep(2);
            startTimer();
          },
          onError: (error) => {
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message, 'خطا در دسترسی');
              if (error.response.data.message.includes('شما سجامی نیستید')) {
                setIsNoSejamModalOpen(true);
              }
            }
          },
          onSettled: () => {
            setIsButtonDisabled(false);
          },
        }
      );
    }
  };

  const closeNoSejamModal = () => {
    setIsNoSejamModalOpen(false);
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
    } else {
      submitOtp({
        nationalCode,
        otp,
      });
    }
  };

  const renderForm = (
    <>
      {isNoSejamModalOpen ? (
        <NoSejamModal isOpen={isNoSejamModalOpen} onClose={closeNoSejamModal} />
      ) : (
        <>
          <ToastContainer autoClose={3000} />
          <Stack spacing={3} sx={{ mb: 3, width: '100%' }}>
            <TextField
              value={nationalCode}
              onChange={(e) => setNationalCode(e.target.value)}
              label="شماره/شناسه ملی"
              autoComplete="off"
              fullWidth
            />
            {step === 1 ? (
              <>
                <TextField
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  label="کپچا"
                  value={captchaInput}
                  autoComplete="off"
                  fullWidth
                />
                <Button onClick={refreshCaptcha} fullWidth>
                  {isCaptchaLoading ? (
                    <SmallLoader />
                  ) : (
                    <img src={`data:image/png;base64,${captchaData?.image}`} alt="captcha" />
                  )}
                </Button>
                <Box sx={{ mb: 3 }} />
              </>
            ) : (
              <TextField
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  label="کد تایید"
                  autoComplete="off"
                  fullWidth
                />
            )}
          </Stack>

          {step === 1 ? (
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                marginBottom: '24px',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
              onClick={handleApplyNationalCode}
              loading={isCaptchaLoading}
              disabled={isButtonDisabled}
            >
              تایید
            </LoadingButton>
          ) : (
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleCode}
              loading={loadingOtp}
              disabled={isButtonDisabled}
            >
              تایید ({timer})
            </LoadingButton>
          )}
        </>
      )}
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '450px', p: 2 }}>
        <Stack alignItems="center" justifyContent="center" sx={{ pt: 4, height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: '100%',
              maxWidth: { xs: '70%', md: '600px' },
              maxHeight: '85vh',
              minHeight: '450px',
            }}
          >
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              ایساتیس کراد
            </Typography>
            <Typography
              sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
              variant="h6"
            >
              {' '}
              درگاه ورود ایساتیس کراد{' '}
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ورود
              </Typography>
            </Divider>
            {renderForm}
          </Card>
        </Stack>
      </Box>

      <Box sx={{ mt: 5, pb: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} تمامی حقوق توسعه اطلاعات مالی محفوظ است.
        </Typography>
        <div className="mt-2 text-red-500">
          <Link sx={{ textDecoration: 'none' }} href="tel:03535220088" variant="body2">
            <button
              type="button"
              className="btn btn-info p-2 py-0 text-gray-500 shadow-lg bg-white border-none hover:bg-gray-200 "
            >
              راه های ارتباط با ما :{'  '} 03591090088
            </button>
          </Link>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div>
            <a
              href="https://trustseal.enamad.ir/?id=529924&Code=W3y39nx7isNrGWpAJBpNE2KanNerFkB8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://trustseal.enamad.ir/logo.aspx?id=529924&Code=W3y39nx7isNrGWpAJBpNE2KanNerFkB8"
                alt="نماد اعتماد"
                className="cursor-pointer"
                style={{ width: '100px', height: 'auto' }}
              />
            </a>
          </div>

          <img
            id="rgvlgwmdxlaphwlabrgw"
            onClick={() =>
              window.open(
                'https://cf.ifb.ir/report/PlatformActivityLicenseTrustSealDetail?licenseguid={f32f52dc-78c9-4403-a182-ec5f228ae357}'
              )
            }
            alt="نماد اعتماد پلتفرم"
            src="https://cf.ifb.ir/report/PlatformActivityLicenseTrustSealImage?licenseguid={f32f52dc-78c9-4403-a182-ec5f228ae357}"
            className="cursor-pointer"
            style={{ width: '80px', height: 'auto' }}
          />
        </div>
      </Box>
    </Box>
  );
}
