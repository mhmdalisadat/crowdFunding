import React, { useEffect } from 'react';
import { getCookie } from 'src/api/cookie';

import Loader from 'src/components/loader';
import { useNavigate } from 'react-router-dom';
import ProfileField from '../components/profileField';

import useGetProfile from '../hooks/useGetProfile';

const Profile = () => {
  const access = getCookie('access');
  const { data: profileData, isPending } = useGetProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  if (isPending) {
    return <Loader />;
  }

  return profileData ? (
    <div className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">پروفایل کاربر</h1>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات فردی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileField
            label="نام"
            value={profileData?.acc?.private_person?.[0]?.firstName || ''}
          />
          <ProfileField
            label="نام خانوادگی"
            value={profileData?.acc?.private_person?.[0]?.lastName || ''}
          />
          <ProfileField
            label="نام پدر"
            value={profileData?.acc?.private_person?.[0]?.fatherName || ''}
          />
          <ProfileField
            label="جنسیت"
            value={
              // eslint-disable-next-line no-nested-ternary
              profileData?.acc?.private_person?.[0]?.gender === 'Male'
                ? 'مرد'
                : profileData?.acc?.private_person?.[0]?.gender === 'Female'
                ? 'زن'
                : ''
            }
          />

          <ProfileField
            label="کد ملی"
            value={profileData?.acc?.private_person?.[0]?.shNumber || ''}
          />
          <ProfileField
            label="سریال شناسنامه"
            value={profileData?.acc?.private_person?.[0]?.serial || ''}
          />
          <ProfileField
            label="محل تولد"
            value={profileData?.acc?.private_person?.[0]?.placeOfBirth || ''}
          />
          <ProfileField
            label="محل صدور"
            value={profileData?.acc?.private_person?.[0]?.placeOfIssue || ''}
          />
          <ProfileField label="ایمیل" value={profileData?.acc?.addresses?.[0]?.email || ''} />
          <ProfileField label="فکس" value={profileData?.acc?.addresses?.[0]?.fax || ''} />
          <ProfileField label="شماره موبایل" value={profileData?.acc?.mobile || ''} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          حساب‌های بانکی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.acc.accounts?.map((account, index) => (
            <React.Fragment key={index}>
              <ProfileField label="بانک" value={account?.bank || ''} />
              <ProfileField label="شعبه بانک" value={account?.branchName || ''} />
              <ProfileField label="شماره شبا" value={account?.sheba || ''} />
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات شغلی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.acc.job_info?.map((job_info, index) => (
            <React.Fragment key={index}>
              <ProfileField label="شغل" value={job_info?.job || ''} />
              <ProfileField label="نوع شغل" value={job_info?.position || ''} />
              <ProfileField label="محل کار"value={job_info?.companyAddress || ''}/>
              <ProfileField label="شماره تلفن محل کار"/>
              <ProfileField label="ایمیل محل کار"value={job_info?.companyEmail || ''}/>
              <ProfileField label="کدپستی محل کار"value={job_info?.companyPostalCode || ''}/>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          آدرس‌ها
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.acc.addresses?.map((address, index) => (
            <React.Fragment key={index}>
              <ProfileField label="استان" value={address?.province || ''} />
              <ProfileField label="شهر" value={address?.city || ''} />
              <ProfileField label="خیابان" value={address?.remnantAddress || ''} />
              <ProfileField label="کوچه" value={address?.alley || ''} />
              <ProfileField label="کدپستی" value={address?.postalCode || ''} />
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات هیئت مدیره
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.acc.legalPersonStakeholders?.map((stakeholder, index) => (
            <React.Fragment key={index}>
              <ProfileField label="نام" value={stakeholder?.firstName || ''} />
              <ProfileField label="نام خانوادگی" value={stakeholder?.lastName || ''} />
              <ProfileField label="کدملی" value={stakeholder?.uniqueIdentifier || ''} />
              <ProfileField label="سمت" value={stakeholder?.positionType || ''} />
              <ProfileField label="نوع" value={stakeholder?.type || ''} />
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات سهامدارن
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.acc.legalPersonShareholders?.map((stakeholder, index) => (
            <React.Fragment key={index}>
              <ProfileField label="نام" value={stakeholder?.firstName || ''} />
              <ProfileField label="نام خانوادگی" value={stakeholder?.lastName || ''} />
              <ProfileField label="کدملی" value={stakeholder?.uniqueIdentifier || ''} />
              <ProfileField label="سمت" value={stakeholder?.positionType || ''} />
              <ProfileField label="نوع" value={stakeholder?.type || ''} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;
