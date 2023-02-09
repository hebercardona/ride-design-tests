export class BuildPageObjects {
    protected static SEAT_CATEGORIES = 'button.wholegood-models-card';
    protected static MODEL_CATEGORIES = 'div.wholegood-models-card';
    protected static TRIMS = 'div.trim-models-card i.shapes-arrow';
    protected static PC_LOADED = 'div.grab';
    protected static FOOTER_NEXT = 'a.cpq-footer__cta-button';
    protected static OPEN_SUMMARY = 'button.cpq-footer__cta-button';
    protected static GET_QUOTE = 'button.cpq-footer__cta-button';
    protected static RADIAL_PROGRESS = 'div.radial-progress';
    protected static FOOTER_SPINNER_LOADING = 'div.cpq-footer__spinner-loading';
    protected static CATEGORIES = 'a.wholegood-models-card';
    protected static SUBSTEP_RADIO = 'input.radio';
    protected static SUBSTEP_ITEM_TITLE = 'div.substep-options-title-items-input-label-container >> visible=true';
    protected static SUBSTEP_ITEMS = 'section.substep-options-title-items-item >> visible=true';
    protected static SUBSTEP_TITLE = 'section.substep-options-title >> visible=true';
    protected static SUBSTEP_TEXT = 'button.substep-options-title-heading span >> visible=true';
    protected static SUBSTEP_SECTION = 'section.substep-options';
    protected static SUBSTEP_SPINNER_LOADER = 'div.spinner-wrapper div.loader >> visible=true';
    protected static COLOR_ITEMS = 'div.wholegood-colors-items-item-row radio';
    protected static SAVE_BUILD_TEXT = 'div.build-variant__save-build-text';
    protected static FOOTER_CTA_SPINNER_LOADING = 'div.cpq-footer__spinner-loading';
    protected static FOOTER_LOGO_CONTAINER = 'div.cpq-footer__brand-logo-container';
    protected static SNO_SIDE_PANEL_SECTION = 'section.color-section-title >> nth=0';
    protected static SNO_TUNNEL_SECTION = 'section.color-section-title >> nth=1';
    protected static SNO_RAIL_SECTION = 'section.color-section-title >> nth=2';
    protected static SNO_COLORS_WATCHES = 'button:not([disabled])';
    protected static SNO_STOCK_LABEL = `div.model-family-info:has(translate:has-text('Stock'))`;
}