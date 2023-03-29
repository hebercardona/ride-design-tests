export class QuotePageObjects {
    protected static FIRST_NAME = `div[data-form-mapping='FirstName'] input`;
    protected static LAST_NAME = `div[data-form-mapping='LastName'] input`;
    protected static EMAIL = `div[data-form-mapping='Email'] input`;
    protected static PHONE = `div[data-form-mapping='Phone'] input[required] >> visible=true`;
    protected static POSTAL_CODE = 'div[data-form-mapping="AddressPostalCode"] input';
    protected static AGE_CHK = 'div.ValidationRequired input.FormChoice__Input >> nth=-1';
    protected static SUBMIT = 'span.btn-color-primary >> visible=true';
    protected static DEALER_NAME = 'div.dealer-selector-element__dropdown-button-dealer-name';
    protected static SEARCH_BTN = 'button.dealer-selector-element__search-button';
    protected static COMMERCIAL_USE_RADIO = `input[type='radio'][value='commercial']`;
    protected static ORGANIZATION_INPUT_FIELD = `input:below(:text('Organi'))`;
    protected static MIL_MKT_DROPDOWN = 'div.ValidationRequired select';
    protected static HUR_PURCHASE_DATE = 'div.ValidationRequired select >> nth=1';
    protected static FORM_SUBMISSION_SPINNER = 'div.Form__Submission-Animation';
}