import {InputTextValidate, isBlank} from './ValidateUtils';

export interface ErrorMessage {
  blank: string;
}

export const validateField = (
  error: ErrorMessage,
  validate: InputTextValidate,
  value: Object,
) => {
  if (Number.isNaN(value) || isBlank(String(value))) {
    validate.textError = error.blank;
    validate.isError = true;
    validate.isVisible = true;
    return false;
  }
  validate.textError = '';
  validate.isError = false;
  validate.isVisible = false;
  return true;
};


export const isExistFieldInvalid = <D,V,E>(data:D,validates:V,error:E)=>{
    let countFieldInvalid = 0;
    let key:keyof D| keyof V| keyof E;
    if(data){
        for(key in validates){
            if(!validateField(error[key as keyof E] as ErrorMessage, validates[key as keyof V] as InputTextValidate, data[key as keyof D] as string)){
                countFieldInvalid++;
            }
        }
    }
    return countFieldInvalid > 0
}

