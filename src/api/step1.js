/* eslint-disable import/order */
/* eslint-disable no-restricted-syntax */
import { toast } from 'react-toastify';
import api from './apiClient';
import { getCookie } from './cookie';

// تابع برای ایجاد فرم دیتا
const getFormData = (data) => {
  const formData = new FormData();

  const fields = [
    'company_name',
    'activity_industry',
    'registration_number',
    'nationalid',
    'registered_capital',
    'personnel',
    'company_kind',
    'amount_of_request',
    'address',
    'city',
    'postal_code',
    'email',
    'newspaper',
    'date_newspaper',
    'amount_of_registered_capital',
    'amount_of_registered_shares',
    'exchange_code',
    'year_of_establishment',
  ];

  fields.forEach((field) => formData.append(field, data[field] || ''));
  if (data.date_newspaper) {
    formData.append('date_newspaper', data.date_newspaper);
  }
  if (data.year_of_establishment) {
    formData.append('year_of_establishment', data.year_of_establishment);
  }

  const fileFields = [
    'financial_report_thisyear',
    'financial_report_lastyear',
    'financial_report_yearold',
    'audit_report_thisyear',
    'audit_report_lastyear',
    'audit_report_yearold',
    'statement_thisyear',
    'statement_lastyear',
    'statement_yearold',
    'alignment_6columns_thisyear',
    'logo',
  ];

  fileFields.forEach((field) => {
    if (data[field] && typeof data[field] !== 'string') {
      formData.append(field, data[field]);
    }
  });

  return formData;
};

const handlePageIncrement = (incrementPage) => {
  if (incrementPage) {
    incrementPage();
  }
};

export const getStep1 = async (cartId) => {
  if (cartId) {
    const access = await getCookie('access');
    const response = await api.get(`/api/cart/detail/${cartId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response;
  }
  return {
    data: {
      cart: {
        company_name: '',
        Lock_company_name: false,
        activity_industry: '',
        Lock_activity_industry: false,
        registration_number: '',
        Lock_registration_number: false,
        nationalid: '',
        Lock_nationalid: false,
        registered_capital: '',
        Lock_registered_capital: false,
        personnel: null,
        Lock_personnel: false,
        company_kind: '',
        Lock_company_kind: false,
        amount_of_request: '10000000000',
        Lock_amount_of_request: false,
        code: null,
        email: '',
        Lock_email: false,
        address: '',
        Lock_address: false,
        postal_code: null,
        city: null,
        newspaper: null,
        date_newspaper: null,
        financial_report_thisyear: null,
        Lock_financial_report_thisyear: false,
        financial_report_lastyear: null,
        Lock_financial_report_lastyear: false,
        financial_report_yearold: null,
        Lock_financial_report_yearold: false,
        audit_report_thisyear: null,
        Lock_audit_report_thisyear: false,
        audit_report_lastyear: null,
        Lock_audit_report_lastyear: false,
        audit_report_yearold: null,
        Lock_audit_report_yearold: false,
        statement_thisyear: null,
        Lock_statement_thisyear: false,
        statement_lastyear: null,
        Lock_statement_lastyear: false,
        statement_yearold: null,
        Lock_statement_yearold: false,
        alignment_6columns_thisyear: null,
        Lock_alignment_6columns_thisyear: false,
        logo: null,
        message: '',
        announcement_of_changes_managers: null,
        Lock_announcement_of_changes_managers: false,
        announcement_of_changes_capital: null,
        Lock_announcement_of_changes_capital: false,
        bank_account_turnover: null,
        Lock_bank_account_turnover: false,
        statutes: null,
        Lock_statutes: false,
        assets_and_liabilities: null,
        Lock_assets_and_liabilities: false,
        latest_insurance_staf: null,
        Lock_latest_insurance_staf: false,
        claims_status: null,
        Lock_claims_status: false,
        file_manager: null,
        file_validational: null,
        amount_of_registered_capital: null,
        amount_of_registered_shares: null,
        lock_amount_of_registered_shares: false,
        exchange_code: null,
        lock_bounced_check: false,
        year_of_establishment: null,
        lock_date_newspaper: false,
        lock_newspaper: false,
        lock_logo: false,
      },
    },
  };
};
export const createCart = async (data, incrementPage) => {
  const formData = getFormData(data);

  const access = getCookie('access');

  const response = await api.post('/api/cart/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access}`,
    },
    maxBodyLength: Infinity,
  });

  if ([200, 201].includes(response.status)) {
    toast.success('اطلاعات با موفقیت ارسال شد.');
    handlePageIncrement(incrementPage);
  }

  return response;
};

export const updateCart = async (data, incrementPage, cartId) => {
  const formData = getFormData(data);
  const access = await getCookie('access');

  const response = await api.patch(`/api/cart/detail/${cartId}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${access}`,
    },
    maxBodyLength: Infinity,
  });

  if ([200, 201].includes(response.status)) {
    toast.success('اطلاعات با موفقیت ارسال شد.');
    handlePageIncrement(incrementPage);
  }

  return response;
};
