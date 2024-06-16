import { Dispatch, SetStateAction } from 'react';

export interface DataContextType {
    formData: {} | any;
    setFormData: Dispatch<SetStateAction<{} | any>>
}