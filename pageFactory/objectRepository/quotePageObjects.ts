export class QuotePageObjects {
    protected static FIRST_NAME = 'div[data-form-mapping="FirstName"] input';
    protected static LAST_NAME = 'div[data-form-mapping="LastName"] input';
    protected static EMAIL = 'div[data-form-mapping="Email"] input';
    protected static POSTAL_CODE = 'div[data-form-mapping="AddressPostalCode"] input';
    protected static AGE_CHK = 'div.ValidationRequired input.FormChoice__Input';
    protected static SUBMIT = 'span.btn-color-primary';
    protected static DEALER_NAME = 'div.dealer-selector-element__dropdown-button-dealer-name';
    protected static SEARCH_BTN = 'button.dealer-selector-element__search-button';
}